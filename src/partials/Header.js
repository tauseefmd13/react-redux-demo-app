import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { authSelector, logout } from '../features/auth/authSlice';
import { getToken } from '../helpers/Common';
import toast from 'react-hot-toast';

const Header = () => {
    const ref = useRef();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => {
        setIsNavCollapsed(!isNavCollapsed);
    }

    const handleNavLinkClick = () => {
        setIsNavCollapsed(true);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn } = useSelector(authSelector);

    const handleLogout = () => {
        setIsLoading(true);

        dispatch(logout({
            token: localStorage.getItem('token')
        }));

        setTimeout(() => {
            setIsLoading(false);
            toast.success('Successfully logged out!');
            navigate(`/login`);
        }, 2000);
    }

    let checkLoggedIn = getToken() ? true : isLoggedIn;

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        React App
                    </NavLink>
                    <button onClick={handleNavCollapse} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation">
                        <span className={`navbar-toggler-icon`}></span>
                    </button>

                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" onClick={handleNavLinkClick}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about" onClick={handleNavLinkClick}>About Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact" onClick={handleNavLinkClick}>Contact Us</NavLink>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto" ref={ref}>
                            {
                                checkLoggedIn ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/dashboard" onClick={handleNavLinkClick}>Dashboard</NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <button 
                                                style={{ border:"none", backgroundColor:"#fff" }} 
                                                className="nav-link" 
                                                onClick={handleLogout}
                                                disabled={isLoading}
                                            >
                                                {
                                                    isLoading ? (
                                                        <>
                                                            <div 
                                                                className="spinner-border spinner-border-sm" 
                                                                role="status">
                                                            </div>
                                                            &nbsp;
                                                        </>
                                                    ) : (
                                                        null
                                                    )
                                                }
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login" onClick={handleNavLinkClick}>Login</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/register" onClick={handleNavLinkClick}>Register</NavLink>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;
