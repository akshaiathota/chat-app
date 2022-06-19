const express = require('express');

const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const { PORT_NUMBER, ORIGIN } = require('./config/config');
const { API_ENDPOINT_NOT_FOUND, SERVER_ERR } = require('./utils/error');

const cors = require('cors');


const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(cors({
    origin: ORIGIN
}));


app.get('/', (req, res) => {
    res.send('API IS RUNNING');
});


//middleware routes
app.use('/user', userRouter);

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
})

async function main() {
    try {
        await connectDB();
        //console.log(PORT_NUMBER + " " + ORIGIN);
        app.listen(PORT_NUMBER, () => {
            console.log(`server listening on port ${PORT_NUMBER}...`);
        })
    }
    catch (error) {

    }
}

main();