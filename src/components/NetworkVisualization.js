import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { atlantaTechBioEcosystem, nodeTypeMap, nodeColors } from '../atlanta_techbio_data.js';
import { useTheme } from '../contexts/ThemeContext';
import './NetworkVisualization.css';

const NetworkVisualization = () => {
  const { theme } = useTheme();
  const svgRef = useRef();
  const containerRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Sidebar state
  const [showControls, setShowControls] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Initialize zoom level from URL parameters
  const getInitialZoomLevel = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const zoomParam = urlParams.get('zoom');
    return zoomParam ? parseFloat(zoomParam) : 1;
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
          strokeWidth: 4,
          strokeDasharray: 'none',
          opacity: 0.8
        };
      case 'investment':
        return {
          stroke: '#4ecdc4',
          strokeWidth: 3,
          strokeDasharray: '8,4',
          opacity: 0.7
        };
      case 'collaboration':
        return {
          stroke: '#45b7d1',
          strokeWidth: 2,
          strokeDasharray: 'none',
          opacity: 0.6
        };
      case 'partnership':
        return {
          stroke: '#96ceb4',
          strokeWidth: 2,
          strokeDasharray: '2,2',
          opacity: 0.6
        };
      case 'service':
        return {
          stroke: '#ffeaa7',
          strokeWidth: 1,
          strokeDasharray: '3,3',
          opacity: 0.5
        };
      case 'support':
        return {
          stroke: '#dda0dd',
          strokeWidth: 2,
          strokeDasharray: '8,4',
          opacity: 0.6
        };
      default:
        return {
          stroke: '#a0a0a0',
          strokeWidth: 1,
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
    'serviceProvider': 'serviceProviders',
    'government': 'government',
    'trade': 'trade',
    'development': 'development'
  }), []);

  // Center network function
  const centerNetwork = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      const svg = d3.select(svgRef.current);
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Get the current zoom group to calculate bounds
      const zoomGroup = svg.select("g.zoom-group");
      if (zoomGroup.empty()) return;
      
      // Get the bounding box of all nodes
      const nodes = zoomGroup.selectAll("circle");
      if (nodes.empty()) return;
      
      // Calculate the bounds of the network
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      nodes.each(function() {
        const cx = parseFloat(d3.select(this).attr("cx"));
        const cy = parseFloat(d3.select(this).attr("cy"));
        const r = parseFloat(d3.select(this).attr("r"));
        minX = Math.min(minX, cx - r);
        maxX = Math.max(maxX, cx + r);
        minY = Math.min(minY, cy - r);
        maxY = Math.max(maxY, cy + r);
      });
      
      // Calculate the center of the network
      const networkCenterX = (minX + maxX) / 2;
      const networkCenterY = (minY + maxY) / 2;
      
      // Calculate the scale to fit the network in the viewport with padding
      const networkWidth = maxX - minX;
      const networkHeight = maxY - minY;
      const padding = 60; // Reduced padding for more zoomed in view
      const scaleX = (width - padding * 2) / networkWidth;
      const scaleY = (height - padding * 2) / networkHeight;
      const scale = Math.max(Math.min(scaleX, scaleY, 1.8), 0.4); // Ensure minimum zoom level of 0.4
      
      // Calculate the transform to center the network with smaller offset
      const offsetX = 10; // Move right less
      const offsetY = -50; // Move down (negative Y moves down in SVG coordinates)
      const transform = d3.zoomIdentity
        .translate(width / 2 - networkCenterX * scale + offsetX, height / 2 - networkCenterY * scale + offsetY)
        .scale(scale);
      
      // Apply the transform with transition
      svg.transition()
        .duration(750)
        .call(zoomBehaviorRef.current.transform, transform);
      
      setZoomLevel(scale);
    }
  };

  // Zoom functions
  const zoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current && zoomLevel < 5) {
      const svg = d3.select(svgRef.current);
      const newZoomLevel = Math.min(zoomLevel * 1.5, 5);
      
      // Use the zoom behavior to zoom in from the current center
      svg.transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleBy, 1.5);
      
      setZoomLevel(newZoomLevel);
    }
  };

  const zoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current && zoomLevel > 0.4) {
      const svg = d3.select(svgRef.current);
      const newZoomLevel = Math.max(zoomLevel / 1.5, 0.4);
      
      // Use the zoom behavior to zoom out from the current center
      svg.transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleBy, 1/1.5);
      
      setZoomLevel(newZoomLevel);
    }
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    setIsProcessing(true);
    
    const svg = d3.select(svgRef.current);
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

    // Ensure links have proper source and target objects for D3
    const processedLinks = filteredLinks.map(link => ({
      ...link,
      source: filteredNodes.find(n => n.id === link.source),
      target: filteredNodes.find(n => n.id === link.target)
    }));

    // Create clustering by node type
    const nodeTypes = ['university', 'company', 'vc', 'incubator', 'serviceProvider', 'government', 'trade', 'development', 'facility'];
    const clusterPositions = {};
    
    // Calculate cluster positions in a circle with larger radius
    nodeTypes.forEach((type, index) => {
      const angle = (index / nodeTypes.length) * 2 * Math.PI;
      const radius = Math.min(width, height) * 0.35; // Increased radius for better spacing
      clusterPositions[type] = {
        x: width / 2 + radius * Math.cos(angle),
        y: height / 2 + radius * Math.sin(angle)
      };
    });

    // Enhanced force simulation for 80+ nodes with clustering
    const simulation = d3.forceSimulation(filteredNodes)
      .force("link", d3.forceLink(processedLinks).id(d => d.id).distance(120)) // Increased link distance
      .force("charge", d3.forceManyBody().strength(-200)) // Increased repulsion for better spacing
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => d.size + 30)) // Increased collision radius for larger labels
      .force("x", d3.forceX(d => clusterPositions[d.type]?.x || width / 2).strength(0.2)) // Reduced clustering strength
      .force("y", d3.forceY(d => clusterPositions[d.type]?.y || height / 2).strength(0.2)); // Reduced clustering strength

    // Create a zoom group that contains all the network elements
    const zoomGroup = svg.append("g").attr("class", "zoom-group");

    // Create links in zoom group
    const links = zoomGroup.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(processedLinks)
      .enter().append("line")
      .each(function(d) {
        const style = getLinkStyle(d.type);
        d3.select(this)
          .attr("stroke", style.stroke)
          .attr("stroke-width", style.strokeWidth)
          .attr("stroke-dasharray", style.strokeDasharray)
          .attr("stroke-opacity", style.opacity)
          .style("pointer-events", "all")
          .style("z-index", "1");
      })
      .style("cursor", "pointer");

    // Create nodes in zoom group
    const nodes = zoomGroup.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(filteredNodes)
      .enter().append("circle")
      .attr("r", d => d.size)
      .attr("fill", d => nodeColors[typeMap[d.type]])
      .style("cursor", "pointer")
      .on("click", function(event, d) {
        event.stopPropagation();
        handleNodeClick(d);
      });



    // Create labels in zoom group
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
      .attr("fill", theme === 'dark' ? "#fff" : "#333")
      .attr("font-size", "14px")
      .attr("font-weight", "600")
      .style("pointer-events", "none")
      .style("text-shadow", theme === 'dark' ? "2px 2px 4px rgba(0,0,0,0.9), 0px 0px 8px rgba(0,0,0,0.7)" : "2px 2px 4px rgba(255,255,255,0.9), 0px 0px 8px rgba(255,255,255,0.7)")
      .style("font-family", "system-ui, -apple-system, sans-serif");

    // Add zoom behavior with enhanced controls
    const zoom = d3.zoom()
      .scaleExtent([0.4, 5]) // Allow more zoom out for larger datasets
      .on("zoom", (event) => {
        zoomGroup.attr("transform", event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);
    
    // Store reference to zoom behavior
    zoomBehaviorRef.current = zoom;

    // Update positions on simulation tick with performance optimization
    simulation.on("tick", () => {
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

    // Set loading states with longer timeout for larger dataset
    simulation.on("end", () => {
      setTimeout(() => {
        setIsLoading(false);
        setIsProcessing(false);
        // Auto-center the network after it loads
        setTimeout(() => {
          centerNetwork();
        }, 100); // Small delay to ensure everything is rendered
      }, 500); // Give extra time for 80+ nodes to settle
    });

    return () => {
      simulation.stop();
    };
  }, [debouncedFilters, networkData, typeMap, theme, filterMapping]);

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
  }, [isLoading, networkData.nodes]);

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

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="network-visualization">
      {/* Title and Description */}
      <div className="network-header">
        <h2>Atlanta Biotech Network</h2>
        <p>
          An interactive visualization of the organizations powering innovation in Georgia biotech — including startups, academic institutions, VCs, incubators, and service providers. Use the filters to focus on 
          specific organization types. Click on nodes and connections for detailed information and website links.
        </p>
        <p className="last-updated">
          Last updated: July 2025
        </p>
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
                    onClick={centerNetwork}
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
                    disabled={zoomLevel >= 5}
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
                    disabled={zoomLevel <= 0.4}
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
        </div>

        {/* Main Network Canvas */}
        <div className="network-main">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>Loading network data...</p>
            </div>
          )}
          
          {/* Processing Indicator */}
          {isProcessing && !isLoading && (
            <div className="processing-indicator">
              <div className="processing-spinner"></div>
              <span>Processing...</span>
            </div>
          )}
          
          {/* Network Canvas */}
          <div 
            className="network-canvas" 
            ref={containerRef}
                                        onClick={() => {
                              setSelectedNode(null);
                            }}
          >
            <svg ref={svgRef}></svg>
          </div>
        </div>

        {/* Right Sidebar - Node Details & Search */}
        <div className="network-sidebar-right">
          <div className="sidebar-section">
            <h4>Search & Details</h4>
            
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
                    onClick={() => setSelectedNode(null)}
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
                          <li key={index}>{person}</li>
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
        </div>
      </div>
      

    </div>
  );
};

export default NetworkVisualization; 