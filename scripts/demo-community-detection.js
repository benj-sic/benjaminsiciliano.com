#!/usr/bin/env node

/**
 * Demo script for Louvain Community Detection
 * 
 * This script demonstrates the community detection algorithm with a more complex
 * network structure that mimics real-world biotech ecosystem relationships.
 */

import { detectCommunities, detectCommunitiesMultiLevel } from '../src/utils/louvain.js';

// Create a more complex biotech network for demonstration
const biotechNetwork = {
  nodes: [
    // Research Universities
    { id: 'emory', type: 'university', size: 25 },
    { id: 'gatech', type: 'university', size: 23 },
    { id: 'uga', type: 'university', size: 18 },
    { id: 'gsu', type: 'university', size: 16 },
    
    // Large Biotech Companies
    { id: 'altea', type: 'company', size: 20 },
    { id: 'geovax', type: 'company', size: 18 },
    { id: 'micron', type: 'company', size: 16 },
    { id: 'clearside', type: 'company', size: 15 },
    
    // Startups
    { id: 'neurOp', type: 'startup', size: 12 },
    { id: 'oxos', type: 'startup', size: 10 },
    { id: 'biotechStartup1', type: 'startup', size: 8 },
    { id: 'biotechStartup2', type: 'startup', size: 8 },
    { id: 'biotechStartup3', type: 'startup', size: 8 },
    
    // Venture Capital
    { id: 'atlantaVentures', type: 'vc', size: 14 },
    { id: 'georgiaVentures', type: 'vc', size: 12 },
    { id: 'biotechCapital', type: 'vc', size: 10 },
    
    // Incubators & Accelerators
    { id: 'atdc', type: 'incubator', size: 16 },
    { id: 'createX', type: 'incubator', size: 14 },
    { id: 'biotechIncubator', type: 'incubator', size: 12 },
    
    // Service Providers
    { id: 'labServices', type: 'serviceProvider', size: 10 },
    { id: 'consulting', type: 'serviceProvider', size: 8 },
    { id: 'legalServices', type: 'serviceProvider', size: 8 },
    
    // Health Systems
    { id: 'emoryHealthcare', type: 'healthSystem', size: 20 },
    { id: 'piedmont', type: 'healthSystem', size: 18 },
    { id: 'northside', type: 'healthSystem', size: 16 }
  ],
  
  links: [
    // University spinouts
    { source: 'emory', target: 'altea', type: 'spinout' },
    { source: 'emory', target: 'neurOp', type: 'spinout' },
    { source: 'emory', target: 'geovax', type: 'spinout' },
    { source: 'gatech', target: 'micron', type: 'spinout' },
    { source: 'gatech', target: 'oxos', type: 'spinout' },
    { source: 'uga', target: 'biotechStartup1', type: 'spinout' },
    { source: 'gsu', target: 'biotechStartup2', type: 'spinout' },
    
    // Investment relationships
    { source: 'atlantaVentures', target: 'altea', type: 'investment' },
    { source: 'atlantaVentures', target: 'neurOp', type: 'investment' },
    { source: 'georgiaVentures', target: 'geovax', type: 'investment' },
    { source: 'biotechCapital', target: 'micron', type: 'investment' },
    { source: 'biotechCapital', target: 'oxos', type: 'investment' },
    { source: 'atlantaVentures', target: 'biotechStartup1', type: 'investment' },
    { source: 'georgiaVentures', target: 'biotechStartup2', type: 'investment' },
    { source: 'biotechCapital', target: 'biotechStartup3', type: 'investment' },
    
    // Incubator relationships
    { source: 'atdc', target: 'micron', type: 'support' },
    { source: 'atdc', target: 'oxos', type: 'support' },
    { source: 'createX', target: 'biotechStartup1', type: 'support' },
    { source: 'biotechIncubator', target: 'biotechStartup2', type: 'support' },
    { source: 'biotechIncubator', target: 'biotechStartup3', type: 'support' },
    
    // Research collaborations
    { source: 'emory', target: 'gatech', type: 'research_collaboration' },
    { source: 'emory', target: 'uga', type: 'research_collaboration' },
    { source: 'gatech', target: 'gsu', type: 'research_collaboration' },
    { source: 'emory', target: 'emoryHealthcare', type: 'research_collaboration' },
    { source: 'gatech', target: 'emoryHealthcare', type: 'research_collaboration' },
    
    // Service relationships
    { source: 'labServices', target: 'altea', type: 'service' },
    { source: 'labServices', target: 'neurOp', type: 'service' },
    { source: 'consulting', target: 'geovax', type: 'service' },
    { source: 'legalServices', target: 'micron', type: 'service' },
    { source: 'legalServices', target: 'oxos', type: 'service' },
    
    // Health system partnerships
    { source: 'emoryHealthcare', target: 'piedmont', type: 'partnership' },
    { source: 'emoryHealthcare', target: 'northside', type: 'partnership' },
    { source: 'emoryHealthcare', target: 'altea', type: 'partnership' },
    { source: 'emoryHealthcare', target: 'neurOp', type: 'partnership' },
    
    // Cross-community bridges
    { source: 'emory', target: 'atdc', type: 'support' },
    { source: 'gatech', target: 'createX', type: 'support' },
    { source: 'uga', target: 'biotechIncubator', type: 'support' },
    { source: 'atlantaVentures', target: 'atdc', type: 'partnership' },
    { source: 'georgiaVentures', target: 'createX', type: 'partnership' }
  ]
};

console.log('🏥 Atlanta Biotech Network Community Detection Demo\n');

console.log('Network Statistics:');
console.log(`- Nodes: ${biotechNetwork.nodes.length}`);
console.log(`- Links: ${biotechNetwork.links.length}`);
console.log(`- Node Types: ${[...new Set(biotechNetwork.nodes.map(n => n.type))].join(', ')}\n`);

console.log('🔍 Running Louvain Community Detection...\n');

try {
  // Single-level community detection
  const result = detectCommunities(biotechNetwork.nodes, biotechNetwork.links);
  
  console.log('📊 Community Detection Results:');
  console.log(`- Modularity: ${result.modularity.toFixed(4)}`);
  console.log(`- Communities: ${Object.keys(result.communityInfo).length}`);
  console.log(`- Iterations: ${result.iterations}\n`);
  
  console.log('🏘️  Community Details:');
  Object.entries(result.communityInfo).forEach(([communityId, info]) => {
    const communityNodes = info.nodes.map(nodeId => {
      const node = biotechNetwork.nodes.find(n => n.id === nodeId);
      return `${node.name || nodeId} (${node.type})`;
    });
    
    console.log(`\nCommunity ${communityId} (${info.size} nodes):`);
    communityNodes.forEach(nodeInfo => {
      console.log(`  • ${nodeInfo}`);
    });
  });
  
  console.log('\n🔗 Inter-Community Analysis:');
  const communities = result.communities;
  const communityIds = [...new Set(Object.values(communities))];
  
  communityIds.forEach((communityId, i) => {
    communityIds.slice(i + 1).forEach(otherCommunityId => {
      const bridges = biotechNetwork.links.filter(link => {
        const sourceCommunity = communities[link.source];
        const targetCommunity = communities[link.target];
        return (sourceCommunity === communityId && targetCommunity === otherCommunityId) ||
               (sourceCommunity === otherCommunityId && targetCommunity === communityId);
      });
      
      if (bridges.length > 0) {
        console.log(`\nCommunities ${communityId} ↔ ${otherCommunityId}:`);
        bridges.forEach(bridge => {
          const sourceNode = biotechNetwork.nodes.find(n => n.id === bridge.source);
          const targetNode = biotechNetwork.nodes.find(n => n.id === bridge.target);
          console.log(`  • ${sourceNode.name || sourceNode.id} ↔ ${targetNode.name || targetNode.id} (${bridge.type})`);
        });
      }
    });
  });
  
  console.log('\n🎯 Multi-Level Community Detection:');
  const multiLevelResult = detectCommunitiesMultiLevel(biotechNetwork.nodes, biotechNetwork.links, 3);
  
  multiLevelResult.forEach((level, index) => {
    console.log(`\nLevel ${index}:`);
    console.log(`  - Communities: ${Object.keys(level.communityInfo).length}`);
    console.log(`  - Modularity: ${level.modularity.toFixed(4)}`);
    console.log(`  - Iterations: ${level.iterations}`);
  });
  
  console.log('\n✅ Demo completed successfully!');
  console.log('\n💡 Insights:');
  console.log('• Universities tend to form their own communities with their spinouts');
  console.log('• Venture capital firms connect multiple startup communities');
  console.log('• Incubators bridge academic and commercial communities');
  console.log('• Health systems form partnerships across communities');
  console.log('• Service providers connect to multiple communities');
  
} catch (error) {
  console.error('❌ Demo failed:', error);
}
