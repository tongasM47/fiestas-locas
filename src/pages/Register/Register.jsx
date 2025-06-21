import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirm) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/perfil');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/perfil');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-bg">
            <div className="register-card">
                <h2 className="register-title">Crear cuenta</h2>

                <form className="register-form" onSubmit={handleFormSubmit}>
                    <input type="text" placeholder="Nombre completo" required />
                    <input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirmar contraseña" value={confirm} onChange={e => setConfirm(e.target.value)} required />
                    <button type="submit" className="submit-btn">Registrarse</button>
                </form>

                <button className="google-btn" onClick={handleGoogleRegister}>
                    Registrarse con Google
                </button>

                {error && <p className="register-error">{error}</p>}

                <p className="register-footer">
                    ¿Ya tenés cuenta? <span onClick={() => navigate('/login')}>Iniciá sesión</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
