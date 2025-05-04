const { Schema, model } = require('../connection');

const feedbackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = model('feedbacks', feedbackSchema);