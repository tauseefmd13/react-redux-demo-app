import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h2>404!</h2>
                    <p>
                        <Link to="/">Go to home page</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default NotFound;
