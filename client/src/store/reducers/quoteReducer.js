import * as actionTypes from '../actions/types';

const initialState = {
    quote: {},
    quotes: [],
    quotesByUser: [],
    errors: {},
    message: null,
    quoteAddedSuccessfully: false,
    loading: false,
    numberOfUserQuotes: 0
}

const quoteReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_QUOTE:
            return{
                ...state,
                quote: action.payload,
                loading: false
            }
        case actionTypes.QUOTE_NOT_FOUND:
            return{
                ...state,
                quote: {}
            }
        case actionTypes.GET_QUOTES:
            return{
                ...state,
                quotes: action.payload,
                loading: false
            }
        case actionTypes.GET_USER_QUOTES:
            return{
                ...state,
                quotesByUser: action.payload,
                loading: false
            }
        case actionTypes.GET_QUOTES_BY_USERNAME:
            return{
                ...state,
                quotesByUser: action.payload,
                loading: false
            }
        case actionTypes.NO_QUOTES_FOUND:
            return{
                ...state,
                quotes: action.payload
            }
        case actionTypes.QUOTE_ADDED:
            return{
                ...state,
                message: action.payload,
                quoteAddedSuccessfully: true,
                loading: false
            }
        case actionTypes.QUOTE_NOT_ADDED:
            return{
                ...state,
                errors: action.payload,
                loading: false 
            }
        case actionTypes.QUOTE_DELETED:
            return{
                ...state,
                message: action.payload.message,
                quotes: state.quotes.filter(quote => quote._id !== action.payload.id),
                loading: false
            }
        case actionTypes.QUOTE_NOT_DELETED:
            return{
                ...state,
                message: action.payload,
                loading: false
            }
        case actionTypes.QUOTE_EDITED:
            return{
                ...state,
                message: action.payload,
                loading: false
            }
        case actionTypes.QUOTE_UPDATE_FAILED:
            return{
                ...state,
                message: action.payload,
                loading: false
            }
        case actionTypes.RESET_QUOTES:
            return{
                ...state,
                quotes: null
            }
        case actionTypes.RESET_QUOTE_MESSAGE:
            return{
                ...state,
                message: null
            }
        case actionTypes.LOADING_QUOTE:
            return{
                ...state,
                loading: true
            }
        default: 
            return state;
    }
}

export default quoteReducer;