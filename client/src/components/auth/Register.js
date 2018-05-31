import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'is-empty';

import * as actions from '../../store/actions/index';
import VerifyEmail from '../layout/VerifyEmail';
import InputFormField from '../UI/InputFormField';

class Register extends Component{
    constructor(){
        super();

        this.state = {
            fname: '',
            lname: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {},
            showVerifyPage: false
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount(){
        if(this.props.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    componentWillUnmount(){
        if(this.props.registrationSuccessfull){
            this.props.onResetRegistrationSuccess();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
        if(nextProps.registrationSuccessfull){
            this.setState({ showVerifyPage: true });
        }
    }

    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e){
        e.preventDefault();

        const newUser = {
            fname: this.state.fname,
            lname: this.state.lname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        this.props.onRegister(newUser);
    }

    render(){
        const { errors } = this.state;

        let registerContent;

        if(this.props.message && this.state.showVerifyPage){
            registerContent = (<VerifyEmail message={this.props.message} />);
        }else{
            registerContent = (
                <Fragment>
                    <h2>Create an account</h2>
                    <form onSubmit={this.onSubmitHandler}>
                        <InputFormField 
                            label="First Name"
                            name="fname"
                            id="fname"
                            placeholder="Enter your first name"
                            value={this.state.fname}
                            changed={this.onChangeHandler}
                            error={errors.fname}
                        />
                        <InputFormField 
                            label="Last Name"
                            name="lname"
                            id="lname"
                            placeholder="Enter your last name"
                            value={this.state.lname}
                            changed={this.onChangeHandler}
                            error={errors.lname}
                        />
                        <InputFormField 
                            label="Username"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            value={this.state.username}
                            changed={this.onChangeHandler}
                            error={errors.username}
                        />
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
                        <InputFormField 
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Enter your password"
                            value={this.state.confirmPassword}
                            changed={this.onChangeHandler}
                            error={errors.confirmPassword}
                        />
                        <button className="btn btn-primary">Register</button>
                    </form>
                </Fragment>
            );
        }

        return(
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-center">
                            {registerContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        message: state.auth.message,
        isAuthenticated: state.auth.isAuthenticated,
        errors: state.auth.errors,
        registrationSuccessfull: state.auth.registrationSuccessfull
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onRegister: (user) => dispatch( actions.registerUser(user) ),
        onResetRegistrationSuccess: () => dispatch( actions.resetRegistrationSuccess() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);