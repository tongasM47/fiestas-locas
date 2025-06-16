import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeonParticles from '../../components/NeonParticles/NeonParticles';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <NeonParticles />
            <div className="home-hero">
                <h1 className="hero-title">GOOUTZY</h1>
                <p className="hero-subtitle">Donde cada noche cuenta</p>
                <div className="button-group">
                    <button className="cta-button" onClick={() => navigate('/auth?mode=login')}>
                        Iniciar sesión
                    </button>
                    <button className="cta-button secondary" onClick={() => navigate('/auth?mode=register')}>
                        Registrarse
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
