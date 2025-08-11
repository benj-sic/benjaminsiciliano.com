import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NetworkVisualization from './components/NetworkVisualization';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';
import cacheManager from './utils/cache.js';
import performanceMonitor from './utils/performance.js';
import './App.css';
import EmoryNetwork from './components/EmoryNetwork';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const shareDropdownRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const handleSocialShare = (platform) => {
    console.log('Social share clicked for platform:', platform);
    
    // Use clean base URL for sharing (without filter parameters)
    const baseUrl = window.location.origin + window.location.pathname;
    const cleanShareUrl = baseUrl;
    
    // For LinkedIn, use a public URL if we're on localhost
    const linkedInUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'https://benjaminsiciliano.com' 
      : cleanShareUrl;
    
    const twitterShareText = "Explore this interactive map of Atlanta's biotech ecosystem — built by @benjsiciliano — featuring startups, spinouts, VCs, and research hubs driving innovation in Georgia.";
    
    let socialUrl;
    
    switch (platform) {
      case 'twitter':
        socialUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterShareText)}&url=${encodeURIComponent(cleanShareUrl)}`;
        break;
      case 'linkedin':
        socialUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(linkedInUrl)}`;
        break;
      default:
        return;
    }
    
    console.log('Opening social URL:', socialUrl);
    window.open(socialUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    console.log('Copy link clicked!');
    
    // Use clean base URL for sharing (without filter parameters)
    const baseUrl = window.location.origin + window.location.pathname;
    const cleanShareUrl = baseUrl;
    
    console.log('Share URL:', cleanShareUrl);
    
    try {
      await navigator.clipboard.writeText(cleanShareUrl);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
      setShowShareDropdown(false);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Final fallback - show URL in alert
      alert(`Share this link: ${cleanShareUrl}`);
      setShowShareDropdown(false);
    }
  };

  const handleTwitterShare = () => {
    console.log('Twitter share clicked!');
    try {
      handleSocialShare('twitter');
      setShowShareDropdown(false);
    } catch (error) {
      console.error('Error in handleTwitterShare:', error);
    }
  };

  const handleLinkedInShare = () => {
    console.log('LinkedIn share clicked!');
    try {
      handleSocialShare('linkedin');
      setShowShareDropdown(false);
    } catch (error) {
      console.error('Error in handleLinkedInShare:', error);
    }
  };

  // Initialize caching and performance monitoring
  useEffect(() => {
    // Start performance monitoring
    performanceMonitor.start();
    
    // Warm cache on app start
    cacheManager.warmCache();
    
    // Cache user preferences
    const userPrefs = {
      theme: localStorage.getItem('theme') || 'dark',
      lastVisit: Date.now(),
      visitCount: parseInt(localStorage.getItem('visitCount') || '0') + 1
    };
    
    cacheManager.cacheUserPrefs(userPrefs);
    localStorage.setItem('visitCount', userPrefs.visitCount.toString());
    
    console.log('Caching system initialized');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const startTime = performance.now();
      
      // Use Formspree for form submission with cross-browser compatibility
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_subject', 'New message from benjaminsiciliano.com');

      const response = await fetch('https://formspree.io/f/mgvzkbny', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
      });

      const duration = performance.now() - startTime;
      performanceMonitor.trackNetworkInteraction('form-submission', duration, response.ok);

      // Check if the response is ok (status 200-299)
      if (response.ok) {
        console.log('Form submission successful!');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        console.error('Formspree error:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
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
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/emory" element={<EmoryNetwork />} />
          <Route path="/" element={
            <div className="App">
              <header className="header">
                {/* Desktop share button */}
                <div className="share-button-container">
                  <button 
                    className="share-button" 
                    onClick={() => setShowShareDropdown(!showShareDropdown)} 
                    title="Share this map"
                  >
                    <svg className="share-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="header-content">
                  <h1>Benjamin Siciliano, PhD</h1>
                  <p className="header-tagline">Bridging science, software, and strategy to accelerate biotech innovation</p>
                  <div className="header-buttons">
                    <button 
                      className="share-button" 
                      onClick={() => setShowShareDropdown(!showShareDropdown)} 
                      title="Share this map"
                    >
                      <svg className="share-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                      </svg>
                    </button>
                    <ThemeToggle />
                  </div>
                </div>
                
                {/* Desktop theme toggle */}
                <ThemeToggle />
              </header>

              {/* Share Dropdown - Positioned outside header for proper centering */}
              {showShareDropdown && (
                <>
                  <div className="share-backdrop"></div>
                  <div 
                    ref={shareDropdownRef}
                    className="share-dropdown" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="share-dropdown-header">
                      <h3 className="share-dropdown-title">Share</h3>
                      <button 
                        className="share-dropdown-close" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowShareDropdown(false);
                        }}
                        title="Close"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="share-dropdown-content">
                      <button 
                        className="share-option" 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Copy button clicked!');
                          handleCopyLink();
                        }}
                      >
                        <svg className="share-option-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                        </svg>
                        Copy Link
                      </button>
                      <button 
                        className="share-option" 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Twitter button clicked!');
                          handleTwitterShare();
                        }}
                      >
                        <svg className="share-option-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        Share on Twitter
                      </button>
                      <button 
                        className="share-option" 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('LinkedIn button clicked!');
                          handleLinkedInShare();
                        }}
                      >
                        <svg className="share-option-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Share on LinkedIn
                      </button>
                    </div>
                  </div>
                  </>
                )}

              {/* Share Toast */}
              {showShareToast && (
                <div className="share-toast">
                  <div className="share-toast-content">
                    <svg className="share-toast-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>Link copied!</span>
                  </div>
                </div>
              )}

              <main>
                {/* Welcome Message */}
                <section id="welcome" className="welcome-section">
                  <div className="container">
                    <div className="welcome-content">
                      <p>
                        Hi, I'm Ben — a neuropharmacologist and computational biologist working at the intersection of science, strategy, and systems to accelerate biotech innovation. I built this interactive network to help shine a light on Atlanta's fast-growing but often under-recognized biotech ecosystem.
                      </p>
                      <div className="welcome-cta">
                        <p>
                          Explore the map below to discover key organizations, partnerships, and investment relationships driving the region's life sciences momentum — and uncover opportunities to collaborate, invest, or get involved.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Network Visualization - Front and Center */}
                <section id="network" className="network-section">
                  <div className="container">
                    <NetworkVisualization />
                  </div>
                </section>



                {/* About Section */}
                <section id="about" className="about-section">
                  <div className="container">
                    <div className="about-content">
                      <div className="about-main-content">
                        <h2 id="about">About Me</h2>
                        <div className="about-text">
                          <div className="about-image-container">
                            <img 
                              src="/BS_headshot.jpeg" 
                              alt="Benjamin Siciliano" 
                              className="about-headshot"
                            />
                          </div>
                          <p>
                            I'm a PhD-trained neuropharmacologist specializing in bioinformatics, computational biology, and systems pharmacology to advance therapeutics for neuropsychiatric and neurodegenerative diseases. With experience managing drug development programs and applying computational tools to drive strategic decision-making, I bring a strong background in technology transfer and early-stage development to help de-risk and accelerate research-to-commercialization efforts. I focus on bridging cutting-edge science and business strategy to drive the next wave of impactful therapeutics. I'm eager to lead and collaborate on projects that push biotech forward and connect with investors and entrepreneurs leveraging technology and data to scale the next generation of solutions.
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
                <section id="why-built" className="motivation-section">
                  <div className="container">
                    <div className="motivation-content">
                      <h3 id="why-built">Why I Built This Network</h3>
                      <p>
                        Atlanta's biotech ecosystem is growing fast — but often flies under the radar. I created this interactive network to visualize the key players, partnerships, and innovation hubs fueling Georgia's life sciences revolution. By mapping these relationships, we can identify collaboration, investment, and commercialization opportunities that drive next-gen therapeutic development and translational success.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="contact-section">
                  <div className="container">
                    <div className="contact-content">
                      <h2 id="contact">Get in Touch</h2>
                      <p className="contact-intro">
                        Have suggestions, corrections, or want your organization added to the network? 
                        I'm always looking to improve this visualization and expand the ecosystem mapping.
                      </p>
                      <div className="contact-form-container">
                        <form 
                          className="contact-form" 
                          onSubmit={handleSubmit}
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
                              <svg className="submit-success-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                              <span>Message sent! I'll get back to you soon.</span>
                            </div>
                          )}
                          {submitStatus === 'error' && (
                            <div className="submit-error">
                              <svg className="submit-error-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                              </svg>
                              <span>
                                There was an error sending your message. 
                                <a href="mailto:ben.siciliano@gmail.com?subject=Message from benjaminsiciliano.com" className="error-email-link">
                                  Click here to email me directly
                                </a>
                              </span>
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
                          <a href="https://www.linkedin.com/in/benjamin-siciliano/" target="_blank" rel="noopener noreferrer" className="contact-link-icon">
                            <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                          
                          <a href="https://github.com/benj-sic" target="_blank" rel="noopener noreferrer" className="contact-link-icon">
                            <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                          
                          <a href="https://x.com/benjsiciliano" target="_blank" rel="noopener noreferrer" className="contact-link-icon">
                            <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          } />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App; 