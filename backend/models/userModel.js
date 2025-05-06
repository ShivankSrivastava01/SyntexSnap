const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    city: { type: String, default: 'unknown' },
    avatar: { type: String },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'extensions' }],
    createdAt: { type: Date, default: Date.now }
})

module.exports = model('users', mySchema);