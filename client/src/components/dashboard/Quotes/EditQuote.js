import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InputFormField from '../../UI/InputFormField';
import TextareaFormField from '../../UI/TextareaFormField';
import Loader from '../../UI/Loader';
import * as actions from '../../../store/actions/index';

class EditQuote extends Component{
    constructor(){
        super();

        this.state = {
            text: '',
            author: '',
            errors: {}
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount(){
        const quoteID = this.props.match.params.quoteId;
        this.props.getQuote(quoteID);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
        // if quote successfully added reset form fields
        if(nextProps.quote){
            const quote = nextProps.quote;

            this.setState({
                text: quote.text,
                author: quote.author
            });
        }
    }

    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e){
        e.preventDefault();

        const quoteID = this.props.match.params.quoteId;

        // Create updated quote object from form input
        const updatedQuote = {
            text: this.state.text,
            author: this.state.author
        }

        // Update quote
        this.props.updateQuote(quoteID, updatedQuote, this.props.history);
    }

    render(){
        const { errors } = this.state;

        let editQuoteContent;

        if( this.props.loading ){
            editQuoteContent = <Loader />;
        }else{
            editQuoteContent = (
                <Fragment>
                    <h2 className="text-center">Edit Quote</h2>
                    <form onSubmit={this.onSubmitHandler}>
                        <TextareaFormField 
                            label="Quote Text"
                            id="text"
                            name="text"
                            placeholder="Type your quote here"
                            value={this.state.text}
                            changed={this.onChangeHandler}
                            error={errors.text}
                        />
                        <InputFormField 
                            id="author"
                            name="author"
                            placeholder="Enter Author Name"
                            value={this.state.author}
                            changed={this.onChangeHandler}
                            error={errors.author}
                        />
                        <button className="btn btn-info">Update Quote</button>
                    </form>
                </Fragment>
            );
        }

        return(
            <div className="add-quote content-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-center">
                            {editQuoteContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        quote: state.quote.quote,
        loading: state.quote.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getQuote: (quoteId) => dispatch( actions.getQuoteById(quoteId) ),
        updateQuote: (quoteId, updatedQuote, history) => dispatch( actions.editQuote(quoteId, updatedQuote, history) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditQuote));