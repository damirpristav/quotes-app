// require dependencies
const Validator = require('validator');
const isEmpty = require('is-empty');

// create function to validate registration fields
const validateRegistrationFields = (data) => {
    let errors = {};

    // make sure all fields are strings
    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    if(isEmpty(data.fname)){
        errors.fname = 'This field cannot be empty!';
    }

    if(isEmpty(data.lname)){
        errors.lname = 'This field cannot be empty!';
    }

    if(!Validator.isLength(data.username, {min: 4})){
        errors.username = 'Username must have at least 4 characters.';
    }

    if(isEmpty(data.username)){
        errors.username = 'Username is required!';
    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is not valid! Please enter a valid email.';
    }

    if(isEmpty(data.email)){
        errors.email = 'Email is required!';
    }

    if(!Validator.isLength(data.password, { min: 6 })){
        errors.password = 'Password too short. Please add at least 6 characters!';
    }

    if(isEmpty(data.password)){
        errors.password = 'Password is required!';
    }

    if(!Validator.equals(data.password, data.confirmPassword)){
        errors.confirmPassword = 'Passwords must match!';
    }

    if(isEmpty(data.confirmPassword)){
        errors.confirmPassword = 'Confirm Password field is required!';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegistrationFields;