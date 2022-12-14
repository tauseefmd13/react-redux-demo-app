import React from 'react';

const Button = ({ type = 'submit', className = '', processing, children }) => {
    return (
        <button
            type={type}
            className={
                `btn btn-primary ` + className
            }
            disabled={processing}
        >
            {
                processing && (
                    <>
                        <span 
                            className="spinner-border spinner-border-sm" 
                            role="status"
                            style={{ marginRight: "5px" }}
                        >
                        </span>
                    </>
                )
            }
            {children}
        </button>
    )
}

export default Button;