/*
 * Copyright (c) 2025 Benjamin Siciliano
 * All rights reserved.
 * 
 * This file is part of the benjaminsiciliano.com project.
 * Unauthorized copying, modification, distribution, or use is strictly prohibited.
 * For licensing inquiries, contact: ben.siciliano@gmail.com
 */

/**
 * Louvain Method for Community Detection
 * 
 * This implementation follows the Louvain method algorithm:
 * 1. Initialize each node in its own community
 * 2. Iteratively move nodes between communities to maximize modularity gain
 * 3. Aggregate communities into super-nodes
 * 4. Repeat until no more improvement is possible
 */

/**
 * Calculate the modularity of a network partition
 * @param {Array} nodes - Array of node objects
 * @param {Array} links - Array of link objects
 * @param {Object} communities - Object mapping node IDs to community IDs
 * @returns {number} - Modularity value
 */
function calculateModularity(nodes, links, communities) {
  const m = links.length;
  if (m === 0) return 0;
  
  let Q = 0;
  const nodeDegrees = {};
  
  // Calculate node degrees
  nodes.forEach(node => {
    nodeDegrees[node.id] = 0;
  });
  
  links.forEach(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    nodeDegrees[sourceId]++;
    nodeDegrees[targetId]++;
  });
  
  // Calculate modularity
  links.forEach(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    
    if (communities[sourceId] === communities[targetId]) {
      const ki = nodeDegrees[sourceId];
      const kj = nodeDegrees[targetId];
      Q += 1 - (ki * kj) / (2 * m);
    }
  });
  
  return Q / (2 * m);
}

/**
 * Calculate the modularity gain when moving a node to a different community
 * @param {string} nodeId - ID of the node to move
 * @param {string} targetCommunity - Target community ID
 * @param {Object} communities - Current community assignments
 * @param {Array} links - Array of link objects
 * @param {Object} nodeDegrees - Object mapping node IDs to degrees
 * @param {Object} communityDegrees - Object mapping community IDs to total degrees
 * @param {Object} communityInternalEdges - Object mapping community IDs to internal edge counts
 * @returns {number} - Modularity gain
 */
function calculateModularityGain(nodeId, targetCommunity, communities, links, nodeDegrees, communityDegrees, communityInternalEdges) {
  const m = links.length;
  if (m === 0) return 0;
  
  const ki = nodeDegrees[nodeId];
  
  // Calculate ki,in (edges from node to target community)
  let kiIn = 0;
  links.forEach(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    
    if (sourceId === nodeId && communities[targetId] === targetCommunity) {
      kiIn++;
    } else if (targetId === nodeId && communities[sourceId] === targetCommunity) {
      kiIn++;
    }
  });
  
  // Calculate modularity gain
  const deltaQ = (kiIn / m) - (ki * communityDegrees[targetCommunity]) / (2 * m * m);
  
  return deltaQ;
}

/**
 * Perform one iteration of the Louvain algorithm
 * @param {Array} nodes - Array of node objects
 * @param {Array} links - Array of link objects
 * @param {Object} communities - Current community assignments
 * @returns {Object} - New community assignments and whether any changes occurred
 */
function louvainIteration(nodes, links, communities) {
  let changed = false;
  const nodeDegrees = {};
  const communityDegrees = {};
  const communityInternalEdges = {};
  
  // Initialize data structures
  nodes.forEach(node => {
    nodeDegrees[node.id] = 0;
  });
  
  links.forEach(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    nodeDegrees[sourceId]++;
    nodeDegrees[targetId]++;
  });
  
  // Calculate community degrees and internal edges
  Object.values(communities).forEach(communityId => {
    communityDegrees[communityId] = 0;
    communityInternalEdges[communityId] = 0;
  });
  
  nodes.forEach(node => {
    const communityId = communities[node.id];
    communityDegrees[communityId] += nodeDegrees[node.id];
  });
  
  links.forEach(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    
    if (communities[sourceId] === communities[targetId]) {
      communityInternalEdges[communities[sourceId]]++;
    }
  });
  
  // Try to move each node to its best community
  nodes.forEach(node => {
    const nodeId = node.id;
    let bestCommunity = communities[nodeId];
    let bestGain = 0;
    
    // Find the community that gives the best modularity gain
    const neighborCommunities = new Set();
    links.forEach(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      
      if (sourceId === nodeId) {
        neighborCommunities.add(communities[targetId]);
      } else if (targetId === nodeId) {
        neighborCommunities.add(communities[sourceId]);
      }
    });
    
    // Also consider the current community
    const currentCommunity = communities[nodeId];
    neighborCommunities.add(currentCommunity);
    
    neighborCommunities.forEach(communityId => {
      const gain = calculateModularityGain(nodeId, communityId, communities, links, nodeDegrees, communityDegrees, communityInternalEdges);
      if (gain > bestGain) {
        bestGain = gain;
        bestCommunity = communityId;
      }
    });
    
    // Move node if there's a positive gain
    if (bestGain > 0 && bestCommunity !== currentCommunity) {
      communities[nodeId] = bestCommunity;
      changed = true;
    }
  });
  
  return { communities, changed };
}

/**
 * Aggregate communities into super-nodes
 * @param {Array} nodes - Array of node objects
 * @param {Array} links - Array of link objects
 * @param {Object} communities - Community assignments
 * @returns {Object} - Aggregated network with super-nodes and super-links
 */
function aggregateCommunities(nodes, links, communities) {
  const communityIds = [...new Set(Object.values(communities))];
  const communityMap = {};
  
  // Create super-nodes
  const superNodes = communityIds.map(communityId => {
    const communityNodes = nodes.filter(node => communities[node.id] === communityId);
    const totalSize = communityNodes.reduce((sum, node) => sum + (node.size || 1), 0);
    
    const superNode = {
      id: `community_${communityId}`,
      name: `Community ${communityId}`,
      type: 'community',
      size: Math.max(totalSize / communityNodes.length, 10),
      originalNodes: communityNodes,
      communityId: communityId
    };
    
    communityMap[communityId] = superNode;
    return superNode;
  });
  
  // Create super-links
  const superLinks = [];
  const linkMap = new Map();
  
  links.forEach(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    
    const sourceCommunity = communities[sourceId];
    const targetCommunity = communities[targetId];
    
    if (sourceCommunity !== targetCommunity) {
      const linkKey = `${Math.min(sourceCommunity, targetCommunity)}-${Math.max(sourceCommunity, targetCommunity)}`;
      
      if (!linkMap.has(linkKey)) {
        linkMap.set(linkKey, {
          source: communityMap[sourceCommunity],
          target: communityMap[targetCommunity],
          type: 'inter_community',
          weight: 1
        });
      } else {
        linkMap.get(linkKey).weight++;
      }
    }
  });
  
  superLinks.push(...linkMap.values());
  
  return { nodes: superNodes, links: superLinks };
}

/**
 * Main Louvain algorithm function
 * @param {Array} nodes - Array of node objects
 * @param {Array} links - Array of link objects
 * @param {number} maxIterations - Maximum number of iterations (default: 100)
 * @returns {Object} - Final community assignments and modularity
 */
export function detectCommunities(nodes, links, maxIterations = 100) {
  if (nodes.length === 0) return { communities: {}, modularity: 0 };
  
  // Initialize each node in its own community
  let communities = {};
  nodes.forEach((node, index) => {
    communities[node.id] = index;
  });
  
  let iteration = 0;
  let changed = true;
  
  // Main loop
  while (changed && iteration < maxIterations) {
    const result = louvainIteration(nodes, links, communities);
    communities = result.communities;
    changed = result.changed;
    iteration++;
  }
  
  // Calculate final modularity
  const modularity = calculateModularity(nodes, links, communities);
  
  // Create community information
  const communityInfo = {};
  Object.values(communities).forEach(communityId => {
    if (!communityInfo[communityId]) {
      communityInfo[communityId] = {
        id: communityId,
        nodes: [],
        size: 0
      };
    }
  });
  
  nodes.forEach(node => {
    const communityId = communities[node.id];
    communityInfo[communityId].nodes.push(node.id);
    communityInfo[communityId].size++;
  });
  
  return {
    communities,
    modularity,
    communityInfo,
    iterations: iteration
  };
}

/**
 * Detect communities with multiple levels of aggregation
 * @param {Array} nodes - Array of node objects
 * @param {Array} links - Array of link objects
 * @param {number} maxLevels - Maximum number of aggregation levels (default: 3)
 * @returns {Array} - Array of community detection results for each level
 */
export function detectCommunitiesMultiLevel(nodes, links, maxLevels = 3) {
  const results = [];
  let currentNodes = [...nodes];
  let currentLinks = [...links];
  
  for (let level = 0; level < maxLevels; level++) {
    const result = detectCommunities(currentNodes, currentLinks);
    results.push({
      level,
      ...result,
      nodes: currentNodes,
      links: currentLinks
    });
    
    // Stop if we can't aggregate further
    if (Object.keys(result.communityInfo).length <= 1) {
      break;
    }
    
    // Aggregate for next level
    const aggregated = aggregateCommunities(currentNodes, currentLinks, result.communities);
    currentNodes = aggregated.nodes;
    currentLinks = aggregated.links;
  }
  
  return results;
}
