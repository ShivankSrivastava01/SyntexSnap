const express = require('express');
const AdminModel = require('../models/adminModel');

const router = express.Router();

// Add a new admin
router.post('/add', (req, res) => {
    new AdminModel(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error adding admin', error: err });
        });
});

// Get all admins
router.get('/getall', (req, res) => {
    AdminModel.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error fetching admins', error: err });
        });
});

module.exports = router;