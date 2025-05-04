const { Schema, model } = require('../connection');

const extensionSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    version: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    category: { type: String, required: true },
    techStack: { type: [String], required: true },
    publisher: { type: String, required: true },
    reviews: [{
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
    }],
    averageRating: { type: Number, default: 0 },
});

module.exports = model('extensions', extensionSchema);