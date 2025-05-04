const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingModel');
const Extension = require('../models/extensionModel');

// Add new review
router.post('/add', async (req, res) => {
    try {
        const { extensionId, rating, comment, userId } = req.body;

        const newRating = new Rating({
            extension: extensionId,
            user: userId,
            rating,
            comment
        });

        const savedRating = await newRating.save();

        // Update extension's average rating
        const allRatings = await Rating.find({ extension: extensionId });
        const avgRating = allRatings.reduce((acc, curr) => acc + curr.rating, 0) / allRatings.length;

        await Extension.findByIdAndUpdate(extensionId, { rating: avgRating });

        res.status(200).json(savedRating);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get reviews by extension
router.get('/byextension/:id', async (req, res) => {
    try {
        const reviews = await Rating.find({ extension: req.params.id })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get average rating for extension
router.get('/average/:id', async (req, res) => {
    try {
        const reviews = await Rating.find({ extension: req.params.id });
        const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length || 0;
        res.status(200).json({ averageRating: avgRating });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;