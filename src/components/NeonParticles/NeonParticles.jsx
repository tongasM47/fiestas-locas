import React from 'react';
import { Particles } from '@tsparticles/react';
import './NeonParticles.css';
import particlesConfig from './particlesConfig';

const NeonParticles = () => {
    return <Particles id="tsparticles" options={particlesConfig} />;
};

export default NeonParticles;
