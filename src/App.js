import React, { useState } from 'react';
import NetworkVisualization from './components/NetworkVisualization';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // For now, we'll use a simple mailto link since this is a static site
      // In a production environment, you'd want to use a backend service or email service
      const mailtoLink = `mailto:ben.siciliano@gmail.com?subject=Website Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      
      window.location.href = mailtoLink;
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <ThemeProvider>
      <div className="App">
        <header className="header">
          <button className="refresh-button" onClick={handleRefresh} title="Refresh page">
            <svg className="refresh-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
          </button>
          <div className="header-content">
            <h1>Benjamin Siciliano, PhD</h1>
          </div>
          <ThemeToggle />
        </header>

        <main>
          {/* Welcome Message */}
          <section className="welcome-section">
            <div className="container">
              <div className="welcome-content">
                <p>
                  Hi! I'm Ben, a PhD neuropharmacologist passionate about accelerating Atlanta's biotech ecosystem. 
                  Below you'll find an interactive visualization of the organizations, partnerships, and relationships 
                  driving the region's life sciences growth.
                </p>
                <div className="welcome-cta">
                  <p>
                    <strong>Explore the network below</strong> to discover Atlanta's biotech ecosystem and potential collaboration opportunities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Network Visualization - Front and Center */}
          <section className="network-section">
            <div className="container">
              <div className="network-main">
                <NetworkVisualization />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="about-section">
            <div className="container">
              <div className="about-content">
                <div className="about-main-content">
                  <h2>About Me</h2>
                  <div className="about-text">
                    <div className="about-image-container">
                      <img 
                        src="/BS_headshot.jpeg" 
                        alt="Benjamin Siciliano" 
                        className="about-headshot"
                      />
                    </div>
                    <p>
                      I'm a PhD-trained neuropharmacologist specializing in bioinformatics, computational biology, and systems pharmacology to advance therapeutic development for neuropsychiatric and neurodegenerative diseases. With experience managing drug development programs and a focus on applying computational approaches to drive strategic decision-making and innovation in biotech, I have a strong background in technology transfer and early-stage development that enables the de-risking and acceleration of research-to-commercialization processes. I'm focused on leveraging my scientific expertise to bridge the gap between cutting-edge research and business strategy, with a commitment to driving the next wave of impactful therapeutics. I'm eager to lead and collaborate on projects that push the boundaries of biotech innovation and accelerate the delivery of solutions to market, and I'm open to connecting with investors and entrepreneurs focused on leveraging technology and data to de-risk and scale the next-generation of biotech solutions.
                    </p>
                    <p className="about-tldr">
                      <strong>TL;DR:</strong> I combine deep scientific expertise with product strategy and tech implementation to accelerate biotech innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why I Built This Network Section */}
          <section className="motivation-section">
            <div className="container">
              <div className="motivation-content">
                <h3>Why I Built This Network</h3>
                <p>
                  Atlanta's biotech ecosystem is rapidly growing but often overlooked. This interactive network visualization 
                  showcases the connections, partnerships, and innovation hubs driving the region's biotech revolution. 
                  By mapping these relationships, we can identify collaboration, investment, and strategic partnership 
                  opportunities that accelerate next-generation therapeutic development.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="contact-section">
            <div className="container">
              <div className="contact-content">
                <h2>Get in Touch</h2>
                <p className="contact-intro">
                  Have suggestions, corrections, or want your organization added to the network? 
                  I'm always looking to improve this visualization and expand the ecosystem mapping.
                </p>
                <div className="contact-form-container">
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        placeholder="Your name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="4" 
                        value={formData.message}
                        onChange={handleInputChange}
                        required 
                        placeholder="Tell me about your organization, suggestions for the network, or any corrections needed..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="btn submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    {submitStatus === 'success' && (
                      <div className="submit-success">
                        Message sent! Check your email client to complete the email.
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="submit-error">
                        There was an error sending your message. Please try again.
                      </div>
                    )}
                  </form>
                  
                  <div className="contact-links">
                    <a href="https://www.linkedin.com/in/benjamin-siciliano/" target="_blank" rel="noopener noreferrer" className="contact-link">
                      <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App; 