/*
 * Copyright (c) 2025 Benjamin Siciliano
 * All rights reserved.
 * 
 * This file is part of the benjaminsiciliano.com project.
 * Unauthorized copying, modification, distribution, or use is strictly prohibited.
 * For licensing inquiries, contact: ben.siciliano@gmail.com
 */

/**
 * Centrality Scoring System for Dynamic Node Sizing
 * 
 * This system calculates node sizes based on:
 * 1. Base Score (Intrinsic Importance): Node type importance
 * 2. Connection Score (Network Importance): Weighted connections
 * 
 * The final size combines both factors and scales to a visually pleasing range.
 */

// Base scores for different node types (intrinsic importance)
export const NODE_TYPE_BASE_SCORES = {
  // Core academic institutions - highest importance
  university: 15,
  research_institute: 12,
  
  // Major health systems and government agencies
  health_system: 10,
  government: 10,
  
  // Innovation infrastructure
  incubator: 8,
  accelerator: 8,
  venture_capital: 8,
  investment_fund: 8,
  
  // Industry and commercial entities
  pharmaceutical: 7,
  biotech_company: 6,
  medtech_company: 6,
  digital_health: 5,
  
  // Support organizations
  professional_organization: 4,
  community: 3,
  service_provider: 2,
  
  // Default for unknown types
  default: 3
};

// Connection type weights (network importance)
export const CONNECTION_TYPE_WEIGHTS = {
  // High-value strategic connections
  investment: 5,
  spinout: 4,
  partnership: 3,
  affiliation: 2,
  
  // Infrastructure and support connections
  infrastructure: 2,
  support: 1.5,
  pilot: 1.5,
  funding: 1.5,
  
  // Operational connections
  tenant: 1,
  service: 0.5,
  
  // Default weight for unknown connection types
  default: 1
};

/**
 * Calculate centrality score for a single node
 * @param {Object} node - The node object
 * @param {Array} links - All links in the network
 * @returns {Object} Node with calculated centrality score and size
 */
export function calculateNodeCentrality(node, links) {
  // Get base score for node type
  const baseScore = NODE_TYPE_BASE_SCORES[node.type] || NODE_TYPE_BASE_SCORES.default;
  
  // Calculate connection score
  const nodeLinks = links.filter(link => 
    link.source === node.id || link.target === node.id
  );
  
  const connectionScore = nodeLinks.reduce((total, link) => {
    const weight = CONNECTION_TYPE_WEIGHTS[link.type] || CONNECTION_TYPE_WEIGHTS.default;
    return total + weight;
  }, 0);
  
  // Calculate raw centrality score
  const rawScore = baseScore + connectionScore;
  
  return {
    ...node,
    centralityScore: rawScore,
    baseScore,
    connectionScore,
    connectionCount: nodeLinks.length
  };
}

/**
 * Scale centrality scores to a visually pleasing size range
 * @param {Array} nodes - Array of nodes with centrality scores
 * @param {Object} options - Scaling options
 * @returns {Array} Nodes with scaled sizes
 */
export function scaleNodeSizes(nodes, options = {}) {
  const {
    minSize = 5,
    maxSize = 30,
    scalingMethod = 'logarithmic' // 'linear' or 'logarithmic'
  } = options;
  
  if (nodes.length === 0) return nodes;
  
  // Extract centrality scores
  const scores = nodes.map(node => node.centralityScore);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  
  // Handle edge case where all scores are the same
  if (minScore === maxScore) {
    return nodes.map(node => ({
      ...node,
      size: (minSize + maxSize) / 2
    }));
  }
  
  // Scale scores to size range
  return nodes.map(node => {
    let normalizedScore;
    
    if (scalingMethod === 'logarithmic') {
      // Use logarithmic scaling for better distribution
      const logScore = Math.log(node.centralityScore + 1);
      const logMin = Math.log(minScore + 1);
      const logMax = Math.log(maxScore + 1);
      normalizedScore = (logScore - logMin) / (logMax - logMin);
    } else {
      // Linear scaling
      normalizedScore = (node.centralityScore - minScore) / (maxScore - minScore);
    }
    
    const scaledSize = minSize + (normalizedScore * (maxSize - minSize));
    
    return {
      ...node,
      size: Math.round(scaledSize * 10) / 10 // Round to 1 decimal place
    };
  });
}

/**
 * Apply dynamic sizing to network data
 * @param {Object} networkData - Network data with nodes and links
 * @param {Object} options - Scaling and calculation options
 * @returns {Object} Network data with dynamically sized nodes
 */
export function applyDynamicSizing(networkData, options = {}) {
  const { nodes = [], links = [] } = networkData;
  
  if (nodes.length === 0) return networkData;
  
  // Calculate centrality scores for all nodes
  const nodesWithCentrality = nodes.map(node => 
    calculateNodeCentrality(node, links)
  );
  
  // Scale the sizes
  const nodesWithSizes = scaleNodeSizes(nodesWithCentrality, options);
  
  return {
    ...networkData,
    nodes: nodesWithSizes
  };
}

/**
 * Get centrality statistics for analysis
 * @param {Array} nodes - Array of nodes with centrality scores
 * @returns {Object} Statistics about the centrality distribution
 */
export function getCentralityStats(nodes) {
  if (nodes.length === 0) return null;
  
  const scores = nodes.map(node => node.centralityScore);
  const sizes = nodes.map(node => node.size);
  
  return {
    nodeCount: nodes.length,
    centralityScore: {
      min: Math.min(...scores),
      max: Math.max(...scores),
      mean: scores.reduce((a, b) => a + b, 0) / scores.length,
      median: scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)]
    },
    nodeSize: {
      min: Math.min(...sizes),
      max: Math.max(...sizes),
      mean: sizes.reduce((a, b) => a + b, 0) / sizes.length
    },
    topNodes: nodes
      .sort((a, b) => b.centralityScore - a.centralityScore)
      .slice(0, 10)
      .map(node => ({
        id: node.id,
        name: node.name,
        type: node.type,
        centralityScore: node.centralityScore,
        size: node.size,
        connectionCount: node.connectionCount
      }))
  };
}

/**
 * Enhanced centrality calculation with additional factors
 * @param {Object} node - The node object
 * @param {Array} links - All links in the network
 * @param {Object} additionalFactors - Additional scoring factors
 * @returns {Object} Node with enhanced centrality score
 */
export function calculateEnhancedCentrality(node, links, additionalFactors = {}) {
  const baseCalculation = calculateNodeCentrality(node, links);
  
  // Apply additional factors if provided
  let enhancementMultiplier = 1;
  
  if (additionalFactors.funding && node.totalFunding) {
    // Scale based on funding amount (logarithmic)
    const fundingFactor = Math.log(node.totalFunding + 1) / 10;
    enhancementMultiplier += fundingFactor * 0.3; // 30% boost max
  }
  
  if (additionalFactors.employees && node.employeeCount) {
    // Scale based on employee count
    const employeeFactor = Math.log(node.employeeCount + 1) / 5;
    enhancementMultiplier += employeeFactor * 0.2; // 20% boost max
  }
  
  if (additionalFactors.established && node.foundingYear) {
    // Give more weight to established players
    const currentYear = new Date().getFullYear();
    const age = currentYear - node.foundingYear;
    const ageFactor = Math.min(age / 20, 1); // Cap at 20 years
    enhancementMultiplier += ageFactor * 0.15; // 15% boost max
  }
  
  const enhancedScore = baseCalculation.centralityScore * enhancementMultiplier;
  
  return {
    ...baseCalculation,
    centralityScore: enhancedScore,
    enhancementMultiplier,
    additionalFactors: {
      funding: additionalFactors.funding && node.totalFunding ? node.totalFunding : null,
      employees: additionalFactors.employees && node.employeeCount ? node.employeeCount : null,
      established: additionalFactors.established && node.foundingYear ? node.foundingYear : null
    }
  };
}
