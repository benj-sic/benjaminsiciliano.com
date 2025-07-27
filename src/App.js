import React, { useState, useEffect } from 'react';
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
      // Use Formspree for form submission with cross-browser compatibility
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_next', window.location.href);
      formDataToSend.append('_subject', 'New message from benjaminsiciliano.com');

      const response = await fetch('https://formspree.io/f/mgvzkbny', {
        method: 'POST',
        body: formDataToSend,
        // Remove Accept header for better cross-browser compatibility
        // Formspree handles the response format automatically
      });

      // Check if the response is ok (status 200-299)
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Formspree error:', response.status, response.statusText);
        // If fetch fails, fall back to traditional form submission
        console.log('Falling back to traditional form submission...');
        const form = e.target;
        form.submit();
        return; // Don't set error status since we're falling back
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // If fetch completely fails, fall back to traditional form submission
      console.log('Fetch failed, falling back to traditional form submission...');
      const form = e.target;
      form.submit();
      return; // Don't set error status since we're falling back
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-delayed, .animate-scale, .animate-fade');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

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
            <p className="header-tagline">Bridging science, software, and strategy to accelerate biotech innovation</p>
          </div>
          <ThemeToggle />
        </header>

        <main>
          {/* Welcome Message */}
          <section id="welcome" className="welcome-section">
            <div className="container">
              <div className="welcome-content">
                <p className="animate-on-scroll-delayed">
                  Hi, I'm Ben — a neuropharmacologist and computational biologist working at the intersection of science, strategy, and systems to accelerate biotech innovation. I built this interactive network to help shine a light on Atlanta's fast-growing but often under-recognized biotech ecosystem.
                </p>
                <div className="welcome-cta">
                  <p className="animate-fade">
                    Explore the map below to discover key organizations, partnerships, and investment relationships driving the region's life sciences momentum — and uncover opportunities to collaborate, invest, or get involved.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Network Visualization - Front and Center */}
          <section id="network" className="network-section">
            <div className="container">
              <div className="network-main animate-on-scroll-delayed">
                <NetworkVisualization />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="about-section">
            <div className="container">
              <div className="about-content">
                <div className="about-main-content">
                  <h2 id="about" className="animate-on-scroll-delayed">About Me</h2>
                  <div className="about-text">
                    <div className="about-image-container animate-fade">
                      <img 
                        src="/BS_headshot.jpeg" 
                        alt="Benjamin Siciliano" 
                        className="about-headshot"
                      />
                    </div>
                    <p className="animate-on-scroll-delayed">
                      I'm a PhD-trained neuropharmacologist specializing in bioinformatics, computational biology, and systems pharmacology to advance therapeutics for neuropsychiatric and neurodegenerative diseases. With experience managing drug development programs and applying computational tools to drive strategic decision-making, I bring a strong background in technology transfer and early-stage development to help de-risk and accelerate research-to-commercialization efforts. I focus on bridging cutting-edge science and business strategy to drive the next wave of impactful therapeutics. I'm eager to lead and collaborate on projects that push biotech forward and connect with investors and entrepreneurs leveraging technology and data to scale the next generation of solutions.
                    </p>
                    <p className="about-tldr animate-scale">
                      <strong>TL;DR:</strong> I combine deep scientific expertise with product strategy and tech implementation to accelerate biotech innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why I Built This Network Section */}
          <section id="why-built" className="motivation-section">
            <div className="container">
              <div className="motivation-content">
                <h3 id="why-built" className="animate-on-scroll-delayed">Why I Built This Network</h3>
                <p className="animate-fade">
                  Atlanta's biotech ecosystem is growing fast — but often flies under the radar. I created this interactive network to visualize the key players, partnerships, and innovation hubs fueling Georgia's life sciences revolution. By mapping these relationships, we can identify collaboration, investment, and commercialization opportunities that drive next-gen therapeutic development and translational success.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact-section">
            <div className="container">
              <div className="contact-content">
                <h2 id="contact" className="animate-on-scroll-delayed">Get in Touch</h2>
                <p className="contact-intro animate-fade">
                  Have suggestions, corrections, or want your organization added to the network? 
                  I'm always looking to improve this visualization and expand the ecosystem mapping.
                </p>
                <div className="contact-form-container">
                  <form 
                    className="contact-form" 
                    onSubmit={handleSubmit}
                    action="https://formspree.io/f/mgvzkbny"
                    method="POST"
                  >
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
                    {/* Hidden input for Formspree compatibility */}
                    <input type="hidden" name="_next" value={window.location.href} />
                    <input type="hidden" name="_subject" value="New message from benjaminsiciliano.com" />
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
                        Message sent successfully! I'll get back to you soon.
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="submit-error">
                        There was an error sending your message. Please try again.
                      </div>
                    )}
                    {/* Fallback for users with JavaScript disabled */}
                    <noscript>
                      <div className="submit-error">
                        JavaScript is required for the best experience. If you're having trouble, you can email me directly at ben.siciliano@gmail.com
                      </div>
                    </noscript>
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