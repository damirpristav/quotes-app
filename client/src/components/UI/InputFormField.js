import React from 'react';
import PropTypes from 'prop-types';

const inputFormField = (props) => {
    return(
        <div className="form-box">
            <label htmlFor={props.id}>{props.label}</label>
            <input type={props.type} 
                name={props.name}
                id={props.id} 
                placeholder={props.placeholder}
                className={props.error ? 'input-field invalid' : 'input-field'}
                value={props.value}
                onChange={props.changed} />
            { props.error ? <p className="field-error">{props.error}</p> : null }
            { props.info ? <span className="info">{props.info}</span> : null }
        </div>
    );
}

inputFormField.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string,
    changed: PropTypes.func
}

inputFormField.defaultProps = {
    type: 'text'
}

export default inputFormField;