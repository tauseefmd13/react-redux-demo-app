import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { authSelector, clearState, fetchUserBytoken } from '../features/auth/authSlice';
import { getToken } from './Common';

function PrivateRoute({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isError } = useSelector(authSelector);

    useEffect(() => {
        dispatch(fetchUserBytoken({
            token: getToken()
        }));
    }, [navigate, dispatch]);

    useEffect(() => {
        if (isError) {
            dispatch(clearState());
            localStorage.removeItem('token');
            navigate('/login');
        }

    }, [isError, navigate, dispatch]);


    if(!getToken()) {
        return <Navigate
            to="/login"
            replace
            state={{ path: location.pathname }}
        />
    }

    return children;
}

export default PrivateRoute;
