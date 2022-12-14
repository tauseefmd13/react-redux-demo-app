import React from 'react';

const Checkbox = ({ disabled = false, type = "checkbox", className = '', ...props }) => {
    return (
        <input
            disabled={disabled}
            type="checkbox"
            className={`form-check-input ${className}`}
            {...props}
        />
    )
}

export default Checkbox;