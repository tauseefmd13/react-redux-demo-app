import React from 'react';

const Label = ({ htmlFor, className = '', checkboxClass = false, value, children }) => {
    return (
        <label htmlFor={htmlFor} className={checkboxClass ? className : `form-label ` + className}>
            {value ? value :  children }
        </label>
    )
}

export default Label;