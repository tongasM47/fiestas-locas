import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    const [split, setSplit] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="welcome-bg">
            <div className="welcome-center">
                <h1 className="welcome-title">
                    <span className="go">GO</span>
                    <span className="outzy">OUTZY</span>
                </h1>
                <p className="welcome-subtitle">El plan ideal existe. A veces solo hay que buscarlo.</p>
                <div
                    className={`mitosis-wrapper${split ? ' split' : ''}`}
                    onMouseEnter={() => window.innerWidth > 768 && setSplit(true)}
                    onClick={() => window.innerWidth <= 768 && setSplit(!split)}
                >
                    {!split ? (
                        <button className="led-border-btn">
                            <span className="btn-text">Explorá los eventos</span>
                        </button>
                    ) : (
                        <>
                            <button
                                className="led-border-btn left"
                                onClick={() => navigate('/login')}
                            >
                                <span className="btn-text">Iniciar sesión</span>
                            </button>
                            <button
                                className="led-border-btn right"
                                onClick={() => navigate('/register')}
                            >
                                <span className="btn-text">Registrarse</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
