// require dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// define express app
const app = express();

// require routes api files
const users = require('./routes/api/users');
const quotes = require('./routes/api/quotes');

// make uploads folder publicly available
app.use('/uploads', express.static('uploads'));

// body-parser midleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// get mongoDBURI from config.js file
const mongoDB = require('./config/config').mongoDBURI;

// Connect to mongo database
mongoose.connect(mongoDB).then(() => {
    console.log('Connected to MongoDB!');
}).catch(err => {
    console.log('Could not connect to MongoDB', err);
});

// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// use routes
app.use('/api/users', users);
app.use('/api/quotes', quotes);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// define port
const port = process.env.PORT || 5000;

// listen to created port
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

