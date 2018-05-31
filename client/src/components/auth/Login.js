import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import InputFormField from '../UI/InputFormField';

class Login extends Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount(){
        if(this.props.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
    }

    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e){
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.onLoginUser(user);
    }

    render(){
        const { errors } = this.state;

        let loginContent = (
            <Fragment>
                <h2>Login</h2>
                <form noValidate onSubmit={this.onSubmitHandler}>
                    <InputFormField
                        type="email" 
                        label="Email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={this.state.email}
                        changed={this.onChangeHandler}
                        error={errors.email}
                    />
                    <InputFormField 
                        type="password"
                        label="Password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={this.state.password}
                        changed={this.onChangeHandler}
                        error={errors.password}
                    />
                    <button className="btn btn-primary">Login</button>
                </form>
            </Fragment>
        );

        return(
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-center">
                            {this.props.isAuthenticated ? (<Redirect to={this.props.redirectPath} />) : null }
                            {loginContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.isAuthenticated,
        errors: state.auth.errors,
        redirectPath: state.auth.authRedirectPath,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLoginUser: (user) => dispatch( actions.loginUser(user) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);