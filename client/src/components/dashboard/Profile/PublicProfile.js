import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../store/actions/index';

import ProfileInfo from './ProfileInfo';
import ProfileQuote from './ProfileQuote';
import Loader from '../../UI/Loader';

class PublicProfile extends Component{
    componentDidMount(){
        const username = this.props.match.params.username;
        this.props.onGetUserByUsername(username);     
        this.props.onGetUserQuotes(username);
    }

    componentWillUnmount(){
        this.props.onResetQuotes();
    }

    render(){
        const { loadingUser, isAuthenticated } = this.props;
        const user = this.props.userProfile;
        let quotes;
        if(!isAuthenticated){
            quotes = this.props.quotesByUser;
        }
        let publicProfileContent;
        let quotesNumber = 0;
        let quotesContent;

        if( user === null || loadingUser ){
            publicProfileContent = <Loader />;
        }else{
            if(isAuthenticated && user.userQuotes !== null){
                quotes = user.userQuotes;
            }

            if(quotes){
                quotesNumber = quotes.length;
                quotesContent = quotes.map(quote => { 
                    return(
                        <ProfileQuote key={quote._id} text={quote.text} author={quote.author} />
                    )
                });

                publicProfileContent = (
                    <Fragment>
                        <ProfileInfo
                            imageDir='../' 
                            image={user.image}
                            fname={user.fname}
                            lname={user.lname}
                            hideEmail
                            username={user.username}
                            date={user.date}
                            quotesNumber={quotesNumber}
                            about={user.about}
                            social={user.social}
                        />
                        <h4 className="text-center mv-3">{user.fname}'s Quotes</h4>
                        <div className="my-quotes">
                            {quotesContent}
                        </div>
                    </Fragment>
                );
            }
        }

        return(
            <div className="profile content-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {publicProfileContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// PublicProfile.propTypes = {
//     quotes: PropTypes.object
// }

const mapStateToProps = state => {
    return{
        user: state.auth.user,
        userProfile: state.auth.userProfile,
        quotesByUser: state.quote.quotesByUser,
        loadingUser: state.auth.loading,
        isAuthenticated: state.auth.isAuthenticated,
        currentUser: state.auth.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetUserByUsername: (username) => dispatch( actions.getUserByUsername(username) ),
        onGetUserQuotes: (username) => dispatch( actions.getUserQuotesByUsername(username) ),
        onResetQuotes: () => dispatch( actions.resetQuotes() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile);