// require dependencies
const Validator = require('validator');
const isEmpty = require('is-empty');

// create function to validate user edit form fields
const validateUserUpdateFields = (data) => {
    let errors = {};

    // make sure all fields are strings
    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.image = !isEmpty(data.image) ? data.image : '';
    data.about = !isEmpty(data.about) ? data.about : '';
    data.twitter = !isEmpty(data.twitter) ? data.twitter : '';
    data.facebook = !isEmpty(data.facebook) ? data.facebook : '';
    data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : '';
    data.youtube = !isEmpty(data.youtube) ? data.youtube : '';
    data.instagram = !isEmpty(data.instagram) ? data.instagram : '';

    if(isEmpty(data.fname)){
        errors.fname = 'First Name is required!';
    }

    if(isEmpty(data.lname)){
        errors.lname = 'Last Name is required!';
    }

    if(!isEmpty(data.about) && !Validator.isLength(data.about, { min: 10 })){
        errors.about = 'Please add at least 10 characters!';
    }

    if(!isEmpty(data.twitter) && !Validator.isURL(data.twitter)){
        errors.twitter = 'Invalid URL';
    }

    if(!isEmpty(data.facebook) && !Validator.isURL(data.facebook)){
        errors.facebook = 'Invalid URL';
    }

    if(!isEmpty(data.linkedin) && !Validator.isURL(data.linkedin)){
        errors.linkedin = 'Invalid URL';
    }

    if(!isEmpty(data.youtube) && !Validator.isURL(data.youtube)){
        errors.youtube = 'Invalid URL';
    }

    if(!isEmpty(data.instagram) && !Validator.isURL(data.instagram)){
        errors.instagram = 'Invalid URL';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateUserUpdateFields;