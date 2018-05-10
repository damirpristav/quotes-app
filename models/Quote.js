//  require dependencies 
const mongoose = require('mongoose');
// define Schema
const Schema = mongoose.Schema;

// Create Quote Schema
const QuoteSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    addedBy: {
        type: String
    },
    image: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Quote = mongoose.model('quotes', QuoteSchema);