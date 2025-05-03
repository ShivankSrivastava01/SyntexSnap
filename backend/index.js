// importing express
const express = require('express');
require('dotenv').config();

const UserRouter = require('./routers/userRouter');

// initialize express
const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use('/user', UserRouter);


// starting the server
app.listen(port, () => {
    console.log('server started');
});