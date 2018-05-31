import axios from 'axios';
import * as actionTypes from './types';
import { resetQuoteMessage } from './quoteActions';

// get user by username
export const getUserByUsername = (username) => {
    return dispatch => {
        dispatch(loading());
        axios.get(`/api/users/username/${username}`)
            .then(res => {
                dispatch({
                    type: actionTypes.GET_USER_BY_USERNAME,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.GET_USER_BY_USERNAME,
                    payload: null
                });
            });
    }
}

// register user action
export const registerUser = (newUser) => {
    return dispatch => {
        axios.post('/api/users/register', newUser)
            .then(response => {
                dispatch(registrationSuccess(response.data.message));
            }).catch(err => {
                dispatch(registrationFail(err.response.data));
            });
    }
}

// registration success
export const registrationSuccess = (response) => {
    return{
        type: actionTypes.REGISTRATION_SUCCESS,
        payload: response
    }
}

// registration fail
export const registrationFail = (error) => {
    return{
        type: actionTypes.REGISTRATION_FAIL,
        payload: error
    }
} 

// Verify users email address
export const verifyUserEmail = (token) => {
    return dispatch => {
        axios.get(`/api/users/verify/${token}`)
            .then(res => {
                dispatch({
                    type: actionTypes.VERIFY_USER_EMAIL,
                    payload: res.data
                });
            })
            .catch(err => {
                if(err.response && err.response.data){
                    dispatch({
                        type: actionTypes.VERIFY_USER_EMAIL,
                        payload: err.response.data
                    });
                }
            });
    }
}

// Reset registration succes property
export const resetRegistrationSuccess = () => {
    return{
        type: actionTypes.RESET_REGISTRATION_SUCCESS
    }
}

// login user - get token and save it to local storage
export const loginUser = (user) => {
    return dispatch => {
        axios.post('/api/users/login', user)
            .then(response => {
                dispatch(loginSuccess(response.data));
            }).catch(err => {
                dispatch(loginFail(err.response.data));
            });
    }
}

// Login success
export const loginSuccess = (userResData) => {
    return{
        type: actionTypes.LOGIN_SUCCESS,
        payload: userResData
    }
}

// Login fail
export const loginFail = (error) => {
    return{
        type: actionTypes.LOGIN_FAIL,
        payload: error
    }
}

// Set logged in user
export const setCurrentUser = (decodedToken) => {
    return{
        type: actionTypes.SET_CURRENT_USER,
        userInfo: decodedToken
    }
}

// Logout user
export const logoutUser = () => {
    return dispatch => {
        dispatch({ type: actionTypes.LOGOUT });
        dispatch( resetQuoteMessage() );
    }
}

// Get logged in user
export const getCurrentUser = () => {
    return dispatch => {
        dispatch(loading());
        axios.get('/api/users/current')
            .then(res => {
                dispatch({
                    type: actionTypes.GET_CURRENT_USER,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.GET_CURRENT_USER,
                    payload: null
                });
            });
    }
}

// Update user
export const updateUser = (userId, userData, history) => {
    return dispatch => {
        axios.put(`/api/users/update/${userId}`, userData)
            .then(res => {
                dispatch({
                    type: actionTypes.UPDATE_USER,
                    payload: res.data
                });
                history.push('/my-profile');
            })
            .catch(err => {
                if(err.response && err.response.data){
                    dispatch({
                        type: actionTypes.USER_UPDATE_FAILED,
                        payload: err.response.data
                    })
                }     
            });
    }
}

// update user image and delete it from uploads folder
export const updateImage = (userId) => {
    return dispatch => {
        axios.put(`/api/users/update/image/${userId}`)
            .then(res => {
                dispatch({
                    type: actionTypes.DELETE_USER_IMAGE,
                    payload: res.data
                });
                dispatch(getCurrentUser());
            })
            .catch(err => {
                if(err.response && err.response.data){
                    console.log(err);
                } 
            });
    }
} 

// Delete user and all his/hers quotes
export const deleteUser = (id) => {
    return dispatch => {
        axios.delete(`/api/users/delete/${id}`)
            .then(res => {
                dispatch({
                    type: actionTypes.DELETE_USER,
                    payload: res.data
                });
            })
            .catch(err => {
                if(err.response && err.response.data){
                    console.log(err.response.data);
                }
            });
    }
}

// loading
export const loading = () => {
    return{
        type: actionTypes.LOADING_AUTH
    }
}