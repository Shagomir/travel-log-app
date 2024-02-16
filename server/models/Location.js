const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  geolocation: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  ideas: [
    {
      ideaText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      ideaAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Location = model('Location', locationSchema);

module.exports = Location;
