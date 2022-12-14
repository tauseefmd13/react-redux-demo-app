import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authSelector, clearState, clearMessageState, register } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';
import ValidationError from '../../components/ValidationError';
import Button from '../../components/Button';
import Label from '../../components/Label';
import Input from '../../components/Input';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isFetching, isSuccess, isError, isLoggedIn, successMessage, errorMessage, validationErrors } = useSelector(authSelector);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

    const togglePasswordVisiblity = () => {
        setTogglePassword(togglePassword ? false : true);
    };

    const toggleConfirmPasswordVisiblity = () => {
        setToggleConfirmPassword(toggleConfirmPassword ? false : true);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        dispatch(register({
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
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
            toast.error(errorMessage);
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
                            <h3 className="card-title">Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <ValidationError error={validationErrors.name} />
                                </div>
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
                                </div>
                                <div className="mb-3">
                                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                                    <Input 
                                        type={toggleConfirmPassword ? "text" : "password"}
                                        name="password_confirmation"
                                        id="password_confirmation"
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    />
                                    <button 
                                        onClick={toggleConfirmPasswordVisiblity} 
                                        type="button"
                                        className="float-end" 
                                        style={{ margin: "-32px 5px 0px 0px",border:"none", }}
                                    >
                                    {toggleConfirmPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <div>
                                    <Button processing={isFetching}>Register</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
