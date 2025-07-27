import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { atlantaTechBioEcosystem, nodeTypeMap, nodeColors } from '../atlanta_techbio_data.js';
import './NetworkVisualization.css';

const NetworkVisualization = () => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filters, setFilters] = useState({
    companies: true,
    universities: true,
    incubators: true,
    vcs: true,
    serviceProviders: true,
    government: true,
    trade: true,
    development: true,
    facilities: true
  });

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
          strokeDasharray: '6,3',
          opacity: 0.6
        };
      case 'funding':
        return {
          stroke: '#feca57',
          strokeWidth: 3,
          strokeDasharray: 'none',
          opacity: 0.7
        };
      case 'tenant':
        return {
          stroke: '#ff9ff3',
          strokeWidth: 2,
          strokeDasharray: '4,2',
          opacity: 0.6
        };
      case 'affiliation':
        return {
          stroke: '#54a0ff',
          strokeWidth: 2,
          strokeDasharray: 'none',
          opacity: 0.6
        };
      case 'industry':
        return {
          stroke: '#ff9f43',
          strokeWidth: 2,
          strokeDasharray: 'none',
          opacity: 0.5
        };
      case 'technology':
        return {
          stroke: '#a55eea',
          strokeWidth: 2,
          strokeDasharray: '2,4',
          opacity: 0.5
        };
      case 'membership':
        return {
          stroke: '#26de81',
          strokeWidth: 2,
          strokeDasharray: '1,2',
          opacity: 0.5
        };
      case 'development':
        return {
          stroke: '#778ca3',
          strokeWidth: 2,
          strokeDasharray: 'none',
          opacity: 0.5
        };
      default:
        return {
          stroke: '#666',
          strokeWidth: 2,
          strokeDasharray: 'none',
          opacity: 0.6
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
      return debouncedFilters[typeMap[node.type]];
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
    
    // Calculate cluster positions in a circle
    nodeTypes.forEach((type, index) => {
      const angle = (index / nodeTypes.length) * 2 * Math.PI;
      const radius = Math.min(width, height) * 0.3;
      clusterPositions[type] = {
        x: width / 2 + radius * Math.cos(angle),
        y: height / 2 + radius * Math.sin(angle)
      };
    });

    // Enhanced force simulation for 80+ nodes with clustering
    const simulation = d3.forceSimulation(filteredNodes)
      .force("link", d3.forceLink(processedLinks).id(d => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-150)) // Reduced strength for better clustering
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => d.size + 12)) // Increased collision radius
      .force("x", d3.forceX(d => clusterPositions[d.type]?.x || width / 2).strength(0.3)) // Cluster by type
      .force("y", d3.forceY(d => clusterPositions[d.type]?.y || height / 2).strength(0.3)); // Cluster by type



    // Create links with enhanced styling
    const links = svg.append("g")
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
      .style("cursor", "pointer")
      .on("click", function(event, d) {
        event.stopPropagation();
        if (selectedLink && selectedLink.source.id === d.source.id && selectedLink.target.id === d.target.id) {
          setSelectedLink(null);
        } else {
          setSelectedLink(d);
        }
      });



    // Create nodes with enhanced visibility
    const nodes = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(filteredNodes)
      .enter().append("circle")
      .attr("r", d => d.size)
      .attr("fill", d => nodeColors[d.type])
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("click", function(event, d) {
        event.stopPropagation();
        if (selectedNode && selectedNode.id === d.id) {
          setSelectedNode(null);
        } else {
          setSelectedNode(d);
        }
      });

    console.log('Created nodes:', nodes.size());

    // Enhanced node labels with better positioning
    const labels = svg.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(filteredNodes)
      .enter().append("text")
      .text(d => d.name)
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#fff")
      .attr("font-size", "9px") // Slightly smaller for more nodes
      .attr("font-weight", "500")
      .style("pointer-events", "none")
      .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.8)")
      .style("font-family", "system-ui, -apple-system, sans-serif");

    // Add zoom behavior with enhanced controls
    const zoom = d3.zoom()
      .scaleExtent([0.3, 5]) // Allow more zoom out for larger datasets
      .on("zoom", (event) => {
        svg.selectAll("g.nodes, g.labels, g.links").attr("transform", event.transform);
      });

    svg.call(zoom);

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
      }, 500); // Give extra time for 80+ nodes to settle
    });

    return () => {
      simulation.stop();
    };
  }, [debouncedFilters, networkData, typeMap]);

  const toggleFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  return (
    <div className="network-visualization">
      {/* Title and Description */}
      <div className="network-header">
        <h2>Atlanta Biotech Ecosystem Network</h2>
        <p>
          Interactive visualization of Atlanta's growing biotech ecosystem. Explore connections between universities, 
          companies, investors, and service providers driving innovation in the region. Use the filters to focus on 
          specific organization types. Click on nodes and connections for detailed information and website links.
        </p>
      </div>

      {/* Main Network Container */}
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
        
        {/* Left Sidebar - Filters */}
        <div className="network-filters">
          <h4>Filter by Organization Type</h4>
          <div className="filter-checkboxes">
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
        </div>
        
        {/* Main Network Canvas */}
        <div 
          className="network-canvas" 
          ref={containerRef}
          onClick={() => {
            setSelectedNode(null);
            setSelectedLink(null);
          }}
        >
          <svg ref={svgRef}></svg>
        </div>
        
        {/* Right Sidebar - Legend */}
        <div className="network-legend">
          <h4>Network Legend</h4>
          <div className="legend-section">
            <h5>Node Types</h5>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: nodeColors.university}}></div>
              <span className="legend-label">Universities</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: nodeColors.company}}></div>
              <span className="legend-label">Companies</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: nodeColors.vc}}></div>
              <span className="legend-label">Venture Capital</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: nodeColors.incubator}}></div>
              <span className="legend-label">Incubators</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: nodeColors.serviceProvider}}></div>
              <span className="legend-label">Service Providers</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: nodeColors.government}}></div>
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
      </div>
      
      {selectedNode && (
        <div className="node-tooltip">
          <div className="tooltip-header">
            <h3>{selectedNode.name}</h3>
            <button 
              className="tooltip-close"
              onClick={() => setSelectedNode(null)}
              title="Close"
            >
              ×
            </button>
          </div>
          <p className="node-type">{selectedNode.type}</p>
          <p className="node-description">{selectedNode.description}</p>
          
          {selectedNode.website && (
            <div className="tooltip-section">
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
            <div className="tooltip-section">
              <h4>Key Personnel</h4>
              <ul className="personnel-list">
                {selectedNode.keyPersonnel.map((person, index) => (
                  <li key={index}>{person}</li>
                ))}
              </ul>
            </div>
          )}
          
          {selectedNode.funding && (
            <div className="tooltip-section">
              <h4>Funding</h4>
              <p className="funding-info">{selectedNode.funding}</p>
            </div>
          )}
          
          {selectedNode.recentNews && (
            <div className="tooltip-section">
              <h4>Recent Developments</h4>
              <p className="recent-news">{selectedNode.recentNews}</p>
            </div>
          )}
        </div>
      )}
      
      {selectedLink && (
        <div className="link-tooltip">
          <div className="tooltip-header">
            <h4>Relationship</h4>
            <button 
              className="tooltip-close"
              onClick={() => setSelectedLink(null)}
              title="Close"
            >
              ×
            </button>
          </div>
          <p className="link-type">{selectedLink.type}</p>
          <p className="link-description">{selectedLink.description}</p>
          <div className="link-strength">
            <span>Strength: {Math.round(selectedLink.strength * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkVisualization; 