// src/components/NeonMitosisButton/NeonMitosisButton.jsx

import React, { useState } from 'react';
import './NeonMitosisButton.css';

const NeonMitosisButton = ({ onLogin, onRegister }) => {
    const [split, setSplit] = useState(false);

    // Si querés animar la vuelta atrás, podés manejarlo con otro estado o timeout
    const handleClick = () => setSplit(true);

    return (
        <div className={`mitosis-container ${split ? 'split' : ''}`}>
            {!split ? (
                <button
                    className="neon-btn main-btn"
                    onMouseEnter={handleClick}
                    onTouchStart={handleClick}
                >
                    <span>Conocé la noche</span>
                    <NeonBorderLED colors={['#7df4e8', '#8484ff', '#7df4e8', '#8484ff']} />
                </button>
            ) : (
                <>
                    <button
                        className="neon-btn left-btn"
                        onClick={onLogin}
                    >
                        <span>Iniciar sesión</span>
                        <NeonBorderLED colors={['#7df4e8']} />
                    </button>
                    <button
                        className="neon-btn right-btn"
                        onClick={onRegister}
                    >
                        <span>Registrarse</span>
                        <NeonBorderLED colors={['#8484ff']} />
                    </button>
                </>
            )}
        </div>
    );
};

// Este componente renderiza el SVG del borde con luces animadas
const NeonBorderLED = ({ colors }) => (
    <svg className="led-border" viewBox="0 0 110 40" width="110" height="40">
        <defs>
            <linearGradient id="ledGradient">
                {colors.map((color, i) => (
                    <stop key={i} offset={`${(i / colors.length) * 100}%`} stopColor={color} />
                ))}
                <stop offset="100%" stopColor={colors[0]} />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <rect
            x="5"
            y="5"
            rx="18"
            ry="18"
            width="100"
            height="30"
            fill="none"
            stroke="url(#ledGradient)"
            strokeWidth="4"
            filter="url(#glow)"
            className="led-animated-stroke"
        />
    </svg>
);

export default NeonMitosisButton;
