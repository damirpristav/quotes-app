import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'is-empty';
import * as actions from '../../store/actions/index'; 

import UserQuotes from './Quotes/UserQuotes';
import Loader from '../UI/Loader';
import Notification from '../UI/Notification';

class Dashboard extends Component{
    constructor(){
        super();

        this.state = {
            refreshNotification: false
        }
    }

    componentDidMount(){
        if(this.props.currentUser === null || isEmpty(this.props.currentUser)){
            this.props.onGetCurrentUser();
        }
    }

    componentWillUpdate(nextProps, nextState){
        if(nextProps.notification !== null){
            this.setState({ refreshNotification: true });
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.currentUser !== this.props.currentUser;
    }

    componentWillUnmount(){
        if(this.props.notification){
            this.props.onResetQuoteMessage();
        }
    }

    render(){
        const { currentUser, loadingUser } = this.props;
        let dashboardContent;

        if( currentUser === null || isEmpty(currentUser) || loadingUser ){
            dashboardContent = (<Loader />);
        }else{
            const quotes = currentUser.userQuotes;
            let notificationContent;
            let notificationMessage;
            if( this.props.notification !== null ){
                notificationMessage = this.props.notification.message;
                
                notificationContent = (
                    <Notification message={notificationMessage} refresh={this.state.refreshNotification} />
                );
            }
            dashboardContent = (
                <Fragment>
                    {notificationContent}
                    <h4>Welcome {currentUser.fname}, this is your dashboard</h4>
                    <div className="actions">
                        <Link to="/add-quote" className="btn btn-secondary btn-small">Add Quote</Link>
                        <Link to="/my-profile" className="btn btn-secondary btn-small">My Profile</Link>
                    </div>
                    <UserQuotes quotes={quotes} />
                </Fragment>
            );
        }

        return(
            <div className="dashboard content-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        currentUser: state.auth.currentUser,
        loadingUser: state.auth.loading,
        notification: state.quote.message
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetCurrentUser: () => dispatch( actions.getCurrentUser() ),
        onResetQuoteMessage: () => dispatch( actions.resetQuoteMessage() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);