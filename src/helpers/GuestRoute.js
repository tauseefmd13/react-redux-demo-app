import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from './Common';

function GuestRoute({ children }) {
    const location = useLocation();

    return !getToken() 
        ? children 
        : <Navigate
            to="/"
            replace
            state={{ path: location.pathname }}
        />;
}

export default GuestRoute;
