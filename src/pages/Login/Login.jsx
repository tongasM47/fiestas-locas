import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (err) {
            setError('Correo o contraseña incorrectos');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-bg">
            <div className="login-card">
                <h2 className="login-title">Iniciar sesión</h2>

                <form className="login-form" onSubmit={handleFormSubmit}>
                    <input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button type="submit" className="submit-btn">Entrar</button>
                </form>

                <button className="google-btn" onClick={handleGoogleLogin}>
                    Iniciar con Google
                </button>

                {error && <p className="login-error">{error}</p>}

                <p className="login-footer">
                    ¿No tenés cuenta? <span onClick={() => navigate('/register')}>Registrate</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
