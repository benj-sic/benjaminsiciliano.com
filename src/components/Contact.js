import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace 'YOUR_FORMSPREE_ENDPOINT' with your actual Formspree endpoint
      const response = await fetch('https://formspree.io/f/mgvzkbny', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        e.target.reset(); // Clear the form
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6"
                  placeholder="Tell me about your organization, suggestions for the network, or any corrections needed..."
                  required
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

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus && (
                <div className={`submit-status ${submitStatus}`}>
                  {submitStatus === 'success' 
                    ? '✅ Message sent successfully! I\'ll get back to you soon.' 
                    : '❌ Failed to send message. Please try again or contact me directly.'
                  }
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 