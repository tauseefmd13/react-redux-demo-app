import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        counter: counterReducer,
        posts: postsReducer,
        users: usersReducer,
    },
});