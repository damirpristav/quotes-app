import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './store/store';
import stayLoggedIn from './utils/stayLoggedIn';

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

// Check if token exist and if not expired to stay logged in on page refresh 
stayLoggedIn();

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
