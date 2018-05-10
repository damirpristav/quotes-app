// require dependencies
const express = require('express');
const passport = require('passport');
const isEmpty = require('is-empty');
// define router
const router = express.Router();

// Get Quote model
const Quote = require('../../models/Quote');

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
    Quote.find().then(quotes => {
        if(isEmpty(quotes)){
            return res.status(404).json({ message: 'No quotes found!' });
        }

        res.json(quotes);
    }).catch(err => {
        console.log(err); 
    });
});

// @route  POST api/quotes/add
// @desc   Add new quote
// @access Private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    // Add new quote
    const newQuote = new Quote({
        text: req.body.text,
        author: req.body.author,
        addedBy: req.user.username,
        image: req.body.image,
        color: req.body.color
    });

    newQuote.save().then(quote => {
        res.json({ message: 'Quote successfully submitted!', quote: { text: quote.text, author: quote.author } })
    }).catch(err => {
        res.status(400).json({ message: 'Quote cannot be created!' });
    });
});

// @route  DELETE api/quotes/delete/:id
// @desc   Delete quote
// @access Private
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    // Get quote by id from params
    Quote.findById(req.params.id).then(quote => {
        quotes.remove().then(quote => {
            res.json({ message: 'Quote successfully deleted!', quote: { text: quote.text, author: quote.author } });
        }).catch(err => {
            res.status(400).json({ message: 'An error ocurred! Quote cannot be deleted!' });
        });
    }).catch(err => {
        return res.status(400).json({ message: 'Something went wrong, quote cannot be deleted!' });
    });
});

// @route  PUT api/quotes/edit/:id
// @desc   Edit quote
// @access Private
router.put('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    // Find quote by id from params
    Quote.findById(req.params.id).then(quote => {

        quote.text = req.body.text;
        quote.author = req.body.author;
        quote.image = req.body.image;
        quote.color = req.body.color;

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