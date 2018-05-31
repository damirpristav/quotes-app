import React from 'react';
import './Loader.css';

const loader = () => {
    return(
        <div className="loader">
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </div>
    );
}

export default loader;