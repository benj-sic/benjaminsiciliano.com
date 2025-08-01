import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { atlantaBiotechEcosystem, nodeTypeMap, nodeColors } from '../atlanta_biotech_data.js';
import { useTheme } from '../contexts/ThemeContext';
import './NetworkVisualization.css';

const NetworkVisualization = () => {
  const { theme } = useTheme();
  const svgRef = useRef();
  const containerRef = useRef();
  const simulationRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [connectedNodes, setConnectedNodes] = useState(new Set());
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [edgeConnectedNodes, setEdgeConnectedNodes] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const selectedNodeRef = useRef(null);
  const [lastCommitDate, setLastCommitDate] = useState('July 2025');
  
  // Function to fetch last git commit date
  const fetchLastCommitDate = useCallback(async () => {
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
  }, []);

  // Fetch last commit date on component mount
  useEffect(() => {
    fetchLastCommitDate();
  }, [fetchLastCommitDate]);
  
  // Sidebar state
  const [showControls, setShowControls] = useState(true); // Controls open by default
  const [showFilters, setShowFilters] = useState(false); // Collapsed by default
  const [showLegend, setShowLegend] = useState(false); // Collapsed by default
  const [showSearch, setShowSearch] = useState(false); // Collapsed by default
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Detect mobile device
  const isMobile = useMemo(() => {
    const mobile = window.innerWidth <= 768;
    console.log('Mobile detection:', mobile, 'Window width:', window.innerWidth);
    return mobile;
  }, []);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      const newMobile = window.innerWidth <= 768;
      console.log('Window resized - new mobile state:', newMobile, 'Window width:', window.innerWidth);
      
      // Don't automatically change control states on resize
      // Let users manually expand the controls they need
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set mobile states when isMobile changes
  useEffect(() => {
    console.log('isMobile changed to:', isMobile);
    // Keep controls collapsed by default on both mobile and desktop
    // Users can manually expand the controls they need
    setShowFilters(false);
    setShowLegend(false);
    setShowSearch(false);
    // Note: showControls is now open by default, so we don't set it to false here
    console.log('Controls open by default on all screen sizes');
  }, [isMobile]);

  // Initialize zoom level from URL parameters
  const getInitialZoomLevel = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const zoomParam = urlParams.get('zoom');
    return zoomParam ? parseFloat(zoomParam) : 0.25; // Start at 25% zoom for better initial view
  };

  const [zoomLevel, setZoomLevel] = useState(getInitialZoomLevel);
  // Initialize filters from URL parameters or defaults
  const getInitialFilters = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParams = urlParams.getAll('filter');
    
    const defaultFilters = {
      companies: true,
      startups: true,  // Added startups filter
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
    };
    
    // If URL has filter parameters, only enable those
    if (filterParams.length > 0) {
      const enabledFilters = {};
      Object.keys(defaultFilters).forEach(key => {
        enabledFilters[key] = filterParams.includes(key);
      });
      return enabledFilters;
    }
    
    return defaultFilters;
  };

  const [filters, setFilters] = useState(getInitialFilters);

  // Store zoom behavior reference
  const zoomBehaviorRef = useRef(null);

  // Real Atlanta Biotech ecosystem data
  const networkData = atlantaBiotechEcosystem;
  
  // Helper function to get the selected edge object from the ID
  const getSelectedEdge = useMemo(() => {
    if (!selectedEdgeId) return null;
    return networkData.links.find(link => {
      const sourceId = link.source;
      const targetId = link.target;
      const linkId = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
      return linkId === selectedEdgeId;
    });
  }, [selectedEdgeId, networkData.links]);

  // Use imported color scheme and type mapping
  const typeMap = nodeTypeMap;
  
  // Theme-aware color scheme
  const getNodeColor = (nodeType) => {
    const baseColor = nodeColors[typeMap[nodeType]];
    if (!baseColor) return theme === 'dark' ? '#ffffff' : '#000000';
    
    if (theme === 'light') {
      // Convert dark colors to lighter versions for better readability
      const colorMap = {
        '#0033A0': '#4A90E2', // Academia & Research - Lighter Blue
        '#0D6A42': '#4CAF50', // Company - Lighter Green
        '#F2A900': '#FFD54F', // Investor - Lighter Gold
        '#A43533': '#E57373', // Accelerator & Incubator - Lighter Red
        '#5A2D81': '#BA68C8', // Government & Trade Org - Lighter Purple
        '#545454': '#9E9E9E', // Service Provider - Lighter Gray
        '#00AEEF': '#81D4FA', // Startup - Lighter Blue
        '#7C9A7A': '#A5D6A7', // Provider & Health System - Lighter Sage
      };
      return colorMap[baseColor] || baseColor;
    }
    
    return baseColor;
  };

  // Enhanced link styling based on type with new relationship types
  const getLinkStyle = (linkType) => {
    switch (linkType) {
      case 'spinout':
        return {
          stroke: '#ff6b6b',
          strokeWidth: 6,
          strokeDasharray: 'none',
          opacity: 0.8
        };
      case 'investment':
        return {
          stroke: '#4ecdc4',
          strokeWidth: 6,
          strokeDasharray: '8,4',
          opacity: 0.7
        };
      case 'collaboration':
        return {
          stroke: '#45b7d1',
          strokeWidth: 6,
          strokeDasharray: 'none',
          opacity: 0.6
        };
      case 'research_collaboration':
        return {
          stroke: '#45b7d1',
          strokeWidth: 6,
          strokeDasharray: 'none',
          opacity: 0.6
        };
      case 'partnership':
        return {
          stroke: '#96ceb4',
          strokeWidth: 6,
          strokeDasharray: '2,2',
          opacity: 0.6
        };
      case 'service':
        return {
          stroke: '#ff8c42',
          strokeWidth: 6,
          strokeDasharray: '3,3',
          opacity: 0.7
        };
      case 'support':
        return {
          stroke: '#dda0dd',
          strokeWidth: 6,
          strokeDasharray: '8,4',
          opacity: 0.6
        };
      case 'affiliation':
        return {
          stroke: '#a8e6cf',
          strokeWidth: 4,
          strokeDasharray: 'none',
          opacity: 0.5
        };
      case 'pilot':
        return {
          stroke: '#ffd93d',
          strokeWidth: 6,
          strokeDasharray: '4,4',
          opacity: 0.7
        };
      case 'funding':
        return {
          stroke: '#6c5ce7',
          strokeWidth: 6,
          strokeDasharray: '6,3',
          opacity: 0.7
        };
      case 'membership':
        return {
          stroke: '#fd79a8',
          strokeWidth: 4,
          strokeDasharray: '2,2',
          opacity: 0.5
        };
      case 'development':
        return {
          stroke: '#00b894',
          strokeWidth: 6,
          strokeDasharray: 'none',
          opacity: 0.6
        };
      case 'technology':
        return {
          stroke: '#fdcb6e',
          strokeWidth: 6,
          strokeDasharray: '3,3',
          opacity: 0.7
        };
      case 'industry':
        return {
          stroke: '#e17055',
          strokeWidth: 6,
          strokeDasharray: 'none',
          opacity: 0.6
        };
      case 'tenant':
        return {
          stroke: '#74b9ff',
          strokeWidth: 4,
          strokeDasharray: 'none',
          opacity: 0.5
        };
      case 'origin':
        return {
          stroke: '#a29bfe',
          strokeWidth: 6,
          strokeDasharray: '8,4',
          opacity: 0.7
        };
      case 'founding_support':
        return {
          stroke: '#fd79a8',
          strokeWidth: 6,
          strokeDasharray: '4,4',
          opacity: 0.7
        };
      case 'education_program':
        return {
          stroke: '#9b59b6',
          strokeWidth: 6,
          strokeDasharray: '6,3',
          opacity: 0.7
        };
      default:
        return {
          stroke: '#a0a0a0',
          strokeWidth: 6,
          strokeDasharray: 'none',
          opacity: 0.4
        };
    }
  };

  // Performance optimization: Debounced filter updates
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [filters]);

  // Create filter mapping
  const filterMapping = useMemo(() => ({
    'university': 'universities',
    'company': 'companies',
    'public_company': 'companies',
    'startup': 'startups',  // Changed from 'companies' to 'startups'
    'vc': 'vcs',
    'incubator': 'incubators',
    'accelerator': 'incubators',
    'facility': 'facilities',
    'health_system': 'healthSystems',
    'serviceProvider': 'serviceProviders',
    'government': 'government',
    'trade': 'trade',
    'development': 'development',
    'community': 'communityBuilders'
  }), []);

  // Center network function with improved visibility
  const centerNetwork = useCallback(() => {
    // Hide the plot immediately when centering starts
    setIsLoading(true);
    
    // Also hide the SVG immediately for instant effect
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.style("opacity", "0");
    }
    
    if (svgRef.current && zoomBehaviorRef.current) {
      const svg = d3.select(svgRef.current);
      const width = svg.node().getBoundingClientRect().width;
      const height = svg.node().getBoundingClientRect().height;
      
      // Get the actual bounds of the network nodes
      const nodes = svg.selectAll(".node").nodes();
      if (nodes.length > 0) {
        // Calculate bounds including label radius for each node (same method as zoomToSubnetwork)
        const bounds = nodes.map(n => {
          const labelPadding = isMobile ? 15 : 25;
          const nodeRadius = Math.max(parseFloat(n.r.baseVal.value), 16);
          
          // Estimate label dimensions based on node data
          const fontSize = isMobile ? 20 : 28;
          // We need to get the node name from the data, but we only have the DOM element
          // For now, use a reasonable estimate
          const estimatedLabelWidth = 150; // Conservative estimate
          const estimatedLabelHeight = fontSize * 1.2;
          
          // Calculate label radius using same logic as collision detection
          const labelRadiusX = (estimatedLabelWidth / 2) + labelPadding;
          const labelRadiusY = (estimatedLabelHeight / 2) + labelPadding;
          const totalRadius = Math.max(labelRadiusX, labelRadiusY, nodeRadius + labelPadding);
          
          return {
            left: n.cx.baseVal.value - totalRadius,
            right: n.cx.baseVal.value + totalRadius,
            top: n.cy.baseVal.value - totalRadius,
            bottom: n.cy.baseVal.value + totalRadius
          };
        });
        
        // Find the overall bounds
        const minX = Math.min(...bounds.map(b => b.left));
        const maxX = Math.max(...bounds.map(b => b.right));
        const minY = Math.min(...bounds.map(b => b.top));
        const maxY = Math.max(...bounds.map(b => b.bottom));
        
        // Calculate the center of the network
        const networkCenterX = (minX + maxX) / 2;
        const networkCenterY = (minY + maxY) / 2;
        
        // Calculate the dimensions of the network
        const networkWidth = maxX - minX;
        const networkHeight = maxY - minY;
        
        // Add minimal padding around the network
        const padding = 10; // Very minimal padding
        
        // Calculate the scale to fit the network in the viewport
        const scaleX = (width - padding * 2) / networkWidth;
        const scaleY = (height - padding * 2) / networkHeight;
        const scale = Math.min(scaleX, scaleY);
        
        // Calculate the transform to center the network in the viewport
        // Adjust the Y translation to center properly
        const transform = d3.zoomIdentity
          .translate(width / 2 - networkCenterX * scale, height / 2 - networkCenterY * scale)
          .scale(scale);
        
        // Apply the transform with a smooth transition
        svg.transition()
          .duration(500)
          .call(zoomBehaviorRef.current.transform, transform);
      } else {
        // Fallback to simple centering if no nodes
        const transform = d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(0.25); // 25% zoom fallback
        
        svg.transition()
          .duration(500)
          .call(zoomBehaviorRef.current.transform, transform);
      }
    }
  }, [isMobile]);

  // Manual center network function (doesn't hide the plot)
  const manualCenterNetwork = useCallback(() => {
    if (svgRef.current && zoomBehaviorRef.current && simulationRef.current) {
      const svg = d3.select(svgRef.current);
      const width = svg.node().getBoundingClientRect().width;
      const height = svg.node().getBoundingClientRect().height;
      
      // Get the simulation data for all visible nodes (filtered nodes)
      const nodes = simulationRef.current.nodes();
      if (nodes.length > 0) {
        // Calculate bounds including label radius for each node (same method as zoomToSubnetwork)
        const bounds = nodes.map(n => {
          const labelPadding = isMobile ? 15 : 25;
          const nodeRadius = Math.max(n.size * (isMobile ? 2.5 : 3.5), 16);
          
          // Estimate label dimensions
          const fontSize = isMobile ? 20 : 28;
          const avgCharWidth = fontSize * 0.6;
          const estimatedLabelWidth = Math.max(n.name.length * avgCharWidth, 100);
          const estimatedLabelHeight = fontSize * 1.2;
          
          // Calculate label radius using same logic as collision detection
          const labelRadiusX = (estimatedLabelWidth / 2) + labelPadding;
          const labelRadiusY = (estimatedLabelHeight / 2) + labelPadding;
          const totalRadius = Math.max(labelRadiusX, labelRadiusY, nodeRadius + labelPadding);
          
          return {
            left: n.x - totalRadius,
            right: n.x + totalRadius,
            top: n.y - totalRadius,
            bottom: n.y + totalRadius
          };
        });
        
        // Find the overall bounds
        const minX = Math.min(...bounds.map(b => b.left));
        const maxX = Math.max(...bounds.map(b => b.right));
        const minY = Math.min(...bounds.map(b => b.top));
        const maxY = Math.max(...bounds.map(b => b.bottom));
        
        // Calculate the center of the network
        const networkCenterX = (minX + maxX) / 2;
        const networkCenterY = (minY + maxY) / 2;
        
        // Calculate the dimensions of the network
        const networkWidth = maxX - minX;
        const networkHeight = maxY - minY;
        
        // Add minimal padding around the network
        const padding = 10; // Very minimal padding
        
        // Calculate the scale to fit the network in the viewport
        const scaleX = (width - padding * 2) / networkWidth;
        const scaleY = (height - padding * 2) / networkHeight;
        const scale = Math.min(scaleX, scaleY);
        
        // Calculate the transform to center the network in the viewport
        const transform = d3.zoomIdentity
          .translate(width / 2 - networkCenterX * scale, height / 2 - networkCenterY * scale)
          .scale(scale);
        
        // Apply the transform with a smooth transition
        svg.transition()
          .duration(500)
          .call(zoomBehaviorRef.current.transform, transform);
        
        // Update zoom level state
        setZoomLevel(scale);
      } else {
        // Fallback to simple centering if no nodes
        const transform = d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(0.25); // 25% zoom fallback
        
        svg.transition()
          .duration(500)
          .call(zoomBehaviorRef.current.transform, transform);
        
        // Update zoom level state
        setZoomLevel(0.25);
      }
    }
  }, [isMobile]);

  // Zoom functions
  const zoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current && zoomLevel < 1.0) {
      const newZoomLevel = Math.min(zoomLevel + 0.1, 1.0); // 10% step, max 100%
      setZoomLevel(newZoomLevel);
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleTo, newZoomLevel);
    }
  };

  const zoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current && zoomLevel > 0.1) {
      const newZoomLevel = Math.max(zoomLevel - 0.1, 0.1); // 10% step, minimum 10%
      setZoomLevel(newZoomLevel);
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleTo, newZoomLevel);
    }
  };

  // Helper function to calculate base zoom level using outermost node/label plus padding method
  const calculateBaseZoomLevel = useCallback(() => {
    if (!svgRef.current || !simulationRef.current) return 0.25; // Fallback
    
    const svg = d3.select(svgRef.current);
    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;
    
    // Get the simulation data for all visible nodes
    const nodes = simulationRef.current.nodes();
    if (nodes.length === 0) return 0.25; // Fallback
    
    // Calculate bounds including label radius for each node (same method as zoomToSubnetwork)
    const bounds = nodes.map(n => {
      const labelPadding = isMobile ? 15 : 25;
      const nodeRadius = Math.max(n.size * (isMobile ? 2.5 : 3.5), 16);
      
      // Estimate label dimensions
      const fontSize = isMobile ? 20 : 28;
      const avgCharWidth = fontSize * 0.6;
      const estimatedLabelWidth = Math.max(n.name.length * avgCharWidth, 100);
      const estimatedLabelHeight = fontSize * 1.2;
      
      // Calculate label radius using same logic as collision detection
      const labelRadiusX = (estimatedLabelWidth / 2) + labelPadding;
      const labelRadiusY = (estimatedLabelHeight / 2) + labelPadding;
      const totalRadius = Math.max(labelRadiusX, labelRadiusY, nodeRadius + labelPadding);
      
      return {
        left: n.x - totalRadius,
        right: n.x + totalRadius,
        top: n.y - totalRadius,
        bottom: n.y + totalRadius
      };
    });
    
    // Find the overall bounds
    const minX = Math.min(...bounds.map(b => b.left));
    const maxX = Math.max(...bounds.map(b => b.right));
    const minY = Math.min(...bounds.map(b => b.top));
    const maxY = Math.max(...bounds.map(b => b.bottom));
    
    // Calculate the dimensions of the network
    const networkWidth = maxX - minX;
    const networkHeight = maxY - minY;
    
    // Add minimal padding around the network
    const padding = 10; // Very minimal padding
    
    // Calculate the scale to fit the network in the viewport
    const scaleX = (width - padding * 2) / networkWidth;
    const scaleY = (height - padding * 2) / networkHeight;
    const scale = Math.min(scaleX, scaleY);
    
    return scale;
  }, [isMobile]);

  // Zoom to subnetwork function
  const zoomToSubnetwork = useCallback((node) => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;
    
    // Find all connected nodes (the selected node + its immediate connections)
    const connectedNodeIds = new Set([node.id]);
    
    // Special handling for edge connections
    if (node.id === 'edge-center') {
      // For edge connections, only include the two nodes directly connected by this edge
      const sourceId = node.sourceId;
      const targetId = node.targetId;
      
      if (sourceId && targetId) {
        connectedNodeIds.add(sourceId);
        connectedNodeIds.add(targetId);
        // Don't add other connected nodes - just focus on the two nodes of this edge
      }
    } else {
      // Normal node selection
      networkData.links.forEach(link => {
        // Handle both string IDs and node objects in links
        const linkSource = typeof link.source === 'string' ? link.source : link.source.id;
        const linkTarget = typeof link.target === 'string' ? link.target : link.target.id;
        
        if (linkSource === node.id || linkTarget === node.id) {
          connectedNodeIds.add(linkSource);
          connectedNodeIds.add(linkTarget);
        }
      });
    }
    
    // Get the simulation data for connected nodes
    const connectedNodes = simulationRef.current.nodes().filter(d => connectedNodeIds.has(d.id));
    
    if (connectedNodes.length === 0) return;
    

    
    // Calculate bounds including label radius for each node (using same logic as collision detection)
    const bounds = connectedNodes.map(n => {
      // Use the same label radius calculation as collision detection, but with reduced padding for zoom
      const labelPadding = isMobile ? 15 : 25; // Reduced padding for zoom calculation
      const nodeRadius = Math.max(n.size * (isMobile ? 2.5 : 3.5), 16);
      
      // Estimate label dimensions
      const fontSize = isMobile ? 20 : 28;
      const avgCharWidth = fontSize * 0.6;
      const estimatedLabelWidth = Math.max(n.name.length * avgCharWidth, 100);
      const estimatedLabelHeight = fontSize * 1.2;
      
      // Calculate label radius using same logic as collision detection
      const labelRadiusX = (estimatedLabelWidth / 2) + labelPadding;
      const labelRadiusY = (estimatedLabelHeight / 2) + labelPadding;
      const totalRadius = Math.max(labelRadiusX, labelRadiusY, nodeRadius + labelPadding);
      

      
      return {
        left: n.x - totalRadius,
        right: n.x + totalRadius,
        top: n.y - totalRadius,
        bottom: n.y + totalRadius
      };
    });
    

    
    // Find the overall bounds
    const minX = Math.min(...bounds.map(b => b.left));
    const maxX = Math.max(...bounds.map(b => b.right));
    const minY = Math.min(...bounds.map(b => b.top));
    const maxY = Math.max(...bounds.map(b => b.bottom));
    
    // Calculate the center of the subnetwork
    const subnetworkCenterX = (minX + maxX) / 2;
    const subnetworkCenterY = (minY + maxY) / 2;
    
    // Calculate the dimensions of the subnetwork
    const subnetworkWidth = maxX - minX;
    const subnetworkHeight = maxY - minY;
    
    // Add minimal padding around the subnetwork - nodes should be just barely within the window
    const padding = 10; // Very minimal padding to make network more manageable
    
    // Calculate the scale to fit the subnetwork in the viewport
    const scaleX = (width - padding * 2) / subnetworkWidth;
    const scaleY = (height - padding * 2) / subnetworkHeight;
    let scale = Math.min(scaleX, scaleY);
    
    // Apply zoom bounds using dynamic base zoom level
    const baseZoomLevel = calculateBaseZoomLevel();
    const minScale = baseZoomLevel; // Minimum zoom (same as center/reset zoom)
    const maxScale = baseZoomLevel * 2; // Maximum zoom (2x center/reset zoom) for large subnetworks
    scale = Math.max(scale, minScale);
    scale = Math.min(scale, maxScale);
    
    // Debug logging for subnetworks
    if (connectedNodes.length > 5) {
      console.log(`Zooming to subnetwork for ${node.name}:`, {
        nodeCount: connectedNodes.length,
        subnetworkWidth: Math.round(subnetworkWidth),
        subnetworkHeight: Math.round(subnetworkHeight),
        viewportWidth: width,
        viewportHeight: height,
        padding,
        labelPadding: isMobile ? 15 : 25,
        bounds: bounds.length,
        baseZoomLevel,
        minScale,
        maxScale,
        finalScale: scale,
        originalScaleX: scaleX,
        originalScaleY: scaleY,
        sampleBounds: bounds.slice(0, 3).map(b => ({
          left: Math.round(b.left),
          right: Math.round(b.right),
          top: Math.round(b.top),
          bottom: Math.round(b.bottom)
        }))
      });
    }
    
    // Calculate the transform to center the subnetwork in the viewport
    const transform = d3.zoomIdentity
      .translate(width / 2 - subnetworkCenterX * scale, height / 2 - subnetworkCenterY * scale)
      .scale(scale);
    
    // Apply the transform with a smooth transition
    svg.transition()
      .duration(800)
      .call(zoomBehaviorRef.current.transform, transform);
    
    // Update zoom level state
    setZoomLevel(scale);
  }, [networkData.links, calculateBaseZoomLevel, isMobile]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    setIsLoading(true);
    
    // Hide SVG immediately for instant effect
    const svg = d3.select(svgRef.current);
    svg.style("opacity", "0");
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Clear previous content
    svg.selectAll("*").remove();

    // Update SVG dimensions to match container
    svg.attr("width", width).attr("height", height);

    // Filter nodes based on current filters
    const filteredNodes = networkData.nodes.filter(node => {
      return debouncedFilters[filterMapping[node.type]];
    });

    const filteredLinks = networkData.links.filter(link => {
      const sourceNode = filteredNodes.find(n => n.id === link.source);
      const targetNode = filteredNodes.find(n => n.id === link.target);
      return sourceNode && targetNode;
    });

    // Process links to ensure they reference valid nodes
    const processedLinks = filteredLinks.map(link => {
      const sourceNode = filteredNodes.find(n => n.id === link.source);
      const targetNode = filteredNodes.find(n => n.id === link.target);
      return {
        ...link,
        source: sourceNode,
        target: targetNode
      };
    }).filter(link => link.source && link.target);

    // Calculate cluster positions for better organization
    const clusterPositions = {};
    const nodeTypes = [...new Set(filteredNodes.map(n => n.type))];
    const clustersPerRow = Math.ceil(Math.sqrt(nodeTypes.length));
    
    nodeTypes.forEach((type, index) => {
      const row = Math.floor(index / clustersPerRow);
      const col = index % clustersPerRow;
      clusterPositions[type] = {
        x: (col + 0.5) * (width / clustersPerRow),
        y: (row + 0.5) * (height / Math.ceil(nodeTypes.length / clustersPerRow))
      };
    });

    // Create force simulation
    const simulation = d3.forceSimulation(filteredNodes)
      .force("link", d3.forceLink(processedLinks).id(d => d.id).distance(isMobile ? 200 : 280))
      .force("charge", d3.forceManyBody().strength(isMobile ? -300 : -500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => Math.max(d.size * (isMobile ? 2.5 : 3.5), 16) + (isMobile ? 15 : 25)))
      .force("x", d3.forceX(d => clusterPositions[d.type]?.x || width / 2).strength(0.1))
      .force("y", d3.forceY(d => clusterPositions[d.type]?.y || height / 2).strength(0.1));
    
    // Store simulation reference
    simulationRef.current = simulation;

    // Create a zoom group that contains all the network elements
    const zoomGroup = svg.append("g").attr("class", "zoom-group");

    // Create links in zoom group
    const links = zoomGroup.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(processedLinks)
      .enter().append("line")
      .attr("stroke", d => getLinkStyle(d.type).stroke)
      .attr("stroke-width", d => getLinkStyle(d.type).strokeWidth)
      .attr("stroke-dasharray", d => getLinkStyle(d.type).strokeDasharray)
      .attr("opacity", d => getLinkStyle(d.type).opacity)
      .style("pointer-events", "auto")
      .style("cursor", "pointer")
      .attr("class", d => {
        const createEdgeId = (edge) => {
          const sourceId = edge.source.id;
          const targetId = edge.target.id;
          return sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
        };
        const currentEdgeId = createEdgeId(d);
        const isHighlighted = currentEdgeId === selectedEdgeId;
        if (isHighlighted) {
          console.log('Highlighting edge:', d.source.id, '->', d.target.id, 'with ID:', currentEdgeId);
        }
        return `link ${isHighlighted ? 'link-highlighted' : ''}`;
      })
      .on("click", function(event, d) {
        event.stopPropagation(); // Prevent bubbling to container
        console.log('D3 link click event:', d.source.id, '->', d.target.id);
        handleEdgeClick(d, event);
      });

    // Create nodes in zoom group with mobile-optimized sizes
    const nodes = zoomGroup.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(filteredNodes)
      .enter().append("circle")
      .attr("r", d => Math.max(d.size * (isMobile ? 2.5 : 3.5), 16)) // Smaller nodes on mobile
      .attr("fill", d => getNodeColor(d.type))
      .style("cursor", "pointer")
      .style("filter", isMobile ? "none" : (theme === 'dark' ? "drop-shadow(0 0 8px rgba(255,255,255,0.5))" : "drop-shadow(0 0 8px rgba(0,0,0,0.4))")) // Remove shadows on mobile
      .attr("class", d => `node ${selectedNode && selectedNode.id === d.id ? 'node-highlighted' : ''}`)
      .on("click", function(event, d) {
        event.stopPropagation(); // Prevent bubbling to container
        console.log('D3 node click event:', d.id);
        handleNodeClick(d, event);
      });




    // Create labels in zoom group with enhanced readability
    const labels = zoomGroup.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(filteredNodes)
      .enter().append("text")
      .text(d => d.name)
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", theme === 'dark' ? "#fff" : "#1a1a1a") // Darker text for light theme
      .attr("font-size", isMobile ? "20px" : "28px") // Smaller font on mobile
      .attr("font-weight", "800") // Bolder font weight
      .style("pointer-events", "auto")
      .style("cursor", "pointer")
      .style("text-shadow", isMobile ? "none" : (theme === 'dark' ? 
        "1px 1px 2px rgba(0,0,0,0.6)" : 
        "1px 1px 2px rgba(255,255,255,0.7)")) // Reduced text shadows
      .style("font-family", "system-ui, -apple-system, sans-serif")
      .style("stroke", theme === 'dark' ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)") // Text outline
      .style("stroke-width", "0.3px") // Thinner outline for better contrast
      .attr("class", d => `label ${selectedNode && selectedNode.id === d.id ? 'label-highlighted' : ''}`)
      .on("click", function(event, d) {
        event.stopPropagation(); // Prevent bubbling to container
        console.log('D3 label click event:', d.id);
        handleNodeClick(d, event);
      });

    // Update collision detection with actual label measurements after labels are rendered
    setTimeout(() => {
      // Create a more sophisticated collision detection that accounts for label boundaries
      simulation.force("collision", d3.forceCollide().radius(d => {
        const nodeRadius = Math.max(d.size * (isMobile ? 2.5 : 3.5), 16);
        const labelPadding = isMobile ? 15 : 25;
        
        // Find the corresponding label element to measure its actual bounds
        const labelElement = labels.filter(labelD => labelD.id === d.id).node();
        let labelRadius = nodeRadius + labelPadding;
        
        if (labelElement) {
          try {
            // Get the actual bounding box of the label
            const bbox = labelElement.getBBox();
            const labelWidth = bbox.width;
            const labelHeight = bbox.height;
            
            // Calculate the radius needed to encompass the label
            // Since labels are centered on nodes, we need half the label dimensions plus padding
            const labelRadiusX = (labelWidth / 2) + labelPadding;
            const labelRadiusY = (labelHeight / 2) + labelPadding;
            labelRadius = Math.max(labelRadiusX, labelRadiusY, nodeRadius + labelPadding);
            
            // Debug logging for a few nodes to verify the calculation
            if (d.id === filteredNodes[0]?.id || d.id === filteredNodes[Math.floor(filteredNodes.length / 2)]?.id) {
              console.log(`Node ${d.name}:`, {
                nodeRadius,
                labelWidth,
                labelHeight,
                labelRadiusX,
                labelRadiusY,
                finalRadius: labelRadius
              });
            }
          } catch (e) {
            // Fallback to estimated dimensions if getBBox fails
            const fontSize = isMobile ? 20 : 28;
            const avgCharWidth = fontSize * 0.6;
            const labelWidth = Math.max(d.name.length * avgCharWidth, 100);
            const labelHeight = fontSize * 1.2;
            const estimatedLabelRadius = Math.max(labelWidth / 2, labelHeight / 2) + labelPadding;
            labelRadius = Math.max(estimatedLabelRadius, nodeRadius + labelPadding);
            
            console.log(`Node ${d.name} (fallback):`, {
              nodeRadius,
              estimatedLabelWidth: labelWidth,
              estimatedLabelHeight: labelHeight,
              estimatedLabelRadius,
              finalRadius: labelRadius
            });
          }
        }
        

        
        return labelRadius;
      }));
      
      // Restart simulation with updated collision detection
      simulation.alpha(0.3).restart();
    }, 100); // Small delay to ensure labels are rendered

    // Add zoom behavior with enhanced controls and mobile optimization
    const zoom = d3.zoom()
      .scaleExtent([0.1, 1.0]) // Zoom range from 10% to 100%
      .wheelDelta(event => -event.deltaY * (event.deltaMode ? 120 : 1) / 100) // Faster wheel zoom for desktop
      .on("zoom", (event) => {
        // Direct DOM update for faster response on desktop
        zoomGroup.attr("transform", event.transform);
        setZoomLevel(event.transform.k);
      })
      .on("start", (event) => {
        // Prevent default only for non-touch events to allow native iOS gestures
        if (!event.sourceEvent || event.sourceEvent.type !== 'touchstart') {
          event.sourceEvent?.preventDefault();
        }
      });

    // Enable zoom for both desktop and mobile, but with different configurations
    if (!isMobile) {
      // Desktop: full zoom functionality
      svg.call(zoom);
    } else {
      // Mobile: enable zoom with iOS Safari compatibility
      svg.call(zoom);
      
      // Add passive touch listeners to improve iOS Safari performance
      svg.on("touchstart", function(event) {
        // Don't prevent default - let native gestures work
        // D3 will handle the zoom behavior
      }, { passive: true });
      
      svg.on("touchmove", function(event) {
        // Don't prevent default - let native gestures work
        // D3 will handle the zoom behavior
      }, { passive: true });
      
      svg.on("touchend", function(event) {
        // Don't prevent default - let native gestures work
      }, { passive: true });
    }
    
    // Store reference to zoom behavior
    zoomBehaviorRef.current = zoom;

    // Update positions on simulation tick with performance optimization
    simulation.on("tick", () => {
      // Direct DOM updates for better performance
      links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      nodes
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      labels
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    // Set loading states with mobile-optimized timeouts
    simulation.on("end", () => {
      const timeout = isMobile ? 300 : 500; // Faster loading on mobile
      setTimeout(() => {
        // Auto-center the network after it loads
        setTimeout(() => {
          centerNetwork();
          // Show the plot again after centering is complete
          setTimeout(() => {
            setIsLoading(false);
            // Restore SVG opacity
            if (svgRef.current) {
              const svg = d3.select(svgRef.current);
              svg.style("opacity", "1");
            }
          }, 550); // Wait for centering transition to complete
        }, 200); // Give more time for the simulation to settle
      }, timeout);
    });

    return () => {
      simulation.stop();
      // Clean up D3 selections to prevent memory leaks
      svg.selectAll("*").remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilters, networkData, typeMap, theme, filterMapping, isMobile]);

  // Update node and edge highlighting when selections change
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const svg = d3.select(containerRef.current).select("svg");
      const nodes = svg.selectAll(".node");
      const labels = svg.selectAll(".label");
      const links = svg.selectAll(".links line");
      
      // Remove all highlighting and dimming first
      nodes.classed("node-highlighted", false);
      nodes.classed("node-dimmed", false);
      labels.classed("label-highlighted", false);
      labels.classed("label-dimmed", false);
      links.classed("link-highlighted", false);
      links.classed("link-dimmed", false);
      
      if (selectedNode) {
        // Highlight only the selected node
        nodes.filter(d => d.id === selectedNode.id).classed("node-highlighted", true);
        labels.filter(d => d.id === selectedNode.id).classed("label-highlighted", true);
        
        // Dim nodes that are not connected to the selected node
        nodes.filter(d => !connectedNodes.has(d.id)).classed("node-dimmed", true);
        labels.filter(d => !connectedNodes.has(d.id)).classed("label-dimmed", true);
        links.filter(d => d.source.id !== selectedNode.id && d.target.id !== selectedNode.id)
          .classed("link-dimmed", true);
      } else if (getSelectedEdge) {
        // Highlight the selected edge
        links.filter(d => 
          (d.source.id === getSelectedEdge.source && d.target.id === getSelectedEdge.target) ||
          (d.source.id === getSelectedEdge.target && d.target.id === getSelectedEdge.source)
        ).classed("link-highlighted", true);
        
        // Highlight the nodes connected by this edge
        nodes.filter(d => edgeConnectedNodes.has(d.id)).classed("node-highlighted", true);
        labels.filter(d => edgeConnectedNodes.has(d.id)).classed("label-highlighted", true);
        
        // Dim nodes that are not connected by this edge
        nodes.filter(d => !edgeConnectedNodes.has(d.id)).classed("node-dimmed", true);
        labels.filter(d => !edgeConnectedNodes.has(d.id)).classed("label-dimmed", true);
        links.filter(d => 
          !((d.source.id === getSelectedEdge.source && d.target.id === getSelectedEdge.target) ||
            (d.source.id === getSelectedEdge.target && d.target.id === getSelectedEdge.source))
        ).classed("link-dimmed", true);
      }
    }
  }, [selectedNode, connectedNodes, getSelectedEdge, edgeConnectedNodes, isLoading]);

  // Handle URL parameters for focusing on a specific node
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const focusNodeId = urlParams.get('focus');
    
    if (focusNodeId && !isLoading && networkData.nodes) {
      const focusNode = networkData.nodes.find(node => node.id === focusNodeId);
      if (focusNode) {
        setSelectedNode(focusNode);
        // Center on the focused node
        setTimeout(() => {
          centerNetwork();
        }, 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, networkData.nodes, centerNetwork]);

  // Expose network state to global window object for share functionality
  useEffect(() => {
    window.networkState = {
      filters,
      zoomLevel,
      selectedNode: selectedNode?.id || null
    };
  }, [filters, zoomLevel, selectedNode]);

  const toggleFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const queryLower = query.toLowerCase();
    
    // Get all connections for this node to search in relationship types and descriptions
    const getNodeConnections = (nodeId) => {
      return networkData.links.filter(link => 
        link.source === nodeId || link.target === nodeId
      );
    };
    
    const results = networkData.nodes.filter(node => {
      // Search in node ID
      if (node.id.toLowerCase().includes(queryLower)) return true;
      
      // Search in node name
      if (node.name.toLowerCase().includes(queryLower)) return true;
      
      // Search in node type
      if (typeMap[node.type] && typeMap[node.type].toLowerCase().includes(queryLower)) return true;
      
      // Search in description
      if (node.description && node.description.toLowerCase().includes(queryLower)) return true;
      
      // Search in website URL
      if (node.website && node.website.toLowerCase().includes(queryLower)) return true;
      
      // Search in recent news
      if (node.recentNews && node.recentNews.toLowerCase().includes(queryLower)) return true;
      
      // Search in key personnel names
      if (node.keyPersonnel) {
        for (const person of node.keyPersonnel) {
          const personName = typeof person === 'string' ? person : person.name;
          if (personName.toLowerCase().includes(queryLower)) return true;
        }
      }
      
      // Search in connection types and descriptions
      const nodeConnections = getNodeConnections(node.id);
      for (const connection of nodeConnections) {
        // Search in connection type
        if (connection.type && connection.type.toLowerCase().includes(queryLower)) return true;
        
        // Search in connection description
        if (connection.description && connection.description.toLowerCase().includes(queryLower)) return true;
      }
      
      return false;
    });
    
    // Sort results by relevance
    const sortedResults = results.sort((a, b) => {
      const aId = a.id.toLowerCase();
      const bId = b.id.toLowerCase();
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const queryLower = query.toLowerCase();
      
      // Priority 1: Exact ID match
      if (aId === queryLower && bId !== queryLower) return -1;
      if (bId === queryLower && aId !== queryLower) return 1;
      
      // Priority 2: ID starts with query
      if (aId.startsWith(queryLower) && !bId.startsWith(queryLower)) return -1;
      if (bId.startsWith(queryLower) && !aId.startsWith(queryLower)) return 1;
      
      // Priority 3: Exact name match
      if (aName === queryLower && bName !== queryLower) return -1;
      if (bName === queryLower && aName !== queryLower) return 1;
      
      // Priority 4: Name starts with query
      if (aName.startsWith(queryLower) && !bName.startsWith(queryLower)) return -1;
      if (bName.startsWith(queryLower) && !aName.startsWith(queryLower)) return 1;
      
      // Priority 5: Name contains query (for partial matches)
      if (aName.includes(queryLower) && !bName.includes(queryLower)) return -1;
      if (bName.includes(queryLower) && !aName.includes(queryLower)) return 1;
      
      // Priority 6: Alphabetical by name
      return aName.localeCompare(bName);
    });
    
    setSearchResults(sortedResults);
  };

  const handleEdgeClick = useCallback((edge, event) => {
    console.log('=== EDGE CLICK DEBUG ===');
    console.log('Edge clicked:', edge.source.id, '->', edge.target.id);
    console.log('Edge object:', edge);
    console.log('Current selected edge ID:', selectedEdgeId);
    console.log('Event target:', event?.target);
    console.log('Event type:', event?.type);
    
    // Stop event propagation to prevent container click handler from firing
    event?.stopPropagation();
    
    // Clear node selection when clicking an edge
    setSelectedNode(null);
    selectedNodeRef.current = null;
    setConnectedNodes(new Set());
    
    // Create a unique edge identifier (sorted to handle both directions)
    const createEdgeId = (edge) => {
      const sourceId = edge.source.id;
      const targetId = edge.target.id;
      return sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
    };
    
    const clickedEdgeId = createEdgeId(edge);
    
    console.log('Clicked edge ID:', clickedEdgeId);
    console.log('Selected edge ID:', selectedEdgeId);
    console.log('Is same edge?', clickedEdgeId === selectedEdgeId);
    console.log('String comparison details:');
    console.log('  clickedEdgeId type:', typeof clickedEdgeId);
    console.log('  selectedEdgeId type:', typeof selectedEdgeId);
    console.log('  clickedEdgeId length:', clickedEdgeId?.length);
    console.log('  selectedEdgeId length:', selectedEdgeId?.length);
    console.log('  clickedEdgeId === selectedEdgeId:', clickedEdgeId === selectedEdgeId);
    console.log('  clickedEdgeId == selectedEdgeId:', clickedEdgeId === selectedEdgeId);
    console.log('=== END DEBUG ===');
    
    // Toggle selection: if clicking the same edge, deselect it
    setSelectedEdgeId(prevSelectedEdgeId => {
      console.log('Previous selected edge ID:', prevSelectedEdgeId);
      console.log('Clicked edge ID:', clickedEdgeId);
      console.log('Are they the same?', clickedEdgeId === prevSelectedEdgeId);
      
      if (clickedEdgeId === prevSelectedEdgeId) {
        console.log('Deselecting edge:', edge.source.id, '->', edge.target.id);
        console.log('Setting selectedEdgeId to null');
        setEdgeConnectedNodes(new Set());
        setSearchQuery('');
        setSearchResults([]);
        setShowSearch(false);
        // Reset to full network view when deselecting edge
        setTimeout(() => {
          manualCenterNetwork();
        }, 100);
        return null;
      } else {
        console.log('Setting selectedEdgeId to:', clickedEdgeId);
        // Find connected nodes for this edge
        const connected = new Set();
        connected.add(edge.source.id);
        connected.add(edge.target.id);
        
        setEdgeConnectedNodes(connected);
        setSearchQuery('');
        setSearchResults([]);
        setShowSearch(true); // Auto-open the search & details dropdown
        
        // Zoom to show the connected nodes
        setTimeout(() => {
          // Create a virtual node at the center of the edge for zooming
          const sourceNode = simulationRef.current?.nodes().find(n => n.id === edge.source.id);
          const targetNode = simulationRef.current?.nodes().find(n => n.id === edge.target.id);
          
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
            zoomToSubnetwork(virtualNode);
          } else {
            console.log('Could not find source or target nodes for edge zoom');
          }
        }, 100); // Small delay to ensure state updates
        
        // Auto-scroll to the search & details section
        setTimeout(() => {
          const sidebar = document.querySelector('.network-sidebar-left');
          const searchDropdownButton = document.querySelector('.dropdown-container:last-child .dropdown-button');
          if (sidebar && searchDropdownButton) {
            const scrollTop = searchDropdownButton.offsetTop - sidebar.offsetTop - 5; // 5px gap from top
            sidebar.scrollTo({
              top: scrollTop,
              behavior: 'smooth'
            });
          }
        }, 100); // Small delay to ensure the dropdown is rendered
        
        return clickedEdgeId;
      }
    });
  }, [selectedEdgeId, setSelectedEdgeId, setEdgeConnectedNodes, setSearchQuery, setSearchResults, setShowSearch, manualCenterNetwork, zoomToSubnetwork]);

  const handleNodeClick = useCallback((node, event) => {
    console.log('Node clicked:', node.id, 'Current selected:', selectedNode?.id);
    
    // Stop event propagation to prevent container click handler from firing
    event?.stopPropagation();
    
    // Clear edge selection when clicking a node
    setSelectedEdgeId(null);
    setEdgeConnectedNodes(new Set());
    
    // Toggle selection: if clicking the same node, deselect it
    if (selectedNodeRef.current && selectedNodeRef.current.id === node.id) {
      console.log('Deselecting node:', node.id);
      setSelectedNode(null);
      selectedNodeRef.current = null;
      setConnectedNodes(new Set());
      setSearchQuery('');
      setSearchResults([]);
      setShowSearch(false);
      // Reset to full network view when deselecting - use manual center to avoid reload
      setTimeout(() => {
        manualCenterNetwork();
      }, 100);
      return;
    }
    
    // On mobile, allow normal interactions but ensure smooth performance
    if (isMobile) {
      // Ensure smooth performance on mobile
      if (svgRef.current) {
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          // Allow normal zoom/pan interactions
          // The zoom behavior is already set up in the useEffect
        });
      }
    }
    
    // Find connected nodes for dimming logic
    const connected = new Set();
    connected.add(node.id);
    
    // Find all links connected to this node
    networkData.links.forEach(link => {
      if (link.source === node.id || link.target === node.id) {
        connected.add(link.source);
        connected.add(link.target);
      }
    });
    
    setSelectedNode(node);
    selectedNodeRef.current = node;
    setConnectedNodes(connected);
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(true); // Auto-open the search & details dropdown
    
    // Zoom to the subnetwork after a short delay to ensure state updates and simulation has settled
    setTimeout(() => {
      zoomToSubnetwork(node);
    }, 100);
    
    // Auto-scroll to the search & details section
    setTimeout(() => {
      const sidebar = document.querySelector('.network-sidebar-left');
      const searchDropdownButton = document.querySelector('.dropdown-container:last-child .dropdown-button');
      if (sidebar && searchDropdownButton) {
        const scrollTop = searchDropdownButton.offsetTop - sidebar.offsetTop - 5; // 5px gap from top
        sidebar.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to ensure the dropdown is rendered
  }, [isMobile, selectedNode, networkData.links, zoomToSubnetwork, manualCenterNetwork]);

  return (
    <div className="network-visualization">
      {/* Title and Description */}
      <div className="network-header">
        <h2>Atlanta Biotech Network</h2>
        <p>
          An interactive visualization of the organizations powering innovation in Georgia biotech — including startups, academic institutions, VCs, incubators, and service providers. Use the filters to focus on 
          specific organization types. Click on nodes and connections for detailed information and website links.
        </p>
        <div className="header-spacer"></div>
      </div>

      {/* Main Layout with Sidebars */}
      <div className="network-layout">
        
        {/* Left Sidebar - Controls */}
        <div className="network-sidebar-left">
          {/* Controls Section */}
          <div className="dropdown-container">
            <button className="dropdown-button" onClick={() => setShowControls(!showControls)}>
              <span>Controls</span>
              <svg className={`dropdown-arrow ${showControls ? 'expanded' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            {showControls && (
              <div className="dropdown-content control-dropdown">
                {/* All Controls in One Row */}
                <div className="control-group">
                  <button 
                    className="control-button center-button"
                    onClick={manualCenterNetwork}
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
                      <line x1="21" y1="21" x2="16" y2="21"/>
                      <line x1="21" y1="21" x2="21" y2="16"/>
                    </svg>
                  </button>
                  
                  <div className="control-spacer"></div>
                  
                  <button 
                    className="control-button zoom-button"
                    onClick={zoomIn}
                    disabled={zoomLevel >= 1.0}
                    title="Zoom In"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                  
                                <span className="zoom-level-display">
                {Math.round(zoomLevel * 100)}%
              </span>
                  
                  <button 
                    className="control-button zoom-button"
                    onClick={zoomOut}
                    disabled={zoomLevel <= 0.1}
                    title="Zoom Out"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Filters Section */}
          <div className="dropdown-container">
            <button className="dropdown-button" onClick={() => setShowFilters(!showFilters)}>
              <span>Filters</span>
              <svg className={`dropdown-arrow ${showFilters ? 'expanded' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            {showFilters && (
              <div className="dropdown-content filter-dropdown">
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.companies}
                  onChange={() => toggleFilter('companies')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Companies</span>
              </label>
              
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.startups}
                  onChange={() => toggleFilter('startups')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Startups</span>
              </label>
              
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.universities}
                  onChange={() => toggleFilter('universities')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Universities</span>
              </label>
              
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.incubators}
                  onChange={() => toggleFilter('incubators')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Incubators</span>
              </label>
              
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.vcs}
                  onChange={() => toggleFilter('vcs')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Venture Capital</span>
              </label>
              
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.serviceProviders}
                  onChange={() => toggleFilter('serviceProviders')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Service Providers</span>
              </label>
              
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.healthSystems}
                  onChange={() => toggleFilter('healthSystems')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Health Systems</span>
              </label>
              
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.government}
                  onChange={() => toggleFilter('government')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Government</span>
              </label>
              
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.trade}
                  onChange={() => toggleFilter('trade')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Trade Organizations</span>
              </label>
              
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.development}
                  onChange={() => toggleFilter('development')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Development</span>
              </label>
              
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.facilities}
                  onChange={() => toggleFilter('facilities')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Facilities</span>
              </label>
              
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.communityBuilders}
                  onChange={() => toggleFilter('communityBuilders')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Community Builders</span>
              </label>
            </div>
            )}
          </div>
          
          {/* Legend Section */}
          <div className="dropdown-container">
            <button className="dropdown-button" onClick={() => setShowLegend(!showLegend)}>
              <span>Legend</span>
              <svg className={`dropdown-arrow ${showLegend ? 'expanded' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            {showLegend && (
              <div className="dropdown-content legend-dropdown">
                <div className="legend-section">
                  <h5>Node Types</h5>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: getNodeColor('university')}}></div>
                    <span className="legend-label">Universities</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: getNodeColor('company')}}></div>
                    <span className="legend-label">Companies</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: getNodeColor('startup')}}></div>
                    <span className="legend-label">Startups</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: getNodeColor('vc')}}></div>
                    <span className="legend-label">Venture Capital</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: getNodeColor('incubator')}}></div>
                    <span className="legend-label">Incubators</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: getNodeColor('serviceProvider')}}></div>
                    <span className="legend-label">Service Providers</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: getNodeColor('health_system')}}></div>
                    <span className="legend-label">Health Systems</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: getNodeColor('government')}}></div>
                    <span className="legend-label">Government</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: getNodeColor('facility')}}></div>
                    <span className="legend-label">Facilities</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: getNodeColor('community')}}></div>
                    <span className="legend-label">Community Builders</span>
                  </div>
                </div>
                
                <div className="legend-section">
                  <h5>Relationship Types</h5>
                  <div className="legend-item">
                    <div className="legend-line" style={{borderColor: '#ff6b6b', borderWidth: '4px'}}></div>
                    <span className="legend-label">Spinout</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-line" style={{borderColor: '#4ecdc4', borderStyle: 'dashed'}}></div>
                    <span className="legend-label">Investment</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-line" style={{borderColor: '#45b7d1'}}></div>
                    <span className="legend-label">Collaboration</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-line" style={{borderColor: '#96ceb4', borderStyle: 'dotted'}}></div>
                    <span className="legend-label">Partnership</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-line" style={{borderColor: '#ffeaa7', borderWidth: '1px'}}></div>
                    <span className="legend-label">Service</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-line" style={{borderColor: '#dda0dd', borderStyle: 'dashed'}}></div>
                    <span className="legend-label">Support</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-line" style={{borderColor: '#9b59b6', borderStyle: 'dashed'}}></div>
                    <span className="legend-label">Education Program</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Search & Details Section */}
          <div className="dropdown-container">
            <button className="dropdown-button" onClick={() => setShowSearch(!showSearch)}>
              <span>Search & Details</span>
              <svg className={`dropdown-arrow ${showSearch ? 'expanded' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            {showSearch && (
              <div className="dropdown-content search-dropdown">
                {/* Search Input */}
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search companies, universities..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                  />
                </div>
                
                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="search-results">
                    <h5>Search Results</h5>
                    <div className="search-results-list">
                      {searchResults.map((node, index) => (
                        <div 
                          key={node.id} 
                          className="search-result-item"
                          onClick={() => handleNodeClick(node)}
                        >
                          <div className="result-node-color" style={{backgroundColor: getNodeColor(node.type)}}></div>
                          <div className="result-content">
                            <div className="result-name">{node.name}</div>
                            <div className="result-type">{typeMap[node.type] || node.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Selected Node Details */}
                {selectedNode && (
                  <div className="node-details">
                    <div className="details-header">
                      <h3>{selectedNode.name}</h3>
                      <button 
                        className="details-close"
                        onClick={() => {
                          setSelectedNode(null);
                          // Clear highlighting
                          if (containerRef.current) {
                            const svg = d3.select(containerRef.current).select("svg");
                            svg.selectAll(".node").classed("node-highlighted", false);
                            svg.selectAll(".label").classed("label-highlighted", false);
                          }
                        }}
                        title="Close"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="details-content">
                      <p className="node-type">{typeMap[selectedNode.type] || selectedNode.type}</p>
                      <p className="node-description">{selectedNode.description}</p>
                      
                      {selectedNode.website && (
                        <div className="details-section">
                          <h4>Website</h4>
                          <a 
                            href={selectedNode.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="website-link"
                          >
                            {selectedNode.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                      
                      {selectedNode.keyPersonnel && selectedNode.keyPersonnel.length > 0 && (
                        <div className="details-section">
                          <h4>Key Personnel</h4>
                          <ul className="personnel-list">
                            {selectedNode.keyPersonnel.map((person, index) => (
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
                      
                      {selectedNode.recentNews && (
                        <div className="details-section">
                          <h4>Recent Developments</h4>
                          <p className="recent-news">{selectedNode.recentNews}</p>
                        </div>
                      )}
                      
                      {/* Connections List */}
                      <div className="details-section">
                        <h4>Connections</h4>
                        {(() => {
                          // Find all connections for the selected node
                          const nodeConnections = networkData.links.filter(link => 
                            link.source === selectedNode.id || link.target === selectedNode.id
                          );
                          
                          if (nodeConnections.length === 0) {
                            return <p className="no-connections">No connections found.</p>;
                          }
                          
                          return (
                            <div className="connections-list">
                              {nodeConnections.map((connection, index) => {
                                // Determine the connected node (not the selected one)
                                const connectedNodeId = connection.source === selectedNode.id ? connection.target : connection.source;
                                const connectedNode = networkData.nodes.find(n => n.id === connectedNodeId);
                                
                                if (!connectedNode) return null;
                                
                                return (
                                                                      <div 
                                      key={index} 
                                      className="connection-item"
                                      onClick={() => {
                                        // Highlight the connection/edge instead of zooming to the connected node
                                        const edgeToHighlight = {
                                          source: { id: connection.source },
                                          target: { id: connection.target },
                                          type: connection.type,
                                          description: connection.description
                                        };
                                        
                                        // Trigger edge highlighting
                                        handleEdgeClick(edgeToHighlight, { stopPropagation: () => {} });
                                      }}
                                      style={{ cursor: 'pointer' }}
                                      title="Click to highlight this connection"
                                    >
                                    <div className="connection-header">
                                      <div className="connection-node-color" style={{backgroundColor: getNodeColor(connectedNode.type)}}></div>
                                      <div className="connection-content">
                                        <div className="connection-name">
                                          {connectedNode.name}
                                          {connectedNode.website && (
                                            <a 
                                              href={connectedNode.website} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="connection-website-link"
                                              onClick={(e) => e.stopPropagation()} // Prevent triggering connection highlight when clicking website link
                                            >
                                              ↗
                                            </a>
                                          )}
                                        </div>
                                        <div className="connection-type">{typeMap[connectedNode.type] || connectedNode.type}</div>
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
                        })()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Selected Edge Details */}
                {getSelectedEdge && (
                  <div className="edge-details">
                    <div className="details-header">
                      <h3>Connection Details</h3>
                      <button 
                        className="details-close"
                        onClick={() => {
                          setSelectedEdgeId(null);
                          setEdgeConnectedNodes(new Set());
                          // Clear highlighting
                          if (containerRef.current) {
                            const svg = d3.select(containerRef.current).select("svg");
                            svg.selectAll(".link").classed("link-highlighted", false);
                            svg.selectAll(".node").classed("node-highlighted", false);
                            svg.selectAll(".label").classed("label-highlighted", false);
                          }
                        }}
                        title="Close"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="details-content">
                      <div className="details-section">
                        <h4>Connected Organizations</h4>
                        <div className="connected-organizations">
                          <div 
                            className="org-item"
                            onClick={() => {
                              const sourceNode = networkData.nodes.find(n => n.id === getSelectedEdge.source);
                              if (sourceNode) {
                                handleNodeClick(sourceNode, { stopPropagation: () => {} });
                              }
                            }}
                            style={{ cursor: 'pointer' }}
                            title="Click to highlight this organization"
                          >
                            {(() => {
                              const sourceNode = networkData.nodes.find(n => n.id === getSelectedEdge.source);
                              return (
                                <>
                                  <div className="org-node-color" style={{backgroundColor: getNodeColor(sourceNode?.type)}}></div>
                                  <div className="org-content">
                                    <div className="org-name">
                                      {sourceNode?.name || getSelectedEdge.source}
                                      {sourceNode?.website && (
                                        <a 
                                          href={sourceNode.website} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="org-website-link"
                                          onClick={(e) => e.stopPropagation()} // Prevent triggering node click when clicking website link
                                        >
                                          ↗
                                        </a>
                                      )}
                                    </div>
                                    <div className="org-type">{typeMap[sourceNode?.type] || sourceNode?.type}</div>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                          <div 
                            className="org-item"
                            onClick={() => {
                              const targetNode = networkData.nodes.find(n => n.id === getSelectedEdge.target);
                              if (targetNode) {
                                handleNodeClick(targetNode, { stopPropagation: () => {} });
                              }
                            }}
                            style={{ cursor: 'pointer' }}
                            title="Click to highlight this organization"
                          >
                            {(() => {
                              const targetNode = networkData.nodes.find(n => n.id === getSelectedEdge.target);
                              return (
                                <>
                                  <div className="org-node-color" style={{backgroundColor: getNodeColor(targetNode?.type)}}></div>
                                  <div className="org-content">
                                    <div className="org-name">
                                      {targetNode?.name || getSelectedEdge.target}
                                      {targetNode?.website && (
                                        <a 
                                          href={targetNode.website} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="org-website-link"
                                          onClick={(e) => e.stopPropagation()} // Prevent triggering node click when clicking website link
                                        >
                                          ↗
                                        </a>
                                      )}
                                    </div>
                                    <div className="org-type">{typeMap[targetNode?.type] || targetNode?.type}</div>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="details-section">
                        <h4>Relationship Type</h4>
                        <p className="relationship-type">
                          {getSelectedEdge.type.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                      </div>
                      
                      {getSelectedEdge.description && (
                        <div className="details-section">
                          <h4>Description</h4>
                          <p className="relationship-description">{getSelectedEdge.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Network Canvas */}
        <div className="network-main">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>Loading network...</p>
            </div>
          )}
          
          {/* Network Canvas */}
          <div 
            className={`network-canvas ${isLoading ? 'repositioning' : ''}`}
            ref={containerRef}
            onClick={(e) => {
              // Clear selection if clicking on empty space (not on nodes, labels, or links)
              const target = e.target;
              const isNode = target.classList.contains('node') || target.classList.contains('label');
              const isLink = target.tagName === 'line';
              const isControl = target.closest('.network-sidebar-left') || target.closest('.dropdown-container');
              
              // If clicking on empty space (not on interactive elements), clear selection
              if (!isNode && !isLink && !isControl) {
                setSelectedNode(null);
                selectedNodeRef.current = null;
                setConnectedNodes(new Set());
                setSelectedEdgeId(null);
                setEdgeConnectedNodes(new Set());
                setSearchQuery('');
                setSearchResults([]);
                setShowSearch(false);
              }
            }}
          >
            <svg ref={svgRef}></svg>
          </div>
        </div>

      </div>
      
             {/* Stats Display */}
       <div className="stats-display">
         <div className="stats-item">
           <span className="stat-label">Organizations:</span>
           <span className="stat-value">{networkData.nodes.length}</span>
         </div>
         <div className="stats-item">
           <span className="stat-label">Connections:</span>
           <span className="stat-value">{networkData.links.length}</span>
         </div>
         <div className="stats-item">
           <span className="stat-label">Last Update:</span>
           <span className="stat-value">{lastCommitDate}</span>
         </div>
       </div>



    </div>
  );
};

export default NetworkVisualization; 