import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader';
import { authSelector } from '../../features/auth/authSlice';

const Dashboard = () => {
    const { isFetching, name } = useSelector(authSelector);

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    {isFetching ? (
                        <Loader isLoading={isFetching} />
                    ) : (
                        <>
                            Welcome back <h3>{name ? name : "Unknown user"}</h3>
                            <p>
                                <Link to="/">Go to home page</Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard
