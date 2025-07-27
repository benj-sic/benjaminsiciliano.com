import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm Ben — a PhD neuropharmacologist working at the intersection of science, strategy, and systems to accelerate biotech innovation.
          </h1>
          <p className="hero-subtitle">
            I built this interactive network to help shine a light on Atlanta's fast-growing but often under-recognized biotech ecosystem.
          </p>
          <p className="hero-cta">
            Explore the map below to discover key organizations, partnerships, and investment relationships driving the region's life sciences momentum — and uncover opportunities to collaborate, invest, or get involved.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">40+</span>
              <span className="stat-label">Organizations</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Connections</span>
            </div>
            <div className="stat">
              <span className="stat-number">$485M+</span>
              <span className="stat-label">NIH Funding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 