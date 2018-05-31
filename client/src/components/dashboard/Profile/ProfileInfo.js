import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

const profileInfo = (props) => {
    const social = props.social;
    let imageSrc;

    if( props.imageDir ){
        imageSrc = props.imageDir + props.image;
    }else{
        imageSrc = props.image;
    }

    return(
        <div className="profile-info">
            <div className="image-box">
                {props.image ? (
                    <img src={imageSrc}  alt={props.fname} />
                ) : (<p>Image not set</p>)}  
            </div>
            <div className="info">
                <h4>{props.fname} {props.lname}</h4>
                <p><strong>Username:</strong> {props.username}</p>
                {props.hideEmail ? null : <p><strong>Email:</strong> {props.email}</p>}
                <p><strong>Profile Created:</strong> {dateFormat(props.date, "dddd, mmmm dS, yyyy")}</p>
                <p><strong>Quotes:</strong> {props.quotesNumber}</p>
                <p><strong>About:</strong><br /> {props.about ? props.about : (<span>No bio</span>)}</p>
                {social ? (
                    <div className="social">
                        {social.twitter ? (
                            <Link to={social.twitter} target="_blank"><i className="fab fa-twitter"></i></Link>
                            ) : null}
                        {social.facebook ? (
                            <Link to={social.facebook} target="_blank"><i className="fab fa-facebook"></i></Link>
                            ) : null}
                        {social.linkedin ? (
                            <Link to={social.linkedin} target="_blank"><i className="fab fa-linkedin"></i></Link>
                            ) : null}
                        {social.youtube ? (
                            <Link to={social.youtube} target="_blank"><i className="fab fa-youtube"></i></Link>
                            ) : null}
                        {social.instagram ? (
                            <Link to={social.instagram} target="_blank"><i className="fab fa-instagram"></i></Link>
                            ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default profileInfo;