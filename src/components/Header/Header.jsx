// src/components/Header/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { auth } from '../../firebase/firebaseConfig';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const [displayName, setDisplayName] = useState(null);
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, 'usuarios', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const data = userSnap.data();
                    if (data.nombre && data.apellido) {
                        setDisplayName(`${data.nombre} ${data.apellido}`);
                    }
                }
            } else {
                setDisplayName(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="logo">gooutzy</Link>
            </div>
            <nav className="nav-links">
                <Link to="/publications" className={location.pathname === '/publications' ? 'active' : ''}>Eventos</Link>
                <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}>Buscar</Link>
                {displayName ? (
                    <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                        {displayName}
                    </Link>
                ) : (
                    <Link to="/auth" className={location.pathname === '/auth' ? 'active' : ''}>Login</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
