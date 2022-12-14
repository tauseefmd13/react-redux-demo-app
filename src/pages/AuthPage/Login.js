import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authSelector, clearState, clearMessageState, login } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';
import ValidationError from '../../components/ValidationError';
import Button from '../../components/Button';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isFetching, isSuccess, isError, isLoggedIn, successMessage, errorMessage, validationErrors } = useSelector(authSelector);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);

    const togglePasswordVisiblity = () => {
        setTogglePassword(togglePassword ? false : true);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(login({
            email: email,
            password: password,
            remember: remember
        }));
    }

    useEffect(() => {
        return () => {
          dispatch(clearState());
          dispatch(clearMessageState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            if(errorMessage !== "") {
                toast.error(errorMessage);
            }
            dispatch(clearState());
        }
    
        if (isSuccess && isLoggedIn) {
            toast.success(successMessage);
            dispatch(clearState());
            navigate(`/`);
        }
    }, [isError, isSuccess, isLoggedIn, successMessage, errorMessage, dispatch, navigate]);

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Login</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <ValidationError error={validationErrors.email} />
                                </div>
                                <div className="mb-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        type={togglePassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button 
                                        onClick={togglePasswordVisiblity} 
                                        type="button"
                                        className="float-end" 
                                        style={{ margin: "-32px 5px 0px 0px",border:"none", }}
                                    >
                                    {togglePassword ? "Hide" : "Show"}
                                    </button>
                                    <ValidationError error={validationErrors.password} />
                                    <span>
                                        <Link to="/forgot-password" className="float-end mt-1">Forgot Password?</Link>
                                    </span>
                                </div>
                                <div className="mb-3">
                                    <div className="form-check">
                                        <Checkbox
                                            name="remember"
                                            checked={remember}
                                            onChange={(e) => setRemember(e.target.checked)}
                                        />
                                        <Label htmlFor="remember" className="form-check-label" checkboxClass={true}>Remember me</Label>
                                    </div>
                                </div>
                                <div>
                                    <Button processing={isFetching}>Login</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
