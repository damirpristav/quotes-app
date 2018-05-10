// require dependencies
const Validator = require('validator');
const isEmpty = require('is-empty');

// create function to validate login fields
const validateLoginFields = (data) => {
    let errors = {};

    // make sure all fields are strings
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is not valid! Please enter a valid email.';
    }

    if(isEmpty(data.email)){
        errors.email = 'Email is required!';
    }

    if(isEmpty(data.password)){
        errors.password = 'Password is required!';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginFields;