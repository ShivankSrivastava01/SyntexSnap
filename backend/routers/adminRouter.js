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

// Admin Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await AdminModel.findOne({ email, password });

        if (admin) {
            // Successful login
            res.status(200).json(admin);
        } else {
            // Invalid credentials
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error during login', error: err });
    }
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

// Get admin by ID
router.get('/getbyid/:id', (req, res) => {
    AdminModel.findById(req.params.id)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error fetching admin', error: err });
        });
});

// Update admin
router.put('/update/:id', (req, res) => {
    AdminModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error updating admin', error: err });
        });
});

module.exports = router;