// require dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const cryptoRandomString = require('crypto-random-string');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Email = require('email-templates');
const nodeMailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');
// define router
const router = express.Router();

// get User model
const User = require('../../models/User');
// get Quote model
const Quote = require('../../models/Quote');

// get config
const config = require('../../config/config');

// get validation functions
const validateRegistrationFields = require('../../validation/register');
const validateLoginFields = require('../../validation/login');
const validateUpdateUserFields = require('../../validation/userUpdate');

// Create new Email
let transporter = nodeMailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});

const email = new Email({
    message: {
        from: config.emailFrom
    },
    //send: true,
    transport: {
        jsonTransport: true
    }
});

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

// @route  GET api/users/:username
// @desc   Get user by username and return user data
// @access Public
router.get('/username/:username', (req, res) => {
    // Find user by username
    User.findOne({ username: req.params.username }).then(user => {
        Quote.find({ user: user.id }).select('_id text author').then(quotes => {
            res.json({ 
                id: user.id,
                username: user.username,
                email: user.email,
                image: user.image,
                about: user.about,
                social: user.social,
                date: user.date,
                fname: user.fname,
                lname: user.lname,
                userQuotes: quotes
            });
        })
    }).catch(err => {
        res.status(404).json({ message: 'User cannot be found'});
    });
});

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegistrationFields(req.body);

    // Check if fields are not valid
    if(!isValid){
        return res.status(400).json(errors);
    }

    // Check if user with this email already exists
    User.findOne({ email: req.body.email }).then(user => {
        // if user with this email exists return error
        if(user){
            errors.email = 'User with this email already exists. Please choose another email.';
            return res.status(400).json(errors);
        }else{
            // check if user with this username already exists
            User.findOne({ username: req.body.username }).then(user => {
                // if username exists return error
                if(user){
                    errors.username = 'User with this username already exists. Please choose another username.';
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
                        activationToken: cryptoRandomString(20),
                        quotesCreated: false
                    });
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            // set user password to hash password
                            newUser.password = hash;
                            // save user
                            newUser.save().then(user => {
                                // send json response
                                res.json({ message: `User ${user.username} successfully created!` });
                                // send email to user to verify his/hers email
                                email.send({
                                    template: 'verification',
                                    message: {
                                        to: user.email
                                    },
                                    locals: {
                                        name: user.name,
                                        activationToken: user.activationToken
                                    }
                                }).then(() => {
                                    console.log('Message sent!');
                                }).catch(err => {
                                    console.log('Message cannot be sent', err);
                                });
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
    const {errors, isValid} = validateLoginFields(req.body);

    // Check if fields are not valid
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email: email }).then(user => {
        // check if user exists
        if(!user){
            // if user does not exist return error
            return res.status(404).json({ email: 'User with this email cannot be found!' });
        }
        // if exists check if user is active
        if(user.active){
            // Compare password
            bcrypt.compare(password, user.password).then(passwordsMatch => {
                if(!passwordsMatch){
                    // If passwords dont match return error
                    return res.status(400).json({ password: 'Incorrect password!' });
                }else{
                    // If passwords match return token
                    // Create payload
                    const payload = {
                        id: user.id,
                        firstName: user.fname,
                        lastName: user.lname
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
            return res.status(400).json({ email: 'User is still not active. Please verify email.' })
        }
    });
});

// @route  GET api/users/verify/:activationToken
// @desc   Verify user email
// @access Public
router.get('/verify/:activationToken', (req, res) => {
    // Find user with activationToken from params
    User.findOne({ activationToken: req.params.activationToken }).then(user => {
        if(!user){
            return res.status(404).json({ message: 'User not found!' });
        }else{
            user.active = true;
            user.activationToken = '';
            user.save().then(user => {
                res.json({ message: `Email verified. User ${user.username} is now active!` });
            }).catch(err => {
                res.status(400).json({ message: 'Error ocurred! User cannot be activated.' });
                console.log(err);
            });
        }
    });
});

// @route  DELETE api/users/delete/:id
// @desc   Delete user
// @access Private
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let errors = {};

    // Find user with id from url
    User.findById(req.params.id).then(user => {
        Quote.find({ user: req.params.id }).then(quotes => {
            if(!user){
                errors.message = 'User cannot be found!';
                return res.status(404).json(errors);
            }else{
                quotes.map(quote => {
                    quote.remove();
                });
                user.remove().then(removedUser => {
                    res.json({ message: `User ${user.username} removed!` });
                }).catch(err => {
                    res.status(400).json({ message: 'User deletion failed!' });
                });
            }
        });
    });

});

// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findById(req.user._id).then(user => {
        Quote.find({ user: user.id }).select('_id text author').then(quotes => {
            res.json({ 
                id: user.id,
                username: user.username,
                email: user.email,
                image: user.image,
                about: user.about,
                social: user.social,
                date: user.date,
                fname: user.fname,
                lname: user.lname,
                userQuotes: quotes
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({message: 'No user found'});
        });
    });
});

// multer upload
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, `${cryptoRandomString(20)}_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
});

//const upload = multer({ dest: 'uploads/'});

// @route  PUT api/users/update/:userId
// @desc   Update user data
// @access Private
router.put('/update/:userId', upload.single('image'), passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateUpdateUserFields(req.body);

    // Check if fields are not valid
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findById(req.params.userId)
        .then(user => {
            if(req.body.fname) user.fname = req.body.fname;
            if(req.body.lname) user.lname = req.body.lname;
            if(req.file) user.image = req.file.path;
            if(req.body.about) user.about = req.body.about;

            user.social = {};

            if(req.body.twitter) user.social.twitter = req.body.twitter;
            if(req.body.facebook) user.social.facebook = req.body.facebook;
            if(req.body.linkedin) user.social.linkedin = req.body.linkedin;
            if(req.body.youtube) user.social.youtube = req.body.youtube;
            if(req.body.instagram) user.social.instagram = req.body.instagram;

            user.save().then(savedUser => {
                res.json({ message: 'User successfully updated!', username: savedUser.username });
            })
            .catch(err => {
                res.status(400).json({ message: 'User update failed!' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: 'User not found' });
        });
});

// @route  PUT api/users/update/image
// @desc   Update user image
// @access Private
router.put('/update/image/:userId', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.findById(req.params.userId)
        .then(user => {
            // delete image from uploads folder
            fs.unlink(user.image, (err) => {
                user.image = '';

                user.save().then(savedUser => {
                    res.json({ message: 'Image removed!' });
                })
                .catch(err => {
                    res.status(400).json({ message: 'Image cannot be removed!' });
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: 'User not found' });
        });
});

// export router
module.exports = router;

