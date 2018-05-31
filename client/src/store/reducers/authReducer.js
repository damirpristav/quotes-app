import * as actionTypes from '../actions/types';
import isEmpty from 'is-empty';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

const initialState = {
    isAuthenticated: false,
    user: {},
    currentUser: {},
    userProfile: {},
    authRedirectPath: false,
    errors: {},
    message: null,
    username: null,
    loading: false,
    registrationSuccessfull: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOGIN_SUCCESS:
            // Get token
            const token = action.payload.token;
            // Save token to local storage
            localStorage.setItem('jwtToken', token);
            // Set authorization header
            setAuthToken(token);
            // Decode token
            const decodedToken = jwtDecode(localStorage.jwtToken);
            return{
                ...state,
                isAuthenticated: !isEmpty(decodedToken),
                user: decodedToken,
                authRedirectPath: '/dashboard',
                loading: false,
                errors: {}
            }
        case actionTypes.LOGIN_FAIL:
            return{
                ...state,
                errors: action.payload,
                authRedirectPath: false
            }
        case actionTypes.LOGOUT:
            // Remove token from local storage
            localStorage.removeItem('jwtToken');
            // Remove Authorization Header
            setAuthToken(false);
            return{
                ...state,
                isAuthenticated: false,
                user: {},
                currentUser: null,
                authRedirectPath: '/login',
                message: null
            }
        case actionTypes.REGISTRATION_SUCCESS:
            return{
                ...state,
                authRedirectPath: false,
                message: action.payload,
                errors: {},
                registrationSuccessfull: true
            }
        case actionTypes.REGISTRATION_FAIL:
            return{
                ...state,
                errors: action.payload,
                authRedirectPath: false
            }
        case actionTypes.VERIFY_USER_EMAIL:
            return{
                ...state,
                message: action.payload
            }
        case actionTypes.RESET_REGISTRATION_SUCCESS:
            return{
                ...state,
                registrationSuccessfull: false
            }
        case actionTypes.SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.userInfo),
                user: action.userInfo,
                loading: false
            }
        case actionTypes.GET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload,
                loading: false
            }
        case actionTypes.UPDATE_USER:
            return{
                ...state,
                message: action.payload,
                loading: false
            }
        case actionTypes.USER_UPDATE_FAILED:
            return{
                ...state,
                errors: action.payload,
                loading: false
            }
        case actionTypes.DELETE_USER_IMAGE:
            return{
                ...state,
                message: action.payload
            }
        case actionTypes.GET_USER_BY_USERNAME:
            return{
                ...state,
                userProfile: action.payload,
                loading: false
            }
        case actionTypes.DELETE_USER:
            return{
                ...state,
                isAuthenticated: false,
                user: {},
                currentUser: null,
                authRedirectPath: '/login',
                message: null
            }
        case actionTypes.LOADING_AUTH:
            return{
                ...state,
                loading: true
            }
        default: 
            return state;
    }
}

export default authReducer;