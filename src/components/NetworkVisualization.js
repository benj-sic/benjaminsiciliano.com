import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { atlantaTechBioEcosystem, nodeTypeMap, nodeColors } from '../atlanta_techbio_data.js';
import { useTheme } from '../contexts/ThemeContext';
import './NetworkVisualization.css';

const NetworkVisualization = () => {
  const { theme } = useTheme();
  const svgRef = useRef();
  const containerRef = useRef();
  const simulationRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [connectedNodes, setConnectedNodes] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const selectedNodeRef = useRef(null);
  
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
      universities: true,
      incubators: true,
      vcs: true,
      serviceProviders: true,
      healthSystems: true,
      government: true,
      trade: true,
      development: true,
      facilities: true
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

  // Real Atlanta TechBio ecosystem data
  const networkData = atlantaTechBioEcosystem;

  // Use imported color scheme and type mapping
  const typeMap = nodeTypeMap;

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
    'startup': 'companies',
    'vc': 'vcs',
    'incubator': 'incubators',
    'accelerator': 'incubators',
    'facility': 'facilities',
    'health_system': 'healthSystems',
    'serviceProvider': 'serviceProviders',
    'government': 'government',
    'trade': 'trade',
    'development': 'development'
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
        const xCoords = nodes.map(n => n.cx.baseVal.value);
        const yCoords = nodes.map(n => n.cy.baseVal.value);
        const minX = Math.min(...xCoords);
        const maxX = Math.max(...xCoords);
        const minY = Math.min(...yCoords);
        const maxY = Math.max(...yCoords);
        
        // Calculate the center of the network
        const networkCenterX = (minX + maxX) / 2;
        const networkCenterY = (minY + maxY) / 2;
        
        // Calculate the scale to fit the network in the viewport with minimal padding
        const networkWidth = maxX - minX;
        const networkHeight = maxY - minY;
        const padding = 20; // Minimal padding
        const scaleX = (width - padding * 2) / networkWidth;
        const scaleY = (height - padding * 2) / networkHeight;
        const scale = Math.min(scaleX, scaleY, 0.25); // Cap at 25% zoom
        
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
  }, []);

  // Manual center network function (doesn't hide the plot)
  const manualCenterNetwork = useCallback(() => {
    if (svgRef.current && zoomBehaviorRef.current) {
      const svg = d3.select(svgRef.current);
      const width = svg.node().getBoundingClientRect().width;
      const height = svg.node().getBoundingClientRect().height;
      
      // Get the actual bounds of the network nodes
      const nodes = svg.selectAll(".node").nodes();
      if (nodes.length > 0) {
        const xCoords = nodes.map(n => n.cx.baseVal.value);
        const yCoords = nodes.map(n => n.cy.baseVal.value);
        const minX = Math.min(...xCoords);
        const maxX = Math.max(...xCoords);
        const minY = Math.min(...yCoords);
        const maxY = Math.max(...yCoords);
        
        // Calculate the center of the network
        const networkCenterX = (minX + maxX) / 2;
        const networkCenterY = (minY + maxY) / 2;
        
        // Calculate the scale to fit the network in the viewport with minimal padding
        const networkWidth = maxX - minX;
        const networkHeight = maxY - minY;
        const padding = 20; // Minimal padding
        const scaleX = (width - padding * 2) / networkWidth;
        const scaleY = (height - padding * 2) / networkHeight;
        const scale = Math.min(scaleX, scaleY, 0.25); // Cap at 25% zoom
        
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
  }, []);

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
      .force("collision", d3.forceCollide().radius(d => Math.max(d.size * (isMobile ? 2.5 : 3.5), 16) + (isMobile ? 40 : 60)))
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
      .style("pointer-events", "none");

    // Create nodes in zoom group with mobile-optimized sizes
    const nodes = zoomGroup.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(filteredNodes)
      .enter().append("circle")
      .attr("r", d => Math.max(d.size * (isMobile ? 2.5 : 3.5), 16)) // Smaller nodes on mobile
      .attr("fill", d => nodeColors[typeMap[d.type]])
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
      .style("pointer-events", "none")
      .style("text-shadow", isMobile ? "none" : (theme === 'dark' ? 
        "2px 2px 4px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.6)" : 
        "2px 2px 4px rgba(255,255,255,0.95), 1px 1px 2px rgba(255,255,255,0.8), 0px 0px 8px rgba(255,255,255,0.6)")) // Enhanced text shadows
      .style("font-family", "system-ui, -apple-system, sans-serif")
      .style("stroke", theme === 'dark' ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.8)") // Text outline
      .style("stroke-width", "0.5px") // Thin outline for better contrast
      .attr("class", d => `label ${selectedNode && selectedNode.id === d.id ? 'label-highlighted' : ''}`);

    // Add zoom behavior with enhanced controls and mobile optimization
    const zoom = d3.zoom()
      .scaleExtent([0.1, 1.0]) // Zoom range from 10% to 100%
      .wheelDelta(event => -event.deltaY * (event.deltaMode ? 120 : 1) / 500) // Smoother wheel zoom
      .on("zoom", (event) => {
        // Use requestAnimationFrame for smoother zoom on mobile
        requestAnimationFrame(() => {
          zoomGroup.attr("transform", event.transform);
          setZoomLevel(event.transform.k);
        });
      });

      // Enable zoom for both desktop and mobile, but with different configurations
    if (!isMobile) {
      // Desktop: full zoom functionality
      svg.call(zoom);
    } else {
      // Mobile: enable zoom but with touch-friendly settings
      svg.call(zoom);
      
      // Remove any existing touch event handlers that might interfere
      svg.on("touchstart.zoom", null);
      svg.on("touchmove.zoom", null);
      svg.on("touchend.zoom", null);
      svg.on("touchstart", null);
      svg.on("touchmove", null);
      svg.on("touchend", null);
      svg.on("gesturestart", null);
      svg.on("gesturechange", null);
      svg.on("gestureend", null);
    }
    
    // Store reference to zoom behavior
    zoomBehaviorRef.current = zoom;

    // Update positions on simulation tick with performance optimization
    simulation.on("tick", () => {
      // Use requestAnimationFrame for smoother updates on mobile
      requestAnimationFrame(() => {
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

  // Update node highlighting when selectedNode changes
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
      }
    }
  }, [selectedNode, connectedNodes, isLoading]);

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
    
    const results = networkData.nodes.filter(node => 
      node.name.toLowerCase().includes(query.toLowerCase()) ||
      (typeMap[node.type] && typeMap[node.type].toLowerCase().includes(query.toLowerCase())) ||
      (node.description && node.description.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(results);
  };

  const handleNodeClick = useCallback((node, event) => {
    console.log('Node clicked:', node.id, 'Current selected:', selectedNode?.id);
    
    // Toggle selection: if clicking the same node, deselect it
    if (selectedNodeRef.current && selectedNodeRef.current.id === node.id) {
      console.log('Deselecting node:', node.id);
      setSelectedNode(null);
      selectedNodeRef.current = null;
      setConnectedNodes(new Set());
      setSearchQuery('');
      setSearchResults([]);
      setShowSearch(false);
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
  }, [isMobile, selectedNode, networkData.links]);

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
                    <div className="legend-color" style={{backgroundColor: nodeColors[typeMap.university]}}></div>
                    <span className="legend-label">Universities</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: nodeColors[typeMap.company]}}></div>
                    <span className="legend-label">Companies</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: nodeColors[typeMap.vc]}}></div>
                    <span className="legend-label">Venture Capital</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: nodeColors[typeMap.incubator]}}></div>
                    <span className="legend-label">Incubators</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: nodeColors[typeMap.serviceProvider]}}></div>
                    <span className="legend-label">Service Providers</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: nodeColors[typeMap.government]}}></div>
                    <span className="legend-label">Government</span>
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
                          <div className="result-node-color" style={{backgroundColor: nodeColors[typeMap[node.type]]}}></div>
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
              // Only clear selection if clicking on the container itself, not on nodes
              if (e.target === e.currentTarget) {
                setSelectedNode(null);
                selectedNodeRef.current = null;
              }
            }}
          >
            <svg ref={svgRef}></svg>
          </div>
        </div>

      </div>
      
      {/* Last Updated Line - positioned below the entire network layout */}
      <div className="last-updated-line">
        Last updated: July 2025
      </div>

    </div>
  );
};

export default NetworkVisualization; 