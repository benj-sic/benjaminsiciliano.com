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
 * NETWORKONLY COMPONENT - ISOLATED PAGE COMPONENT
 * ============================================================================
 * 
 * 🚨 CRITICAL: This component is ONLY for the NetworkOnly page (/network)
 * 
 * IMPORTANT RULES:
 * 1. This component should NOT import or use main page styles
 * 2. All styling should be handled by NetworkOnly.css
 * 3. This component is completely isolated from the main page
 * 
 * COMPONENT RESPONSIBILITIES:
 * - NetworkOnly page layout and functionality
 * - NetworkOnly page share popup (simple version)
 * - NetworkOnly page controls, legend, filters
 * - NetworkOnly page responsive behavior
 * 
 * WHAT NOT TO CHANGE HERE:
 * - Main page functionality (use App.js instead)
 * - Global theme system (use ThemeContext instead)
 * - Network visualization (use NetworkVisualization component)
 * 
 * MODIFICATION GUIDE:
 * - To change NetworkOnly page: Edit this file and NetworkOnly.css
 * - To change main page: Edit App.js and App.css
 * - To change both pages: Edit NetworkVisualization component
 * 
 * See STYLING_ARCHITECTURE.md for complete documentation
 * ============================================================================
 */

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
// CRITICAL FIX: Import NetworkVisualization without its CSS to prevent style conflicts
// We'll handle all styling in NetworkOnly.css to prevent horizontal expansion issues
import NetworkVisualization from './NetworkVisualization';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';
import cacheManager from '../utils/cache.js';
import performanceMonitor from '../utils/performance.js';
// Import will be dynamic based on dataType
// CRITICAL: Import CSS after NetworkVisualization.js to ensure it takes precedence
// Note: This import order ensures our styles override NetworkVisualization.css
import './NetworkOnly.css';

function NetworkOnly({ dataType = 'biotech', exploreMode = false }) {
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedNodeDetails, setSelectedNodeDetails] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filters, setFilters] = useState({
    companies: true,
    startups: true,
    universities: true,
    incubators: true,
    vcs: true,
    serviceProviders: true,
    healthSystems: true,
    government: true,
    trade: true,
    development: true,
    facilities: true,
    communityBuilders: true
  });
  const [networkData, setNetworkData] = useState({ nodes: [], links: [] });
  const [lastCommitDate, setLastCommitDate] = useState('July 2025');
  const [nodeTypeMap, setNodeTypeMap] = useState({});
  const [nodeColors, setNodeColors] = useState({});

  // Explore mode state
  const [exploreState, setExploreState] = useState({
    selectedNodes: new Set(),
    visibleNodes: new Set(),
    startingNode: null,
    isInitialized: false
  });

  // Node popup state for first-degree connections
  const [nodePopup, setNodePopup] = useState({
    isVisible: false,
    node: null,
    position: { x: 0, y: 0 }
  });
  const [startingNodeSearchQuery, setStartingNodeSearchQuery] = useState('');
  const [startingNodeSearchResults, setStartingNodeSearchResults] = useState([]);
  const [searchResultsKey, setSearchResultsKey] = useState(0); // Force re-render

  const networkRef = useRef(null);
  const selectedNodeRef = useRef(null); // Track selected node for deselection detection
  const exploreStateRef = useRef(exploreState); // Track current explore state for closures
  // Track selected edge ID for deselection detection (same as main page network)
  // We'll get this from NetworkVisualization via a getter method



  // Map filter keys to proper display labels (matching main page network)
  const getFilterLabel = (key) => {
    const labelMap = {
      companies: 'Companies',
      startups: 'Startups',
      universities: 'Universities',
      incubators: 'Incubators',
      vcs: 'Venture Capital',
      serviceProviders: 'Service Providers',
      healthSystems: 'Health Systems',
      government: 'Government',
      trade: 'Trade Organizations',
      development: 'Development',
      facilities: 'Facilities',
      communityBuilders: 'Community Builders'
    };
    return labelMap[key] || key;
  };

  // Format organization types using the proper mapping from the data
  const formatOrganizationType = (type) => {
    return nodeTypeMap[type] || type;
  };

  // Get the color for a given organization type
  const getOrganizationTypeColor = (type) => {
    const formattedType = formatOrganizationType(type);
    return nodeColors[formattedType] || '#666666'; // Default gray if no color found
  };

  // Get the display name for an organization (full name instead of abbreviation)
  const getOrganizationDisplayName = (node) => {
    const nameMapping = {
      'CHOA': 'Children\'s Healthcare of Atlanta',
      'GSU': 'Georgia State University',
      'GT': 'Georgia Institute of Technology',
      'UGA': 'University of Georgia',
      'MSM': 'Morehouse School of Medicine'
    };
    
    return nameMapping[node.name] || node.name;
  };

  // Get the appropriate search dropdown title based on current state
  const getSearchDropdownTitle = () => {
    if (selectedConnection) {
      return 'Details';
    } else if (selectedNodeDetails) {
      return 'Details';
    } else if (searchResults.length > 0) {
      return 'Results';
    } else {
      return 'Search';
    }
  };

  // Preset dropdown sizing system for different screen sizes
  const getDropdownDimensions = useMemo(() => {
    // Define screen size breakpoints and corresponding dropdown dimensions
    // More granular breakpoints for better responsive design
    const getScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 360) return 'xs';      // Very small mobile
      if (width <= 480) return 'sm';      // Small mobile
      if (width <= 600) return 'md';      // Large mobile
      if (width <= 768) return 'lg';      // Tablet
      if (width <= 1024) return 'xl';     // Small desktop
      if (width <= 1366) return 'xxl';    // Medium desktop
      if (width <= 1600) return 'xxxl';   // Large desktop
      return 'xxxxl';                     // Extra large desktop
    };

    // Preset dimensions for each dropdown type and screen size
    // Based on actual button positions and collision analysis
    const dropdownPresets = {
      filters: {
        // Filters button is at top-left, expands right and down
        // Has plenty of space to the right, limited by screen height
        xs: { width: 200, height: 250 },  // Very small mobile - conservative
        sm: { width: 250, height: 300 },  // Small mobile
        md: { width: 280, height: 350 },  // Large mobile
        lg: { width: 300, height: 400 },  // Tablet
        xl: { width: 320, height: 450 },  // Small desktop
        xxl: { width: 350, height: 500 }, // Medium desktop
        xxxl: { width: 380, height: 550 }, // Large desktop
        xxxxl: { width: 400, height: 600 } // Extra large desktop
      },
      search: {
        // Search button is below filters, expands right and down
        // CRITICAL: Must not collide with legend button at bottom-left
        // Legend is at (20px, bottom-20px), search is at (20px, ~66px)
        // Available height = viewport height - 66px (search top) - 20px (legend bottom) - 20px (margin)
        // Desktop screens often have shorter heights (768px), so be more conservative
        xs: { width: 200, height: 200 },  // Very small mobile - limited height
        sm: { width: 240, height: 250 },  // Small mobile
        md: { width: 280, height: 300 },  // Large mobile
        lg: { width: 300, height: 350 },  // Tablet
        xl: { width: 320, height: 300 },  // Small desktop - very conservative height
        xxl: { width: 350, height: 320 }, // Medium desktop - very conservative height
        xxxl: { width: 380, height: 340 }, // Large desktop - very conservative height
        xxxxl: { width: 400, height: 360 } // Extra large desktop - very conservative height
      },
      legend: {
        // Legend button is at bottom-left, expands right and up
        // Limited by screen width and height
        // Desktop screens often have shorter heights (768px), so be more conservative
        xs: { width: 160, height: 200 },  // Very small mobile
        sm: { width: 200, height: 250 },  // Small mobile
        md: { width: 240, height: 300 },  // Large mobile
        lg: { width: 280, height: 350 },  // Tablet
        xl: { width: 300, height: 300 },  // Small desktop - reduced height
        xxl: { width: 320, height: 320 }, // Medium desktop - reduced height
        xxxl: { width: 350, height: 340 }, // Large desktop - reduced height
        xxxxl: { width: 380, height: 360 } // Extra large desktop - reduced height
      },
      share: {
        // Share button is at top-right, expands left and down
        // Limited by screen width and height
        xs: { width: 140, height: 180 },  // Very small mobile
        sm: { width: 160, height: 200 },  // Small mobile
        md: { width: 180, height: 220 },  // Large mobile
        lg: { width: 200, height: 240 },  // Tablet
        xl: { width: 220, height: 260 },  // Small desktop
        xxl: { width: 240, height: 280 }, // Medium desktop
        xxxl: { width: 260, height: 300 }, // Large desktop
        xxxxl: { width: 280, height: 320 } // Extra large desktop
      },
      explore: {
        // Explore mode UI - centered on screen, positioned to avoid control panels
        // Width and height based on screen size, positioned to avoid control panels
        xs: { width: 280, height: 300, top: 160, left: 50 },  // Very small mobile - more centered
        sm: { width: 320, height: 350, top: 180, left: 50 },  // Small mobile - more centered
        md: { width: 360, height: 400, top: 200, left: 50 },  // Large mobile - more centered
        lg: { width: 400, height: 450, top: 150, left: 50 },  // Tablet - more centered
        xl: { width: 450, height: 500, top: 120, left: 50 },  // Small desktop - more centered
        xxl: { width: 500, height: 550, top: 100, left: 50 }, // Medium desktop - more centered
        xxxl: { width: 550, height: 600, top: 80, left: 50 }, // Large desktop - more centered
        xxxxl: { width: 600, height: 650, top: 60, left: 50 } // Extra large desktop - more centered
      }
    };

    // Get dimensions for a specific dropdown type
    const getDimensions = (dropdownType) => {
      const screenSize = getScreenSize();
      const preset = dropdownPresets[dropdownType];
      
      if (!preset) {
        console.warn(`No preset dimensions found for dropdown type: ${dropdownType}`);
        return { width: 300, height: 400 }; // Fallback dimensions
      }
      
      const dimensions = preset[screenSize];
      console.log(`📐 ${dropdownType} dropdown preset (${screenSize}):`, dimensions);
      
      return dimensions;
    };

    return { getDimensions };
  }, []);

  // Explore mode functions
  const saveExploreState = useCallback((newState) => {
    const stateToSave = {
      selectedNodes: Array.from(newState.selectedNodes),
      visibleNodes: Array.from(newState.visibleNodes),
      startingNode: newState.startingNode
    };
    localStorage.setItem(`explore-state-${dataType}`, JSON.stringify(stateToSave));
  }, [dataType]);

  const getNodeConnections = useCallback((nodeId) => {
    return networkData.links
      .filter(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        return sourceId === nodeId || targetId === nodeId;
      })
      .map(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        return sourceId === nodeId ? targetId : sourceId;
      });
  }, [networkData.links]);

  const addNodeToExploration = useCallback((nodeId) => {
    setExploreState(prev => {
      const newSelectedNodes = new Set(prev.selectedNodes);
      newSelectedNodes.add(nodeId);
      
      // Get all first-degree connections of ALL selected nodes
      const newVisibleNodes = new Set();
      newSelectedNodes.forEach(selectedId => {
        const connections = getNodeConnections(selectedId);
        connections.forEach(connId => {
          // Only add if not already selected
          if (!newSelectedNodes.has(connId)) {
            newVisibleNodes.add(connId);
          }
        });
      });
      
      const newState = {
        ...prev,
        selectedNodes: newSelectedNodes,
        visibleNodes: newVisibleNodes
      };
      
      saveExploreState(newState);
      return newState;
    });
  }, [getNodeConnections, saveExploreState]);



  // Constrain popup position to stay within screen bounds
  const constrainPopupPosition = useCallback((position, popupWidth = 300, popupHeight = 200) => {
    const margin = 20; // Minimum distance from screen edge
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    let { x, y } = position;
    
    // Constrain horizontal position (popup is centered with translateX(-50%))
    if (x - popupWidth / 2 < margin) {
      x = margin + popupWidth / 2;
    } else if (x + popupWidth / 2 > screenWidth - margin) {
      x = screenWidth - margin - popupWidth / 2;
    }
    
    // Constrain vertical position
    // Try to position above the node first
    let popupY = y - popupHeight - 20; // Position above with spacing
    
    // Check if popup fits above the node
    if (popupY < margin) {
      // If not enough space above, try below the node
      popupY = y + 20; // Position below with spacing
      
      // If it doesn't fit below either, position it in the center of the screen
      if (popupY + popupHeight > screenHeight - margin) {
        popupY = (screenHeight - popupHeight) / 2;
      }
    }
    
    // Final safety check to ensure popup doesn't go off-screen
    if (popupY < margin) {
      popupY = margin;
    } else if (popupY + popupHeight > screenHeight - margin) {
      popupY = screenHeight - margin - popupHeight;
    }
    
    return { x, y: popupY };
  }, []);

  // Handle node popup actions
  const handleNodePopupAction = useCallback((action) => {
    if (!nodePopup.node) return;

    const nodeId = nodePopup.node.id;
    const currentState = exploreStateRef.current;
    console.log('🎯 Node popup action triggered:', { action, nodeId, isCurrentlySelected: currentState.selectedNodes.has(nodeId) });

    switch (action) {
      case 'save':
        // Add as selected node (full color) - keep in visibleNodes so it can show popup
        console.log('💾 Saving node as selected:', nodeId);
        setExploreState(prev => {
          const newSelectedNodes = new Set(prev.selectedNodes);
          const newVisibleNodes = new Set(prev.visibleNodes);
          
          // Add to selected nodes
          newSelectedNodes.add(nodeId);
          // Keep in visible nodes so it can show popup when clicked
          newVisibleNodes.add(nodeId);
          
          // Add first-degree connections to visible nodes if they aren't already displayed
          const connections = getNodeConnections(nodeId);
          console.log('🔗 Adding first-degree connections for saved node:', connections);
          connections.forEach(connId => {
            // Only add if not already selected and not already visible
            if (!newSelectedNodes.has(connId) && !newVisibleNodes.has(connId)) {
              newVisibleNodes.add(connId);
              console.log('➕ Added connection to visible nodes:', connId);
            }
          });
          
          const newState = { ...prev, selectedNodes: newSelectedNodes, visibleNodes: newVisibleNodes };
          saveExploreState(newState);
          return newState;
        });
        break;
      case 'keep':
        // Keep as visible node (greyed out) - remove from selectedNodes if it was there
        console.log('👁️ Keeping node as visible:', nodeId);
        setExploreState(prev => {
          const newSelectedNodes = new Set(prev.selectedNodes);
          const newVisibleNodes = new Set(prev.visibleNodes);
          
          // Remove from selected nodes (since it's now greyed)
          newSelectedNodes.delete(nodeId);
          // Add to visible nodes
          newVisibleNodes.add(nodeId);
          
          const newState = { ...prev, selectedNodes: newSelectedNodes, visibleNodes: newVisibleNodes };
          saveExploreState(newState);
          return newState;
        });
        break;
      case 'hide':
        // Remove from both selected and visible nodes to hide it completely
        console.log('🙈 Hiding node:', nodeId);
        setExploreState(prev => {
          const newSelectedNodes = new Set(prev.selectedNodes);
          const newVisibleNodes = new Set(prev.visibleNodes);
          
          // Remove from both sets
          newSelectedNodes.delete(nodeId);
          newVisibleNodes.delete(nodeId);
          
          const newState = { ...prev, selectedNodes: newSelectedNodes, visibleNodes: newVisibleNodes };
          saveExploreState(newState);
          return newState;
        });
        break;
      default:
        console.log('Unknown action:', action);
        break;
    }

    // Close popup
    console.log('❌ Closing popup');
    setNodePopup({ isVisible: false, node: null, position: { x: 0, y: 0 } });
  }, [nodePopup.node, saveExploreState, getNodeConnections]);

  const setStartingNode = useCallback((nodeId) => {
    console.log('🚀 Setting starting node:', nodeId);
    const connections = getNodeConnections(nodeId);
    console.log('🔗 Starting node connections:', connections);
    
    setExploreState(prev => {
      const selectedNodes = new Set([nodeId]);
      const visibleNodes = new Set(connections);
      
      const newState = {
        ...prev,
        startingNode: nodeId,
        selectedNodes: selectedNodes,
        visibleNodes: visibleNodes
      };
      
      console.log('📊 New explore state:', {
        selectedNodes: Array.from(newState.selectedNodes),
        visibleNodes: Array.from(newState.visibleNodes),
        startingNode: newState.startingNode
      });
      
      saveExploreState(newState);
      return newState;
    });
  }, [getNodeConnections, saveExploreState]);

  const resetExploration = useCallback(() => {
    setExploreState({
      selectedNodes: new Set(),
      visibleNodes: new Set(),
      startingNode: null,
      isInitialized: true
    });
    // Clear starting node search query and results
    setStartingNodeSearchQuery('');
    setStartingNodeSearchResults([]);
    localStorage.removeItem(`explore-state-${dataType}`);
  }, [dataType]);

  // Apply preset sizing for explore mode UI
  const applyExploreModeSizing = useCallback(() => {
    const exploreUI = document.querySelector('.explore-mode-ui');
    if (!exploreUI) return;
    
    // Get preset dimensions for the current screen size
    const dimensions = getDropdownDimensions.getDimensions('explore');
    
    // Apply preset dimensions
    exploreUI.style.width = `${dimensions.width}px`;
    exploreUI.style.height = `${dimensions.height}px`;
    exploreUI.style.maxWidth = `${dimensions.width}px`;
    exploreUI.style.maxHeight = `${dimensions.height}px`;
    
    // Apply positioning if specified in preset
    if (dimensions.top !== undefined) {
      exploreUI.style.top = `${dimensions.top}px`;
    }
    if (dimensions.left !== undefined) {
      exploreUI.style.left = `${dimensions.left}%`;
    }
    
    console.log(`📐 Applied explore mode preset sizing:`, dimensions);
  }, [getDropdownDimensions]);

  // Dynamic sizing for explore mode dropdown
  const adjustExploreDropdownSize = useCallback(() => {
    const resultsElement = document.querySelector('.starting-node-results');
    if (!resultsElement) return;
    
    // Get the explore mode UI container
    const exploreUI = document.querySelector('.explore-mode-ui');
    if (!exploreUI) return;
    
    // Get the search input element to calculate position within the container
    const searchInput = document.querySelector('.starting-node-search-input');
    if (!searchInput) return;
    
    // Calculate available space within the explore mode UI container
    const containerRect = exploreUI.getBoundingClientRect();
    const inputRect = searchInput.getBoundingClientRect();
    
    // Calculate space available below the input within the container
    const containerBottom = containerRect.bottom;
    const inputBottom = inputRect.bottom;
    const availableHeight = containerBottom - inputBottom - 24; // 24px for container padding
    
    // Calculate optimal height based on content
    const options = resultsElement.querySelectorAll('.starting-node-option');
    const optionCount = options.length;
    const estimatedHeight = optionCount * 60; // Reduced from 80px per option for smaller font sizes
    
    // Set max height to available space within container, with a minimum height
    const maxHeight = Math.max(150, Math.min(availableHeight, estimatedHeight));
    const minHeight = Math.min(150, maxHeight * 0.6);
    
    // Apply sizing constraints
    resultsElement.style.maxHeight = `${maxHeight}px`;
    resultsElement.style.minHeight = `${minHeight}px`;
    resultsElement.style.maxWidth = '100%'; // Stay within container width
    
    // Ensure scrolling is enabled when content exceeds available space
    if (estimatedHeight > availableHeight) {
      resultsElement.style.overflowY = 'auto';
    } else {
      resultsElement.style.overflowY = 'hidden';
    }
    
    console.log(`📐 Adjusted explore dropdown size (within container):`, {
      containerHeight: containerRect.height,
      availableHeight,
      options: optionCount,
      estimated: estimatedHeight,
      applied: {
        maxHeight: resultsElement.style.maxHeight,
        minHeight: resultsElement.style.minHeight,
        maxWidth: resultsElement.style.maxWidth,
        overflowY: resultsElement.style.overflowY
      }
    });
  }, []);


  // Starting node search functionality
  const handleStartingNodeSearch = useCallback((query) => {
    setStartingNodeSearchQuery(query);
    if (query.trim() === '') {
      setStartingNodeSearchResults([]);
      return;
    }
    
    const filtered = networkData.nodes.filter(node => 
      node.name.toLowerCase().includes(query.toLowerCase()) ||
      node.fullName?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10); // Limit to 10 results
    
    setStartingNodeSearchResults(filtered);
    setSearchResultsKey(prev => prev + 1); // Force re-render
    
    // Adjust dropdown size after results are set
    setTimeout(() => {
      adjustExploreDropdownSize();
    }, 100);
  }, [networkData.nodes, adjustExploreDropdownSize]);

  // Debug function to log all UI element positions
  const logAllElementPositions = useCallback(() => {
    const elements = {
      'top-right-controls': document.querySelector('.top-right-controls'),
      'main-controls-panel': document.querySelector('.main-controls-panel'),
      'network-stats-bottom-right': document.querySelector('.network-stats-bottom-right'),
      'fixed-legend': document.querySelector('.fixed-legend'),
      'theme-toggle': document.querySelector('.theme-toggle'),
      'filter-button': document.querySelector('.main-controls-panel .control-dropdown:first-child .control-dropdown-button'),
      'search-button': document.querySelector('.main-controls-panel .control-dropdown:last-child .control-dropdown-button'),
      'legend-button': document.querySelector('.fixed-legend .legend-toggle-button'),
      'share-button': document.querySelector('.top-right-controls .network-share-button')
    };
    
    console.log('🗺️ All UI Element Positions:', {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      elements: Object.entries(elements).reduce((acc, [key, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          acc[key] = {
            left: Math.round(rect.left),
            top: Math.round(rect.top),
            right: Math.round(rect.right),
            bottom: Math.round(rect.bottom),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            isExpanded: element.classList.contains('expanded')
          };
        } else {
          acc[key] = null;
        }
        return acc;
      }, {})
    });
  }, []);

  // Apply preset dropdown sizing
  const applyDropdownSizing = useCallback((dropdownType) => {
    // Prevent excessive sizing calls
    const timeoutKey = `sizing_${dropdownType}`;
    if (window[timeoutKey]) {
      clearTimeout(window[timeoutKey]);
    }
    
    // Use requestAnimationFrame for better timing
    window[timeoutKey] = requestAnimationFrame(() => {
      // Get preset dimensions for the current screen size
      const dimensions = getDropdownDimensions.getDimensions(dropdownType);
      
      // Find the dropdown button element
      const buttonSelectors = {
        filters: '.control-dropdown-button.expanded',
        search: '.control-dropdown-button.expanded',
        legend: '.legend-toggle-button.expanded',
        share: '.network-share-button.expanded'
      };
      
      const buttonElement = document.querySelector(buttonSelectors[dropdownType]);
      if (!buttonElement) {
        console.warn(`Dropdown button not found for ${dropdownType}`);
          return;
        }
      
      // Apply the preset dimensions with !important to override CSS
      buttonElement.style.setProperty('max-width', `${dimensions.width}px`, 'important');
      buttonElement.style.setProperty('max-height', `${dimensions.height}px`, 'important');
      
      // Apply content constraints
      const contentElement = buttonElement.querySelector('[class*="content-inline"]');
      if (contentElement) {
        contentElement.style.maxHeight = `${dimensions.height - 40}px`;
        contentElement.style.overflowY = 'auto';
      }
      
      console.log(`✅ ${dropdownType} dropdown: Applied preset dimensions ${dimensions.width}x${dimensions.height}px`);
    });
  }, [getDropdownDimensions]);

  // Helper functions to manage dropdown states - only one can be open at a time
  const closeAllDropdowns = useCallback(() => {
    setShowShareDropdown(false);
    setShowFilters(false);
    setShowSearch(false);
    setShowLegend(false);
  }, []);

  // Close all dropdowns and node popups
  const closeAllDropdownsAndPopups = useCallback(() => {
    closeAllDropdowns();
    // Close node popup and default to "keep" behavior
    if (nodePopup.isVisible && nodePopup.node) {
      const nodeId = nodePopup.node.id;
      console.log('🔄 Closing popup due to dropdown interaction, defaulting to keep:', nodeId);
      
      // Default to "keep" behavior (add to visible nodes, remove from selected)
      setExploreState(prev => {
        const newSelectedNodes = new Set(prev.selectedNodes);
        const newVisibleNodes = new Set(prev.visibleNodes);
        
        // Remove from selected nodes (since it's now greyed)
        newSelectedNodes.delete(nodeId);
        // Add to visible nodes
        newVisibleNodes.add(nodeId);
        
        const newState = { ...prev, selectedNodes: newSelectedNodes, visibleNodes: newVisibleNodes };
        saveExploreState(newState);
        return newState;
      });
    }
    setNodePopup({ isVisible: false, node: null, position: { x: 0, y: 0 } });
  }, [closeAllDropdowns, nodePopup.isVisible, nodePopup.node, setExploreState, saveExploreState]);

  // Handle window resize to reposition popup if needed
  useEffect(() => {
    const handleResize = () => {
      if (nodePopup.isVisible && nodePopup.position) {
        // Recalculate popup position to ensure it stays on screen
        const newPosition = constrainPopupPosition(nodePopup.position, 300, 250);
        if (newPosition.x !== nodePopup.position.x || newPosition.y !== nodePopup.position.y) {
          setNodePopup(prev => ({ ...prev, position: newPosition }));
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [nodePopup.isVisible, nodePopup.position, constrainPopupPosition]);

  // Check if controls should be disabled (in explore mode without starting node)
  const areControlsDisabled = exploreMode && !exploreState.startingNode;

  // Update ref whenever explore state changes
  useEffect(() => {
    exploreStateRef.current = exploreState;
  }, [exploreState]);

  const handleDropdownContentClick = (event) => {
    // Prevent the click from bubbling up and triggering the click outside handler
    event.stopPropagation();
  };

  const handleLegendToggle = () => {
    // Don't allow legend toggle if controls are disabled
    if (areControlsDisabled) return;
    
    if (showLegend) {
      // If legend is already open, clicking it should close it
      setShowLegend(false);
    } else {
      // If legend is closed, open it and close other dropdowns
      closeAllDropdowns();
      setShowLegend(true);
      // Apply preset sizing after state update
      setTimeout(() => applyDropdownSizing('legend'), 0);
    }
  };

  const toggleDropdown = (dropdownType) => {
    // Don't allow dropdown toggles if controls are disabled
    if (areControlsDisabled) return;
    
    switch (dropdownType) {
      case 'share':
        if (showShareDropdown) {
          // Close if already open
          setShowShareDropdown(false);
        } else {
          // Open and close others
          closeAllDropdownsAndPopups();
          setShowShareDropdown(true);
          // Apply preset sizing after state update
          setTimeout(() => applyDropdownSizing('share'), 0);
        }
        break;
      case 'filters':
        if (showFilters) {
          // Close if already open
          setShowFilters(false);
        } else {
          // Open and close others
          closeAllDropdownsAndPopups();
          setShowFilters(true);
          // Apply preset sizing after state update
          setTimeout(() => applyDropdownSizing('filters'), 0);
        }
        break;
      case 'search':
        if (showSearch) {
          // Close if already open
          setShowSearch(false);
        } else {
          // Open and close others
          closeAllDropdownsAndPopups();
          setShowSearch(true);
          
          // Apply preset sizing after state update
          setTimeout(() => {
            applyDropdownSizing('search');
          }, 0);
        }
        break;
      default:
        break;
    }
  };

  const handleSocialShare = (platform) => {
    console.log('Social share clicked for platform:', platform);
    
    // Use clean base URL for sharing (without filter parameters)
    const baseUrl = window.location.origin + window.location.pathname;
    const cleanShareUrl = baseUrl;
    
    // For LinkedIn, use a public URL if we're on localhost
    const linkedInUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? `https://benjaminsiciliano.com/${dataType}` 
      : cleanShareUrl;
    
    const twitterShareText = dataType === 'tech' 
      ? "Explore this interactive map of Atlanta's tech ecosystem — built by @benjsiciliano — featuring Mosley Ventures portfolio companies, startups, VCs, and innovation hubs driving technology in Georgia."
      : "Explore this interactive map of Atlanta's biotech ecosystem — built by @benjsiciliano — featuring startups, spinouts, VCs, and research hubs driving innovation in Georgia.";
    
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
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Final fallback - show URL in alert
      alert(`Share this link: ${cleanShareUrl}`);
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

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
    
    // Apply filters to the network visualization
    if (networkRef.current && networkRef.current.setFilters) {
      // Map NetworkOnly filter keys to NetworkVisualization filter keys
      // This mapping should match the one in NetworkVisualization.js
      const filterMapping = {
        companies: 'companies',
        startups: 'startups',
        universities: 'universities',
        incubators: 'incubators',
        vcs: 'vcs',
        serviceProviders: 'serviceProviders',
        healthSystems: 'healthSystems',
        government: 'government',
        trade: 'trade',
        development: 'development',
        facilities: 'facilities',
        communityBuilders: 'communityBuilders'
      };
      
      const mappedKey = filterMapping[filterKey];
      if (mappedKey) {
        networkRef.current.setFilters(prev => ({
          ...prev,
          [mappedKey]: value
        }));
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    // Clear results if query is empty
    if (!query.trim()) {
      setSearchResults([]);
      setSelectedNodeDetails(null);
      return;
    }
    
    // Get network data and perform search locally
    if (networkRef.current && networkRef.current.getNetworkData) {
      const { nodes, nodeTypeMap } = networkRef.current.getNetworkData();
      
      if (nodes && nodes.length > 0) {
        const queryLower = query.toLowerCase().trim();
        const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);
        
        const results = nodes.filter(node => {
          const nodeId = node.id.toLowerCase();
          const nodeName = node.name.toLowerCase();
          const nodeType = nodeTypeMap[node.type] ? nodeTypeMap[node.type].toLowerCase() : '';
          
          // For very short queries (1-2 chars), be very restrictive
          if (queryLower.length <= 2) {
            if (nodeId === queryLower || nodeName === queryLower) return true;
            if (nodeId.startsWith(queryLower) || nodeName.startsWith(queryLower)) return true;
            return false;
          }
          
          // For short queries (3 chars), be more restrictive
          if (queryLower.length === 3) {
            if (nodeId === queryLower || nodeName === queryLower) return true;
            if (nodeId.startsWith(queryLower) || nodeName.startsWith(queryLower)) return true;
            if (nodeId.includes(queryLower) || nodeName.includes(queryLower)) return true;
            if (nodeType.includes(queryLower)) return true;
            return false;
          }
          
          // For multi-word queries, check if all words match
          if (queryWords.length > 1) {
            const allWordsMatch = queryWords.every(word => {
              return nodeId.includes(word) || 
                     nodeName.includes(word) || 
                     nodeType.includes(word) ||
                     (node.website && node.website.toLowerCase().includes(word));
            });
            if (allWordsMatch) return true;
          }
          
          // Primary search fields (high relevance)
          if (nodeId === queryLower || nodeName === queryLower) return true;
          if (nodeId.startsWith(queryLower) || nodeName.startsWith(queryLower)) return true;
          if (nodeId.includes(queryLower) || nodeName.includes(queryLower)) return true;
          
          // Type search (medium relevance)
          if (nodeType.includes(queryLower)) return true;
          
          // Website search (medium relevance)
          if (node.website && node.website.toLowerCase().includes(queryLower)) {
            const websiteLower = node.website.toLowerCase();
            if (websiteLower.includes(queryLower) && 
                (websiteLower.includes(nodeId) || websiteLower.includes(nodeName.split(' ')[0]))) {
              return true;
            }
          }
          
          // Description search (low relevance) - only for longer queries
          if (queryLower.length >= 4 && node.description) {
            const descriptionLower = node.description.toLowerCase();
            const firstSentence = descriptionLower.split('.')[0];
            
            if (firstSentence.includes(queryLower) && 
                (firstSentence.includes(nodeId) || firstSentence.includes(nodeName.split(' ')[0]))) {
              return true;
            }
          }
          
          return false;
        });
        
        // Sort results by relevance
        const sortedResults = results.sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          
          // Exact matches first
          if (aName === queryLower) return -1;
          if (bName === queryLower) return 1;
          
          // Starts with matches second
          if (aName.startsWith(queryLower) && !bName.startsWith(queryLower)) return -1;
          if (bName.startsWith(queryLower) && !aName.startsWith(queryLower)) return 1;
          
          // ID matches third
          if (a.id.toLowerCase() === queryLower && b.id.toLowerCase() !== queryLower) return -1;
          if (b.id.toLowerCase() === queryLower && a.id.toLowerCase() !== queryLower) return 1;
          
          // Alphabetical order for remaining results
          return aName.localeCompare(bName);
        });
        
        setSearchResults(sortedResults.slice(0, 10)); // Limit to 10 results
        setSelectedNodeDetails(null); // Clear any previously selected node
      }
    }
  };

  // Unified function to handle node selection from any source
  const selectNode = (node) => {
    if (!node) return;
    
    console.log('selectNode called with:', node);
    
    // In explore mode, check if the node is hidden
    if (exploreMode && exploreState) {
      const isHidden = !exploreState.selectedNodes.has(node.id) && !exploreState.visibleNodes.has(node.id);
      
      if (isHidden) {
        console.log('Hidden node clicked in search, making it visible and showing popup:', node.id);
        
        // Make the node visible (greyed out) by adding it to visibleNodes
        setExploreState(prev => {
          const newVisibleNodes = new Set(prev.visibleNodes);
          newVisibleNodes.add(node.id);
          
          const newState = { ...prev, visibleNodes: newVisibleNodes };
          saveExploreState(newState);
          return newState;
        });
        
        // Show the popup for the node
        const position = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        };
        
        setNodePopup({
          isVisible: true,
          node: node,
          position: position
        });
        
        return; // Don't proceed with normal selection behavior
      }
    }
    
    // Check if this node is already selected - if so, deselect it
    // BUT: If we're in connection details mode, allow selection to explore the node
    if (selectedNodeRef.current && selectedNodeRef.current.id === node.id) {
      // If we're showing connection details, allow selection to explore the node
      if (selectedConnection) {
        console.log('Node already selected but in connection details, allowing selection to explore');
      } else {
        console.log('Node already selected, deselecting it');
        handleCloseNodeDetails();
        return;
      }
    }
    
    // Close all other dropdowns when opening node details
    closeAllDropdownsAndPopups();
    
    setSelectedNodeDetails(node);
    setSelectedConnection(null); // Clear connection selection when selecting a node
    setShowSearch(true);
    
    // Update the selected node ref for deselection detection
    selectedNodeRef.current = node;
    
    // Clear the selected edge ID when selecting a node (same as main page network)
    // Use NetworkVisualization's clearHighlight method to clear edge selection
    if (networkRef.current && networkRef.current.clearHighlight) {
      networkRef.current.clearHighlight(false); // Don't clear edge selection
    }
    
    // Clear edge highlighting and highlight the selected node
    if (networkRef.current) {
      try {
        console.log('Network ref available, highlighting node:', node.id);
        
        if (networkRef.current.clearHighlight) {
          networkRef.current.clearHighlight(false); // Don't clear edge selection
          console.log('Cleared highlights');
        }
        
        // Call setSelectedNode to enable proper highlighting, but don't let it manage UI state
        if (networkRef.current.setSelectedNode) {
          networkRef.current.setSelectedNode(node);
          console.log('Set selected node for highlighting');
        }
        
        // Zoom to the subnetwork to focus on the selected node
        if (networkRef.current.zoomToSubnetwork) {
          setTimeout(() => {
            networkRef.current.zoomToSubnetwork(node);
            console.log('Zoomed to subnetwork');
          }, 100);
        }
      } catch (error) {
        console.error('Error highlighting node:', error);
      }
    } else {
      console.log('Network ref not available');
    }
    
    // Apply preset sizing immediately for consistent behavior
    // Use the same timing as direct button clicks (0ms delay)
    setTimeout(() => applyDropdownSizing('search'), 0);
  };

  const handleNodeSelect = (node) => {
    selectNode(node);
  };

  const handleNetworkNodeClick = (node) => {
    selectNode(node);
  };

  const handleCloseNodeDetails = () => {
    console.log('handleCloseNodeDetails called');
    setSelectedNodeDetails(null);
    setSelectedConnection(null); // Clear connection selection when closing details
    
    // Close the search dropdown when closing details
    setShowSearch(false);
    
    // Clear the selected node ref for deselection detection
    selectedNodeRef.current = null;
    
    // Clear the selected edge ID for deselection detection
    // Use NetworkVisualization's clearHighlight method to clear edge selection
    if (networkRef.current && networkRef.current.clearHighlight) {
      networkRef.current.clearHighlight(true); // Clear edge selection when closing details
    }
    
    // Clear the highlight in the network visualization
    if (networkRef.current && networkRef.current.clearHighlight) {
      networkRef.current.clearHighlight(true); // Clear edge selection when closing details
    }
    
    // Reset all edge processed flags so edges can be selected again after closing details
    // Use a simpler approach - just clear the selectedEdgeId state
    // The _processed flags will be handled by the click logic
    console.log('Clearing edge selection state');
    
    // Don't reset the view - just clear highlights and keep current zoom/position
    // This prevents unwanted zoom out when closing details
    console.log('handleCloseNodeDetails completed');
  };

  const handleBackToSearch = () => {
    console.log('handleBackToSearch called');
    // Clear the selected node/connection details but keep the search dropdown open
    setSelectedNodeDetails(null);
    setSelectedConnection(null);
    
    // Clear the selected node ref for deselection detection
    selectedNodeRef.current = null;
    
    // Clear highlights in the network visualization
    if (networkRef.current && networkRef.current.clearHighlight) {
      networkRef.current.clearHighlight(true); // Clear edge selection when going back
    }
    
    // Keep the search dropdown open and show the search interface
    // The search dropdown will automatically show the search input and results
    console.log('handleBackToSearch completed');
  };

  const handleConnectionClick = (connectedNode, connection) => {
    // Use the exact same pattern as the main page network for edge deselection
    // Create a unique edge identifier (sorted to handle both directions)
    const createEdgeId = (connection) => {
      const sourceId = typeof connection.source === 'object' ? connection.source.id : connection.source;
      const targetId = typeof connection.target === 'object' ? connection.target.id : connection.target;
      const edgeId = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
      console.log('createEdgeId debug:', { sourceId, targetId, edgeId, connection });
      return edgeId;
    };
    
    const clickedEdgeId = createEdgeId(connection);
    
    console.log('=== CONNECTION CLICK DEBUG ===');
    console.log('Connection clicked:', connection.source, '->', connection.target);
    console.log('Connection object:', connection);
    const currentSelectedEdgeId = networkRef.current?.getSelectedEdgeId?.() || null;
    console.log('Clicked edge ID:', clickedEdgeId);
    console.log('Selected edge ID:', currentSelectedEdgeId);
    console.log('Is same edge?', clickedEdgeId === currentSelectedEdgeId);
    console.log('Current selectedConnection:', selectedConnection);
    
    // Toggle selection: if clicking the same edge, deselect it
    if (clickedEdgeId === currentSelectedEdgeId && selectedConnection) {
      console.log('Deselecting connection:', connection.source, '->', connection.target);
      handleCloseNodeDetails();
      return;
    }
    
    // When a connection is clicked, show connection details
    // Close all other dropdowns when opening connection details
    closeAllDropdownsAndPopups();
    
    setSelectedConnection(connection);
    setSelectedNodeDetails(null);
    
    // Update the selected edge ID for deselection detection (same as main page network)
    // Use NetworkVisualization's setSelectedEdge method to sync the state
    if (networkRef.current && networkRef.current.setSelectedEdge) {
      networkRef.current.setSelectedEdge(connection.source, connection.target);
    }
    
    // Clear node selection and highlight the connection in the network visualization
    if (networkRef.current && networkRef.current.clearNodeSelection) {
      networkRef.current.clearNodeSelection();
    }
    
    // Debug: Log the current state after setting
    console.log('Connection selected, current state:', {
      selectedConnection: connection,
      selectedEdgeId: networkRef.current?.getSelectedEdgeId?.() || null,
      showSearch: true
    });
    
    setShowSearch(true);
    
    // Zoom to show the connected nodes and pan to center the view
    if (networkRef.current && networkRef.current.zoomToSubnetwork) {
      setTimeout(() => {
        // Create a virtual node at the center of the connection for zooming
        if (networkRef.current && networkRef.current.getNetworkData) {
          const { nodes } = networkRef.current.getNetworkData();
          const sourceNode = nodes.find(n => n.id === connection.source);
          const targetNode = nodes.find(n => n.id === connection.target);
          
          if (sourceNode && targetNode) {
            // Create a virtual node at the midpoint of the connection
            const virtualNode = {
              id: 'connection-center',
              x: (sourceNode.x + targetNode.x) / 2,
              y: (sourceNode.y + targetNode.y) / 2,
              name: 'Connection',
              type: 'connection',
              sourceId: connection.source,
              targetId: connection.target
            };
            
            // Zoom to show both connected nodes
            networkRef.current.zoomToSubnetwork(virtualNode);
          }
        }
      }, 100);
    }
    
    // Apply collision detection immediately for consistent behavior
    setTimeout(() => applyDropdownSizing('search'), 0);
  };

  const handleEdgeClick = (edge) => {
    // Remove duplicate click prevention for edges - it's causing more problems than it solves
    // The deselection logic below will handle toggling behavior properly
    
    // Use the exact same pattern as the main page network for edge deselection
    // Create a unique edge identifier (sorted to handle both directions)
    const createEdgeId = (edge) => {
      const sourceId = edge.source.id;
      const targetId = edge.target.id;
      const edgeId = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
      console.log('createEdgeId debug (edge):', { sourceId, targetId, edgeId, edge });
      return edgeId;
    };
    
    const clickedEdgeId = createEdgeId(edge);
    
    console.log('=== EDGE CLICK DEBUG ===');
    console.log('Edge clicked:', edge.source.id, '->', edge.target.id);
    console.log('Edge object:', edge);
    const currentSelectedEdgeId = networkRef.current?.getSelectedEdgeId?.() || null;
    console.log('Clicked edge ID:', clickedEdgeId);
    console.log('Selected edge ID:', currentSelectedEdgeId);
    console.log('Is same edge?', clickedEdgeId === currentSelectedEdgeId);
    console.log('Current selectedConnection:', selectedConnection);
    
    // Toggle selection: if clicking the same edge, deselect it
    console.log('Deselection check:', {
      clickedEdgeId,
      currentSelectedEdgeId,
      selectedConnection,
      isSameEdge: clickedEdgeId === currentSelectedEdgeId,
      hasSelectedConnection: !!selectedConnection
    });
    
    if (clickedEdgeId === currentSelectedEdgeId) {
      console.log('Deselecting edge:', edge.source.id, '->', edge.target.id);
      console.log('Calling handleCloseNodeDetails and returning early');
      // Reset the processed flag so this edge can be selected again
      edge._processed = false;
      handleCloseNodeDetails();
      return;
    }
    
    // When an edge is clicked directly in the network, show connection details
    // Close all other dropdowns when opening connection details
    closeAllDropdownsAndPopups();
    
    console.log('Setting selectedConnection to:', edge);
    setSelectedConnection(edge);
    setSelectedNodeDetails(null);
    
    // Update the selected edge ID for deselection detection (same as main page network)
    // Use NetworkVisualization's setSelectedEdge method to sync the state
    if (networkRef.current && networkRef.current.setSelectedEdge) {
      networkRef.current.setSelectedEdge(edge.source.id, edge.target.id);
    }
    
    // Clear node selection and highlight the connection in the network visualization
    if (networkRef.current && networkRef.current.clearNodeSelection) {
      networkRef.current.clearNodeSelection();
    }
    
    // Debug: Log the current state after setting
    console.log('Edge selected, current state:', {
      selectedConnection: edge,
      selectedEdgeId: networkRef.current?.getSelectedEdgeId?.() || null,
      showSearch: true
    });
    
    setShowSearch(true);
    
    // Zoom to show the connected nodes and pan to center the view
    if (networkRef.current && networkRef.current.zoomToSubnetwork) {
      setTimeout(() => {
        // Create a virtual node at the center of the edge for zooming
        if (networkRef.current && networkRef.current.getNetworkData) {
          const { nodes } = networkRef.current.getNetworkData();
          const sourceNode = nodes.find(n => n.id === edge.source.id);
          const targetNode = nodes.find(n => n.id === edge.target.id);
          
          if (sourceNode && targetNode) {
            // Create a virtual node at the midpoint of the edge
            const virtualNode = {
              id: 'edge-center',
              x: (sourceNode.x + targetNode.x) / 2,
              y: (sourceNode.y + targetNode.y) / 2,
              name: 'Connection',
              type: 'connection',
              sourceId: edge.source.id,
              targetId: edge.target.id
            };
            
            // Zoom to show both connected nodes
            networkRef.current.zoomToSubnetwork(virtualNode);
          }
        }
      }, 100);
    }
    
    // Apply collision detection immediately for consistent behavior
    setTimeout(() => applyDropdownSizing('search'), 0);
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
    
    // Expose debugging functions to global scope
    window.debugDropdownSizing = {
      logAllPositions: logAllElementPositions,
      testDropdownSizing: (dropdownType) => {
        console.log(`🧪 Testing dropdown sizing for ${dropdownType}`);
        applyDropdownSizing(dropdownType);
      },
      getDropdownDimensions: () => getDropdownDimensions,
      showAllDropdownSizes: () => {
        console.log('🔍 Showing preset dimensions for all dropdowns...');
        ['filters', 'search', 'legend', 'share'].forEach(dropdownType => {
          console.log(`\n=== ${dropdownType.toUpperCase()} DROPDOWN ===`);
          const dimensions = getDropdownDimensions.getDimensions(dropdownType);
          console.log(`Preset dimensions:`, dimensions);
        });
      },
      getCurrentScreenSize: () => {
        const width = window.innerWidth;
        let screenSize;
        if (width <= 360) screenSize = 'xs';
        else if (width <= 480) screenSize = 'sm';
        else if (width <= 600) screenSize = 'md';
        else if (width <= 768) screenSize = 'lg';
        else if (width <= 1024) screenSize = 'xl';
        else if (width <= 1366) screenSize = 'xxl';
        else if (width <= 1600) screenSize = 'xxxl';
        else screenSize = 'xxxxl';
        
        console.log(`📱 Current screen size: ${screenSize} (${width}px wide)`);
        return screenSize;
      },
      expandLogs: () => {
        console.log('🔍 Expanding all console logs...');
        // Override console.log to show full objects
        const originalLog = console.log;
        console.log = function(...args) {
          args.forEach(arg => {
            if (typeof arg === 'object' && arg !== null) {
              originalLog(JSON.stringify(arg, null, 2));
            } else {
              originalLog(arg);
            }
          });
        };
        console.log('✅ Console logs expanded - objects will now show full details');
      },
      collapseLogs: () => {
        console.log('🔍 Collapsing console logs...');
        // Restore original console.log (this is just a placeholder)
        console.log('✅ Console logs collapsed');
      },
      // New explore mode debugging functions
      debugExploreMode: () => {
        console.log('🔍 Explore Mode Debug Information:');
        console.log('Current state:', {
          exploreMode,
          startingNode: exploreState.startingNode,
          selectedNodes: Array.from(exploreState.selectedNodes),
          visibleNodes: Array.from(exploreState.visibleNodes),
          searchQuery: startingNodeSearchQuery,
          searchResultsCount: startingNodeSearchResults.length
        });
        
        const resultsElement = document.querySelector('.starting-node-results');
        if (resultsElement) {
          const rect = resultsElement.getBoundingClientRect();
          console.log('Dropdown dimensions:', {
            width: rect.width,
            height: rect.height,
            maxHeight: getComputedStyle(resultsElement).maxHeight,
            minHeight: getComputedStyle(resultsElement).minHeight,
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight
            }
          });
        } else {
          console.log('❌ Starting node results dropdown not found');
        }
      },
      testExploreSearch: (query) => {
        console.log(`🧪 Testing explore search with query: "${query}"`);
        handleStartingNodeSearch(query);
      },
      getExploreSearchResults: () => {
        console.log('Current search results:', startingNodeSearchResults);
        return startingNodeSearchResults;
      },
      measureDropdownContent: () => {
        const resultsElement = document.querySelector('.starting-node-results');
        if (!resultsElement) {
          console.log('❌ No dropdown found to measure');
          return;
        }
        
        const options = resultsElement.querySelectorAll('.starting-node-option');
        console.log(`📏 Dropdown content measurement:`, {
          totalOptions: options.length,
          containerHeight: resultsElement.offsetHeight,
          containerMaxHeight: getComputedStyle(resultsElement).maxHeight,
          containerMinHeight: getComputedStyle(resultsElement).minHeight,
          options: Array.from(options).map((option, index) => ({
            index,
            height: option.offsetHeight,
            textContent: option.textContent.trim().substring(0, 50) + '...'
          }))
        });
      },
      adjustExploreDropdownSize: () => {
        console.log('🔧 Manually adjusting explore dropdown size...');
        adjustExploreDropdownSize();
      },
      testExploreDropdownSizing: () => {
        console.log('🧪 Testing explore dropdown sizing with different scenarios...');
        
        // Test with different search queries
        const testQueries = ['a', 'tech', 'university', 'startup'];
        testQueries.forEach((query, index) => {
          setTimeout(() => {
            console.log(`\n--- Test ${index + 1}: Searching for "${query}" ---`);
            handleStartingNodeSearch(query);
          }, index * 1000);
        });
      },
      forceShowResults: () => {
        console.log('🧪 Forcing results to show for testing...');
        if (networkData.nodes.length > 0) {
          const testResults = networkData.nodes.slice(0, 3);
          setStartingNodeSearchResults(testResults);
          setSearchResultsKey(prev => prev + 1);
          console.log('Forced results set:', testResults);
        } else {
          console.log('No network data available');
        }
      },
      checkState: () => {
        console.log('🔍 Current state values:', {
          startingNodeSearchQuery,
          startingNodeSearchResults: startingNodeSearchResults.length,
          searchResultsKey,
          exploreMode,
          hasStartingNode: !!exploreState.startingNode
        });
        return {
          startingNodeSearchQuery,
          startingNodeSearchResults: startingNodeSearchResults.length,
          searchResultsKey,
          exploreMode,
          hasStartingNode: !!exploreState.startingNode
        };
      },
      checkResultsVisibility: () => {
        console.log('🔍 Checking results visibility...');
        
        const resultsElement = document.querySelector('.starting-node-results');
        const options = document.querySelectorAll('.starting-node-option');
        
        console.log('Results element:', resultsElement);
        console.log('Options found:', options.length);
        
        if (resultsElement) {
          const rect = resultsElement.getBoundingClientRect();
          const styles = getComputedStyle(resultsElement);
          console.log('Results element position:', {
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height,
            position: styles.position,
            zIndex: styles.zIndex,
            display: styles.display,
            visibility: styles.visibility,
            opacity: styles.opacity
          });
          
          // Check if it's visible in viewport
          const isInViewport = rect.top >= 0 && rect.left >= 0 && 
                              rect.bottom <= window.innerHeight && 
                              rect.right <= window.innerWidth;
          console.log('Is in viewport:', isInViewport);
        }
        
        if (options.length > 0) {
          console.log('First option:', options[0]);
          const firstOptionRect = options[0].getBoundingClientRect();
          console.log('First option position:', {
            top: firstOptionRect.top,
            left: firstOptionRect.left,
            width: firstOptionRect.width,
            height: firstOptionRect.height
          });
        }
        
        return { resultsElement, optionsCount: options.length };
      }
    };
    
    console.log('Caching system initialized');
    console.log('🔧 Dropdown sizing debugging available: window.debugDropdownSizing');
  }, [logAllElementPositions, applyDropdownSizing, getDropdownDimensions, adjustExploreDropdownSize, exploreMode, exploreState.selectedNodes, exploreState.startingNode, exploreState.visibleNodes, handleStartingNodeSearch, networkData.nodes, searchResultsKey, startingNodeSearchQuery, startingNodeSearchResults]);

  // Load network data and last commit date
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load network data based on dataType
        if (dataType === 'tech') {
          const { atlantaTechEcosystem, nodeTypeMap: ntm, nodeColors: nc } = await import('../atlanta_tech_data.js');
          setNetworkData(atlantaTechEcosystem);
          setNodeTypeMap(ntm);
          setNodeColors(nc);
        } else {
          const { atlantaBiotechEcosystem, nodeTypeMap: ntm, nodeColors: nc } = await import('../atlanta_biotech_data.js');
          setNetworkData(atlantaBiotechEcosystem);
          setNodeTypeMap(ntm);
          setNodeColors(nc);
        }
        
        // Fetch last commit date
        try {
          const response = await fetch('/last-commit-date.json');
          if (response.ok) {
            const data = await response.json();
            setLastCommitDate(data.lastCommitDate);
          }
        } catch (error) {
          console.log('Could not fetch last commit date:', error);
          // Keep default date if fetch fails
        }
      } catch (error) {
        console.error('Error loading network data:', error);
      }
    };
    
    loadData();
  }, [dataType]);

  // Initialize explore mode when data is loaded
  useEffect(() => {
    if (exploreMode && networkData.nodes.length > 0 && !exploreState.isInitialized) {
      // Load saved explore state from localStorage
      const savedState = localStorage.getItem(`explore-state-${dataType}`);
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          setExploreState({
            selectedNodes: new Set(parsed.selectedNodes || []),
            visibleNodes: new Set(parsed.visibleNodes || []),
            startingNode: parsed.startingNode || null,
            isInitialized: true
          });
        } catch (error) {
          console.error('Error loading saved explore state:', error);
          // Initialize with empty state
          setExploreState(prev => ({ ...prev, isInitialized: true }));
        }
      } else {
        // Initialize with empty state
        setExploreState(prev => ({ ...prev, isInitialized: true }));
      }
    }
  }, [exploreMode, networkData.nodes.length, exploreState.isInitialized, dataType]);

  // Close dropdowns and popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is inside any dropdown content
      const isInsideDropdown = event.target.closest('.control-dropdown-content') || 
                              event.target.closest('.control-dropdown-content-inline') ||
                              event.target.closest('.network-share-dropdown-content') ||
                              event.target.closest('.network-share-dropdown-content-inline') ||
                              event.target.closest('.legend-content') ||
                              event.target.closest('.legend-content-inline');
      
      // Check if click is on any dropdown button
      const isOnDropdownButton = event.target.closest('.control-dropdown-button') ||
                                event.target.closest('.network-share-button') ||
                                event.target.closest('.legend-toggle-button');
      
      // Check if click is inside node popup
      const isInsidePopup = event.target.closest('.node-popup');
      
      // Don't close if clicking inside dropdown content, on dropdown buttons, or inside popup
      if (isInsideDropdown || isOnDropdownButton || isInsidePopup) {
        return;
      }
      
      // Close all dropdowns and node popups if clicking outside
      closeAllDropdownsAndPopups();
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [closeAllDropdownsAndPopups]);

  // Handle window resize to recalculate preset sizing
  useEffect(() => {
    const handleResize = () => {
      // Recalculate preset sizing for any open dropdowns
      if (showShareDropdown) applyDropdownSizing('share');
      if (showFilters) applyDropdownSizing('filters');
      if (showSearch) applyDropdownSizing('search');
      if (showLegend) applyDropdownSizing('legend');
      
      // Also adjust explore mode dropdown if it's visible
      if (exploreMode && startingNodeSearchResults.length > 0) {
        adjustExploreDropdownSize();
      }
      
      // Apply preset sizing for explore mode UI on resize
      if (exploreMode && !exploreState.startingNode) {
        applyExploreModeSizing();
      }
    };

    // Debounce resize events for better performance and to handle mobile detection changes
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150); // Increased debounce time
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [showShareDropdown, showFilters, showSearch, showLegend, applyDropdownSizing, exploreMode, startingNodeSearchResults.length, adjustExploreDropdownSize, applyExploreModeSizing, exploreState.startingNode]);

  // Ensure preset sizing runs whenever search state changes
  useEffect(() => {
    if (showSearch) {
      // Apply preset sizing immediately to prevent flash
      applyDropdownSizing('search');
    }
  }, [showSearch, applyDropdownSizing]);

  // Apply preset sizing for explore mode UI when it's shown
  useEffect(() => {
    if (exploreMode && !exploreState.startingNode) {
      // Close any open dropdowns when entering explore mode without starting node
      closeAllDropdownsAndPopups();
      
      // Apply preset sizing after it's rendered
      setTimeout(() => {
        applyExploreModeSizing();
      }, 100);
    }
  }, [exploreMode, exploreState.startingNode, applyExploreModeSizing, closeAllDropdownsAndPopups]);



  // ============================================================================
  // MAIN COMPONENT RENDER
  // ============================================================================
  
  return (
    <ThemeProvider>
      <div className="network-only">
        {/* Top Right Corner Controls */}
        {/* These controls are positioned in the top-right corner for easy access */}
        <div className="top-right-controls">
          {/* Theme Toggle - Allows users to switch between light and dark themes */}
          <ThemeToggle disabled={areControlsDisabled} />
          
          {/* Share Button - Provides social sharing functionality */}
          <button 
            className={`network-share-button ${showShareDropdown ? 'expanded' : ''}`}
            disabled={areControlsDisabled}
            onClick={() => toggleDropdown('share')}
            title="Share"
          >
            {!showShareDropdown && (
              // Share icon when dropdown is closed
              <svg className="network-share-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
              </svg>
            )}
            
            {showShareDropdown && (
              // Share dropdown content when button is expanded
              <div className="network-share-dropdown-content-inline" onClick={handleDropdownContentClick}>
                <div className="dropdown-header">
                  <h5 className="dropdown-title">Share</h5>
                  <div
                    className="dropdown-close"
                    onClick={() => setShowShareDropdown(false)}
                    title="Close"
                  >
                    ×
                  </div>
                </div>
                  
                {/* Copy Link Button */}
                <div 
                  className="network-share-option" 
                  onClick={handleCopyLink}
                >
                  <svg className="network-share-option-icon" viewBox="0 0 24 24" fill="currentColor">
                    {linkCopied ? (
                      // Checkmark icon when link is copied
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    ) : (
                      // Copy icon when link hasn't been copied
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    )}
                  </svg>
                  {linkCopied ? 'Link Copied!' : 'Copy Link'}
                </div>
                
                {/* Twitter Share Button */}
                <div 
                  className="network-share-option" 
                  onClick={handleTwitterShare}
                >
                  <svg className="network-share-option-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Share on Twitter
                </div>
                
                {/* LinkedIn Share Button */}
                <div 
                  className="network-share-option" 
                  onClick={handleLinkedInShare}
                >
                  <svg className="network-share-option-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Share on LinkedIn
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Main Controls Panel - Top Left */}
        {/* These controls provide the primary network interaction functionality */}
        <div className="main-controls-panel">
          {/* Center Network Button - Resets the network view to show all nodes */}
          <button 
            className="control-button center-button"
            disabled={areControlsDisabled}
            onClick={() => {
              if (networkRef.current) {
                networkRef.current.manualCenterNetwork();
              }
            }}
            title="Center Network"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="3" x2="8" y2="3"/>
              <line x1="3" y1="3" x2="3" y2="8"/>
              <line x1="21" y1="3" x2="16" y2="3"/>
              <line x1="21" y1="3" x2="21" y2="8"/>
              <line x1="3" y1="21" x2="8" y2="21"/>
              <line x1="3" y1="21" x2="3" y2="16"/>
              <line x1="21" y1="21" x2="21" y2="16"/>
              <line x1="21" y1="21" x2="21" y2="16"/>
              <line x1="21" y1="21" x2="16" y2="21"/>
            </svg>
          </button>

          {/* Zoom In Button - Increases the zoom level of the network view */}
          <button 
            className="control-button zoom-button"
            disabled={areControlsDisabled}
            onClick={() => {
              if (networkRef.current) {
                networkRef.current.zoomIn();
              }
            }}
            title="Zoom In"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>

          {/* Zoom Out Button - Decreases the zoom level of the network view */}
          <button 
            className="control-button zoom-button"
            disabled={areControlsDisabled}
            onClick={() => {
              if (networkRef.current) {
                networkRef.current.zoomOut();
              }
            }}
            title="Zoom Out"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>

          {/* Filters Dropdown - Controls which organization types are visible */}
          <div className="control-dropdown">
            <button 
              className={`control-dropdown-button ${showFilters ? 'expanded' : ''}`}
              disabled={areControlsDisabled}
              onClick={() => toggleDropdown('filters')}
              title="Filters"
            >
              {!showFilters && (
                // Filter icon when dropdown is closed
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
                </svg>
              )}
              
              {showFilters && (
                // Filter dropdown content when expanded
                <div className="control-dropdown-content-inline" onClick={handleDropdownContentClick}>
                  <div className="dropdown-header">
                    <h5 className="dropdown-title">Filters</h5>
                    <div
                      className="dropdown-close"
                      onClick={()=> setShowFilters(false)}
                      title="Close"
                      >
                        ×
                      </div>
                  </div>

                  <div className="filter-group">
                    <h5>Organization Type</h5>
                    <div className="filter-checkboxes">
                      {/* Render checkboxes for each organization type filter */}
                      {Object.entries(filters).map(([key, value]) => (
                        <label key={key} className="filter-checkbox">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleFilterChange(key, e.target.checked)}
                          />
                          <span className="checkbox-custom"></span>
                          <span className="checkbox-label">{getFilterLabel(key)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </button>
          </div>

          {/* Search Dropdown - Provides search functionality and displays results/details */}
          <div className="control-dropdown">
            <button 
              className={`control-dropdown-button ${showSearch ? 'expanded' : ''}`}
              disabled={areControlsDisabled}
              onClick={() => toggleDropdown('search')}
              title="Search"
            >
              {!showSearch && (
                // Search icon when dropdown is closed
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              )}
              
              {showSearch && (
                // Search dropdown content when expanded
                <div className="control-dropdown-content-inline" onClick={handleDropdownContentClick}>
                  <div className="search-dropdown-header">
                  {selectedNodeDetails || selectedConnection ? (
                    <div 
                    className="search-dropdown-back"
                    onClick={() => {
                      handleBackToSearch();
                    }}
                    title="Back to search"
                   >
                    ‹
                  </div>
                ) : (
                  <div></div> /* Empty div to maintain layout when no back button needed */
                )}
                  <h5 className="dropdown-title">{getSearchDropdownTitle()}</h5>
                  
                  <div 
                    className="network-only-details-close"
                    onClick={handleCloseNodeDetails}
                    title="Close"
                  >

                    ×
                  </div>
                </div>

                  {/* Search Interface - Show when no node or connection is selected */}
                  {!selectedNodeDetails && !selectedConnection ? (
                    <>
                      {/* Search Input Field */}
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search organizations..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                      
                      {/* Search Results List */}
                      {searchResults.length > 0 && (
                        <div className="search-results">
                          <div className="search-results-list">
                            {searchResults.map((result, index) => (
                              <div 
                                key={index} 
                                className="search-result-item clickable"
                                onClick={() => handleNodeSelect(result)}
                              >
                                {/* Color indicator for organization type */}
                                <div className="result-type-color" style={{backgroundColor: getOrganizationTypeColor(result.type)}}></div>
                                <div className="result-content">
                                  <div className="result-name">{result.name}</div>
                                  <div className="result-type">{formatOrganizationType(result.type)}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : selectedConnection ? (
                      // Connection Details View - Show when a connection is selected
                      <div className="network-only-connection-details">
                        <div className="network-only-details-content">
                          {/* Relationship Type Section */}
                          <div className="network-only-details-section">
                            <h4>Relationship Type</h4>
                            <p className="network-only-relationship-type">
                              {selectedConnection.type.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </p>
                          </div>
                          
                          {/* Relationship Description Section (if available) */}
                          {selectedConnection.description && (
                            <div className="network-only-details-section">
                              <h4>Description</h4>
                              <p className="network-only-relationship-description">{selectedConnection.description}</p>
                            </div>
                          )}
                          
                          <div className="network-only-details-section">
                            <div className="network-only-section-header">
                              <h4>Connected Organizations</h4>
                            </div>
                            <div className="network-only-connected-organizations">
                              {(() => {
                                // Get network data to find the connected nodes
                                if (networkRef.current && networkRef.current.getNetworkData) {
                                  const { nodes } = networkRef.current.getNetworkData();
                                  // Extract source and target IDs (they might be objects with id properties)
                                  const sourceId = typeof selectedConnection.source === 'object' ? selectedConnection.source.id : selectedConnection.source;
                                  const targetId = typeof selectedConnection.target === 'object' ? selectedConnection.target.id : selectedConnection.target;
                                  const sourceNode = nodes.find(n => n.id === sourceId);
                                  const targetNode = nodes.find(n => n.id === targetId);
                                
                                  return (
                                    <>
                                      {/* Source Organization */}
                                      <div 
                                        className="network-only-org-item clickable"
                                        onClick={() => selectNode(sourceNode)}
                                        style={{ cursor: 'pointer' }}
                                        title="Click to highlight this organization"
                                      >
                                        <div className="network-only-org-node-color" style={{backgroundColor: getOrganizationTypeColor(sourceNode?.type)}}></div>
                                        <div className="network-only-org-content">
                                          <div className="network-only-org-name">
                                            {sourceNode?.name || sourceId}
                                            {sourceNode?.website && (
                                              <a 
                                                href={sourceNode.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="network-only-org-website-link"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                ↗
                                              </a>
                                            )}
                                          </div>
                                          <div className="network-only-org-type">{formatOrganizationType(sourceNode?.type)}</div>
                                        </div>
                                      </div>
                                      
                                      {/* Target Organization */}
                                      <div 
                                        className="network-only-org-item clickable"
                                        onClick={() => selectNode(targetNode)}
                                        style={{ cursor: 'pointer' }}
                                        title="Click to highlight this organization"
                                      >
                                        <div className="network-only-org-node-color" style={{backgroundColor: getOrganizationTypeColor(targetNode?.type)}}></div>
                                        <div className="network-only-org-content">
                                          <div className="network-only-org-name">
                                            {targetNode?.name || targetId}
                                            {targetNode?.website && (
                                              <a 
                                                href={targetNode.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="network-only-org-website-link"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                ↗
                                              </a>
                                            )}
                                          </div>
                                          <div className="network-only-org-type">{formatOrganizationType(targetNode?.type)}</div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                }
                                
                                return <p className="network-only-no-connections">Loading organizations...</p>;
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                  ) : (
                    // Node Details View - Show when a node is selected
                    <div className="network-only-node-details">
                      <div className="network-only-details-header">
                      </div>
                      
                      <div className="network-only-details-content">
                        {/* Organization Title and Type */}
                        <h3 className="network-only-org-title">{getOrganizationDisplayName(selectedNodeDetails)}</h3>
                        <p className="network-only-node-type">
                          {formatOrganizationType(selectedNodeDetails.type)}
                        </p>
                        
                        {/* Organization Description (if available) */}
                        {selectedNodeDetails.description && (
                          <p className="network-only-node-description">{selectedNodeDetails.description}</p>
                        )}
                        
                        {/* Website Link (if available) */}
                        {selectedNodeDetails.website && (
                          <div className="network-only-details-section">
                            <h4>Website</h4>
                            <a 
                              href={selectedNodeDetails.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="network-only-website-link"
                            >
                              {selectedNodeDetails.website.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        )}
                        
                        {/* Key Personnel List (if available) */}
                        {selectedNodeDetails.keyPersonnel && selectedNodeDetails.keyPersonnel.length > 0 && (
                          <div className="network-only-details-section">
                            <h4>Key Personnel</h4>
                            <ul className="network-only-personnel-list">
                                                              {selectedNodeDetails.keyPersonnel.map((person, index) => (
                                  <li key={index}>
                                    {typeof person === 'string' ? person : person.name}
                                    {typeof person === 'object' && person.linkedin && (
                                      <a 
                                        href={person.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="network-only-linkedin-link"
                                      >
                                        LinkedIn
                                      </a>
                                    )}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Recent News/Developments (if available) */}
                        {selectedNodeDetails.recentNews && (
                          <div className="network-only-details-section">
                            <h4>Recent Developments</h4>
                            <p className="network-only-recent-news">{selectedNodeDetails.recentNews}</p>
                          </div>
                        )}
                        
                        {/* Connections List - Show all organizations connected to this node */}
                        <div className="network-only-details-section">
                          <h4>Connections</h4>
                          {(() => {
                            // Get network data to find connections
                            if (networkRef.current && networkRef.current.getNetworkData) {
                              const { links } = networkRef.current.getNetworkData();
                              
                              // Find all connections for the selected node
                              const nodeConnections = links.filter(link => 
                                link.source === selectedNodeDetails.id || link.target === selectedNodeDetails.id
                              );
                              
                              if (nodeConnections.length === 0) {
                                return <p className="network-only-no-connections">No connections found.</p>;
                              }
                              
                              return (
                                <div className="network-only-connections-list">
                                  {nodeConnections.map((connection, index) => {
                                    // Determine the connected node (not the selected one)
                                    const connectedNodeId = connection.source === selectedNodeDetails.id ? connection.target : connection.source;
                                    const connectedNode = networkRef.current.getNetworkData().nodes.find(n => n.id === connectedNodeId);
                                    
                                    if (!connectedNode) return null;
                                    
                                    return (
                                      <div 
                                        key={index} 
                                        className="network-only-connection-item clickable"
                                        onClick={() => handleConnectionClick(connectedNode, connection)}
                                      >
                                        <div className="network-only-connection-header">
                                          <div className="network-only-connection-node-color" style={{backgroundColor: getOrganizationTypeColor(connectedNode.type)}}></div>
                                          <div className="network-only-connection-content">
                                            <div className="network-only-connection-name">
                                              {connectedNode.name}
                                              {connectedNode.website && (
                                                <a 
                                                  href={connectedNode.website} 
                                                  target="_blank" 
                                                  rel="noopener noreferrer"
                                                  className="network-only-connection-website-link"
                                                  onClick={(e) => e.stopPropagation()}
                                                >
                                                  ↗
                                                </a>
                                              )}
                                            </div>
                                            <div className="network-only-connection-type">{formatOrganizationType(connectedNode.type)}</div>
                                          </div>
                                        </div>
                                        <div className="network-only-connection-relationship">
                                          <span className="network-only-relationship-label">Relationship:</span>
                                          <span className="network-only-relationship-type">
                                            {connection.type.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                          </span>
                                        </div>
                                        {connection.description && (
                                          <div className="network-only-connection-description">
                                            {connection.description}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            }
                            
                            return <p className="network-only-no-connections">Loading connections...</p>;
                          })()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Network Stats Panel - Bottom Right */}
        {/* This panel displays key statistics about the network */}
        <div className={`network-stats-bottom-right ${areControlsDisabled ? 'disabled' : ''}`}>
          {exploreMode ? (
            <>
              <div className="stats-item">
                <span className="stat-label">Selected:</span>
                <span className="stat-value">{exploreState.selectedNodes.size}</span>
              </div>
              <div className="stats-item">
                <span className="stat-label">Visible:</span>
                <span className="stat-value">{exploreState.visibleNodes.size}</span>
              </div>
              <div className="stats-item">
                <button
                  className="explore-reset-button-small"
                  onClick={resetExploration}
                  title="Reset exploration"
                >
                  Reset
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="stats-item">
                <span className="stat-label">Organizations:</span>
                <span className="stat-value">{networkData.nodes.length}</span>
              </div>
              <div className="stats-item">
                <span className="stat-label">Connections:</span>
                <span className="stat-value">{networkData.links.length}</span>
              </div>
              <div className="stats-item">
                <span className="stat-label">Updated:</span>
                <span className="stat-value">{lastCommitDate}</span>
              </div>
            </>
          )}
        </div>

        {/* Collapsible Legend - Bottom Left */}
        {/* This panel provides a visual guide to the network's color coding */}
        <div className="fixed-legend">
          <button 
            className={`legend-toggle-button ${showLegend ? 'expanded' : ''}`}
            disabled={areControlsDisabled}
            onClick={handleLegendToggle}
            title={showLegend ? "Hide Legend" : "Show Legend"}
          >
            {!showLegend && <span>Legend</span>}
            
            {showLegend && (
              // Legend content when expanded
              <div className="legend-content-inline" onClick={handleDropdownContentClick}>
                <div className="dropdown-header">
                  <h5 className="dropdown-title">Legend</h5>
                  <div
                    className="dropdown-close"
                    onClick={() => setShowLegend(false)}
                    title="Close"
                  >
                    ×
                  </div>
                </div>  
                
                {/* Node Types Section - Shows colors for different organization types */}
                <div className="legend-section">
                  <h5>Node Types</h5>
                  <div className="legend-items">
                    {Object.entries(nodeColors).map(([type, color]) => (
                      <div key={type} className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: color }}></div>
                        <span>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Relationship Types Section - Shows colors for different connection types */}
                <div className="legend-section">
                  <h5>Relationship Types</h5>
                  <div className="legend-items">
                    <div className="legend-item">
                      <div className="legend-line" style={{
                        borderColor: '#ff6b6b',
                        borderStyle: 'solid'
                      }}></div>
                      <span>Spinout</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-line" style={{
                        borderColor: '#4ecdc4',
                        borderStyle: 'dashed'
                      }}></div>
                      <span>Investment</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-line" style={{
                        borderColor: '#45b7d1',
                        borderStyle: 'solid'
                      }}></div>
                      <span>Collaboration</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-line" style={{
                        borderColor: '#96ceb4',
                        borderStyle: 'dotted'
                      }}></div>
                      <span>Partnership</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-line" style={{
                        borderColor: '#ffeaa7',
                        borderStyle: 'solid'
                      }}></div>
                      <span>Service</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-line" style={{
                        borderColor: '#dda0dd',
                        borderStyle: 'dashed'
                      }}></div>
                      <span>Support</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-line" style={{
                        borderColor: '#9b59b6',
                        borderStyle: 'dashed'
                      }}></div>
                      <span>Education Program</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Explore Mode Starting Node Selector */}
        {exploreMode && !exploreState.startingNode && (
          <div className="explore-mode-ui">
            <div className="starting-node-selector">
              <div className="starting-node-prompt">
                <h3>Choose a starting point</h3>
                <p>Select a node to begin exploring the network</p>
                <div className="starting-node-search">
                  <input
                    type="text"
                    placeholder="Search for a node..."
                    value={startingNodeSearchQuery}
                    onChange={(e) => handleStartingNodeSearch(e.target.value)}
                    className="starting-node-search-input"
                  />
                  {startingNodeSearchResults.length > 0 && (
                    <div className="starting-node-results">
                      {startingNodeSearchResults.map(node => (
                        <button
                          key={node.id}
                          className="starting-node-option"
                          onClick={() => setStartingNode(node.id)}
                        >
                          <span className="node-name">{getOrganizationDisplayName(node)}</span>
                          <span className="node-type">{formatOrganizationType(node.type)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {startingNodeSearchResults.length === 0 && startingNodeSearchQuery && (
                    <div className="starting-node-results" style={{display: 'block', visibility: 'visible', opacity: 1}}>
                      <div className="starting-node-option">
                        <span className="node-name">No results found for "{startingNodeSearchQuery}"</span>
                        <span className="node-type">Try a different search term</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Screen Network Visualization - No Box */}
        {/* This is the main network visualization component that renders the interactive network */}
        <div className="network-fullscreen">
          <NetworkVisualization 
            dataFile={dataType} // Use data based on dataType prop
            hideUI={true} // Hide the built-in UI since we have our own controls
            ref={networkRef} // Reference to access network methods
            onNodeClick={exploreMode ? null : handleNetworkNodeClick} // Handle clicks on network nodes
            onEdgeClick={handleEdgeClick} // Handle clicks on network edges
            exploreMode={exploreMode} // Enable explore mode
            exploreState={exploreState} // Pass explore state
            onNodeToggle={exploreMode ? (nodeId, event) => {
              const currentState = exploreStateRef.current;
              console.log('🔍 onNodeToggle called:', { nodeId, event, selectedNodes: Array.from(currentState.selectedNodes) });
              
              if (currentState.visibleNodes.has(nodeId)) {
                // If it's visible (either selected or greyed out), show popup
                console.log('🎯 Visible node clicked, showing popup:', nodeId);
                const node = networkData.nodes.find(n => n.id === nodeId);
                if (node) {
                  // Get click position for popup placement
                  const rect = event?.target?.getBoundingClientRect();
                  const rawPosition = rect ? {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2 // Use center of node for better positioning
                  } : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
                  
                  // Constrain position to stay within screen bounds
                  // Use more accurate popup dimensions (based on CSS)
                  const position = constrainPopupPosition(rawPosition, 300, 250);
                  
                  // Close any open dropdowns when opening node popup
                  closeAllDropdowns();
                  
                  console.log('📍 Setting popup position:', { raw: rawPosition, constrained: position });
                  setNodePopup({
                    isVisible: true,
                    node: node,
                    position: position
                  });
                } else {
                  console.log('❌ Node not found in networkData:', nodeId);
                }
              } else {
                // If it's not visible at all, add it directly
                console.log('➕ Adding hidden node directly to exploration:', nodeId);
                addNodeToExploration(nodeId);
              }
            } : null} // Handle node toggling in explore mode
            onCenterNetwork={() => {
              if (networkRef.current) {
                networkRef.current.centerNetwork();
              }
            }}
            onZoomIn={() => {
              if (networkRef.current) {
                networkRef.current.zoomIn();
              }
            }}
            onZoomOut={() => {
              if (networkRef.current) {
                networkRef.current.zoomOut();
              }
            }}
          />
        </div>

        {/* Node Popup for First-Degree Connections */}
        {nodePopup.isVisible && nodePopup.node && (
          <div 
            className="node-popup"
            style={{
              position: 'fixed',
              left: `${nodePopup.position.x}px`,
              top: `${nodePopup.position.y}px`,
              transform: 'translateX(-50%)',
              zIndex: 2000
            }}
          >
            <div className="node-popup-content">
              <div className="node-popup-header">
                <div className="node-popup-title">
                  <h4>{getOrganizationDisplayName(nodePopup.node)}</h4>
                  {nodePopup.node.website && (
                    <a 
                      href={nodePopup.node.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="node-popup-website"
                      title="Visit website"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                    </a>
                  )}
                </div>
                <p className="node-popup-type">{formatOrganizationType(nodePopup.node.type)}</p>
                {nodePopup.node.description && (
                  <p className="node-popup-description">{nodePopup.node.description}</p>
                )}
              </div>
              <div className="node-popup-actions">
                <button 
                  className="node-popup-action save"
                  onClick={() => handleNodePopupAction('save')}
                  title="Save as Full Color"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </button>
                <button 
                  className="node-popup-action keep"
                  onClick={() => handleNodePopupAction('keep')}
                  title="Keep Greyed"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 12h8"/>
                  </svg>
                </button>
                <button 
                  className="node-popup-action hide"
                  onClick={() => handleNodePopupAction('hide')}
                  title="Hide"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </ThemeProvider>
  );
}

export default NetworkOnly;
