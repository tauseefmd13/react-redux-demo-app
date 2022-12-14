import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';

const AppLayout = () => {
    return (
        <>
            <Header />

            <div className="container my-4">
                <Outlet />
            </div>

            <Footer />
        </>
    )
}

export default AppLayout;
