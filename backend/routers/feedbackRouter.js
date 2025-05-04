const express = require('express');
const FeedbackModel = require('../models/feedbackModel');

const router = express.Router();

// Add a new feedback
router.post('/add', (req, res) => {
    new FeedbackModel(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error adding feedback', error: err });
        });
});

// Get all feedbacks
router.get('/getall', (req, res) => {
    FeedbackModel.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error fetching feedbacks', error: err });
        });
});

module.exports = router;