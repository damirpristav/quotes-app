import axios from 'axios';

const setAuthToken = (token) => {
    if(token){
        // if token exist set authorization header to token
        axios.defaults.headers.common['Authorization'] = token;
    }else{
        // if token doesn't exist delete it
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;