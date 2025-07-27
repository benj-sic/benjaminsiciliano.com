import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Explore Atlanta's TechBio Ecosystem
          </h1>
          <p className="hero-subtitle">
            Visualized like a protein interaction network — discover the connections, 
            partnerships, and innovation hubs driving Atlanta's biotech revolution
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