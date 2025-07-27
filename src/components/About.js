import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-header">
            <h1 className="section-title">About Benjamin</h1>
            <p className="section-subtitle">
              PhD in Molecular & Systems Pharmacology from Emory, Project Lead at Radyus Research
            </p>
          </div>

          <div className="about-main-content">
            <div className="about-intro">
              <div className="intro-text">
              <div className="card">
                <h2>Background & Expertise</h2>
                <p>
                  I'm a molecular pharmacologist turned techbio entrepreneur, passionate about 
                  building the infrastructure that will accelerate the next generation of 
                  therapeutics. My work spans the intersection of AI, regulatory automation, 
                  and bioinformatics, with a focus on ecosystem building in Atlanta's growing 
                  techbio scene.
                </p>
                
                <h3>Current Role</h3>
                <p>
                  As Project Lead at <strong>Radyus Research</strong>, I'm developing AI-powered 
                  regulatory automation platforms that streamline drug development processes. 
                  We're building the tools that will make drug discovery faster, more efficient, 
                  and more accessible to emerging biotech companies.
                </p>

                <h3>Research & Academic Background</h3>
                <p>
                  My PhD research at Emory focused on systems pharmacology approaches to 
                  drug discovery, combining computational modeling with experimental validation. 
                  This foundation in both wet lab and computational methods gives me a unique 
                  perspective on the challenges facing modern drug development.
                </p>
                </div>
              </div>
            </div>
              </div>

          <div className="about-grid">
            <div className="about-main">
              <div className="card">
                <h2>Key Achievements</h2>
                <div className="achievements-grid">
                  <div className="achievement">
                    <span className="achievement-number">$6.3M+</span>
                    <span className="achievement-label">Funding Enabled</span>
                  </div>
                  <div className="achievement">
                    <span className="achievement-number">$14.5M+</span>
                    <span className="achievement-label">Grants Facilitated</span>
                  </div>
                  <div className="achievement">
                    <span className="achievement-number">50+</span>
                    <span className="achievement-label">User Interviews</span>
                  </div>
                  <div className="achievement">
                    <span className="achievement-number">EBCC</span>
                    <span className="achievement-label">President</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-sidebar">
              <div className="card">
                <h3>Target Companies</h3>
                <p>I work with techbio companies at the forefront of innovation:</p>
                <ul className="company-list">
                  <li><strong>Weave Bio</strong> - AI-powered drug discovery</li>
                  <li><strong>Orchestra Bio</strong> - Synthetic biology therapeutics</li>
                  <li><strong>SandboxAQ</strong> - Quantum computing for drug discovery</li>
                </ul>
              </div>

              <div className="card">
                <h3>Core Skills</h3>
                <div className="skills-grid">
                  <div className="skill-category">
                    <h4>Technical</h4>
                    <ul>
                      <li>AI/ML for drug discovery</li>
                      <li>Regulatory automation</li>
                      <li>Bioinformatics</li>
                      <li>Systems pharmacology</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h4>Strategic</h4>
                    <ul>
                      <li>Product strategy</li>
                      <li>Ecosystem building</li>
                      <li>Grant writing</li>
                      <li>Partnership development</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>Ecosystem Focus</h3>
                <p>
                  I'm deeply involved in building Atlanta's techbio ecosystem, serving as 
                  President of the Emory Biotech Consulting Club and working to connect 
                  researchers, entrepreneurs, and investors across the Southeast.
                </p>
                <p>
                  The interactive network visualization on this site represents my vision 
                  for a connected, collaborative biotech community that can compete with 
                  traditional hubs like Boston and San Francisco.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 