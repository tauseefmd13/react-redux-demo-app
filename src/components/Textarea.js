import React from 'react';

const Textarea = ({ disabled = false, className = '', ...props }) => {
    return (
        <textarea
            disabled={disabled}
            className={`form-control ${className}`}
            {...props}
        />
    )
}

export default Textarea;
