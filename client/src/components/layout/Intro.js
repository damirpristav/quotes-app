import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Intro extends Component {
    componentDidMount(){
        if(this.props.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    render(){
        return(
            <div className="intro">
                <div className="overlay"></div>
                <div className="intro-text">
                    <section>
                        <h1>
                            Most good programmers do programming not because they expect to get paid or get adulation 
                            by the public, but because it is fun to program.
                        </h1>
                        <p>
                            Want to submit some quotes ? Then <Link to="/register">Sign up</Link> and start submitting! Or{' '} 
                            <Link to="/login">login</Link> if you already have an account.
                        </p>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Intro);