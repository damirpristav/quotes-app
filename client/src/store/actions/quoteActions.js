import * as actionTypes from './types';
import { getCurrentUser } from './authActions';
import axios from 'axios';

// Get all quotes
export const getAllQuotes = () => {
    return dispatch => {
        dispatch(loading());
        axios.get('/api/quotes')
            .then(res => {
                dispatch({
                    type: actionTypes.GET_QUOTES,
                    payload: res.data
                });
            })
            .catch(err => {
                if(err.response && err.response.data){
                    dispatch({
                        type: actionTypes.GET_ERRORS,
                        payload: err.response.data
                    });
                }
            });
    }
}

// Get user quotes with username
export const getUserQuotesByUsername = (username) => {
    return dispatch => {    
        dispatch(loading());
        axios.get('/api/quotes/username/' + username)
            .then(res => {
                dispatch({
                    type: actionTypes.GET_QUOTES_BY_USERNAME,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.GET_QUOTES_BY_USERNAME,
                    payload: null
                });
            });
    }
}

// Get user quotes with user id
export const getUserQuotes = (userId) => {
    return dispatch => {    
        dispatch(loading());
        axios.get('/api/quotes/' + userId)
            .then(res => {
                dispatch(getQuotesByUser(res.data));
            })
            .catch(err => {
                dispatch(noQuotes());
            });
    }
}

// Get user quotes
export const getQuotesByUser = (quotes) => {
    return{
        type: actionTypes.GET_USER_QUOTES,
        payload: quotes
    }
}

// No Quotes
export const noQuotes = () => {
    return{
        type: actionTypes.NO_QUOTES_FOUND,
        payload: []
    }
}

// Get quote by id
export const getQuoteById = (quoteId) => {
    return dispatch => {
        dispatch(loading());
        axios.get(`/api/quotes/quote/${quoteId}`)
            .then(res => {
                dispatch(getQuoteByQuoteId(res.data));
            })
            .catch(err => {
                dispatch(quoteNotFound(err.response.data));
            });
    }
}

// Get quote by quote id
export const getQuoteByQuoteId = (response) => {
    return{
        type: actionTypes.GET_QUOTE,
        payload: response[0]
    }
}

// Quote not found
export const quoteNotFound = (error) => {
    return{
        type: actionTypes.QUOTE_NOT_FOUND,
        payload: {}
    }
}

// Add quote
export const addQuote = (quote, history) => {
    return dispatch => {
        axios.post('/api/quotes/add', quote)
            .then(res => {
                dispatch(quoteAdded(res.data));
                dispatch(getCurrentUser());
                history.push('/dashboard');
            })
            .catch(err => {
                if(err.response && err.response.data){
                    dispatch(quoteFailed(err.response.data));
                }
            });
    }
}

// Quote added
export const quoteAdded = (quote) => {
    return{
        type: actionTypes.QUOTE_ADDED,
        payload: quote
    }
}

// Quote added refresh
export const quoteAddedRefresh = (quote) => {
    return{
        type: actionTypes.QUOTE_ADDED_REFRESH,
        payload: quote
    }
}

// Quote failed
export const quoteFailed = (error) => {
    return{
        type: actionTypes.QUOTE_NOT_ADDED,
        payload: error
    }
}

// Loading
export const loading = () => {
    return{
        type: actionTypes.LOADING_QUOTE
    }
}

// Delete Quote
export const deleteQuote = (quoteId) => {
    return dispatch => {
        axios.delete(`/api/quotes/delete/${quoteId}`)
            .then(res => { 
                dispatch(quoteDeleted(res.data, quoteId));
                dispatch(getCurrentUser());
            })
            .catch(err => { 
                if(err.response || err.response.data){
                    dispatch(quoteNotDeleted(err.response.data));
                }
            });
    }
}

// Quote deleted
export const quoteDeleted = (response, quoteId) => {
    return{
        type: actionTypes.QUOTE_DELETED,
        payload: {
            message: response,
            id: quoteId
        }
    }
}

// Quote no deleted
export const quoteNotDeleted = (response) => {
    return{
        type: actionTypes.QUOTE_NOT_DELETED,
        payload: response
    }
}

// Edit quote
export const editQuote = (quoteId, updatedQuote, history) => {
    return dispatch => {
        axios.put(`/api/quotes/edit/${quoteId}`, updatedQuote)
            .then(res => {
                dispatch(quoteEdited(res.data));
                dispatch(getCurrentUser());
                history.push('/dashboard');
            })
            .catch(err => {
                if(err.response && err.response.data){
                    dispatch(quoteNotEdited(err.response.data.message));
                }
            });
    }
}

// Quote edited
export const quoteEdited = (response) => {
    return{
        type: actionTypes.QUOTE_EDITED,
        payload: response
    }
}

// Quote not edited
export const quoteNotEdited = (error) => {
    return{
        type: actionTypes.QUOTE_UPDATE_FAILED,
        payload: error
    }
}

// Reset quotes
export const resetQuotes = () => {
    return{
        type: actionTypes.RESET_QUOTES
    }
}

// Reset quote message 
export const resetQuoteMessage = () => {
    return{
        type: actionTypes.RESET_QUOTE_MESSAGE
    }
}

