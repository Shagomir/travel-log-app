const mongoose = require('mongoose');

// Replace 'your_database_url' with the actual URL of your MongoDB database
const databaseUrl = 'your_database_url';

mongoose.connect(process.env.MONGODB_URL ||  databaseUrl)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

module.exports = mongoose.connection
