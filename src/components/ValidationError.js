import React from 'react';

const ValidationError = ({ error }) => {
    return error !== "" ? (
        <span className="invalid-feedback" role="alert">
            <strong>{error}</strong>
        </span>
    ) : null
}

export default ValidationError;