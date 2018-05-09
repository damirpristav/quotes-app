// require dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const cryptoRandomString = require('crypto-random-string');
const jwt = require('jsonwebtoken');
const passport = require('passport');
// define router
const router = express.Router();

// get User model
const User = require('../../models/User');

// get config
const config = require('../../config/config');

// @route  GET api/users/test
// @desc   Testing users route
// @access Public
router.get('/test', (req, res) => {
    res.send('Users routes are working!');
});

// @route  GET api/users
// @desc   Get all users
// @access Public
router.get('/', (req, res) => {
    // Get all users from db
    User.find().then(users => {
        res.json(users);
    });
});

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post('/register', (req, res) => {
    let errors = {};

    // Check if user with this email already exists
    User.findOne({ email: req.body.email }).then(user => {
        // if user with this email exists return error
        if(user){
            errors.message = 'User with this email already exists. Please choose another email.';
            return res.status(400).json(errors);
        }else{
            User.findOne({ username: req.body.username }).then(user => {
                if(user){
                    errors.message = 'User with this username already exists. Please choose another username.';
                    return res.status(400).json(errors);
                }else{
                    // Create new user
                    const newUser = new User({
                        fname: req.body.fname,
                        lname: req.body.lname,
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        active: false,
                        activationToken: cryptoRandomString(20)
                    });
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            // set user password to hash password
                            newUser.password = hash;
                            // save user
                            newUser.save().then(user => {
                                res.json({ message: `User ${user.username} successfully created!` });
                            }).catch(err => {
                                res.json({ message: 'An error ocurred. User registration failed.' });
                                console.log(err);
                            });
                        });
                    });
                }
            });
        }
    });
});

// @route  POST api/users/login
// @desc   Login user
// @access Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email: email }).then(user => {
        // check if user exists
        if(!user){
            // if user does not exist return error
            return res.status(404).json({ message: 'User cannot be found!' });
        }
        // if exists check if user is active
        if(user.active){
            // Compare password
            bcrypt.compare(password, user.password).then(passwordsMatch => {
                if(!passwordsMatch){
                    // If passwords dont match return error
                    return res.status(400).json({ message: 'Incorrect password!' });
                }else{
                    // If passwords match return token
                    // Create payload
                    const payload = {
                        id: user.id,
                        firstName: user.fname,
                        lastName: user.lname,
                        username: user.username
                    }
                    // Sign Token
                    jwt.sign(payload, config.secreteOrPrivateKey, { expiresIn: 60*60 }, (err, token) => {
                        res.json({ 
                            message: 'User was successfully logged in!',
                            loggedin: true,
                            token: 'Bearer ' + token 
                        });
                    });
                }
            });
        }else{
            // if user not active return error
            return res.status(400).json({ message: 'User is still not active. Please verify email.' })
        }
    });
});

// @route  DELETE api/users/delete/:id
// @desc   Delete user
// @access Private
router.delete('/delete/:id', (req, res) => {
    let errors = {};

    // Find user with id from url
    User.findById(req.params.id).then(user => {
        if(!user){
            errors.message = 'User cannot be found!';
            return res.status(404).json(errors);
        }else{
            user.remove().then(removedUser => {
                res.json({ message: `User ${user.username} removed!` });
            }).catch(err => {
                res.status(400).json({ message: 'User deletion failed!' });
            });
        }
    });
});

// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        firstName: req.user.fname,
        lastName: req.user.lname,
        email: req.user.email,
        username: req.user.username
    });
});

// export router
module.exports = router;

