import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
// import Auth from '../pages/Auth/Auth';  ❌ no existe todavía
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                }
            />
            {/* <Route path="/auth" element={<Auth />} /> */}
        </Routes>
    );
};

export default AppRoutes;
