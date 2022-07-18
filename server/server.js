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
    //console.log(error);
    const status = error.status || 500;
    const message = error.message || SERVER_ERR;
    const data = error.data || null;
    res.status(status).json({
        type: 'error',
        message,
        data
    });
})

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('setup', (userData) => {
        if (userData) {
            socket.join(userData._id);
            console.log(userData._id);
            socket.emit('connected');
        }
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User joined room: ' + room);
    });

    socket.on('new message', (newMessageReceived) => {
        console.log(newMessageReceived);
        var chat = newMessageReceived.chat;
        console.log(chat.users);
        if (!chat.users) {
            console.log('no users');
            return;
        }
        socket.to(chat._id).emit('message received', newMessageReceived);
    })

    socket.on('add to group', (chatContent) => {
        if (!chatContent || !chatContent.users) {
            return;
        }
        console.log(chatContent.users);
        chatContent.users.forEach((usr) => {
            if (usr._id !== chatContent.groupAdmin._id) {
                io.to(usr._id).emit('added to group', chatContent);
            }
        })
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

async function main() {
    try {
        await connectDB();
        //console.log(PORT_NUMBER + " " + ORIGIN);
        server.listen(PORT_NUMBER, () => {
            console.log(`server listening on port ${PORT_NUMBER}...`);
        })
    }
    catch (error) {
        console.log(error);
    }
}

main();