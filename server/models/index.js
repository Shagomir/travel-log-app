const mongoose = require("mongoose");

// Import your model files here
const User = require("./User");
const Location = require("./Location");

// Add more models as needed

// Export your models
module.exports = {
  User,
  Location,
  // Export more models as needed
};
