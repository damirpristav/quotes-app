import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'is-empty';

const privateRoute = ({ component: Component, ...rest, auth }) => {
    return(
        <Route {...rest} render={props => 
                auth.isAuthenticated && !isEmpty(localStorage.jwtToken) ?
                (<Component {...props} />) :
                (<Redirect to="/login" />)
            } 
        />
    );
}

const mapStateToProps = state => {
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(privateRoute);