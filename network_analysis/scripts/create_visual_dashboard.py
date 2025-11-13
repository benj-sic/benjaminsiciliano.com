#!/usr/bin/env python3
"""
Create Visual Dashboard for Atlanta Biotech Network Analysis
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

class VisualDashboardCreator:
    """Creates a visual dashboard for the Atlanta biotech network analysis."""
    
    def __init__(self, data_file='data/biotech_network_data.json'):
        """Initialize the dashboard creator with network data."""
        self.data_file = data_file
        self.G = nx.Graph()
        self.node_metrics = {}
        self.network_stats = {}
        self.communities = {}
        self.raw_nodes = 0
        self.raw_links = 0
        self.node_names = {}
        self.raw_data = {}
        
    def load_data(self):
        """Load and parse the JSON data file."""
        print("Loading network data...")
        
        with open(self.data_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        self.raw_nodes = len(data.get('nodes', []))
        self.raw_links = len(data.get('links', []))
        
        # Create node ID to display name mapping
        self.node_names = {}
        for node in data.get('nodes', []):
            node_id = node.get('id')
            node_name = node.get('name', node_id)
            self.node_names[node_id] = node_name
        
        # Store raw data for type analysis
        self.raw_data = data
        
        print(f"Loaded {self.raw_nodes} nodes and {self.raw_links} links")
        return data
    
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
        
        # Community detection using Louvain algorithm
        try:
            communities = community_louvain.best_partition(self.G)
            self.communities = communities
        except Exception as e:
            print(f"Warning: Could not perform community detection: {e}")
            self.communities = {node: 0 for node in self.G.nodes()}
        
        # Store node metrics
        self.node_metrics = {}
        for node in self.G.nodes():
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
                'community_id': self.communities.get(node, 0)
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
    
    def create_dashboard(self):
        """Create the visual dashboard with all plots."""
        print("Creating visual dashboard...")
        
        # Ensure visualizations directory exists
        viz_dir = Path('visualizations')
        viz_dir.mkdir(parents=True, exist_ok=True)
        
        # Set up scientific journal plotting style
        plt.rcParams.update({
            'figure.figsize': (12, 10),
            'font.size': 16,
            'font.weight': 'bold',
            'axes.titlesize': 18,
            'axes.titleweight': 'bold',
            'axes.labelsize': 16,
            'axes.labelweight': 'bold',
            'xtick.labelsize': 14,
            'ytick.labelsize': 14,
            'legend.fontsize': 14,
            'legend.title_fontsize': 16,
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
        
        # Create the dashboard figure with subplots
        fig = plt.figure(figsize=(20, 24))
        
        # 1. Top 10 Hubs (Degree Centrality) - Top Left
        ax1 = plt.subplot(3, 2, 1)
        self._plot_top_hubs(ax1)
        
        # 2. Top 10 Bridges (Betweenness Centrality) - Top Right
        ax2 = plt.subplot(3, 2, 2)
        self._plot_top_bridges(ax2)
        
        # 3. Top 10 Closeness Centrality - Middle Left
        ax3 = plt.subplot(3, 2, 3)
        self._plot_top_closeness(ax3)
        
        # 4. Top 10 Clustering Coefficient - Middle Right
        ax4 = plt.subplot(3, 2, 4)
        self._plot_top_clustering(ax4)
        
        # 5. Top 10 Organization Types - Bottom Left
        ax5 = plt.subplot(3, 2, 5)
        self._plot_top_organization_types(ax5)
        
        # 6. Top 10 Connection Types - Bottom Right
        ax6 = plt.subplot(3, 2, 6)
        self._plot_top_connection_types(ax6)
        
        # Add overall title
        fig.suptitle('Atlanta Biotech Network Analysis Dashboard', 
                    fontsize=24, fontweight='bold', y=0.98)
        
        # Adjust layout
        plt.tight_layout()
        plt.subplots_adjust(top=0.95)
        
        # Save the dashboard
        plt.savefig('visualizations/network_analysis_dashboard.svg', 
                   format='svg', dpi=300, bbox_inches='tight')
        plt.close()
        
        print("Dashboard created: visualizations/network_analysis_dashboard.svg")
    
    def _plot_top_hubs(self, ax):
        """Plot top 10 nodes by degree centrality."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_hubs = df.nlargest(10, 'degree_centrality')
        
        # Create horizontal bar plot with highest value at top
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
    
    def _plot_top_bridges(self, ax):
        """Plot top 10 nodes by betweenness centrality."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_bridges = df.nlargest(10, 'betweenness_centrality')
        
        # Create horizontal bar plot with highest value at top
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
    
    def _plot_top_closeness(self, ax):
        """Plot top 10 nodes by closeness centrality."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_closeness = df.nlargest(10, 'closeness_centrality')
        
        # Create horizontal bar plot with highest value at top
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
    
    def _plot_top_clustering(self, ax):
        """Plot top 10 nodes by clustering coefficient."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_clustering = df.nlargest(10, 'clustering_coefficient')
        
        # Create horizontal bar plot with highest value at top
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
    
    def _plot_top_organization_types(self, ax):
        """Plot top 10 organization types."""
        # Count organization types
        org_types = {}
        for node in self.raw_data.get('nodes', []):
            org_type = node.get('type', 'Unknown')
            org_types[org_type] = org_types.get(org_type, 0) + 1
        
        # Sort by count and take top 10
        sorted_types = sorted(org_types.items(), key=lambda x: x[1], reverse=True)[:10]
        
        # Create horizontal bar plot with highest value at top
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
    
    def _plot_top_connection_types(self, ax):
        """Plot top 10 connection types."""
        # Count connection types
        conn_types = {}
        for link in self.raw_data.get('links', []):
            conn_type = link.get('type', 'Unknown')
            conn_types[conn_type] = conn_types.get(conn_type, 0) + 1
        
        # Sort by count and take top 10
        sorted_types = sorted(conn_types.items(), key=lambda x: x[1], reverse=True)[:10]
        
        # Create horizontal bar plot with highest value at top
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

if __name__ == "__main__":
    print("Creating Visual Dashboard for Atlanta Biotech Network Analysis")
    print("=" * 60)
    
    # Initialize dashboard creator
    creator = VisualDashboardCreator()
    
    try:
        # Load data
        data = creator.load_data()
        
        # Build network
        creator.build_network(data)
        
        # Calculate metrics
        creator.calculate_metrics()
        
        # Create dashboard
        creator.create_dashboard()
        
        print("Dashboard creation complete!")
        
    except Exception as e:
        print(f"Error during dashboard creation: {e}")
        import traceback
        traceback.print_exc()
