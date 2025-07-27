import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-header">
            <h1 className="section-title">Get in Touch</h1>
            <p className="section-subtitle">
              Have suggestions, corrections, or want your organization added to the network? I'm always looking to improve this visualization and expand the ecosystem mapping.
            </p>
          </div>

          <div className="contact-form-container">
            <div className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6"
                  placeholder="Tell me about your organization, suggestions for the network, or any corrections needed..."
                ></textarea>
              </div>

              <div className="contact-links">
                <a 
                  href="https://linkedin.com/in/benjaminsiciliano" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="linkedin-link"
                >
                  <span className="linkedin-icon">💼</span>
                  LinkedIn
                </a>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 