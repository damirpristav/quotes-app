import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class UserQuotes extends Component{
    deleteQuote = (id) => {
        this.props.onQuoteDelete(id);
    }

    render(){
        const quotes = this.props.quotes.map(quote => (
            <section key={quote._id}>
                <div>
                    <blockquote>
                        {quote.text}
                    </blockquote>
                    <p>&mdash; {quote.author}</p>
                    {!this.props.hideQuoteFooter ? 
                    (
                    <footer>
                        <div className="actions">
                            <Link to={`/edit-quote/${quote._id}`} className="btn btn-info btn-small">Edit</Link>
                            <button className="btn btn-danger btn-small" onClick={() => this.deleteQuote(quote._id)}>Delete</button>
                        </div>
                    </footer> 
                    ) : null}
                </div>
            </section>
        ));

        return(
            <div className="my-quotes">
                {quotes}
            </div> 
        );
    }
} 

const mapStateToProps = state => {
    return{
        message: state.quote.message
    }
}

const mapStateToDispatch = dispatch => {
    return{
        onQuoteDelete: (id) => dispatch( actions.deleteQuote(id) )
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(UserQuotes);