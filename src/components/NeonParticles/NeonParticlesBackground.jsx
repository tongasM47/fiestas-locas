import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Particles } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import './NeonParticlesBackground.css';

const NeonParticlesBackground = () => {
    const [loaded, setLoaded] = useState(false);

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    useEffect(() => {
    console.log('🔵 NeonParticlesBackground montado');
}, []);
// Efecto de montaje para depuración

    const particlesLoaded = useCallback(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 300); // breve delay para evitar parpadeo al montar
    }, []);

    const options = useMemo(() => ({
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
            number: { value: 30, density: { enable: true, area: 1000 } },
            color: { value: ['#5a4fff', '#a78bfa', '#6d28d9'] },
            shape: { type: 'circle' },
            opacity: { value: 0.2 },
            size: {
                value: 15,
                random: { enable: true, minimumValue: 10 },
                anim: { enable: true, speed: 0.3, size_min: 5, sync: false },
            },
            move: {
                enable: true,
                speed: 0.3,
                direction: 'none',
                outModes: { default: 'bounce' },
                random: false,
                straight: false,
            },
        },
    }), []);

    return (
        <div className={`particles-wrapper ${loaded ? 'visible' : ''}`}>
            <Particles
                id="tsparticles-bg"
                init={particlesInit}
                loaded={particlesLoaded}
                options={options}
            />
        </div>
    );
};

export default React.memo(NeonParticlesBackground);
