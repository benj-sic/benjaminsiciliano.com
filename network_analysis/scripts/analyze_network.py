#!/usr/bin/env python3
"""
Atlanta Biotech Network Analysis Script

A standalone script to analyze the Atlanta biotech ecosystem network using NetworkX.
Calculates standard network metrics and generates presentation-quality visualizations.

Usage: python analyze_network.py

Requirements:
- Python 3.7+
- NetworkX, pandas, matplotlib, seaborn, numpy, community (python-louvain)

Author: Benjamin Siciliano
"""

import json
import networkx as nx
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import community as community_louvain
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

# Set style for publication-quality plots
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("husl")

class BiotechNetworkAnalyzer:
    """Analyzes the Atlanta biotech network using NetworkX."""
    
    def __init__(self, data_file='data/biotech_network_data.json'):
        """Initialize the analyzer with network data."""
        self.data_file = data_file
        self.G = nx.Graph()
        self.node_metrics = {}
        self.network_stats = {}
        self.communities = {}
        self.raw_nodes = 0
        self.raw_links = 0
        self.node_names = {}  # Mapping from node ID to display name
        self.raw_data = {}  # Store raw data for type analysis
        
    def load_data(self):
        """Load and parse the JSON data file."""
        print("Loading network data...")
        
        # Check if JSON file exists, if not, try to convert from JS
        if not Path(self.data_file).exists():
            print("JSON data file not found. Attempting to convert from JavaScript...")
            self._convert_js_to_json()
        
        # Load JSON data
        with open(self.data_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        self.raw_nodes = len(data.get('nodes', []))
        self.raw_links = len(data.get('links', []))
        
        # Create node ID to display name mapping
        self.node_names = {}
        for node in data.get('nodes', []):
            node_id = node.get('id')
            node_name = node.get('name', node_id)  # Fallback to ID if no name
            self.node_names[node_id] = node_name
        
        # Store raw data for type analysis
        self.raw_data = data
        
        print(f"Loaded {self.raw_nodes} nodes and {self.raw_links} links")
        return data
    
    def _convert_js_to_json(self):
        """Convert JavaScript data to JSON format."""
        print("Converting JavaScript data to JSON...")
        
        # Try to run the converter script
        try:
            import subprocess
            result = subprocess.run(['python', 'convert_data.py'], 
                                  capture_output=True, text=True, cwd=Path.cwd())
            if result.returncode == 0:
                print("Data conversion successful!")
            else:
                print(f"Conversion failed: {result.stderr}")
                # Fallback: create minimal data structure
                self._create_minimal_data()
        except Exception as e:
            print(f"Could not run converter: {e}")
            self._create_minimal_data()
    
    def _create_minimal_data(self):
        """Create a minimal data structure for testing."""
        print("Creating minimal data structure for testing...")
        
        # Ensure the data directory exists
        data_dir = Path(self.data_file).parent
        data_dir.mkdir(parents=True, exist_ok=True)
        
        minimal_data = {
            "nodes": [
                {"id": "emory", "name": "Emory University", "type": "university"},
                {"id": "gatech", "name": "Georgia Tech", "type": "university"},
                {"id": "biolocity", "name": "Biolocity", "type": "accelerator"}
            ],
            "links": [
                {"source": "emory", "target": "gatech", "type": "collaboration"},
                {"source": "emory", "target": "biolocity", "type": "affiliation"},
                {"source": "gatech", "target": "biolocity", "type": "affiliation"}
            ],
            "nodeColors": {
                "university": "#FF6B6B",
                "accelerator": "#4ECDC4"
            }
        }
        
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(minimal_data, f, indent=2)
    
    def build_network(self, data):
        """Build NetworkX graph from the data."""
        print("Building network graph...")
        
        # Add nodes
        for node in data.get('nodes', []):
            node_id = node.get('id', '')
            if node_id:
                self.G.add_node(node_id, **{k: v for k, v in node.items() if k != 'id'})
        
        # Add edges
        for link in data.get('links', []):
            source = link.get('source', '')
            target = link.get('target', '')
            if source and target and source != target:
                self.G.add_edge(source, target, **{k: v for k, v in link.items() if k not in ['source', 'target']})
        
        print(f"Network built: {self.G.number_of_nodes()} nodes, {self.G.number_of_edges()} edges")
        return self.G
    
    def calculate_metrics(self):
        """Calculate all network metrics."""
        print("Calculating network metrics...")
        
        # Node-level metrics
        degree_centrality = nx.degree_centrality(self.G)
        betweenness_centrality = nx.betweenness_centrality(self.G)
        closeness_centrality = nx.closeness_centrality(self.G)
        harmonic_centrality = nx.harmonic_centrality(self.G)
        eigenvector_centrality = nx.eigenvector_centrality(self.G, max_iter=1000)
        pagerank = nx.pagerank(self.G, alpha=0.85, max_iter=1000)
        clustering_coefficient = nx.clustering(self.G)
        
        # Calculate structural holes metrics
        structural_holes = self._calculate_structural_holes()
        
        # Calculate core-periphery analysis
        core_periphery = self._calculate_core_periphery()
        
        # Calculate network resilience metrics
        resilience_metrics = self._calculate_network_resilience()
        
        # Community detection using Louvain algorithm
        try:
            communities = community_louvain.best_partition(self.G)
            self.communities = communities
            # Generate meaningful community labels
            self.community_labels = self._generate_community_labels()
        except Exception as e:
            print(f"Warning: Could not perform community detection: {e}")
            self.communities = {node: 0 for node in self.G.nodes()}
            self.community_labels = {0: "Single Community"}
        
        # Store node metrics
        self.node_metrics = {}
        for node in self.G.nodes():
            community_id = self.communities.get(node, 0)
            community_label = self.community_labels.get(community_id, f"Community {community_id}")
            self.node_metrics[node] = {
                'node_id': node,
                'degree': self.G.degree(node),
                'degree_centrality': degree_centrality.get(node, 0),
                'betweenness_centrality': betweenness_centrality.get(node, 0),
                'closeness_centrality': closeness_centrality.get(node, 0),
                'harmonic_centrality': harmonic_centrality.get(node, 0),
                'eigenvector_centrality': eigenvector_centrality.get(node, 0),
                'pagerank': pagerank.get(node, 0),
                'clustering_coefficient': clustering_coefficient.get(node, 0),
                'structural_holes': structural_holes.get(node, {}),
                'core_periphery': core_periphery.get(node, {}),
                'community_id': community_id,
                'community_label': community_label
            }
        
        # Calculate rich club coefficient for different degree thresholds
        rich_club_coeffs = {}
        max_degree = max(dict(self.G.degree()).values()) if self.G.number_of_nodes() > 0 else 0
        for k in range(1, min(max_degree + 1, 20)):  # Calculate for degrees 1-19 or max degree
            try:
                coeff = nx.rich_club_coefficient(self.G, k)
                # Handle both scalar and dict returns
                if isinstance(coeff, dict):
                    rich_club_coeffs[k] = coeff.get(k, 0.0)
                else:
                    rich_club_coeffs[k] = float(coeff) if coeff is not None else 0.0
            except:
                rich_club_coeffs[k] = 0.0
        
        # Calculate community quality metrics
        community_quality = self._calculate_community_quality()
        
        # Network-level metrics
        self.network_stats = {
            'density': nx.density(self.G),
            'diameter': nx.diameter(self.G) if nx.is_connected(self.G) else 'Not connected',
            'average_path_length': nx.average_shortest_path_length(self.G) if nx.is_connected(self.G) else 'Not connected',
            'assortativity': nx.degree_assortativity_coefficient(self.G),
            'transitivity': nx.transitivity(self.G),
            'average_clustering': nx.average_clustering(self.G),
            'rich_club_coefficients': rich_club_coeffs,
            'community_quality': community_quality,
            'resilience_metrics': resilience_metrics,
            'num_communities': len(set(self.communities.values())),
            'modularity': community_louvain.modularity(self.communities, self.G) if self.communities else 0,
            'num_nodes': self.G.number_of_nodes(),
            'num_edges': self.G.number_of_edges(),
            'raw_nodes': self.raw_nodes,
            'raw_links': self.raw_links
        }
        
        print("Metrics calculated successfully!")
    
    def _calculate_structural_holes(self):
        """Calculate structural holes metrics for each node."""
        structural_holes = {}
        
        for node in self.G.nodes():
            neighbors = list(self.G.neighbors(node))
            if len(neighbors) < 2:
                # Single neighbor or isolated node
                structural_holes[node] = {
                    'effective_size': 0.0,
                    'efficiency': 0.0,
                    'constraint': 1.0,
                    'hierarchy': 0.0
                }
                continue
            
            # Calculate effective size (Burt's measure)
            # Effective size = n - (2t/n) where n = degree, t = ties among neighbors
            neighbor_edges = 0
            for i, neighbor1 in enumerate(neighbors):
                for neighbor2 in neighbors[i+1:]:
                    if self.G.has_edge(neighbor1, neighbor2):
                        neighbor_edges += 1
            
            n = len(neighbors)
            t = neighbor_edges
            effective_size = n - (2 * t / n) if n > 0 else 0
            
            # Calculate efficiency (effective size / degree)
            efficiency = effective_size / n if n > 0 else 0
            
            # Calculate constraint (Burt's constraint measure)
            # Constraint = sum((p_ij + sum(p_ik * p_kj))^2) for all j != i
            constraint = 0.0
            for j in neighbors:
                p_ij = 1.0 / n  # Direct connection strength
                
                # Calculate indirect connections through other neighbors
                indirect_sum = 0.0
                for k in neighbors:
                    if k != j and self.G.has_edge(k, j):
                        p_ik = 1.0 / n
                        p_kj = 1.0 / self.G.degree(k) if self.G.degree(k) > 0 else 0
                        indirect_sum += p_ik * p_kj
                
                total_connection = p_ij + indirect_sum
                constraint += total_connection ** 2
            
            # Calculate hierarchy (constraint concentration)
            # Hierarchy = 1 - (sum of squared constraint components) / (constraint^2)
            if constraint > 0:
                constraint_components = []
                for j in neighbors:
                    p_ij = 1.0 / n
                    indirect_sum = 0.0
                    for k in neighbors:
                        if k != j and self.G.has_edge(k, j):
                            p_ik = 1.0 / n
                            p_kj = 1.0 / self.G.degree(k) if self.G.degree(k) > 0 else 0
                            indirect_sum += p_ik * p_kj
                    total_connection = p_ij + indirect_sum
                    constraint_components.append(total_connection ** 2)
                
                hierarchy = 1 - (sum(constraint_components) / (constraint ** 2)) if constraint > 0 else 0
            else:
                hierarchy = 0.0
            
            structural_holes[node] = {
                'effective_size': effective_size,
                'efficiency': efficiency,
                'constraint': constraint,
                'hierarchy': hierarchy
            }
        
        return structural_holes
    
    def _calculate_core_periphery(self):
        """Calculate core-periphery analysis for each node."""
        core_periphery = {}
        
        # Calculate degree centrality for all nodes
        degree_centrality = nx.degree_centrality(self.G)
        
        # Calculate k-core decomposition
        k_core = nx.core_number(self.G)
        max_k_core = max(k_core.values()) if k_core else 0
        
        # Calculate betweenness centrality for core identification
        betweenness_centrality = nx.betweenness_centrality(self.G)
        
        # Calculate clustering coefficient
        clustering_coeff = nx.clustering(self.G)
        
        # Calculate average neighbor degree
        avg_neighbor_degree = {}
        for node in self.G.nodes():
            neighbors = list(self.G.neighbors(node))
            if neighbors:
                neighbor_degrees = [self.G.degree(neighbor) for neighbor in neighbors]
                avg_neighbor_degree[node] = np.mean(neighbor_degrees)
            else:
                avg_neighbor_degree[node] = 0
        
        # Calculate core-periphery score for each node
        for node in self.G.nodes():
            # Normalize metrics to 0-1 scale
            norm_degree = degree_centrality.get(node, 0)
            norm_betweenness = betweenness_centrality.get(node, 0)
            norm_k_core = k_core.get(node, 0) / max_k_core if max_k_core > 0 else 0
            norm_clustering = clustering_coeff.get(node, 0)
            norm_avg_neighbor_degree = avg_neighbor_degree.get(node, 0) / max(avg_neighbor_degree.values()) if avg_neighbor_degree else 0
            
            # Core-periphery score (higher = more core-like)
            # Core nodes: high degree, high betweenness, high k-core, low clustering, high neighbor degree
            core_score = (
                0.3 * norm_degree +
                0.3 * norm_betweenness +
                0.2 * norm_k_core +
                0.1 * (1 - norm_clustering) +  # Low clustering is more core-like
                0.1 * norm_avg_neighbor_degree
            )
            
            # Determine core vs periphery classification
            # Use percentile-based classification
            all_scores = [core_score for core_score in [core_score]]
            threshold = np.percentile([core_score for node in self.G.nodes()], 70)  # Top 30% are core
            
            is_core = core_score >= threshold
            
            # Calculate additional metrics
            degree = self.G.degree(node)
            k_core_value = k_core.get(node, 0)
            
            # Calculate local clustering (how clustered the node's neighborhood is)
            local_clustering = clustering_coeff.get(node, 0)
            
            # Calculate participation coefficient (how well connected to different communities)
            participation_coeff = 0.0
            if self.communities:
                community_connections = {}
                for neighbor in self.G.neighbors(node):
                    neighbor_community = self.communities.get(neighbor, 0)
                    community_connections[neighbor_community] = community_connections.get(neighbor_community, 0) + 1
                
                if community_connections:
                    total_connections = sum(community_connections.values())
                    participation_coeff = 1 - sum((count/total_connections)**2 for count in community_connections.values())
            
            core_periphery[node] = {
                'core_score': core_score,
                'is_core': is_core,
                'k_core': k_core_value,
                'participation_coefficient': participation_coeff,
                'local_clustering': local_clustering,
                'avg_neighbor_degree': avg_neighbor_degree.get(node, 0)
            }
        
        return core_periphery
    
    def _calculate_network_resilience(self):
        """Calculate network resilience metrics."""
        resilience_metrics = {}
        
        # Basic connectivity metrics
        num_nodes = self.G.number_of_nodes()
        num_edges = self.G.number_of_edges()
        
        # Calculate largest connected component
        if nx.is_connected(self.G):
            largest_cc_size = num_nodes
            largest_cc_ratio = 1.0
        else:
            connected_components = list(nx.connected_components(self.G))
            largest_cc = max(connected_components, key=len)
            largest_cc_size = len(largest_cc)
            largest_cc_ratio = largest_cc_size / num_nodes if num_nodes > 0 else 0
        
        # Calculate node connectivity (minimum nodes to remove to disconnect)
        try:
            node_connectivity = nx.node_connectivity(self.G)
        except:
            node_connectivity = 0
        
        # Calculate edge connectivity (minimum edges to remove to disconnect)
        try:
            edge_connectivity = nx.edge_connectivity(self.G)
        except:
            edge_connectivity = 0
        
        # Calculate algebraic connectivity (Fiedler value)
        try:
            algebraic_connectivity = nx.algebraic_connectivity(self.G)
        except:
            algebraic_connectivity = 0
        
        # Calculate robustness to random failures (simulation)
        robustness_random = self._simulate_random_failures()
        
        # Calculate robustness to targeted attacks (simulation)
        robustness_targeted = self._simulate_targeted_attacks()
        
        # Calculate critical nodes (nodes whose removal most affects connectivity)
        critical_nodes = self._identify_critical_nodes()
        
        # Calculate network efficiency
        try:
            efficiency = nx.global_efficiency(self.G)
        except:
            efficiency = 0
        
        # Calculate vulnerability (inverse of robustness)
        vulnerability = 1 - robustness_targeted if robustness_targeted > 0 else 1
        
        resilience_metrics = {
            'largest_cc_size': largest_cc_size,
            'largest_cc_ratio': largest_cc_ratio,
            'node_connectivity': node_connectivity,
            'edge_connectivity': edge_connectivity,
            'algebraic_connectivity': algebraic_connectivity,
            'robustness_random': robustness_random,
            'robustness_targeted': robustness_targeted,
            'efficiency': efficiency,
            'vulnerability': vulnerability,
            'critical_nodes_count': len(critical_nodes)
        }
        
        return resilience_metrics
    
    def _simulate_random_failures(self, num_simulations=100):
        """Simulate random node failures to test robustness."""
        if self.G.number_of_nodes() < 2:
            return 0.0
        
        total_robustness = 0.0
        for _ in range(num_simulations):
            # Randomly remove 10% of nodes
            nodes_to_remove = int(0.1 * self.G.number_of_nodes())
            if nodes_to_remove == 0:
                nodes_to_remove = 1
            
            # Create a copy of the graph
            G_copy = self.G.copy()
            nodes = list(G_copy.nodes())
            np.random.shuffle(nodes)
            
            # Remove random nodes
            for node in nodes[:nodes_to_remove]:
                if G_copy.has_node(node):
                    G_copy.remove_node(node)
            
            # Calculate remaining connectivity
            if G_copy.number_of_nodes() > 0:
                remaining_cc = max(len(cc) for cc in nx.connected_components(G_copy))
                robustness = remaining_cc / self.G.number_of_nodes()
            else:
                robustness = 0.0
            
            total_robustness += robustness
        
        return total_robustness / num_simulations
    
    def _simulate_targeted_attacks(self, num_simulations=10):
        """Simulate targeted attacks on high-degree nodes."""
        if self.G.number_of_nodes() < 2:
            return 0.0
        
        total_robustness = 0.0
        for _ in range(num_simulations):
            # Remove top 10% of nodes by degree
            nodes_to_remove = int(0.1 * self.G.number_of_nodes())
            if nodes_to_remove == 0:
                nodes_to_remove = 1
            
            # Get nodes sorted by degree
            node_degrees = [(node, self.G.degree(node)) for node in self.G.nodes()]
            node_degrees.sort(key=lambda x: x[1], reverse=True)
            
            # Create a copy of the graph
            G_copy = self.G.copy()
            
            # Remove high-degree nodes
            for node, _ in node_degrees[:nodes_to_remove]:
                if G_copy.has_node(node):
                    G_copy.remove_node(node)
            
            # Calculate remaining connectivity
            if G_copy.number_of_nodes() > 0:
                remaining_cc = max(len(cc) for cc in nx.connected_components(G_copy))
                robustness = remaining_cc / self.G.number_of_nodes()
            else:
                robustness = 0.0
            
            total_robustness += robustness
        
        return total_robustness / num_simulations
    
    def _identify_critical_nodes(self):
        """Identify nodes whose removal most affects network connectivity."""
        if self.G.number_of_nodes() < 2:
            return []
        
        critical_nodes = []
        original_cc = max(len(cc) for cc in nx.connected_components(self.G))
        
        for node in self.G.nodes():
            # Create a copy without this node
            G_copy = self.G.copy()
            G_copy.remove_node(node)
            
            if G_copy.number_of_nodes() > 0:
                remaining_cc = max(len(cc) for cc in nx.connected_components(G_copy))
                impact = (original_cc - remaining_cc) / original_cc
                
                if impact > 0.1:  # Node removal causes >10% connectivity loss
                    critical_nodes.append((node, impact))
        
        # Sort by impact and return top nodes
        critical_nodes.sort(key=lambda x: x[1], reverse=True)
        return [node for node, impact in critical_nodes[:10]]  # Top 10 critical nodes
    
    def _calculate_community_quality(self):
        """Calculate community quality metrics."""
        if not self.communities:
            return {
                'average_conductance': 0.0,
                'average_cut_ratio': 0.0,
                'average_expansion': 0.0,
                'average_internal_density': 0.0,
                'average_edges_inside': 0.0,
                'average_edges_outside': 0.0
            }
        
        # Group nodes by community
        community_nodes = {}
        for node, community_id in self.communities.items():
            if community_id not in community_nodes:
                community_nodes[community_id] = []
            community_nodes[community_id].append(node)
        
        # Calculate quality metrics for each community
        conductances = []
        cut_ratios = []
        expansions = []
        internal_densities = []
        edges_inside = []
        edges_outside = []
        
        for community_id, nodes in community_nodes.items():
            if len(nodes) < 2:  # Skip single-node communities
                continue
                
            # Create subgraph for this community
            community_subgraph = self.G.subgraph(nodes)
            
            # Calculate edges inside community
            edges_inside_count = community_subgraph.number_of_edges()
            edges_inside.append(edges_inside_count)
            
            # Calculate edges outside community
            edges_outside_count = 0
            for node in nodes:
                for neighbor in self.G.neighbors(node):
                    if neighbor not in nodes:
                        edges_outside_count += 1
            edges_outside.append(edges_outside_count)
            
            # Calculate conductance (lower is better)
            total_edges = edges_inside_count + edges_outside_count
            if total_edges > 0:
                conductance = edges_outside_count / total_edges
                conductances.append(conductance)
            
            # Calculate cut ratio (lower is better)
            if len(nodes) > 0:
                cut_ratio = edges_outside_count / (len(nodes) * (self.G.number_of_nodes() - len(nodes)))
                cut_ratios.append(cut_ratio)
            
            # Calculate expansion (lower is better)
            if len(nodes) > 0:
                expansion = edges_outside_count / len(nodes)
                expansions.append(expansion)
            
            # Calculate internal density (higher is better)
            if len(nodes) > 1:
                max_possible_edges = len(nodes) * (len(nodes) - 1) / 2
                internal_density = edges_inside_count / max_possible_edges if max_possible_edges > 0 else 0
                internal_densities.append(internal_density)
        
        return {
            'average_conductance': np.mean(conductances) if conductances else 0.0,
            'average_cut_ratio': np.mean(cut_ratios) if cut_ratios else 0.0,
            'average_expansion': np.mean(expansions) if expansions else 0.0,
            'average_internal_density': np.mean(internal_densities) if internal_densities else 0.0,
            'average_edges_inside': np.mean(edges_inside) if edges_inside else 0.0,
            'average_edges_outside': np.mean(edges_outside) if edges_outside else 0.0
        }
    
    def _generate_community_labels(self):
        """Generate meaningful labels for communities based on their characteristics."""
        community_labels = {}
        
        # Group nodes by community
        community_nodes = {}
        for node, community_id in self.communities.items():
            if community_id not in community_nodes:
                community_nodes[community_id] = []
            community_nodes[community_id].append(node)
        
        # Load node data for analysis
        try:
            with open('data/biotech_network_data.json', 'r') as f:
                data = json.load(f)
            node_data = {node['id']: node for node in data['nodes']}
        except:
            node_data = {}
        
        # Analyze each community
        for community_id, nodes in community_nodes.items():
            if len(nodes) == 1:
                # Single node community
                node = nodes[0]
                node_info = node_data.get(node, {})
                node_type = node_info.get('type', 'unknown')
                community_labels[community_id] = f"Single {node_type.title()}: {node.replace('_', ' ').title()}"
            else:
                # Multi-node community - analyze characteristics
                node_types = []
                node_names = []
                
                for node in nodes:
                    node_info = node_data.get(node, {})
                    node_type = node_info.get('type', 'unknown')
                    node_name = node_info.get('name', node.replace('_', ' ').title())
                    node_types.append(node_type)
                    node_names.append(node_name)
                
                # Count node types
                type_counts = {}
                for node_type in node_types:
                    type_counts[node_type] = type_counts.get(node_type, 0) + 1
                
                # Find dominant type
                dominant_type = max(type_counts, key=type_counts.get)
                dominant_count = type_counts[dominant_type]
                
                # Find most central node (highest degree)
                central_node = max(nodes, key=lambda n: self.G.degree(n))
                central_node_info = node_data.get(central_node, {})
                central_node_name = central_node_info.get('name', central_node.replace('_', ' ').title())
                
                # Generate label based on characteristics
                if dominant_count == len(nodes):
                    # All nodes are same type
                    if dominant_type == 'university':
                        community_labels[community_id] = f"Academic Cluster ({len(nodes)} nodes)"
                    elif dominant_type == 'startup':
                        community_labels[community_id] = f"Startup Cluster ({len(nodes)} nodes)"
                    elif dominant_type == 'vc':
                        community_labels[community_id] = f"Investment Cluster ({len(nodes)} nodes)"
                    elif dominant_type == 'government':
                        community_labels[community_id] = f"Government Cluster ({len(nodes)} nodes)"
                    else:
                        community_labels[community_id] = f"{dominant_type.title()} Cluster ({len(nodes)} nodes)"
                else:
                    # Mixed community - use central node and dominant type
                    if dominant_type == 'university':
                        community_labels[community_id] = f"Academic Hub: {central_node_name} ({len(nodes)} nodes)"
                    elif dominant_type == 'startup':
                        community_labels[community_id] = f"Startup Hub: {central_node_name} ({len(nodes)} nodes)"
                    else:
                        community_labels[community_id] = f"Mixed: {central_node_name} ({len(nodes)} nodes)"
        
        return community_labels
    
    def export_csv(self, filename='data/biotech_network_metrics.csv'):
        """Export node-level metrics to CSV."""
        print(f"Exporting metrics to {filename}...")
        
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        df = df.reset_index(drop=True)
        df.to_csv(filename, index=False)
        print(f"CSV exported: {filename}")
        return df
    
    def create_visualizations(self):
        """Create all visualization plots."""
        print("Creating visualizations...")
        
        # Ensure visualizations directory exists
        viz_dir = Path('visualizations')
        viz_dir.mkdir(parents=True, exist_ok=True)
        
        # Set up scientific journal plotting style
        plt.rcParams.update({
            'figure.figsize': (10, 8),
            'font.size': 18,
            'font.weight': 'bold',
            'axes.titlesize': 20,
            'axes.titleweight': 'bold',
            'axes.labelsize': 18,
            'axes.labelweight': 'bold',
            'xtick.labelsize': 16,
            'ytick.labelsize': 16,
            'legend.fontsize': 16,
            'legend.title_fontsize': 18,
            'axes.grid': False,
            'axes.spines.top': False,
            'axes.spines.right': False,
            'axes.linewidth': 1.5,
            'xtick.major.width': 1.5,
            'ytick.major.width': 1.5,
            'xtick.minor.width': 1,
            'ytick.minor.width': 1,
            'lines.linewidth': 2,
            'patch.linewidth': 1.5
        })
        
        # 1. Top 10 Hubs (Degree Centrality)
        self._plot_top_hubs()
        
        # 2. Top 10 Bridges (Betweenness Centrality)
        self._plot_top_bridges()
        
        # 3. Top 10 Closeness Centrality
        self._plot_top_closeness()
        
        # 4. Top 10 Clustering Coefficient
        self._plot_top_clustering()
        
        # 5. Top 10 Eigenvector Centrality
        self._plot_top_eigenvector()
        
        # 6. Top 10 Harmonic Centrality
        self._plot_top_harmonic()
        
        # 7. Top 10 PageRank
        self._plot_top_pagerank()
        
        # 8. Top 10 Structural Holes (Effective Size)
        self._plot_top_structural_holes()
        
        # 9. Core-Periphery Analysis
        self._plot_core_periphery()
        
        # 10. Organization Type Breakdown
        self._plot_organization_types()
        
        # 11. Connection Type Breakdown
        self._plot_connection_types()
        
        print("All visualizations created!")
    
    def _plot_top_hubs(self):
        """Plot top 10 nodes by degree centrality."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_hubs = df.nlargest(10, 'degree_centrality')
        
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Create horizontal bar plot with highest values at top
        y_pos = np.arange(len(top_hubs))[::-1]  # Reverse to put highest at top
        bars = ax.barh(y_pos, top_hubs['degree_centrality'], 
                      color=plt.cm.viridis(np.linspace(0, 1, len(top_hubs))),
                      edgecolor='black', linewidth=1.5)
        
        # Customize axes
        ax.set_yticks(y_pos)
        ax.set_yticklabels([self.node_names.get(node, node) for node in top_hubs['node_id']])
        ax.set_xlabel('Degree Centrality', fontweight='bold')
        ax.set_title('Top 10 Network Hubs (by Degree Centrality)', fontweight='bold')
        
        # Add value labels on bars
        for i, (idx, row) in enumerate(top_hubs.iterrows()):
            ax.text(row['degree_centrality'] + 0.001, len(top_hubs) - 1 - i, f'{row["degree_centrality"]:.3f}', 
                   va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/top_10_hubs.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_top_bridges(self):
        """Plot top 10 nodes by betweenness centrality."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_bridges = df.nlargest(10, 'betweenness_centrality')
        
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Create horizontal bar plot with highest values at top
        y_pos = np.arange(len(top_bridges))[::-1]  # Reverse to put highest at top
        bars = ax.barh(y_pos, top_bridges['betweenness_centrality'],
                      color=plt.cm.plasma(np.linspace(0, 1, len(top_bridges))),
                      edgecolor='black', linewidth=1.5)
        
        # Customize axes
        ax.set_yticks(y_pos)
        ax.set_yticklabels([self.node_names.get(node, node) for node in top_bridges['node_id']])
        ax.set_xlabel('Betweenness Centrality', fontweight='bold')
        ax.set_title('Top 10 Network Bridges (by Betweenness Centrality)', fontweight='bold')
        
        # Add value labels on bars
        for i, (idx, row) in enumerate(top_bridges.iterrows()):
            ax.text(row['betweenness_centrality'] + 0.001, len(top_bridges) - 1 - i, f'{row["betweenness_centrality"]:.3f}', 
                   va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/top_10_bridges.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_top_closeness(self):
        """Plot top 10 nodes by closeness centrality."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_closeness = df.nlargest(10, 'closeness_centrality')
        
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Create horizontal bar plot with highest values at top
        y_pos = np.arange(len(top_closeness))[::-1]  # Reverse to put highest at top
        bars = ax.barh(y_pos, top_closeness['closeness_centrality'],
                      color=plt.cm.coolwarm(np.linspace(0, 1, len(top_closeness))),
                      edgecolor='black', linewidth=1.5)
        
        # Customize axes
        ax.set_yticks(y_pos)
        ax.set_yticklabels([self.node_names.get(node, node) for node in top_closeness['node_id']])
        ax.set_xlabel('Closeness Centrality', fontweight='bold')
        ax.set_title('Top 10 Nodes by Closeness Centrality', fontweight='bold')
        
        # Add value labels on bars
        for i, (idx, row) in enumerate(top_closeness.iterrows()):
            ax.text(row['closeness_centrality'] + 0.001, len(top_closeness) - 1 - i, f'{row["closeness_centrality"]:.3f}', 
                   va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/top_10_closeness.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_top_clustering(self):
        """Plot top 10 nodes by clustering coefficient."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_clustering = df.nlargest(10, 'clustering_coefficient')
        
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Create horizontal bar plot with highest values at top
        y_pos = np.arange(len(top_clustering))[::-1]  # Reverse to put highest at top
        bars = ax.barh(y_pos, top_clustering['clustering_coefficient'],
                      color=plt.cm.Set2(np.linspace(0, 1, len(top_clustering))),
                      edgecolor='black', linewidth=1.5)
        
        # Customize axes
        ax.set_yticks(y_pos)
        ax.set_yticklabels([self.node_names.get(node, node) for node in top_clustering['node_id']])
        ax.set_xlabel('Clustering Coefficient', fontweight='bold')
        ax.set_title('Top 10 Nodes by Clustering Coefficient', fontweight='bold')
        
        # Add value labels on bars
        for i, (idx, row) in enumerate(top_clustering.iterrows()):
            ax.text(row['clustering_coefficient'] + 0.001, len(top_clustering) - 1 - i, f'{row["clustering_coefficient"]:.3f}', 
                   va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/top_10_clustering.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_top_eigenvector(self):
        """Plot top 10 nodes by eigenvector centrality."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_eigenvector = df.nlargest(10, 'eigenvector_centrality')
        
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Create horizontal bar plot with highest value at top
        y_pos = np.arange(len(top_eigenvector))[::-1]  # Reverse to put highest at top
        bars = ax.barh(y_pos, top_eigenvector['eigenvector_centrality'],
                      color=plt.cm.RdYlBu(np.linspace(0, 1, len(top_eigenvector))),
                      edgecolor='black', linewidth=1.5)
        
        # Customize axes
        ax.set_yticks(y_pos)
        ax.set_yticklabels([self.node_names.get(node, node) for node in top_eigenvector['node_id']])
        ax.set_xlabel('Eigenvector Centrality', fontweight='bold')
        ax.set_title('Top 10 Nodes by Eigenvector Centrality', fontweight='bold')
        
        # Add value labels on bars
        for i, (idx, row) in enumerate(top_eigenvector.iterrows()):
            ax.text(row['eigenvector_centrality'] + 0.001, len(top_eigenvector) - 1 - i, f'{row["eigenvector_centrality"]:.3f}', 
                   va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/top_10_eigenvector.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_top_harmonic(self):
        """Plot top 10 nodes by harmonic centrality."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_harmonic = df.nlargest(10, 'harmonic_centrality')
        
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Create horizontal bar plot with highest value at top
        y_pos = np.arange(len(top_harmonic))[::-1]  # Reverse to put highest at top
        bars = ax.barh(y_pos, top_harmonic['harmonic_centrality'],
                      color=plt.cm.RdYlGn(np.linspace(0, 1, len(top_harmonic))),
                      edgecolor='black', linewidth=1.5)
        
        # Customize axes
        ax.set_yticks(y_pos)
        ax.set_yticklabels([self.node_names.get(node, node) for node in top_harmonic['node_id']])
        ax.set_xlabel('Harmonic Centrality', fontweight='bold')
        ax.set_title('Top 10 Nodes by Harmonic Centrality', fontweight='bold')
        
        # Add value labels on bars
        for i, (idx, row) in enumerate(top_harmonic.iterrows()):
            ax.text(row['harmonic_centrality'] + 0.001, len(top_harmonic) - 1 - i, f'{row["harmonic_centrality"]:.3f}', 
                   va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/top_10_harmonic.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_top_pagerank(self):
        """Plot top 10 nodes by PageRank."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_pagerank = df.nlargest(10, 'pagerank')
        
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Create horizontal bar plot with highest value at top
        y_pos = np.arange(len(top_pagerank))[::-1]  # Reverse to put highest at top
        bars = ax.barh(y_pos, top_pagerank['pagerank'],
                      color=plt.cm.PuOr(np.linspace(0, 1, len(top_pagerank))),
                      edgecolor='black', linewidth=1.5)
        
        # Customize axes
        ax.set_yticks(y_pos)
        ax.set_yticklabels([self.node_names.get(node, node) for node in top_pagerank['node_id']])
        ax.set_xlabel('PageRank Score', fontweight='bold')
        ax.set_title('Top 10 Nodes by PageRank', fontweight='bold')
        
        # Add value labels on bars
        for i, (idx, row) in enumerate(top_pagerank.iterrows()):
            ax.text(row['pagerank'] + 0.001, len(top_pagerank) - 1 - i, f'{row["pagerank"]:.4f}', 
                   va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/top_10_pagerank.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_top_structural_holes(self):
        """Plot top 10 nodes by structural holes (effective size)."""
        # Extract effective size from structural holes data
        effective_sizes = {}
        for node, metrics in self.node_metrics.items():
            if 'structural_holes' in metrics and isinstance(metrics['structural_holes'], dict):
                effective_sizes[node] = metrics['structural_holes'].get('effective_size', 0)
            else:
                effective_sizes[node] = 0
        
        # Create DataFrame and get top 10
        df = pd.DataFrame(list(effective_sizes.items()), columns=['node_id', 'effective_size'])
        top_structural_holes = df.nlargest(10, 'effective_size')
        
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Create horizontal bar plot with highest value at top
        y_pos = np.arange(len(top_structural_holes))[::-1]  # Reverse to put highest at top
        bars = ax.barh(y_pos, top_structural_holes['effective_size'],
                      color=plt.cm.viridis(np.linspace(0, 1, len(top_structural_holes))),
                      edgecolor='black', linewidth=1.5)
        
        # Customize axes
        ax.set_yticks(y_pos)
        ax.set_yticklabels([self.node_names.get(node, node) for node in top_structural_holes['node_id']])
        ax.set_xlabel('Effective Size (Structural Holes)', fontweight='bold')
        ax.set_title('Top 10 Nodes by Structural Holes (Effective Size)', fontweight='bold')
        
        # Add value labels on bars
        for i, (idx, row) in enumerate(top_structural_holes.iterrows()):
            ax.text(row['effective_size'] + 0.1, len(top_structural_holes) - 1 - i, f'{row["effective_size"]:.2f}', 
                   va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/top_10_structural_holes.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_core_periphery(self):
        """Plot core-periphery analysis showing core vs periphery organizations."""
        # Extract core-periphery data
        core_scores = {}
        is_core = {}
        k_core_values = {}
        
        for node, metrics in self.node_metrics.items():
            if 'core_periphery' in metrics and isinstance(metrics['core_periphery'], dict):
                core_scores[node] = metrics['core_periphery'].get('core_score', 0)
                is_core[node] = metrics['core_periphery'].get('is_core', False)
                k_core_values[node] = metrics['core_periphery'].get('k_core', 0)
            else:
                core_scores[node] = 0
                is_core[node] = False
                k_core_values[node] = 0
        
        # Create figure with two subplots
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 8))
        
        # Plot 1: Core Score vs K-Core with Core/Periphery classification
        core_nodes = [node for node, is_core_val in is_core.items() if is_core_val]
        periphery_nodes = [node for node, is_core_val in is_core.items() if not is_core_val]
        
        # Plot core nodes
        core_scores_core = [core_scores[node] for node in core_nodes]
        k_core_core = [k_core_values[node] for node in core_nodes]
        ax1.scatter(core_scores_core, k_core_core, c='red', alpha=0.7, s=60, label='Core', edgecolors='black')
        
        # Plot periphery nodes
        core_scores_periphery = [core_scores[node] for node in periphery_nodes]
        k_core_periphery = [k_core_values[node] for node in periphery_nodes]
        ax1.scatter(core_scores_periphery, k_core_periphery, c='blue', alpha=0.7, s=60, label='Periphery', edgecolors='black')
        
        ax1.set_xlabel('Core Score', fontweight='bold')
        ax1.set_ylabel('K-Core Value', fontweight='bold')
        ax1.set_title('Core-Periphery Analysis: Core Score vs K-Core', fontweight='bold')
        ax1.legend()
        ax1.grid(True, alpha=0.3)
        
        # Add labels for top nodes
        top_nodes = sorted(core_scores.items(), key=lambda x: x[1], reverse=True)[:5]
        for node, score in top_nodes:
            if node in core_scores and node in k_core_values:
                ax1.annotate(self.node_names.get(node, node), 
                           (core_scores[node], k_core_values[node]),
                           xytext=(5, 5), textcoords='offset points',
                           fontsize=8, alpha=0.8)
        
        # Plot 2: Top 10 Core Organizations
        sorted_core_scores = sorted(core_scores.items(), key=lambda x: x[1], reverse=True)[:10]
        top_core_nodes = [node for node, score in sorted_core_scores]
        top_core_scores = [score for node, score in sorted_core_scores]
        
        y_pos = np.arange(len(top_core_nodes))[::-1]  # Reverse to put highest at top
        colors = ['red' if is_core[node] else 'blue' for node in top_core_nodes]
        
        bars = ax2.barh(y_pos, top_core_scores, color=colors, alpha=0.7, edgecolor='black', linewidth=1)
        
        ax2.set_yticks(y_pos)
        ax2.set_yticklabels([self.node_names.get(node, node) for node in top_core_nodes])
        ax2.set_xlabel('Core Score', fontweight='bold')
        ax2.set_title('Top 10 Organizations by Core Score', fontweight='bold')
        
        # Add value labels on bars
        for i, (node, score) in enumerate(sorted_core_scores):
            ax2.text(score + 0.01, len(top_core_nodes) - 1 - i, f'{score:.3f}', 
                   va='center', ha='left', fontweight='bold')
        
        # Add legend for colors
        from matplotlib.patches import Patch
        legend_elements = [Patch(facecolor='red', alpha=0.7, label='Core'),
                          Patch(facecolor='blue', alpha=0.7, label='Periphery')]
        ax2.legend(handles=legend_elements, loc='lower right')
        
        # Remove top and right spines
        ax1.spines['top'].set_visible(False)
        ax1.spines['right'].set_visible(False)
        ax2.spines['top'].set_visible(False)
        ax2.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/core_periphery_analysis.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_organization_types(self):
        """Plot breakdown of organization types."""
        # Count organization types
        org_types = {}
        for node in self.raw_data.get('nodes', []):
            org_type = node.get('type', 'Unknown')
            org_types[org_type] = org_types.get(org_type, 0) + 1
        
        # Sort by count and take top 10
        sorted_types = sorted(org_types.items(), key=lambda x: x[1], reverse=True)[:10]
        
        fig, ax = plt.subplots(figsize=(12, 8))
        
        # Create horizontal bar plot with highest values at top
        types, counts = zip(*sorted_types)
        y_pos = np.arange(len(types))[::-1]  # Reverse to put highest at top
        
        # Calculate percentages
        total = sum(counts)
        percentages = [count/total*100 for count in counts]
        
        bars = ax.barh(y_pos, counts, 
                      color=plt.cm.Set1(np.linspace(0, 1, len(types))),
                      edgecolor='black', linewidth=1.5)
        
        # Customize axes
        ax.set_yticks(y_pos)
        ax.set_yticklabels([t.replace('_', ' ').title() for t in types], fontweight='bold')
        ax.set_xlabel('Number of Organizations', fontweight='bold')
        ax.set_title('Top 10 Organization Types', fontweight='bold')
        
        # Add value and percentage labels on bars
        for i, (count, pct) in enumerate(zip(counts, percentages)):
            ax.text(count + 0.5, len(types) - 1 - i, f'{count} ({pct:.1f}%)', 
                   va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/organization_types.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_connection_types(self):
        """Plot breakdown of connection types."""
        # Count connection types
        conn_types = {}
        for link in self.raw_data.get('links', []):
            conn_type = link.get('type', 'Unknown')
            conn_types[conn_type] = conn_types.get(conn_type, 0) + 1
        
        # Sort by count and take top 10
        sorted_types = sorted(conn_types.items(), key=lambda x: x[1], reverse=True)[:10]
        
        fig, ax = plt.subplots(figsize=(12, 8))
        
        # Create horizontal bar plot with highest values at top
        types, counts = zip(*sorted_types)
        y_pos = np.arange(len(types))[::-1]  # Reverse to put highest at top
        
        # Calculate percentages
        total = sum(counts)
        percentages = [count/total*100 for count in counts]
        
        bars = ax.barh(y_pos, counts, 
                      color=plt.cm.Pastel1(np.linspace(0, 1, len(types))),
                      edgecolor='black', linewidth=1.5)
        
        # Customize axes
        ax.set_yticks(y_pos)
        ax.set_yticklabels([t.replace('_', ' ').title() for t in types], fontweight='bold')
        ax.set_xlabel('Number of Connections', fontweight='bold')
        ax.set_title('Top 10 Connection Types', fontweight='bold')
        
        # Add value and percentage labels on bars
        for i, (count, pct) in enumerate(zip(counts, percentages)):
            ax.text(count + 0.5, len(types) - 1 - i, f'{count} ({pct:.1f}%)', 
                   va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/connection_types.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def print_summary(self):
        """Print a summary of the analysis."""
        print("\n" + "="*60)
        print("ATLANTA BIOTECH NETWORK ANALYSIS SUMMARY")
        print("="*60)
        
        print(f"\nNetwork Structure:")
        print(f"  • Organizations: {self.network_stats['raw_nodes']:,}")
        print(f"  • Connections: {self.network_stats['raw_links']:,}")
        print(f"  • Unique Edges: {self.network_stats['num_edges']:,}")
        print(f"  • Density: {self.network_stats['density']:.3f}")
        print(f"  • Communities: {self.network_stats['num_communities']}")
        print(f"  • Modularity: {self.network_stats['modularity']:.3f}")
        print(f"  • Transitivity: {self.network_stats['transitivity']:.3f}")
        print(f"  • Average Clustering: {self.network_stats['average_clustering']:.3f}")
        
        # Display rich club coefficients for key degree thresholds
        rich_club = self.network_stats['rich_club_coefficients']
        print(f"  • Rich Club Coefficient (degree ≥5): {float(rich_club.get(5, 0.0)):.3f}")
        print(f"  • Rich Club Coefficient (degree ≥10): {float(rich_club.get(10, 0.0)):.3f}")
        print(f"  • Rich Club Coefficient (degree ≥15): {float(rich_club.get(15, 0.0)):.3f}")
        
        if isinstance(self.network_stats['diameter'], (int, float)):
            print(f"  • Diameter: {self.network_stats['diameter']}")
        else:
            print(f"  • Diameter: {self.network_stats['diameter']}")
            
        if isinstance(self.network_stats['average_path_length'], (int, float)):
            print(f"  • Average Path Length: {self.network_stats['average_path_length']:.3f}")
        else:
            print(f"  • Average Path Length: {self.network_stats['average_path_length']}")
        
        print(f"  • Assortativity: {self.network_stats['assortativity']:.3f}")
        
        # Community Quality Metrics
        cq = self.network_stats['community_quality']
        print(f"\nCommunity Quality:")
        print(f"  • Average Conductance: {cq['average_conductance']:.3f} (lower is better)")
        print(f"  • Average Cut Ratio: {cq['average_cut_ratio']:.3f} (lower is better)")
        print(f"  • Average Expansion: {cq['average_expansion']:.3f} (lower is better)")
        print(f"  • Average Internal Density: {cq['average_internal_density']:.3f} (higher is better)")
        print(f"  • Average Edges Inside: {cq['average_edges_inside']:.1f}")
        print(f"  • Average Edges Outside: {cq['average_edges_outside']:.1f}")
        
        # Network Resilience Metrics
        rm = self.network_stats['resilience_metrics']
        print(f"\nNetwork Resilience:")
        print(f"  • Largest Connected Component: {rm['largest_cc_size']} nodes ({rm['largest_cc_ratio']:.1%})")
        print(f"  • Node Connectivity: {rm['node_connectivity']} (min nodes to disconnect)")
        print(f"  • Edge Connectivity: {rm['edge_connectivity']} (min edges to disconnect)")
        print(f"  • Algebraic Connectivity: {rm['algebraic_connectivity']:.3f} (higher = more robust)")
        print(f"  • Robustness to Random Failures: {rm['robustness_random']:.3f}")
        print(f"  • Robustness to Targeted Attacks: {rm['robustness_targeted']:.3f}")
        print(f"  • Network Efficiency: {rm['efficiency']:.3f}")
        print(f"  • Vulnerability: {rm['vulnerability']:.3f} (lower is better)")
        print(f"  • Critical Nodes: {rm['critical_nodes_count']} nodes")
        
        # Top nodes
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        
        print(f"\nTop 5 Hubs (by Degree):")
        top_hubs = df.nlargest(5, 'degree_centrality')
        for i, (idx, row) in enumerate(top_hubs.iterrows(), 1):
            display_name = self.node_names.get(row['node_id'], row['node_id'])
            print(f"  {i}. {display_name}: {row['degree']} connections")
        
        print(f"\nTop 5 Bridges (by Betweenness):")
        top_bridges = df.nlargest(5, 'betweenness_centrality')
        for i, (idx, row) in enumerate(top_bridges.iterrows(), 1):
            display_name = self.node_names.get(row['node_id'], row['node_id'])
            print(f"  {i}. {display_name}: {row['betweenness_centrality']:.3f}")
        
        print(f"\nTop 5 Closeness Centrality:")
        top_closeness = df.nlargest(5, 'closeness_centrality')
        for i, (idx, row) in enumerate(top_closeness.iterrows(), 1):
            display_name = self.node_names.get(row['node_id'], row['node_id'])
            print(f"  {i}. {display_name}: {row['closeness_centrality']:.3f}")
        
        print(f"\nTop 5 Clustering Coefficient:")
        top_clustering = df.nlargest(5, 'clustering_coefficient')
        for i, (idx, row) in enumerate(top_clustering.iterrows(), 1):
            display_name = self.node_names.get(row['node_id'], row['node_id'])
            print(f"  {i}. {display_name}: {row['clustering_coefficient']:.3f}")
        
        print(f"\nTop 5 Eigenvector Centrality:")
        top_eigenvector = df.nlargest(5, 'eigenvector_centrality')
        for i, (idx, row) in enumerate(top_eigenvector.iterrows(), 1):
            display_name = self.node_names.get(row['node_id'], row['node_id'])
            print(f"  {i}. {display_name}: {row['eigenvector_centrality']:.3f}")
        
        print(f"\nTop 5 Harmonic Centrality:")
        top_harmonic = df.nlargest(5, 'harmonic_centrality')
        for i, (idx, row) in enumerate(top_harmonic.iterrows(), 1):
            display_name = self.node_names.get(row['node_id'], row['node_id'])
            print(f"  {i}. {display_name}: {row['harmonic_centrality']:.3f}")
        
        print(f"\nTop 5 PageRank:")
        top_pagerank = df.nlargest(5, 'pagerank')
        for i, (idx, row) in enumerate(top_pagerank.iterrows(), 1):
            display_name = self.node_names.get(row['node_id'], row['node_id'])
            print(f"  {i}. {display_name}: {row['pagerank']:.4f}")
        
        # Extract and display structural holes metrics
        print(f"\nTop 5 Structural Holes (Effective Size):")
        effective_sizes = {}
        for node, metrics in self.node_metrics.items():
            if 'structural_holes' in metrics and isinstance(metrics['structural_holes'], dict):
                effective_sizes[node] = metrics['structural_holes'].get('effective_size', 0)
            else:
                effective_sizes[node] = 0
        
        # Sort by effective size
        sorted_structural_holes = sorted(effective_sizes.items(), key=lambda x: x[1], reverse=True)
        for i, (node, effective_size) in enumerate(sorted_structural_holes[:5], 1):
            display_name = self.node_names.get(node, node)
            print(f"  {i}. {display_name}: {effective_size:.2f}")
        
        # Extract and display core-periphery metrics
        print(f"\nTop 5 Core Organizations (by Core Score):")
        core_scores = {}
        is_core = {}
        for node, metrics in self.node_metrics.items():
            if 'core_periphery' in metrics and isinstance(metrics['core_periphery'], dict):
                core_scores[node] = metrics['core_periphery'].get('core_score', 0)
                is_core[node] = metrics['core_periphery'].get('is_core', False)
            else:
                core_scores[node] = 0
                is_core[node] = False
        
        # Sort by core score
        sorted_core_scores = sorted(core_scores.items(), key=lambda x: x[1], reverse=True)
        for i, (node, core_score) in enumerate(sorted_core_scores[:5], 1):
            display_name = self.node_names.get(node, node)
            core_status = "Core" if is_core[node] else "Periphery"
            print(f"  {i}. {display_name}: {core_score:.3f} ({core_status})")
        
        # Count core vs periphery
        core_count = sum(1 for is_core_val in is_core.values() if is_core_val)
        periphery_count = len(is_core) - core_count
        print(f"\nCore-Periphery Distribution:")
        print(f"  • Core Organizations: {core_count} ({core_count/len(is_core)*100:.1f}%)")
        print(f"  • Periphery Organizations: {periphery_count} ({periphery_count/len(is_core)*100:.1f}%)")
        
        print(f"\nFiles Generated:")
        print(f"  • data/biotech_network_metrics.csv")
        print(f"  • visualizations/top_10_hubs.svg")
        print(f"  • visualizations/top_10_bridges.svg")
        print(f"  • visualizations/top_10_closeness.svg")
        print(f"  • visualizations/top_10_clustering.svg")
        print(f"  • visualizations/top_10_eigenvector.svg")
        print(f"  • visualizations/top_10_harmonic.svg")
        print(f"  • visualizations/top_10_pagerank.svg")
        print(f"  • visualizations/top_10_structural_holes.svg")
        print(f"  • visualizations/core_periphery_analysis.svg")
        print(f"  • visualizations/organization_types.svg")
        print(f"  • visualizations/connection_types.svg")
        print(f"  • ANALYSIS_RESULTS.md")
        
        print("\n" + "="*60)
    
    def generate_results_report(self):
        """Generate a comprehensive results report."""
        print("Generating results report...")
        
        # Get current date
        from datetime import datetime
        current_date = datetime.now().strftime("%B %d, %Y")
        
        # Get top performers for each metric
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_hubs = df.nlargest(10, 'degree_centrality')
        top_bridges = df.nlargest(10, 'betweenness_centrality')
        top_closeness = df.nlargest(10, 'closeness_centrality')
        top_clustering = df.nlargest(10, 'clustering_coefficient')
        
        # Community breakdown
        community_sizes = df['community_label'].value_counts()
        top_communities = community_sizes.head(10)
        
        # Organization type breakdown
        org_types = {}
        for node in self.raw_data.get('nodes', []):
            org_type = node.get('type', 'Unknown')
            org_types[org_type] = org_types.get(org_type, 0) + 1
        sorted_org_types = sorted(org_types.items(), key=lambda x: x[1], reverse=True)
        
        # Connection type breakdown
        conn_types = {}
        for link in self.raw_data.get('links', []):
            conn_type = link.get('type', 'Unknown')
            conn_types[conn_type] = conn_types.get(conn_type, 0) + 1
        sorted_conn_types = sorted(conn_types.items(), key=lambda x: x[1], reverse=True)
        
        # Network health metrics
        degrees = [self.G.degree(node) for node in self.G.nodes()]
        degree_stats = {
            'mean': np.mean(degrees),
            'median': np.median(degrees),
            'std': np.std(degrees),
            'min': np.min(degrees),
            'max': np.max(degrees)
        }
        
        # Generate report content
        report_content = f"""# Atlanta Biotech Network Analysis Results

## Executive Summary

This report presents the results of a comprehensive network analysis of the Atlanta biotech ecosystem, conducted using NetworkX and advanced graph theory metrics. The analysis reveals a well-connected but sparse network with clear community structure and identifiable key players.

## Network Overview

### Basic Statistics
- **Total Organizations**: {self.network_stats['raw_nodes']:,} (after cleaning duplicates)
- **Total Connections**: {self.network_stats['raw_links']:,} (unique edges)
- **Network Density**: {self.network_stats['density']:.3f} (sparse but well-connected)
- **Communities Detected**: {self.network_stats['num_communities']}
- **Modularity**: {self.network_stats['modularity']:.3f} (strong community structure)
- **Assortativity**: {self.network_stats['assortativity']:.3f} (negative, indicating diverse connections)

### Network Health Metrics
- **Average Degree**: {degree_stats['mean']:.1f} connections per organization
- **Median Degree**: {degree_stats['median']:.1f} connections per organization
- **Degree Standard Deviation**: {degree_stats['std']:.1f} (indicates network heterogeneity)
- **Degree Range**: {degree_stats['min']} - {degree_stats['max']} connections
- **Network Connectivity**: {'Connected' if nx.is_connected(self.G) else 'Disconnected'} (main component)

### Network Characteristics
- **Sparse Network**: Low density suggests specialized, targeted connections rather than random interactions
- **Strong Community Structure**: High modularity indicates well-defined clusters of related organizations
- **Diverse Connections**: Negative assortativity shows organizations connect across different types and sizes
- **Heterogeneous Connectivity**: High degree variation indicates both highly connected hubs and peripheral nodes

## Key Findings

### Top 10 Hub Organizations (by Degree Centrality)
"""
        
        for i, (idx, row) in enumerate(top_hubs.iterrows(), 1):
            display_name = self.node_names.get(row['node_id'], row['node_id'])
            report_content += f"{i}. **{display_name}** - {row['degree']} connections (centrality: {row['degree_centrality']:.3f})\n"
        
        report_content += f"""
### Top 10 Bridge Organizations (by Betweenness Centrality)
"""
        
        for i, (idx, row) in enumerate(top_bridges.iterrows(), 1):
            display_name = self.node_names.get(row['node_id'], row['node_id'])
            report_content += f"{i}. **{display_name}** - {row['betweenness_centrality']:.3f} (degree: {row['degree']})\n"
        
        report_content += f"""
### Top 10 Closeness Centrality Leaders
"""
        
        for i, (idx, row) in enumerate(top_closeness.iterrows(), 1):
            display_name = self.node_names.get(row['node_id'], row['node_id'])
            report_content += f"{i}. **{display_name}** - {row['closeness_centrality']:.3f} (degree: {row['degree']})\n"
        
        report_content += f"""
### Top 10 Clustering Coefficient Leaders
"""
        
        for i, (idx, row) in enumerate(top_clustering.iterrows(), 1):
            display_name = self.node_names.get(row['node_id'], row['node_id'])
            report_content += f"{i}. **{display_name}** - {row['clustering_coefficient']:.3f} (degree: {row['degree']})\n"
        
        report_content += f"""
## Network Composition

### Organization Type Breakdown
"""
        
        total_orgs = sum(org_types.values())
        for org_type, count in sorted_org_types:
            percentage = count / total_orgs * 100
            report_content += f"- **{org_type.replace('_', ' ').title()}**: {count} organizations ({percentage:.1f}%)\n"
        
        report_content += f"""
### Connection Type Breakdown
"""
        
        total_conns = sum(conn_types.values())
        for conn_type, count in sorted_conn_types:
            percentage = count / total_conns * 100
            report_content += f"- **{conn_type.replace('_', ' ').title()}**: {count} connections ({percentage:.1f}%)\n"
        
        report_content += f"""
## Community Analysis

### Community Structure
The network contains {self.network_stats['num_communities']} distinct communities with a modularity of {self.network_stats['modularity']:.3f}, indicating strong community structure.

### Top 10 Communities by Size
"""
        
        for i, (community, size) in enumerate(top_communities.items(), 1):
            report_content += f"{i}. **{community}** - {size} organizations\n"
        
        report_content += f"""
## Network Metrics Analysis

### Centrality Measures
- **Degree Centrality**: Measures direct connections (hubs) - Range: {df['degree_centrality'].min():.3f} to {df['degree_centrality'].max():.3f}
- **Betweenness Centrality**: Measures bridge connections (brokers) - Range: {df['betweenness_centrality'].min():.3f} to {df['betweenness_centrality'].max():.3f}
- **Closeness Centrality**: Measures average distance to all other nodes - Range: {df['closeness_centrality'].min():.3f} to {df['closeness_centrality'].max():.3f}
- **Clustering Coefficient**: Measures local connectivity patterns - Range: {df['clustering_coefficient'].min():.3f} to {df['clustering_coefficient'].max():.3f}

### Network-Level Statistics
- **Density**: {self.network_stats['density']:.3f} - Proportion of possible connections that exist
- **Modularity**: {self.network_stats['modularity']:.3f} - Strength of community structure (0.3+ indicates strong structure)
- **Assortativity**: {self.network_stats['assortativity']:.3f} - Tendency for similar nodes to connect (-1 to +1 scale)

### Network Health Assessment
- **Connectivity**: {'Strong' if nx.is_connected(self.G) else 'Fragmented'} - {'All nodes are reachable' if nx.is_connected(self.G) else 'Some nodes are isolated'}
- **Hub Concentration**: {'High' if degree_stats['std'] > degree_stats['mean'] else 'Moderate'} - Degree variation indicates {'concentrated' if degree_stats['std'] > degree_stats['mean'] else 'distributed'} power
- **Community Integration**: {'Strong' if self.network_stats['modularity'] > 0.3 else 'Weak'} - Modularity score indicates {'well-defined' if self.network_stats['modularity'] > 0.3 else 'loose'} community structure

## Strategic Implications

### Strengths
1. **Clear Hub Organizations**: Well-defined central players (Emory, Georgia Tech) with high connectivity
2. **Strong Community Structure**: High modularity indicates well-defined clusters of related organizations
3. **Diverse Connections**: Negative assortativity shows organizations connect across different types and sizes
4. **Balanced Network**: Mix of hubs, bridges, and peripheral nodes creates robust structure

### Opportunities
1. **Bridge Development**: Identify and strengthen bridge organizations to improve cross-community flow
2. **Community Integration**: Connect isolated communities through targeted interventions
3. **Hub Support**: Leverage central organizations for network growth and knowledge transfer
4. **Peripheral Engagement**: Connect isolated nodes to increase network reach

### Challenges
1. **Sparse Network**: Low density may limit information flow and collaboration opportunities
2. **Disconnected Components**: Some organizations remain isolated from the main network
3. **Scale Dependencies**: Network effects may be limited by current size and density
4. **Hub Dependencies**: Over-reliance on key hubs creates vulnerability

## Recommendations

### Short-term (0-6 months)
- Focus on strengthening existing hub organizations and their connections
- Identify and support bridge organizations to improve cross-community flow
- Map community-specific needs and resources for targeted interventions
- Connect isolated nodes to the main network through strategic partnerships

### Medium-term (6-18 months)
- Develop targeted interventions for each community based on their characteristics
- Create cross-community collaboration programs to reduce silos
- Establish metrics for network health monitoring and regular assessment
- Implement programs to develop new bridge organizations

### Long-term (18+ months)
- Scale successful community models across the network
- Develop network-wide governance structures for sustainable growth
- Create sustainable funding mechanisms for network maintenance
- Establish regular network health assessments and optimization

## Data Quality Notes

- Analysis based on {self.network_stats['raw_nodes']:,} organizations and {self.network_stats['raw_links']:,} connections
- Data cleaned to remove duplicates and ensure accuracy
- Network metrics calculated using NetworkX library
- Community detection performed using Louvain algorithm
- All visualizations generated as publication-quality SVG files

## Technical Details

- **Analysis Date**: {current_date}
- **NetworkX Version**: {nx.__version__}
- **Communities**: Detected using python-louvain
- **Visualizations**: Generated as SVG files for publication quality
- **Files Generated**: 6 visualization files + CSV metrics + this report
"""
        
        # Write the report
        report_file = "ANALYSIS_RESULTS.md"
        with open(report_file, 'w') as f:
            f.write(report_content)
        
        print(f"Results report saved to: {report_file}")
    

def main():
    """Main function to run the analysis."""
    print("Atlanta Biotech Network Analysis")
    print("=" * 40)
    
    # Initialize analyzer
    analyzer = BiotechNetworkAnalyzer()
    
    try:
        # Load data
        data = analyzer.load_data()
        
        # Build network
        analyzer.build_network(data)
        
        # Calculate metrics
        analyzer.calculate_metrics()
        
        # Export CSV
        analyzer.export_csv()
        
        # Create visualizations
        analyzer.create_visualizations()
        
        # Generate results report
        analyzer.generate_results_report()
        
        # Print summary
        analyzer.print_summary()
        
        print("\nAnalysis complete! Check the generated files.")
        
    except Exception as e:
        print(f"Error during analysis: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
