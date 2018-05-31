import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import isEmpty from 'is-empty';
import * as actions from '../../../store/actions/index';

import ProfileInfo from './ProfileInfo';
import Loader from '../../UI/Loader';
import Notification from '../../UI/Notification';

class MyProfile extends Component{
    componentDidMount(){
        this.props.onGetCurrentUser();
    }

    deleteAccountHandler(e){
        e.preventDefault();

        const confirmMessage = window.confirm('Are you sure you want to delete your account ?');
        if(confirmMessage){
            console.log(this.props.user.id);
            this.props.onUserDelete(this.props.user.id);
        }else{
            console.log('No i am not sure');
        }
    }

    render(){
        const { user, loading } = this.props;
        let myProfileContent;
        let notificationContent;
        let notificationMessage;
        if( this.props.notification !== null ){
            notificationMessage = this.props.notification.message;
            
            if(notificationMessage !== null){
                notificationContent = (
                    <Notification message={notificationMessage} />
                );
            }
        }

        if( user === null || isEmpty(user) || loading ){
            myProfileContent = <Loader />;
        }else{
            myProfileContent = (
                <Fragment>
                    {notificationContent}
                    <h4>Welcome {user.fname}, this is your profile</h4>
                    <div className="actions">
                        <Link to="/edit-profile" className="btn btn-secondary btn-small">Edit Profile</Link>
                        <Link to={`/profile/${user.username}`} className="btn btn-secondary btn-small">Public Profile</Link>
                    </div>
                    <ProfileInfo 
                        image={user.image}
                        fname={user.fname}
                        lname={user.lname}
                        email={user.email}
                        username={user.username}
                        date={user.date}
                        quotesNumber={user.userQuotes.length}
                        about={user.about}
                        social={user.social}
                    />
                    <div className="actions">
                        <button 
                            className="btn btn-danger btn-small" 
                            style={{marginTop: '1em'}} 
                            onClick={this.deleteAccountHandler.bind(this)}>
                            Delete account
                        </button>
                    </div>
                </Fragment>
            );
        }

        return(
            <div className="profile content-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {myProfileContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        user: state.auth.currentUser,
        loading: state.auth.loading,
        notification: state.auth.message
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetCurrentUser: () => dispatch( actions.getCurrentUser() ),
        onUserDelete: (id) => dispatch( actions.deleteUser(id) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);