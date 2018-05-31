import jwtDecode from 'jwt-decode';

import store from '../store/store';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from '../store/actions/authActions';

const stayLoggedIn = () => {
    // Check if token exists
    if(localStorage.jwtToken){
        // Set authorization header 
        setAuthToken(localStorage.jwtToken);
        // Decode token to get user info
        const decodedToken = jwtDecode(localStorage.jwtToken);
        // Set current user from token payload
        store.dispatch(setCurrentUser(decodedToken));

        // Check if token expired
        const currentTime = Date.now() / 1000;
        if(decodedToken.exp < currentTime){
            // if token is expired then logout user
            store.dispatch(logoutUser());
            // Redirect to login
            window.location.href = '/login';
        }
    }
}

export default stayLoggedIn;