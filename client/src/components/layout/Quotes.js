import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import Quote from './Quote';
import Loader from '../UI/Loader';

class Quotes extends Component{
    componentDidMount(){
        this.props.onLoadAllQuotes();
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.quotes !== this.props.quotes;
    }

    render(){
        const { quotes, loading } = this.props;
        let quotesContent;
        console.log(quotes);
        if(quotes === null || loading){
            quotesContent = <Loader />;
        }else{
            quotesContent = quotes.map(quote => (
                <Quote key={quote._id} text={quote.text} author={quote.author} user={quote.user.username} />
            ));
        }

        return(
            <div className="quotes">
                {quotesContent}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return{
        quotes: state.quote.quotes,
        loading: state.quote.loading,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLoadAllQuotes: () => dispatch( actions.getAllQuotes() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);