import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InputFormField from '../../UI/InputFormField';
import TextareaFormField from '../../UI/TextareaFormField';
import * as actions from '../../../store/actions/index';

class AddQuote extends Component{
    constructor(){
        super();

        this.state = {
            text: '',
            author: '',
            errors: {},
            hideSuccessMessage: false
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
        // if quote successfully added reset form fields
        if(nextProps.quoteAdded){
            this.resetFormFields();
        }
    }

    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e){
        e.preventDefault();

        // Create new quote object from form input
        const newQuote = {
            text: this.state.text,
            author: this.state.author
        }

        // Add quote to db
        this.props.onQuoteAdded(newQuote, this.props.history);
    }

    resetFormFields(){
        this.setState({
            text: '',
            author: ''
        });
    }

    render(){
        const { errors } = this.state;

        return(
            <div className="add-quote content-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-center">
                            <h2 className="text-center">Add Quote</h2>
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
                                <button className="btn btn-info">Submit Quote</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        errors: state.quote.errors,
        message: state.quote.message,
        quoteAdded: state.quote.quoteAddedSuccessfully
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onQuoteAdded: (newQuote, history) => dispatch( actions.addQuote(newQuote, history) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddQuote));