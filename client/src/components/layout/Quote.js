import React from 'react';
import { Link } from 'react-router-dom';

const quote = (props) => {
    return(
        <section className="quote">
             <div className="box"></div>
             <div className="text">
                 <div className="inner-wrap">
                     <div className="inner">
                         <blockquote>
                             {props.text}
                         </blockquote>
                         <p>{props.author}</p>
                     </div>
                 </div>
                 <p className="by">
                     submitted by <Link to={`/profile/${props.user}`}>{props.user}</Link>
                 </p>
             </div>
         </section> 
     );
}

export default quote;