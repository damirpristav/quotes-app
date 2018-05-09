// require dependencies
const express = require('express');
const mongoose = require('mongoose');

// define express app
const app = express();

// require routes api files
const users = require('./routes/api/users');
const quotes = require('./routes/api/quotes');
const profile = require('./routes/api/profile');

// get mongoDBURI from config.js file
const mongoDB = require('./config/config').mongoDBURI;

// Connect to mongo database
mongoose.connect(mongoDB).then(() => {
    console.log('Connected to MongoDB!');
}).catch(err => {
    console.log('Could not connect to MongoDB', err);
});

// create testing route
app.get('/', (req, res) => {
    res.send('Testing...');
});

// use routes
app.use('/api/users', users);
app.use('/api/quotes', quotes);
app.use('/api/profile', profile);

// define port
const port = process.env.PORT || 4444;

// listen to created port
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

