// require dependencies
const express = require('express');
const passport = require('passport');
const isEmpty = require('is-empty');
// define router
const router = express.Router();

// Get Quote model
const Quote = require('../../models/Quote');
// Get User model
const User = require('../../models/User');

// Get validation
const validateQuoteFields = require('../../validation/quote');

// @route  GET api/quotes/test
// @desc   Testing quotes route
// @access Public
router.get('/test', (req, res) => {
    res.send('Quotes routes are working!');
});

// @route  GET api/quotes
// @desc   Get all quotes
// @access Public
router.get('/', (req, res) => {
    // Get all quotes
    Quote.find().populate('user', 'username').then(quotes => {
        if(isEmpty(quotes)){
            return res.status(404).json({ message: 'No quotes found!' });
        }

        res.json(quotes);
    }).catch(err => {
        console.log(err); 
    });
});

// @route  GET api/quotes/:user_id
// @desc   Get all user quotes by user id
// @access Public
router.get('/:user_id', (req, res) => {
    // Get all user quotes by userID
    Quote.find({ user: req.params.user_id }).then(quotes => {
        if(isEmpty(quotes)){
            return res.status(404).json({ message: 'No quotes found!' });
        }
        //console.log(quotes);
        res.json(quotes);
    }).catch(err => {
        console.log(err); 
    });
});

// @route  GET api/quotes/:username
// @desc   Get all user quotes by username
// @access Public
router.get('/username/:username', (req, res) => {
    User.findOne({ username: req.params.username }).then(user => {
        // Get all user quotes by userID
        Quote.find({ user: user.id }).select('_id text author').then(quotes => {
            if(isEmpty(quotes)){
                return res.status(404).json({ message: 'No quotes found!' });
            }

            res.json(quotes);
        }).catch(err => {
            console.log(err); 
        });
    });
});

// @route  GET api/quotes/:quote_id
// @desc   Get edited quote
// @access Private
router.get('/quote/:quote_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    // Get quote by quoteID
    Quote.find({ _id: req.params.quote_id }).then(quote => {
        if(isEmpty(quote)){
            return res.status(404).json({ message: 'No quote found!' });
        }
        
        res.json(quote);
    }).catch(err => {
        console.log(err); 
    });
});

// @route  POST api/quotes/add
// @desc   Add new quote
// @access Private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateQuoteFields(req.body);

    // Check if fields are not valid
    if(!isValid){
        return res.status(400).json(errors);
    }

    // Add new quote
    const newQuote = new Quote({
        text: req.body.text,
        author: req.body.author,
        user: req.user
    });

    newQuote.save().then(quote => {
        // find user to set quotesCreated to true
        User.findById({ _id: quote.user._id })
            .then(user => {
                user.quotesCreated = true;
                user.userQuotes.unshift({ q: quote._id });

                user.save().then(savedUser => {
                    res.json({ message: 'Quote successfully submitted!', quote: { 
                        text: quote.text, 
                        author: quote.author
                    } });
                });
            })
            .catch(err => console.log(err));
    }).catch(err => {
        res.status(400).json({ message: 'Quote cannot be created!' });
    });
});

// @route  DELETE api/quotes/delete/:id
// @desc   Delete quote
// @access Private
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    // Get User by id 
    User.findOne({ _id: req.user._id }).then(user => {
        // Get quote by id from params
        Quote.findById(req.params.id).then(quote => {
            // Get remove index
            const removeIndex = user.userQuotes.map(item => {
                    return item.q.toString();
                }).indexOf(quote._id.toString());

            //Splice out of array
            const userQuotesArr = user.userQuotes;
            userQuotesArr.splice(removeIndex, 1);

            quote.remove().then(quote => {
                user.save();
                res.json({ message: 'Quote successfully deleted!', quote: { text: quote.text, author: quote.author } });
            }).catch(err => {
                res.status(400).json({ message: 'An error ocurred! Quote cannot be deleted!' });
            });
        }).catch(err => {
            return res.status(400).json({ message: 'Something went wrong, quote cannot be deleted!' });
        });
    });
});

// @route  PUT api/quotes/edit/:id
// @desc   Edit quote
// @access Private
router.put('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateQuoteFields(req.body);

    // Check if fields are not valid
    if(!isValid){
        return res.status(400).json(errors);
    }

    // Find quote by id from params
    Quote.findById(req.params.id).then(quote => {

        quote.text = req.body.text;
        quote.author = req.body.author;

        quote.save().then(quote => {
            res.json({ message: 'Quote updated!', quote: { text: quote.text, author: quote.author } });
        }).catch(err => {
            res.status(400).json({ message: 'Quote update failed!' });
            console.log(err);
        });
    }).catch(err => {
        res.status(404).json({ message: 'Quote not found!' });
    });
});

// export router
module.exports = router;