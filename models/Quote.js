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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Quote = mongoose.model('quotes', QuoteSchema);