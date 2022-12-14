import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password, password_confirmation }, thunkAPI) => {
        try {
            const data = await axios.post("/register", {
                name,
                email,
                password,
                password_confirmation,
                device_name: "other",
                device_token: "1234",
            }).then((response) => {
                console.log('response', response, response.status);
                localStorage.setItem('token', response.data.data.token);
                return response.data;
            }).catch((error) => {
                console.log('Error',error.response.data);
                return thunkAPI.rejectWithValue(error.response.data);
            });
            return data;
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
  
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password, remember }, thunkAPI) => {
        try {
            const data = await axios.post("/login", {
                email,
                password,
                remember,
                device_name: "other",
                device_token: "1234",
            }).then((response) => {
                console.log('response', response, response.status);
                localStorage.setItem('token', response.data.data.token);
                return response.data;
            }).catch((error) => {
                console.log('Error',error.response.data);
                return thunkAPI.rejectWithValue(error.response.data);
            });
            return data;
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async ({ token }, thunkAPI) => {
        try {
            const data = await axios.get("/logout", {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }).then((response) => {
                console.log('response', response, response.status);
                localStorage.removeItem('token');
                return response.data;
            }).catch((error) => {
                console.log('Error',error.response.data);
                return thunkAPI.rejectWithValue(error.response.data);
            });
            return data;
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async ({ email }, thunkAPI) => {
        try {
            const data = await axios.post("/forgotPassword", {
                email,
            }).then((response) => {
                console.log('response', response, response.status);
                return response.data;
            }).catch((error) => {
                console.log('Error',error.response.data);
                return thunkAPI.rejectWithValue(error.response.data);
            });
            return data;
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
  
export const fetchUserBytoken = createAsyncThunk(
    'auth/user',
    async ({ token }, thunkAPI) => {
        try {
            const data = await axios.get("/user", {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }).then((response) => {
                console.log('response', response, response.status);
                return response.data;
            }).catch((error) => {
                console.log('Errors',error.response.data);
                return thunkAPI.rejectWithValue(error.response.data);
            });
            return data;
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: '',
        email: '',
        isFetching: false,
        isSuccess: false,
        isError: false,
        isLoggedIn: false,
        successMessage: '',
        errorMessage: '',
        validationErrors: [],
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
        
            return state;
        },
        clearMessageState: (state) => {
            state.successMessage = '';
            state.errorMessage = '';
            state.validationErrors = [];
        
            return state;
        },
    },
    extraReducers: {
        [register.pending]: (state) => {
            state.isFetching = true;
        },
        [register.fulfilled]: (state, { payload }) => {
            console.log('fulfilled payload', payload);
            state.isFetching = false;
            state.isSuccess = true;
            state.isLoggedIn = true;
            state.name = payload.data.user.name;
            state.email = payload.data.user.email;
            state.successMessage = payload.message;
            return state;
        },
        [register.rejected]: (state, { payload }) => {
            console.log('rejected payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.validationErrors = payload.errors;
        },
        [login.pending]: (state) => {
            state.isFetching = true;
        },
        [login.fulfilled]: (state, { payload }) => {
            console.log('fulfilled payload', payload);
            state.name = payload.data.user.name;
            state.email = payload.data.user.email;
            state.isFetching = false;
            state.isSuccess = true;
            state.isLoggedIn = true;
            state.successMessage = payload.message;
            return state;
        },
        [login.rejected]: (state, { payload }) => {
            console.log('rejected payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.validationErrors = payload.errors;
        },
        [logout.pending]: (state) => {
            state.isLoggedIn = true;
        },
        [logout.fulfilled]: (state, { payload }) => {
            console.log('fulfilled payload', payload);
            state.isLoggedIn = false;
            state.successMessage = payload.message;
            return state;
        },
        [logout.rejected]: (state) => {
            state.isLoggedIn = true;
        },
        [forgotPassword.pending]: (state) => {
            state.isFetching = true;
        },
        [forgotPassword.fulfilled]: (state, { payload }) => {
            console.log('fulfilled payload', payload);
            state.isFetching = false;
            state.isSuccess = true;
            state.successMessage = payload.message;
            return state;
        },
        [forgotPassword.rejected]: (state, { payload }) => {
            console.log('rejected payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.validationErrors = payload.errors;
        },
        [fetchUserBytoken.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchUserBytoken.fulfilled]: (state, { payload }) => {
            console.log('fulfilled', payload);
            state.isFetching = false;
            state.isSuccess = true;
        
            state.name = payload.name;
            state.email = payload.email;
        },
        [fetchUserBytoken.rejected]: (state, { payload }) => {
            console.log('rejected', payload);
            state.isFetching = false;
            state.isError = true;
        },
    },
})

export const { clearState, clearMessageState } = authSlice.actions

export default authSlice.reducer

export const authSelector = (state) => state.auth;
