// src/routes/AppRoutes.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Welcome from '../pages/Welcome/Welcome';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile'; // ✅ Importar Profile
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    isAuthenticated
                        ? (
                            <MainLayout>
                                <Home />
                            </MainLayout>
                        )
                        : (
                            <Welcome onAuth={() => setIsAuthenticated(true)} />
                        )
                }
            />

            <Route
                path="/home"
                element={
                    isAuthenticated
                        ? (
                            <MainLayout>
                                <Home />
                            </MainLayout>
                        )
                        : <Navigate to="/" />
                }
            />

            <Route
                path="/login"
                element={<Login onAuth={() => setIsAuthenticated(true)} />}
            />
            <Route
                path="/register"
                element={<Register onAuth={() => setIsAuthenticated(true)} />}
            />

            {/* ✅ Ruta protegida para perfil */}
            <Route
                path="/perfil"
                element={
                    isAuthenticated
                        ? <Profile />
                        : <Navigate to="/" />
                }
            />
        </Routes>
    );
};

export default AppRoutes;
