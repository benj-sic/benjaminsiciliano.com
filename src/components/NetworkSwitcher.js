/*
 * Copyright (c) 2025 Benjamin Siciliano
 * All rights reserved.
 * 
 * This file is part of the benjaminsiciliano.com project.
 * Unauthorized copying, modification, distribution, or use is strictly prohibited.
 * For licensing inquiries, contact: ben.siciliano@gmail.com
 */

/*
 * ============================================================================
 * NETWORK SWITCHER COMPONENT
 * ============================================================================
 * 
 * A clean toggle switch component for switching between biotech and tech networks
 * on the main page. Features a slider with science and software icons.
 * 
 * COMPONENT RESPONSIBILITIES:
 * - Toggle between biotech and tech network data
 * - Visual feedback with smooth animations
 * - Accessible keyboard navigation
 * - Theme-aware styling
 * 
 * ============================================================================
 */

import React from 'react';
import { FlaskConical, Code } from 'lucide-react';

function NetworkSwitcher({ currentNetwork, onNetworkChange }) {
  const isBiotech = currentNetwork === 'biotech';

  const handleToggle = () => {
    const newNetwork = isBiotech ? 'tech' : 'biotech';
    onNetworkChange(newNetwork);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="network-switcher">
      <div 
        className={`network-switcher-toggle ${isBiotech ? 'biotech' : 'tech'}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="switch"
        aria-checked={!isBiotech}
        aria-label={`Switch to ${isBiotech ? 'tech' : 'biotech'} network`}
      >
        <div className="network-switcher-track">
          <div className="network-switcher-thumb">
            {isBiotech ? (
              <FlaskConical className="network-switcher-icon" size={16} />
            ) : (
              <Code className="network-switcher-icon" size={16} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetworkSwitcher;
