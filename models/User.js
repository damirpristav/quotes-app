// require dependencies
const mongoose = require('mongoose');
// define Schema
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: false
    },
    activationToken: {
        type: String
    },
    image: {
        type: String,
        default: ''
    },
    quotesCreated: {
        type: Boolean,
        default: false
    },
    about: {
        type: String,
        default: ''
    },
    social: {
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        youtube: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    userQuotes: [
        {
            q: {
                type: Schema.Types.ObjectId,
                ref: 'quotes'
            }
        }
    ]
});

module.exports = User = mongoose.model('users', UserSchema);