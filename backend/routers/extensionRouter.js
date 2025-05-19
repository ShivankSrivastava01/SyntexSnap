const express = require('express');
const ExtensionModel = require('../models/extensionModel');

const router = express.Router();

// Add a new extension
router.post('/add', async (req, res) => {
    try {
        console.log('Received extension data:', req.body);  // Debug log

        // Validate required fields
        const requiredFields = ['name', 'description', 'version', 'category', 'techStack', 'publisher'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`,
                error: 'Validation Error'
            });
        }

        // Create and save the extension
        const extension = new ExtensionModel(req.body);
        const savedExtension = await extension.save();
        
        console.log('Extension saved successfully:', savedExtension);  // Debug log
        res.status(201).json(savedExtension);
    } catch (err) {
        console.error('Error adding extension:', err);  // Debug log
        res.status(500).json({
            message: 'Error adding extension',
            error: err.message || 'Internal Server Error'
        });
    }
});

// Get all extensions
router.get('/getall', async (req, res) => {
    try {
        const extensions = await ExtensionModel.find();
        res.status(200).json(extensions);
    } catch (err) {
        console.error('Error fetching extensions:', err);
        res.status(500).json({
            message: 'Error fetching extensions',
            error: err.message
        });
    }
});

// Get extension by ID
router.get('/getbyid/:id', async (req, res) => {
    try {
        const extension = await ExtensionModel.findById(req.params.id);
        if (!extension) {
            return res.status(404).json({ message: 'Extension not found' });
        }
        res.status(200).json(extension);
    } catch (err) {
        console.error('Error fetching extension:', err);
        res.status(500).json({
            message: 'Error fetching extension',
            error: err.message
        });
    }
});

// Update an extension
router.put('/update/:id', async (req, res) => {
    try {
        const extension = await ExtensionModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!extension) {
            return res.status(404).json({ message: 'Extension not found' });
        }
        res.status(200).json(extension);
    } catch (err) {
        console.error('Error updating extension:', err);
        res.status(500).json({
            message: 'Error updating extension',
            error: err.message
        });
    }
});

// Delete an extension
router.delete('/delete/:id', async (req, res) => {
    try {
        const extension = await ExtensionModel.findByIdAndDelete(req.params.id);
        if (!extension) {
            return res.status(404).json({ message: 'Extension not found' });
        }
        res.status(200).json(extension);
    } catch (err) {
        console.error('Error deleting extension:', err);
        res.status(500).json({
            message: 'Error deleting extension',
            error: err.message
        });
    }
});

module.exports = router;