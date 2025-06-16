const particlesConfig = {
    fullScreen: { enable: false },
    background: { color: 'transparent' },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
        number: {
            value: 120,
            density: {
                enable: true,
                area: 800,
            },
        },
        color: { value: '#7df4e8' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.8,
            animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.3,
                sync: false,
            },
        },
        size: {
            value: 4,
            random: true,
            animation: {
                enable: true,
                speed: 2,
                minimumValue: 1,
                sync: false,
            },
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            outModes: { default: 'bounce' },
        },
        links: {
            enable: true,
            distance: 120,
            color: '#7df4e8',
            opacity: 0.4,
            width: 1,
        },
    },
};

export default particlesConfig;
