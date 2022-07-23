const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const chatRouter = require('./routes/chatRoutes');
const messageRouter = require('./routes/messageRoutes');
const { PORT_NUMBER, ORIGIN } = require('./config/config');
const { API_ENDPOINT_NOT_FOUND, SERVER_ERR } = require('./utils/error');

const cors = require('cors');
const morgan = require('morgan');

const app = require('express')();
var server = require('http').Server(app);
const io = require('socket.io')(server, {
    pingTimeOut: 5000,
    cors: {
        origin: ORIGIN
    }
});


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(morgan('combined'));
app.use(cors({
    origin: ORIGIN
}));

app.get('/', (req, res) => {
    res.send('API IS RUNNING');
});


//middleware routes
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

app.use('*', (req, res, next) => {
    const error = {
        status: 404,
        message: API_ENDPOINT_NOT_FOUND
    };
    next(error);
});

//function for handling global errors
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.status || 500;
    const message = error.message || SERVER_ERR;
    const data = error.data || null;
    res.status(status).json({
        type: 'error',
        message,
        data
    });
});

var users = {};
var subscribers = {};

io.on('connection', function (socket) {
    console.log('A user connected');
    let userId = socket.handshake.query.userId;
    socket.on('setup', (userData) => {
        if (userData) {
            socket.join(userData._id);
            console.log('userId: ' + userData._id);
            if (!users[userId]) {
                users[userId] = [];
            }
            users[userId].push(socket.id);
            if (subscribers[userId] && subscribers[userId].length > 0) {
                let newSubscribers = [];
                const payload = {
                    id: userId,
                    status: true
                }
                subscribers[userId].forEach((id) => {
                    if (users[id]) {
                        newSubscribers.push(id);
                        users[id].forEach((socketId) => {
                            io.to(socketId).emit('user status', payload);
                        })
                    }
                });
                subscribers[userId] = newSubscribers;
            }
        }
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User joined room: ' + room);
    });

    socket.on('new message', (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        if (!chat.users) {
            console.log('no users');
            return;
        }
        chat.users.forEach((user) => {
            if (user._id !== newMessageReceived.sender._id) {
                io.to(user._id).emit('message received', newMessageReceived);
                console.log('new message to ' + user._id);
            }
        });

    });

    socket.on('add to group', (chatContent) => {
        if (!chatContent || !chatContent.users) {
            return;
        }
        chatContent.users.forEach((usr) => {
            if (usr._id !== chatContent.groupAdmin._id) {
                io.to(usr._id).emit('added to group', chatContent);
            }
        })
    });

    socket.on('get user status', (reqId) => {
        if (!subscribers[reqId]) {
            subscribers[reqId] = [];
        }
        subscribers[reqId].push(userId);
        if (!users[reqId] || users[reqId].length === 0) {
            const payload = {
                id: reqId,
                status: false
            };
            socket.emit('user status', payload);
        }
        else {
            const payload = {
                id: reqId,
                status: true
            };
            socket.emit('user status', payload);
        }
    });

    socket.on('disconnect', function () {
        if (subscribers[userId]) {
            let newSubscribers = [];
            const payload = {
                id: userId,
                status: false
            }
            subscribers[userId].forEach((id) => {
                if (users[id] && users[id].length > 0) {
                    newSubscribers.push(id);
                    users[id].forEach(socketId => {
                        io.to(socketId).emit('user status', payload);
                    });
                }
            });
        }
        let socketsLeft = users[userId] ? users[userId].filter((socketId) => socketId !== socket.id) : [];
        if (!socketsLeft || socketsLeft.length == 0) {
            delete users[userId];
        }
        else {
            users[userId] = socketsLeft;
        }
        socket.disconnect();
    });
});

async function main() {
    try {
        await connectDB();
        server.listen(PORT_NUMBER, () => {
            console.log(`server listening on port ${PORT_NUMBER}...`);
        })
    }
    catch (error) {
        console.log(error);
    }
}

main();