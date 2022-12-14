import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './partials/AppLayout';
import Home from './pages/HomePage/Home';
import About from './pages/AboutPage/About';
import Contact from './pages/ContactPage/Contact';

import Dashboard from './pages/UserPage/Dashboard';

import Login from './pages/AuthPage/Login';
import Register from './pages/AuthPage/Register';
import ForgotPassword from './pages/AuthPage/ForgotPassword';
import NotFound from './pages/NotFound';

import PostsList from './features/posts/PostsList';
import SinglePostPage from './features/posts/SinglePostPage';
import AddPostForm from './features/posts/AddPostForm';
import EditPostForm from './features/posts/EditPostForm';

import axios from 'axios';
import PrivateRoute from './helpers/PrivateRoute';
import GuestRoute from './helpers/GuestRoute';

axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />

            <Route path="posts" element={<PostsList />} />
            <Route path="posts/:postId" element={<SinglePostPage />} />
            <Route path="posts/create" element={<AddPostForm />} />
            <Route path="posts/edit/:postId" element={<EditPostForm />} />

            <Route path="dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
              }
            />

            <Route path="login" element={
              <GuestRoute>
                <Login />
              </GuestRoute>
              }
            />
            <Route path="register" element={
              <GuestRoute>
                <Register />
              </GuestRoute>
              }
            />
            <Route path="forgot-password" element={
              <GuestRoute>
                <ForgotPassword />
              </GuestRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
