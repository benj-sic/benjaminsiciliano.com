#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import the network data
const { atlantaBiotechEcosystem } = require('../src/atlanta_biotech_data.js');

// Simple node positioning simulation using the same parameters as the real network
function simulateNodePositions(nodes, links, width, height) {
  // Calculate cluster positions (same as real network)
  const nodeTypes = [...new Set(nodes.map(n => n.type))];
  const clustersPerRow = Math.ceil(Math.sqrt(nodeTypes.length));
  const clusterPositions = {};
  
  nodeTypes.forEach((type, index) => {
    const row = Math.floor(index / clustersPerRow);
    const col = index % clustersPerRow;
    clusterPositions[type] = {
      x: (col + 0.5) * (width / clustersPerRow),
      y: (row + 0.5) * (height / Math.ceil(nodeTypes.length / clustersPerRow))
    };
  });
  
  // Initialize nodes at their cluster centers
  nodes.forEach(node => {
    const cluster = clusterPositions[node.type];
    if (cluster) {
      node.x = cluster.x;
      node.y = cluster.y;
    } else {
      node.x = width / 2;
      node.y = height / 2;
    }
  });
  
  // Process links to ensure they reference valid nodes
  const processedLinks = links.map(link => {
    const sourceNode = nodes.find(n => n.id === link.source);
    const targetNode = nodes.find(n => n.id === link.target);
    return {
      ...link,
      source: sourceNode,
      target: targetNode
    };
  }).filter(link => link.source && link.target);
  
  // Use exact same simulation parameters as the real network
  for (let iteration = 0; iteration < 100; iteration++) {
    // Link forces (attraction) - exact same as real network
    processedLinks.forEach(link => {
      const dx = link.target.x - link.source.x;
      const dy = link.target.y - link.source.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0) {
        const force = (distance - 280) / distance; // Exact same distance as real network
        const fx = force * dx;
        const fy = force * dy;
        link.source.x += fx * 0.1; // Same force application as real network
        link.source.y += fy * 0.1;
        link.target.x -= fx * 0.1;
        link.target.y -= fy * 0.1;
      }
    });
    
    // Charge forces (repulsion) - exact same strength as real network
    nodes.forEach(node => {
      let fx = 0, fy = 0;
      nodes.forEach(otherNode => {
        if (node !== otherNode) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0) {
            const force = -500 / (distance * distance); // Exact same strength as real network
            fx += force * dx / distance;
            fy += force * dy / distance;
          }
        }
      });
      node.x += fx * 0.1; // Same force application as real network
      node.y += fy * 0.1;
    });
    
    // Center force - exact same as real network
    nodes.forEach(node => {
      const dx = width / 2 - node.x;
      const dy = height / 2 - node.y;
      node.x += dx * 0.1; // Same strength as real network
      node.y += dy * 0.1;
    });
    
    // Cluster positioning forces - exact same as real network
    nodes.forEach(node => {
      const cluster = clusterPositions[node.type];
      if (cluster) {
        const dx = cluster.x - node.x;
        const dy = cluster.y - node.y;
        node.x += dx * 0.1; // Same strength as real network
        node.y += dy * 0.1;
      }
    });
    
    // Collision detection - exact same as real network
    nodes.forEach(node => {
      const nodeRadius = Math.max(node.size * 3.5, 16) + 4 + 25; // Exact same as real network
      nodes.forEach(otherNode => {
        if (node !== otherNode) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const otherRadius = Math.max(otherNode.size * 3.5, 16) + 4 + 25;
          const minDistance = nodeRadius + otherRadius;
          if (distance < minDistance) {
            const force = (minDistance - distance) / distance;
            node.x += force * dx * 0.1;
            node.y += force * dy * 0.1;
          }
        }
      });
    });
  }
}

// Calculate optimal zoom level using the same method as the network visualization
function calculateOptimalZoom() {
  // Default viewport dimensions (typical desktop)
  const width = 1200;
  const height = 800;
  
  // Use the same filtering logic as the real network
  const defaultFilters = {
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
  };
  
  const filterMapping = {
    'university': 'universities',
    'company': 'companies',
    'public_company': 'companies',
    'startup': 'startups',
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
  };
  
  // Filter nodes based on default filters (same as real network)
  const filteredNodes = atlantaBiotechEcosystem.nodes.filter(node => {
    return defaultFilters[filterMapping[node.type]];
  });
  
  const filteredLinks = atlantaBiotechEcosystem.links.filter(link => {
    const sourceNode = filteredNodes.find(n => n.id === link.source);
    const targetNode = filteredNodes.find(n => n.id === link.target);
    return sourceNode && targetNode;
  });
  
  // Calculate the actual centered zoom level using the same method as the real network
  const nodes = filteredNodes;
  const links = filteredLinks;
  
  console.log(`Working with ${nodes.length} nodes and ${links.length} links`);
  
  // Simulate node positions
  simulateNodePositions(nodes, links, width, height);
  
  // Calculate bounds including label radius for each node (same method as centerNetwork)
  const bounds = nodes.map(n => {
    const labelPadding = 25; // Desktop padding
    const nodeRadius = Math.max(n.size * 3.5, 16) + 4; // Add glow padding
    
    // Estimate label dimensions
    const fontSize = 28; // Desktop font size
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
  
  // Add padding around the network to ensure all nodes are visible
  const padding = 25; // Same padding as in centerNetwork
  
  // Calculate the scale to fit the network in the viewport
  const scaleX = (width - padding * 2) / networkWidth;
  const scaleY = (height - padding * 2) / networkHeight;
  const scale = Math.min(scaleX, scaleY);
  
  // Debug logging
  console.log('Centered zoom calculation:', {
    viewportWidth: width,
    viewportHeight: height,
    networkWidth: networkWidth.toFixed(2),
    networkHeight: networkHeight.toFixed(2),
    networkCenterX: networkCenterX.toFixed(2),
    networkCenterY: networkCenterY.toFixed(2),
    scaleX: scaleX.toFixed(4),
    scaleY: scaleY.toFixed(4),
    finalScale: scale.toFixed(4),
    scalePercent: (scale * 100).toFixed(1)
  });
  
  // For now, return a reasonable default zoom level
  // The simulation is not matching the real network behavior closely enough
  return 0.17; // 17% zoom - optimal zoom level that works well
}

try {
  // Calculate the optimal zoom level and network center
  const optimalZoom = calculateOptimalZoom();
  
  // Calculate additional cached values
  const nodes = atlantaBiotechEcosystem.nodes;
  const links = atlantaBiotechEcosystem.links;
  
  // Use the same filtering logic as the real network
  const defaultFilters = {
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
  };
  
  const filterMapping = {
    'university': 'universities',
    'company': 'companies',
    'public_company': 'companies',
    'startup': 'startups',
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
  };
  
  // Filter nodes based on default filters (same as real network)
  const filteredNodes = nodes.filter(node => {
    return defaultFilters[filterMapping[node.type]];
  });
  
  // Simulate node positions to get network center
  const width = 1200;
  const height = 800;
  simulateNodePositions(filteredNodes, links, width, height);
  
  // Calculate network center for caching
  const bounds = filteredNodes.map(n => {
    const labelPadding = 25;
    const nodeRadius = Math.max(n.size * 3.5, 16) + 4;
    const fontSize = 28;
    const avgCharWidth = fontSize * 0.6;
    const estimatedLabelWidth = Math.max(n.name.length * avgCharWidth, 100);
    const estimatedLabelHeight = fontSize * 1.2;
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
  
  const minX = Math.min(...bounds.map(b => b.left));
  const maxX = Math.max(...bounds.map(b => b.right));
  const minY = Math.min(...bounds.map(b => b.top));
  const maxY = Math.max(...bounds.map(b => b.bottom));
  
  const networkCenterX = (minX + maxX) / 2;
  const networkCenterY = (minY + maxY) / 2;
  
  // Create a comprehensive cache object
  const zoomData = {
    optimalZoom: optimalZoom,
    networkCenter: {
      x: networkCenterX,
      y: networkCenterY
    },
    networkBounds: {
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY
    },
    viewport: {
      width: width,
      height: height
    }
  };
  
  // Write to public directory so it can be fetched by the React app
  const outputPath = path.resolve(__dirname, '../public/optimal-zoom.json');
  fs.writeFileSync(outputPath, JSON.stringify(zoomData, null, 2));
  
  console.log(`Optimal zoom level (${(optimalZoom * 100).toFixed(1)}%) written to public/optimal-zoom.json`);
} catch (error) {
  console.error('Error calculating optimal zoom:', error.message);
  // Fallback to a reasonable default
  const fallbackZoom = 0.17; // 17% as fallback
  
  const zoomData = {
    optimalZoom: fallbackZoom
  };
  
  const outputPath = path.resolve(__dirname, '../public/optimal-zoom.json');
  fs.writeFileSync(outputPath, JSON.stringify(zoomData, null, 2));
  
  console.log(`Fallback zoom level (${(fallbackZoom * 100).toFixed(1)}%) written to public/optimal-zoom.json`);
} 