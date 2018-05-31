import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'; 

class Navigation extends Component{
    logoutHandler(e){
        e.preventDefault();
        this.props.onLogout();
    }

    render(){
        let navigation;

        if( this.props.position === 'left' ){
            navigation = (
                <nav>
                    { !this.props.isAuthenticated ? <Link to="/">Home</Link> : null }
                    <Link to="/quotes">Quotes</Link>
                    { this.props.isAuthenticated ? <Link to="/dashboard">Dashboard</Link> : null }
                </nav>
            );
        }else if( this.props.position === 'right' ){
            navigation = (
                <nav className="clearfix">
                    <ul>
                        { !this.props.isAuthenticated ?
                        (<Fragment>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </Fragment>)
                        : 
                        (<Fragment>
                            <li className="not-link">Hi {this.props.user.firstName}</li>
                            <li><a href="" onClick={this.logoutHandler.bind(this)}>Logout</a></li>
                        </Fragment>)
                        }
                    </ul>
                </nav>
            );
        }

        return(
            <Fragment>
                {navigation}
                {!this.props.isAuthenticated && this.props.redirectPath 
                    ? <Redirect to={this.props.redirectPath} /> : null }
            </Fragment>
        );
    }
} 

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        redirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch( actions.logoutUser() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);