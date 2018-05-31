import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'is-empty';
import * as actions from '../../../store/actions/index';

import InputFormField from '../../UI/InputFormField';
import TextareaFormField from '../../UI/TextareaFormField';

class EditProfile extends Component{
    constructor(){
        super();

        this.state = {
            image: '',
            fname: '',
            lname: '',
            about: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeFileHandler = this.onChangeFileHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount(){
        this.props.getLoggedInUser();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user){
            const user = nextProps.user;

            user.fname = !isEmpty(user.fname) ? user.fname : '';
            user.lname = !isEmpty(user.lname) ? user.lname : '';
            user.about = !isEmpty(user.about) ? user.about : '';
            user.social.twitter = !isEmpty(user.social.twitter) ? user.social.twitter : '';
            user.social.facebook = !isEmpty(user.social.facebook) ? user.social.facebook : '';
            user.social.linkedin = !isEmpty(user.social.linkedin) ? user.social.linkedin : '';
            user.social.youtube = !isEmpty(user.social.youtube) ? user.social.youtube : '';
            user.social.instagram = !isEmpty(user.social.instagram) ? user.social.instagram : '';

            this.setState({
                fname: user.fname,
                lname: user.lname,
                about: user.about,
                twitter: user.social.twitter,
                facebook: user.social.facebook,
                linkedin: user.social.linkedin,
                youtube: user.social.youtube,
                instagram: user.social.instagram
            });
        }

        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeFileHandler(e){
        this.setState({ image: e.target.files[0] });
    }

    onSubmitHandler(e){
        e.preventDefault();

        const { image, fname, lname, about, twitter, facebook, linkedin,
            youtube, instagram } = this.state;

        let fd = new FormData();
        fd.append('image', image, image.name);
        fd.append('fname', fname);
        fd.append('lname', lname);
        fd.append('about', about);
        fd.append('twitter', twitter);
        fd.append('facebook', facebook);
        fd.append('linkedin', linkedin);
        fd.append('youtube', youtube);
        fd.append('instagram', instagram);

        this.props.onUpdateUser(this.props.user.id, fd, this.props.history);
    }

    removeProfileImageHandler(e){
        e.preventDefault();
        console.log('image will be removed!');
        this.props.onUpdateUserImage(this.props.user.id);
    }

    render(){
        const {errors} = this.state;
        let image;
        let fname;
        let imagePreview = null;

        if( this.props.user !== null ){
            image = this.props.user.image;
            fname = this.props.user.fname;
        }

        if(image){
            imagePreview = (
                <Fragment>
                    <div className="image-preview">
                        <img src={image} alt={fname} />
                    </div>
                    <button 
                        onClick={this.removeProfileImageHandler.bind(this)} 
                        type="button"
                        className="btn btn-secondary btn-small"
                        style={{margin: '0 0 2em', display: 'inline-block', width: 'auto'}}
                        >
                        Remove Profile Image
                    </button>
                </Fragment>
            );
        }

        return(
            <div className="edit-profile content-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-8 col-center">
                            <div className="actions">
                                <Link to="/my-profile" className="btn btn-secondary btn-small">Go back</Link>
                            </div>
                            <h2 className="text-center">Edit Profile</h2>
                            <form onSubmit={this.onSubmitHandler}>
                                {!image ? (
                                <InputFormField 
                                    type="file"
                                    label="Profile image"
                                    name="image"
                                    id="image"
                                    placeholder="Choose your profile image"
                                    changed={this.onChangeFileHandler}
                                    error={errors.image}
                                    info="Images greater than 2MB will not be uploaded. Only jpeg, png and gif format allowed."
                                    ref={this.fileInput}
                                />
                                ) : null}
                                
                                {imagePreview}
                                <InputFormField 
                                    label="First name"
                                    name="fname"
                                    id="fname"
                                    placeholder="Enter your first name"
                                    value={this.state.fname}
                                    changed={this.onChangeHandler}
                                    error={errors.fname}
                                />
                                <InputFormField 
                                    label="Last name"
                                    name="lname"
                                    id="lname"
                                    placeholder="Enter your last name"
                                    value={this.state.lname}
                                    changed={this.onChangeHandler}
                                    error={errors.lname}
                                />
                                <TextareaFormField 
                                    label="About me"
                                    name="about"
                                    id="about"
                                    placeholder="About me"
                                    value={this.state.about}
                                    changed={this.onChangeHandler}
                                    error={errors.about}
                                />
                                <InputFormField 
                                    label="Twitter"
                                    name="twitter"
                                    id="twitter"
                                    placeholder="Paste your twitter url here"
                                    value={this.state.twitter}
                                    changed={this.onChangeHandler}
                                    error={errors.twitter}
                                />
                                <InputFormField 
                                    label="Facebook"
                                    name="facebook"
                                    id="facebook"
                                    placeholder="Paste your facebook url here"
                                    value={this.state.facebook}
                                    changed={this.onChangeHandler}
                                    error={errors.facebook}
                                />
                                <InputFormField 
                                    label="Linkedin"
                                    name="linkedin"
                                    id="linkedin"
                                    placeholder="Paste your linkedin url here"
                                    value={this.state.linkedin}
                                    changed={this.onChangeHandler}
                                    error={errors.linkedin}
                                />
                                <InputFormField 
                                    label="Youtube"
                                    name="youtube"
                                    id="youtube"
                                    placeholder="Paste your youtube url here"
                                    value={this.state.youtube}
                                    changed={this.onChangeHandler}
                                    error={errors.youtube}
                                />
                                <InputFormField 
                                    label="Instagram"
                                    name="instagram"
                                    id="instagram"
                                    placeholder="Paste your instagram url here"
                                    value={this.state.instagram}
                                    changed={this.onChangeHandler}
                                    error={errors.instagram}
                                />
                                <button type="submit" className="btn btn-info">Update Profile</button>
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
        user: state.auth.currentUser,
        errors: state.auth.errors
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getLoggedInUser: () => dispatch( actions.getCurrentUser() ),
        onUpdateUser: (id, data, history) => dispatch( actions.updateUser(id, data, history) ),
        onUpdateUserImage: (id) => dispatch( actions.updateImage(id) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));