import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NeonParticles from '../../components/NeonParticles/NeonParticles';
import NeonParticlesBackground from '../../components/NeonParticles/NeonParticlesBackground';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [split, setSplit] = useState(false);

    const handleClick = () => {
        if (window.innerWidth <= 768) {
            setSplit(!split);
        }
    };

    return (
        <div className="home">
            {/* Capa 1: fondo de partículas suaves */}
            <NeonParticlesBackground />

            {/* Capa 2: partículas brillantes frontales */}
            <NeonParticles />

            {/* Contenido principal */}
            <div className="home-hero">
                <h1 className="hero-title">GOOUTZY</h1>
                <p className="hero-subtitle">Donde cada noche cuenta</p>

                <div
                    className={`mitosis-wrapper ${split ? 'split' : ''}`}
                    onMouseEnter={() => window.innerWidth > 768 && setSplit(true)}
                    onMouseLeave={() => window.innerWidth > 768 && setSplit(false)}
                    onClick={handleClick}
                >
                    <div className="single-button">
                        Descubrí la noche
                    </div>
                    <div
                        className="split-button left"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate('/auth?mode=login');
                        }}
                    >
                        Iniciar sesión
                    </div>
                    <div
                        className="split-button right"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate('/auth?mode=register');
                        }}
                    >
                        Registrarse
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
