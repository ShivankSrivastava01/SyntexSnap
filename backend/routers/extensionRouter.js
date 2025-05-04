const express = require('express');
const ExtensionModel = require('../models/extensionModel');

const router = express.Router();

// Add a new extension
router.post('/add', (req, res) => {
    new ExtensionModel(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error adding extension', error: err });
        });
});

// Get all extensions
router.get('/getall', (req, res) => {
    ExtensionModel.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error fetching extensions', error: err });
        });
});

// Get extension by ID
router.get('/getbyid/:id', (req, res) => {
    ExtensionModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error fetching extension', error: err });
        });
});

// Update an extension
router.put('/update/:id', (req, res) => {
    ExtensionModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error updating extension', error: err });
        });
});

// Delete an extension
router.delete('/delete/:id', (req, res) => {
    ExtensionModel.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error deleting extension', error: err });
        });
});

module.exports = router;