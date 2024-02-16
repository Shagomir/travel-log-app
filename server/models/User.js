const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    locations: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Location',
        },
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
