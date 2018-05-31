import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class UserVerified extends Component{
    componentDidMount(){
        const token = this.props.match.params.token;
        if(token && token !== 'undefined'){
            this.props.onUserVerify(token);
        }
    }

    render(){
        const { message } = this.props;
        let userVerifiedContent = null;

        if(message !== null){
            userVerifiedContent = (<p>{message.message}</p>);
        }else{
            userVerifiedContent = (<p>Something went wrong! User cannot be verified!</p>);
        }

        return(
            <div className="content-wrapper">
                <div className="container">
                    <div className="col-12">
                        <div className="text-center success-info">
                            {/* <p>Your email address has been verified. You can now <Link to="/login">login</Link></p> */}
                            {userVerifiedContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        message: state.auth.message
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onUserVerify: (token) => dispatch( actions.verifyUserEmail(token) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserVerified);