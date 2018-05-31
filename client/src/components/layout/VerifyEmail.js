import React from 'react';

const verifyEmail = (props) => {
    return(
        <div className="text-center">
            { props.message ? <p className="success-info">{props.message}</p> : null }
            <p>Please check your mail to verify your email address</p>
        </div>
 
    );
}

export default verifyEmail;