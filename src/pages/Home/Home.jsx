import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NeonParticles from '../../components/NeonParticles/NeonParticles';
import NeonParticlesBackground from '../../components/NeonParticles/NeonParticlesBackground';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [split, setSplit] = useState(false);

    // Maneja la animación para desktop (hover) y mobile (tap)
    const handleMitosis = () => setSplit(true);
    const handleReset = () => setSplit(false);

    return (
        <div className="home">
            <NeonParticlesBackground />
            <NeonParticles />

            <div className="home-hero">
                <h1 className="hero-title">GOOUTZY</h1>
                <p className="hero-subtitle">Donde cada noche cuenta</p>

                <div
                    className={`mitosis-wrapper${split ? ' split' : ''}`}
                    onMouseEnter={() => window.innerWidth > 768 && handleMitosis()}
                    onMouseLeave={() => window.innerWidth > 768 && handleReset()}
                    onClick={() => window.innerWidth <= 768 && setSplit(!split)}
                >
                    {!split ? (
                        <button className="square-btn">
                            Descubrí la noche
                            <LedBorder type="multi" />
                        </button>
                    ) : (
                        <>
                            <button
                                className="square-btn left"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate('/auth?mode=login');
                                }}
                            >
                                Iniciar sesión
                                <LedBorder type="celeste" />
                            </button>
                            <button
                                className="square-btn right"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate('/auth?mode=register');
                                }}
                            >
                                Registrarse
                                <LedBorder type="violeta" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Bordes animados para cada estado
const LedBorder = ({ type }) => {
    let gradient, animation;
    if (type === "multi") {
        gradient = "linear-gradient(270deg, #7df4e8, #8484ff, #7df4e8, #8484ff, #7df4e8)";
        animation = "led-multi 2.5s linear infinite";
    } else if (type === "celeste") {
        gradient = "linear-gradient(90deg, #7df4e8 0%, #7df4e8 100%)";
        animation = "led-celeste 2s linear infinite";
    } else {
        gradient = "linear-gradient(90deg, #8484ff 0%, #8484ff 100%)";
        animation = "led-violeta 2s linear infinite";
    }

    return (
        <span
            className="led-border"
            style={{
                background: gradient,
                animation: animation,
            }}
        ></span>
    );
};

export default Home;
