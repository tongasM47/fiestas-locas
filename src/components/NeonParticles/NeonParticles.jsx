import React, { useCallback, useMemo, useState, useEffect } from 'react';

import { Particles } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import './NeonParticles.css';

const NeonParticles = () => {
    const [loaded, setLoaded] = useState(false);

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

        useEffect(() => {
        console.log('🟣 NeonParticles montado');
    }, []);

    const particlesLoaded = useCallback(async () => {
        setTimeout(() => {
            setLoaded(true);
        }, 300);
    }, []);

    const options = useMemo(() => ({
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
            number: {
                value: 100,
                density: { enable: true, area: 800 },
            },
            color: {
                value: ['#8484ff', '#b58dff', '#9f70ff', '#c6c2ce'],
            },
            shape: { type: 'circle' },
            opacity: {
                value: 0.8,
            },
            size: {
                value: 4,
                random: { enable: true, minimumValue: 2 },
                anim: {
                    enable: true,
                    speed: 1.5,
                    size_min: 1,
                    sync: false,
                },
            },
            move: {
                enable: true,
                speed: 1.2,
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
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={options}
            />
        </div>
    );
};

export default React.memo(NeonParticles);
