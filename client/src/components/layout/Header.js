import React from 'react';

import Navigation from './Navigation';

const header = () => {
    return(
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-6 nav-left">
                        <Navigation position="left" />
                    </div>
                    <div className="col-6">
                        <Navigation position="right" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default header;