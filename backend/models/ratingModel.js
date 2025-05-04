const { Schema, model } = require('../connection');

const ratingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    extensionId: { type: Schema.Types.ObjectId, ref: 'extensions', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = model('ratings', ratingSchema);