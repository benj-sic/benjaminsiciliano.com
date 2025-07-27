import React, { useState } from 'react';
import './SubmissionForm.css';

const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: 'company',
    description: '',
    website: '',
    contactEmail: '',
    keyPeople: '',
    fundingStage: 'seed',
    sector: 'therapeutics',
    location: 'atlanta',
    size: '10',
    recentNews: '',
    funding: '',
    nodeId: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      organizationName: '',
      organizationType: 'company',
      description: '',
      website: '',
      contactEmail: '',
      keyPeople: '',
      fundingStage: 'seed',
      sector: 'therapeutics',
      location: 'atlanta',
      size: '10',
      recentNews: '',
      funding: '',
      nodeId: ''
    });
    
    // Reset submission status after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="submission-form-container">
      <div className="card">
        <h3>Request to Join the Network</h3>
        <p className="form-description">
          Is your organization part of Atlanta's TechBio ecosystem? 
          Submit your details to be added to the network visualization.
        </p>
        
        {isSubmitted ? (
          <div className="success-message">
            <h4>Thank you for your submission!</h4>
            <p>We'll review your organization and add it to the network if it meets our criteria.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="submission-form">
            <div className="form-group">
              <label htmlFor="organizationName">Organization Name *</label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                required
                placeholder="e.g., BioTech Innovations Inc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="organizationType">Organization Type *</label>
              <select
                id="organizationType"
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                required
              >
                <option value="company">Company</option>
                <option value="university">University/Research Institution</option>
                <option value="incubator">Incubator/Accelerator</option>
                <option value="vc">Venture Capital</option>
                <option value="serviceProvider">Service Provider</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Brief description of your organization and its focus areas..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email *</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                placeholder="contact@organization.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="keyPeople">Key People</label>
              <input
                type="text"
                id="keyPeople"
                name="keyPeople"
                value={formData.keyPeople}
                onChange={handleChange}
                placeholder="e.g., CEO: John Doe, CTO: Jane Smith"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fundingStage">Funding Stage</label>
                <select
                  id="fundingStage"
                  name="fundingStage"
                  value={formData.fundingStage}
                  onChange={handleChange}
                >
                  <option value="seed">Seed</option>
                  <option value="seriesA">Series A</option>
                  <option value="seriesB">Series B</option>
                  <option value="seriesC">Series C+</option>
                  <option value="public">Public</option>
                  <option value="nonprofit">Non-profit</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="sector">Primary Sector</label>
                <select
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                >
                  <option value="therapeutics">Therapeutics</option>
                  <option value="diagnostics">Diagnostics</option>
                  <option value="devices">Medical Devices</option>
                  <option value="ai">AI/ML</option>
                  <option value="synthetic">Synthetic Biology</option>
                  <option value="quantum">Quantum Biology</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="atlanta">Atlanta Metro</option>
                <option value="georgia">Georgia</option>
                <option value="southeast">Southeast US</option>
                <option value="national">National</option>
                <option value="international">International</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="nodeId">Node ID (for network data)</label>
              <input
                type="text"
                id="nodeId"
                name="nodeId"
                value={formData.nodeId}
                onChange={handleChange}
                placeholder="e.g., company_name_lowercase"
              />
            </div>

            <div className="form-group">
              <label htmlFor="size">Node Size (10-25)</label>
              <input
                type="number"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                min="10"
                max="25"
              />
            </div>

            <div className="form-group">
              <label htmlFor="funding">Funding Information</label>
              <input
                type="text"
                id="funding"
                name="funding"
                value={formData.funding}
                onChange={handleChange}
                placeholder="e.g., Series A ($10M), Public (NASDAQ: SYMBOL), etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="recentNews">Recent News/Developments</label>
              <textarea
                id="recentNews"
                name="recentNews"
                value={formData.recentNews}
                onChange={handleChange}
                placeholder="Brief description of recent developments, partnerships, or milestones..."
                rows="3"
              />
            </div>

            <button type="submit" className="btn submit-btn">
              Submit for Review
            </button>
          </form>
        )}
      </div>


    </div>
  );
};

export default SubmissionForm; 