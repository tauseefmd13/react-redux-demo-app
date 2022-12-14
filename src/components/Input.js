import React from 'react';

const Input = ({ disabled = false, className = '', ...props }) => {
    
    return (
        <input
            disabled={disabled}
            className={`form-control ${className}`}
            {...props}
        />
    )
}

export default Input;