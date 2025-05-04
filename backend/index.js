// importing express
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const UserRouter = require('./routers/userRouter');
const ExtensionRouter = require('./routers/extensionRouter');
const AdminRouter = require('./routers/adminRouter');
const RatingRouter = require('./routers/ratingRouter');
const FeedbackRouter = require('./routers/feedbackRouter');

// initialize express
const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
));
app.use(express.json());


app.use('/user', UserRouter);
app.use('/extension', ExtensionRouter);
app.use('/admin', AdminRouter);
app.use('/rating', RatingRouter);
app.use('/feedback', FeedbackRouter);

// starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});