import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import ValidationError from '../../components/ValidationError';
import { authSelector, clearMessageState, clearState, forgotPassword } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const { isFetching, isSuccess, isError, successMessage, errorMessage, validationErrors } = useSelector(authSelector);

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(forgotPassword({
            email: email
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
    
        if (isSuccess) {
            toast.success(successMessage);
            dispatch(clearState());
        }
    }, [isError, isSuccess, successMessage, errorMessage, dispatch]);

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Forgot Password</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
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
                                <div>
                                    <Button processing={isFetching}>Send Password Reset Link</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;
