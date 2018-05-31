// require dependencies
const Validator = require('validator');
const isEmpty = require('is-empty');

// create function to validate add & edit quote form fields
const validateQuoteFields = (data) => {
    let errors = {};

    // make sure all fields are strings
    data.text = !isEmpty(data.text) ? data.text : '';
    data.author = !isEmpty(data.author) ? data.author : '';

    if(isEmpty(data.text)){
        errors.text = 'Quote is required!';
    }

    if(isEmpty(data.author)){
        errors.author = 'Author is required!';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateQuoteFields;