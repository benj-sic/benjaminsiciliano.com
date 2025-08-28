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
import NetworkVisualization from './NetworkVisualization';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';
import cacheManager from '../utils/cache.js';
import performanceMonitor from '../utils/performance.js';
import { nodeTypeMap, nodeColors } from '../atlanta_biotech_data.js';
import './NetworkOnly.css';

function NetworkOnly() {
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

  const networkRef = useRef(null);



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

  // Update directions object to include both horizontal and vertical
  const directions = useMemo(() => ({
    filters: { horizontal: 'right', vertical: 'down' },
    search: { horizontal: 'right', vertical: 'down' },
    legend: { horizontal: 'right', vertical: 'up' },
    share: { horizontal: 'left', vertical: 'down' }
  }), []);

  // Update calculateAvailableSpace to handle directions and blocking elements
  const calculateAvailableSpace = useCallback((buttonElement, horizontal, vertical, dropdownType) => {
    if (!buttonElement) return { width: 280, height: 400 };
    
    const rect = buttonElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get blocking elements based on dropdownType
    let blocking = {};
    if (dropdownType === 'legend') {
      const stats = document.querySelector('.network-stats-bottom-right');
      if (stats) blocking.right = stats.getBoundingClientRect().left;
      
      const search = document.querySelector('.main-controls-panel .control-dropdown:last-child .control-dropdown-button');
      if (search) blocking.up = search.getBoundingClientRect().bottom;
    } else if (dropdownType === 'filters' || dropdownType === 'search') {
      const share = document.querySelector('.top-right-controls .network-share-button');
      if (share) blocking.right = share.getBoundingClientRect().left;
      
      const legend = document.querySelector('.fixed-legend .legend-toggle-button');
      if (legend) {
        // Only add margin if there's actual overlap risk
        const legendTop = legend.getBoundingClientRect().top;
        const buttonBottom = rect.bottom;
        if (buttonBottom + 400 > legendTop) { // If dropdown would overlap legend
          blocking.down = legendTop - 20;
        }
      }
    } else if (dropdownType === 'share') {
      const search = document.querySelector('.main-controls-panel .control-dropdown:last-child .control-dropdown-button');
      if (search) blocking.left = search.getBoundingClientRect().right;
      
      const stats = document.querySelector('.network-stats-bottom-right');
      if (stats) blocking.down = stats.getBoundingClientRect().top;
    }
    
    let availableWidth, availableHeight;
    
    // Horizontal calculation
    if (horizontal === 'right') {
      availableWidth = (blocking.right ? blocking.right - rect.right : viewportWidth - rect.right) - 40;
    } else if (horizontal === 'left') {
      availableWidth = (blocking.left ? rect.left - blocking.left : rect.left) - 40;
    }
    
    // Vertical calculation
    if (vertical === 'down') {
      availableHeight = (blocking.down ? blocking.down - rect.bottom : viewportHeight - rect.bottom) - 40;
    } else if (vertical === 'up') {
      availableHeight = (blocking.up ? rect.bottom - blocking.up : rect.top) - 40;
    }
    
    // For search dropdown, be more aggressive about finding available space
    if (dropdownType === 'search') {
      // Allow more height by default, only constrain if absolutely necessary
      const minHeight = 300; // Minimum height for comfortable reading
      const maxHeight = 600; // Maximum height before scrolling
      
      // If we're being constrained by legend, try to find a better balance
      if (blocking.down) {
        const legendTop = document.querySelector('.fixed-legend .legend-toggle-button')?.getBoundingClientRect().top;
        if (legendTop) {
          const potentialHeight = legendTop - rect.bottom - 20;
          // Use the larger of the two heights, but ensure we don't go below minimum
          availableHeight = Math.max(availableHeight, potentialHeight, minHeight);
        }
      }
      
      // Ensure we never go below minimum height
      availableHeight = Math.max(availableHeight, minHeight);
      
      return {
        width: Math.max(280, Math.min(availableWidth, 400)),
        height: Math.max(minHeight, Math.min(availableHeight, maxHeight))
      };
    }
    
    return {
      width: Math.max(200, Math.min(availableWidth, 400)),
      height: Math.max(200, Math.min(availableHeight, 500))
    };
  }, []);

  // Update applyCollisionDetection to pass directions
  const applyCollisionDetection = useCallback((dropdownType) => {
    // Use immediate execution for better responsiveness
    requestAnimationFrame(() => {
      const buttonSelectors = {
        filters: '.control-dropdown-button.expanded',
        search: '.control-dropdown-button.expanded',
        legend: '.legend-toggle-button.expanded',
        share: '.network-share-button.expanded'
      };
      
      const buttonElement = document.querySelector(buttonSelectors[dropdownType]);
      if (!buttonElement) return;
      
      const dir = directions[dropdownType];
      if (!dir) return;
      
      const { width, height } = calculateAvailableSpace(buttonElement, dir.horizontal, dir.vertical, dropdownType);
      
      // Apply calculated dimensions
      buttonElement.style.maxWidth = `${width}px`;
      
      // For search dropdown, be more conservative with height constraints
      if (dropdownType === 'search') {
        // Only apply height constraint if it's significantly smaller than natural height
        const contentElement = buttonElement.querySelector('[class*="content-inline"]');
        if (contentElement) {
          const naturalHeight = contentElement.scrollHeight;
          const constrainedHeight = Math.min(height, naturalHeight + 50); // Allow some natural expansion
          
          // Force our calculated dimensions with !important to override any other constraints
          buttonElement.style.setProperty('max-height', `${constrainedHeight}px`, 'important');
          contentElement.style.setProperty('max-height', `${constrainedHeight - 32}px`, 'important');
          
          // Only add scroll if absolutely necessary
          if (constrainedHeight < naturalHeight) {
            contentElement.style.overflowY = 'auto';
          } else {
            contentElement.style.overflowY = 'visible';
          }
        }
      } else {
        // For other dropdowns, apply constraints as before
        buttonElement.style.maxHeight = `${height}px`;
        const contentElement = buttonElement.querySelector('[class*="content-inline"]');
        if (contentElement) {
          contentElement.style.maxHeight = `${height - 32}px`;
          contentElement.style.overflowY = 'auto';
        }
      }
    });
  }, [directions, calculateAvailableSpace]);

  // Helper functions to manage dropdown states - only one can be open at a time
  const closeAllDropdowns = () => {
    setShowShareDropdown(false);
    setShowFilters(false);
    setShowSearch(false);
    setShowLegend(false);
  };

  const handleDropdownContentClick = (event) => {
    // Prevent the click from bubbling up and triggering the click outside handler
    event.stopPropagation();
  };

  const handleLegendToggle = () => {
    if (showLegend) {
      // If legend is already open, clicking it should close it
      setShowLegend(false);
    } else {
      // If legend is closed, open it and close other dropdowns
      closeAllDropdowns();
      setShowLegend(true);
      // Apply collision detection after state update
      setTimeout(() => applyCollisionDetection('legend'), 0);
    }
  };

  const toggleDropdown = (dropdownType) => {
    switch (dropdownType) {
      case 'share':
        if (showShareDropdown) {
          // Close if already open
          setShowShareDropdown(false);
        } else {
          // Open and close others
          closeAllDropdowns();
          setShowShareDropdown(true);
          // Apply collision detection after state update
          setTimeout(() => applyCollisionDetection('share'), 0);
        }
        break;
      case 'filters':
        if (showFilters) {
          // Close if already open
          setShowFilters(false);
        } else {
          // Open and close others
          closeAllDropdowns();
          setShowFilters(true);
          // Apply collision detection after state update
          setTimeout(() => applyCollisionDetection('filters'), 0);
        }
        break;
      case 'search':
        if (showSearch) {
          // Close if already open
          setShowSearch(false);
        } else {
          // Open and close others
          closeAllDropdowns();
          setShowSearch(true);
          // Apply collision detection after state update
          setTimeout(() => applyCollisionDetection('search'), 0);
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
    
    setSelectedNodeDetails(node);
    setSelectedConnection(null); // Clear connection selection when selecting a node
    setShowSearch(true);
    
    // Clear edge highlighting and highlight the selected node
    if (networkRef.current) {
      try {
        console.log('Network ref available, highlighting node:', node.id);
        
        if (networkRef.current.clearHighlight) {
          networkRef.current.clearHighlight();
          console.log('Cleared highlights');
        }
        if (networkRef.current.setSelectedNode) {
          networkRef.current.setSelectedNode(node);
          console.log('Set selected node');
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
    
    // Apply collision detection immediately for consistent behavior
    // Use the same timing as direct button clicks (0ms delay)
    setTimeout(() => applyCollisionDetection('search'), 0);
  };

  const handleNodeSelect = (node) => {
    selectNode(node);
  };

  const handleNetworkNodeClick = (node) => {
    selectNode(node);
  };

  const handleCloseNodeDetails = () => {
    setSelectedNodeDetails(null);
    setSelectedConnection(null); // Clear connection selection when closing details
    
    // Clear the highlight in the network visualization
    if (networkRef.current && networkRef.current.clearHighlight) {
      networkRef.current.clearHighlight();
    }
    
    // Reset to full network view when closing details
    if (networkRef.current && networkRef.current.manualCenterNetwork) {
      setTimeout(() => {
        networkRef.current.manualCenterNetwork();
      }, 100);
    }
  };

  const handleConnectionClick = (connectedNode, connection) => {
    // When a connection is clicked, show connection details
    setSelectedConnection(connection);
    setSelectedNodeDetails(null);
    

    
    // Clear node selection in the network visualization
    if (networkRef.current && networkRef.current.clearNodeSelection) {
      networkRef.current.clearNodeSelection();
    }
    
    // Highlight the connection in the network visualization
    if (networkRef.current && networkRef.current.setSelectedEdge) {
      networkRef.current.setSelectedEdge(connection.source, connection.target);
    }
    
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
    setTimeout(() => applyCollisionDetection('search'), 0);
  };

  const handleEdgeClick = (edge) => {
    // When an edge is clicked directly in the network, show connection details
    setSelectedConnection(edge);
    setSelectedNodeDetails(null);
    

    
    // Clear node selection in the network visualization
    if (networkRef.current && networkRef.current.clearNodeSelection) {
      networkRef.current.clearNodeSelection();
    }
    
    // Highlight the connection in the network visualization
    if (networkRef.current && networkRef.current.setSelectedEdge) {
      networkRef.current.setSelectedEdge(edge.source.id, edge.target.id);
    }
    
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
    setTimeout(() => applyCollisionDetection('search'), 0);
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

  // Close dropdowns when clicking outside
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
      
      // Don't close if clicking inside dropdown content or on dropdown buttons
      if (isInsideDropdown || isOnDropdownButton) {
        return;
      }
      
      // Close all dropdowns if clicking outside
      closeAllDropdowns();
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle window resize to recalculate collision detection
  useEffect(() => {
    const handleResize = () => {
      // Recalculate collision detection for any open dropdowns
      if (showShareDropdown) applyCollisionDetection('share');
      if (showFilters) applyCollisionDetection('filters');
      if (showSearch) applyCollisionDetection('search');
      if (showLegend) applyCollisionDetection('legend');
    };

    // Debounce resize events for better performance
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [showShareDropdown, showFilters, showSearch, showLegend, applyCollisionDetection]);

  // Ensure collision detection runs whenever search state changes
  useEffect(() => {
    if (showSearch) {
      // Apply collision detection after search dropdown opens
      // Use immediate timing for consistent behavior
      setTimeout(() => applyCollisionDetection('search'), 0);
    }
  }, [showSearch, applyCollisionDetection]);

  return (
    <ThemeProvider>
      <div className="network-only">
        {/* Top Right Corner Controls */}
        <div className="top-right-controls">
          <ThemeToggle />
          {/* Share Button */}
          <button 
            className={`network-share-button ${showShareDropdown ? 'expanded' : ''}`}
            onClick={() => toggleDropdown('share')}
            title="Share"
          >
            {!showShareDropdown && (
              <svg className="network-share-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
              </svg>
            )}
            
            {showShareDropdown && (
              <div className="network-share-dropdown-content-inline" onClick={handleDropdownContentClick}>
                <h5 className="network-share-dropdown-title">Share</h5>
                <button 
                  className="network-share-option" 
                  onClick={handleCopyLink}
                >
                  <svg className="network-share-option-icon" viewBox="0 0 24 24" fill="currentColor">
                    {linkCopied ? (
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    ) : (
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    )}
                  </svg>
                  {linkCopied ? 'Link Copied!' : 'Copy Link'}
                </button>
                <button 
                  className="network-share-option" 
                  onClick={handleTwitterShare}
                >
                  <svg className="network-share-option-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Share on Twitter
                </button>
                <button 
                  className="network-share-option" 
                  onClick={handleLinkedInShare}
                >
                  <svg className="network-share-option-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Share on LinkedIn
                </button>
              </div>
            )}
          </button>
        </div>

        {/* Main Controls - Top Left */}
        <div className="main-controls-panel">
          {/* Center Network Button */}
          <button 
            className="control-button center-button"
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

          {/* Zoom In Button */}
          <button 
            className="control-button zoom-button"
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

          {/* Zoom Out Button */}
          <button 
            className="control-button zoom-button"
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

          {/* Filters Dropdown */}
          <div className="control-dropdown">
            <button 
              className={`control-dropdown-button ${showFilters ? 'expanded' : ''}`}
              onClick={() => toggleDropdown('filters')}
              title="Filters"
            >
              {!showFilters && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
                </svg>
              )}
              
              {showFilters && (
                <div className="control-dropdown-content-inline" onClick={handleDropdownContentClick}>
                  <div className="filter-group">
                    <h5>Organization Type</h5>
                    <div className="filter-checkboxes">
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

          {/* Search Dropdown */}
          <div className="control-dropdown">
            <button 
              className={`control-dropdown-button ${showSearch ? 'expanded' : ''}`}
              onClick={() => toggleDropdown('search')}
              title="Search"
            >
              {!showSearch && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              )}
              
              {showSearch && (
                <div className="control-dropdown-content-inline" onClick={handleDropdownContentClick}>
                  <h5 className="search-dropdown-title">{getSearchDropdownTitle()}</h5>
                  
                  {!selectedNodeDetails && !selectedConnection ? (
                    <>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search organizations..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                      {searchResults.length > 0 && (
                        <div className="search-results">
                          <div className="search-results-list">
                            {searchResults.map((result, index) => (
                              <div 
                                key={index} 
                                className="search-result-item clickable"
                                onClick={() => handleNodeSelect(result)}
                              >
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
                      <div className="connection-details">
                        <div className="details-content">
                          <div className="details-section">
                            <div className="section-header-with-close">
                              <h4>Connected Organizations</h4>
                              <button 
                                className="details-close"
                                onClick={handleCloseNodeDetails}
                                title="Close"
                              >
                                ×
                              </button>
                            </div>
                            <div className="connected-organizations">
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
                                      <div 
                                        className="org-item clickable"
                                        onClick={() => selectNode(sourceNode)}
                                        style={{ cursor: 'pointer' }}
                                        title="Click to highlight this organization"
                                      >
                                        <div className="org-node-color" style={{backgroundColor: getOrganizationTypeColor(sourceNode?.type)}}></div>
                                        <div className="org-content">
                                          <div className="org-name">
                                            {sourceNode?.name || sourceId}
                                            {sourceNode?.website && (
                                              <a 
                                                href={sourceNode.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="org-website-link"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                ↗
                                              </a>
                                            )}
                                          </div>
                                          <div className="org-type">{formatOrganizationType(sourceNode?.type)}</div>
                                        </div>
                                      </div>
                                      <div 
                                        className="org-item clickable"
                                        onClick={() => selectNode(targetNode)}
                                        style={{ cursor: 'pointer' }}
                                        title="Click to highlight this organization"
                                      >
                                        <div className="org-node-color" style={{backgroundColor: getOrganizationTypeColor(targetNode?.type)}}></div>
                                        <div className="org-content">
                                          <div className="org-name">
                                            {targetNode?.name || targetId}
                                            {targetNode?.website && (
                                              <a 
                                                href={targetNode.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="org-website-link"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                ↗
                                              </a>
                                            )}
                                          </div>
                                          <div className="org-type">{formatOrganizationType(targetNode?.type)}</div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                }
                                
                                return <p className="no-connections">Loading organizations...</p>;
                              })()}
                            </div>
                          </div>
                          
                          <div className="details-section">
                            <h4>Relationship Type</h4>
                            <p className="relationship-type">
                              {selectedConnection.type.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </p>
                          </div>
                          
                          {selectedConnection.description && (
                            <div className="details-section">
                              <h4>Description</h4>
                              <p className="relationship-description">{selectedConnection.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                  ) : (
                    <div className="node-details">
                      <div className="details-header">
                        <h3>{selectedNodeDetails.name}</h3>
                        <button 
                          className="details-close"
                          onClick={handleCloseNodeDetails}
                          title="Close"
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="details-content">
                        <p 
                          className="node-type clickable" 
                          onClick={() => {
                            // Search for all organizations of this type
                            const typeQuery = formatOrganizationType(selectedNodeDetails.type);
                            setSearchQuery(typeQuery);
                            handleSearch(typeQuery);
                          }}
                          title={`Click to see all ${formatOrganizationType(selectedNodeDetails.type)} organizations`}
                        >
                          {formatOrganizationType(selectedNodeDetails.type)}
                        </p>
                        {selectedNodeDetails.description && (
                          <p className="node-description">{selectedNodeDetails.description}</p>
                        )}
                        
                        {selectedNodeDetails.website && (
                          <div className="details-section">
                            <h4>Website</h4>
                            <a 
                              href={selectedNodeDetails.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="website-link"
                            >
                              {selectedNodeDetails.website.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        )}
                        
                        {selectedNodeDetails.keyPersonnel && selectedNodeDetails.keyPersonnel.length > 0 && (
                          <div className="details-section">
                            <h4>Key Personnel</h4>
                            <ul className="personnel-list">
                                                              {selectedNodeDetails.keyPersonnel.map((person, index) => (
                                  <li key={index}>
                                    {typeof person === 'string' ? person : person.name}
                                    {typeof person === 'object' && person.linkedin && (
                                      <a 
                                        href={person.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="linkedin-link"
                                      >
                                        LinkedIn
                                      </a>
                                    )}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                        
                        {selectedNodeDetails.recentNews && (
                          <div className="details-section">
                            <h4>Recent Developments</h4>
                            <p className="recent-news">{selectedNodeDetails.recentNews}</p>
                          </div>
                        )}
                        
                        {/* Connections List */}
                        <div className="details-section">
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
                                return <p className="no-connections">No connections found.</p>;
                              }
                              
                              return (
                                <div className="connections-list">
                                  {nodeConnections.map((connection, index) => {
                                    // Determine the connected node (not the selected one)
                                    const connectedNodeId = connection.source === selectedNodeDetails.id ? connection.target : connection.source;
                                    const connectedNode = networkRef.current.getNetworkData().nodes.find(n => n.id === connectedNodeId);
                                    
                                    if (!connectedNode) return null;
                                    
                                    return (
                                      <div 
                                        key={index} 
                                        className="connection-item clickable"
                                        onClick={() => handleConnectionClick(connectedNode, connection)}
                                      >
                                        <div className="connection-header">
                                          <div className="connection-node-color" style={{backgroundColor: getOrganizationTypeColor(connectedNode.type)}}></div>
                                          <div className="connection-content">
                                            <div className="connection-name">
                                              {connectedNode.name}
                                              {connectedNode.website && (
                                                <a 
                                                  href={connectedNode.website} 
                                                  target="_blank" 
                                                  rel="noopener noreferrer"
                                                  className="connection-website-link"
                                                  onClick={(e) => e.stopPropagation()}
                                                >
                                                  ↗
                                                </a>
                                              )}
                                            </div>
                                            <div className="connection-type">{formatOrganizationType(connectedNode.type)}</div>
                                          </div>
                                        </div>
                                        <div className="connection-relationship">
                                          <span className="relationship-label">Relationship:</span>
                                          <span className="relationship-type">
                                            {connection.type.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                          </span>
                                        </div>
                                        {connection.description && (
                                          <div className="connection-description">
                                            {connection.description}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            }
                            
                            return <p className="no-connections">Loading connections...</p>;
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

        {/* Network Stats - Bottom Right */}
        <div className="network-stats-bottom-right">
          <div className="stats-item">
            <span className="stat-label">Organizations:</span>
            <span className="stat-value">117</span>
          </div>
          <div className="stats-item">
            <span className="stat-label">Connections:</span>
            <span className="stat-value">203</span>
          </div>
          <div className="stats-item">
            <span className="stat-label">Updated:</span>
            <span className="stat-value">August 2025</span>
          </div>
        </div>

        {/* Collapsible Legend - Bottom Left */}
        <div className="fixed-legend">
          <button 
            className={`legend-toggle-button ${showLegend ? 'expanded' : ''}`}
            onClick={handleLegendToggle}
            title={showLegend ? "Hide Legend" : "Show Legend"}
          >
            {!showLegend && <span>Legend</span>}
            
            {showLegend && (
              <div className="legend-content-inline" onClick={handleDropdownContentClick}>
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
                
                <div className="legend-section">
                  <h5>Relationship Types</h5>
                  <div className="legend-items">
                    <div className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: '#ff6b6b', width: '20px', height: '3px' }}></div>
                      <span>Spinout</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: '#4ecdc4', width: '20px', height: '3px' }}></div>
                      <span>Investment</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: '#45b7d1', width: '20px', height: '3px' }}></div>
                      <span>Collaboration</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: '#96ceb4', width: '20px', height: '3px' }}></div>
                      <span>Partnership</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: '#ffeaa7', width: '20px', height: '3px' }}></div>
                      <span>Service</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: '#dda0dd', width: '20px', height: '3px' }}></div>
                      <span>Support</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: '#9b59b6', width: '20px', height: '3px' }}></div>
                      <span>Education Program</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Full Screen Network Visualization - No Box */}
        <div className="network-fullscreen">
          <NetworkVisualization 
            hideUI={true}
            ref={networkRef}
            onNodeClick={handleNetworkNodeClick}
            onEdgeClick={handleEdgeClick}
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
      </div>
    </ThemeProvider>
  );
}

export default NetworkOnly;
