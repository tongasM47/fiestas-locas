// src/components/Header/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const location = useLocation();

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="logo">gooutzy</Link>
            </div>
            <nav className="nav-links">
                <Link to="/publications" className={location.pathname === '/publications' ? 'active' : ''}>Eventos</Link>
                <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}>Buscar</Link>
                <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Perfil</Link>
                <Link to="/auth" className={location.pathname === '/auth' ? 'active' : ''}>Login</Link>
            </nav>
        </header>
    );
};

export default Header;
