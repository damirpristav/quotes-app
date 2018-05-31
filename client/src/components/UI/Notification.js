import React from 'react';
import './Notification.css';

const notification = (props) => {
    setTimeout(() => {
        if(document.getElementById('notification-message') !== null){
            document.getElementById('notification-message').classList.add('fade-out');
        }
    }, 2000);

    if(props.refresh){
        if(document.getElementById('notification-message').classList.contains('fade-out')){
            document.getElementById('notification-message').classList.remove('fade-out');
        }
    }

    return(
        <div id="notification-message" className='notification'>
            <p>{props.message}</p>
        </div>  
    )
};

export default notification;