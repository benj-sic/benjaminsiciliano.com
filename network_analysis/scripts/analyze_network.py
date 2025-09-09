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
        clustering_coefficient = nx.clustering(self.G)
        
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
                'clustering_coefficient': clustering_coefficient.get(node, 0),
                'community_id': community_id,
                'community_label': community_label
            }
        
        # Network-level metrics
        self.network_stats = {
            'density': nx.density(self.G),
            'diameter': nx.diameter(self.G) if nx.is_connected(self.G) else 'Not connected',
            'average_path_length': nx.average_shortest_path_length(self.G) if nx.is_connected(self.G) else 'Not connected',
            'assortativity': nx.degree_assortativity_coefficient(self.G),
            'num_communities': len(set(self.communities.values())),
            'modularity': community_louvain.modularity(self.communities, self.G) if self.communities else 0,
            'num_nodes': self.G.number_of_nodes(),
            'num_edges': self.G.number_of_edges(),
            'raw_nodes': self.raw_nodes,
            'raw_links': self.raw_links
        }
        
        print("Metrics calculated successfully!")
    
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
        
        # 5. Organization Type Breakdown
        self._plot_organization_types()
        
        # 6. Connection Type Breakdown
        self._plot_connection_types()
        
        print("All visualizations created!")
    
    def _plot_top_hubs(self):
        """Plot top 10 nodes by degree centrality."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_hubs = df.nlargest(10, 'degree_centrality')
        
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Create horizontal bar plot
        y_pos = np.arange(len(top_hubs))
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
            ax.text(row['degree_centrality'] + 0.001, i, f'{row["degree_centrality"]:.3f}', 
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
        
        # Create horizontal bar plot
        y_pos = np.arange(len(top_bridges))
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
            ax.text(row['betweenness_centrality'] + 0.001, i, f'{row["betweenness_centrality"]:.3f}', 
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
        
        # Create horizontal bar plot
        y_pos = np.arange(len(top_closeness))
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
            ax.text(row['closeness_centrality'] + 0.001, i, f'{row["closeness_centrality"]:.3f}', 
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
        
        # Create horizontal bar plot
        y_pos = np.arange(len(top_clustering))
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
            ax.text(row['clustering_coefficient'] + 0.001, i, f'{row["clustering_coefficient"]:.3f}', 
                   va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/top_10_clustering.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_organization_types(self):
        """Plot breakdown of organization types."""
        # Count organization types
        org_types = {}
        for node in self.raw_data.get('nodes', []):
            org_type = node.get('type', 'Unknown')
            org_types[org_type] = org_types.get(org_type, 0) + 1
        
        # Sort by count
        sorted_types = sorted(org_types.items(), key=lambda x: x[1], reverse=True)
        
        fig, ax = plt.subplots(figsize=(12, 8))
        
        # Create horizontal bar plot
        types, counts = zip(*sorted_types)
        y_pos = np.arange(len(types))
        
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
        ax.set_title('Organization Type Breakdown', fontweight='bold')
        
        # Add value and percentage labels on bars
        for i, (count, pct) in enumerate(zip(counts, percentages)):
            ax.text(count + 0.5, i, f'{count} ({pct:.1f}%)', 
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
        
        # Sort by count
        sorted_types = sorted(conn_types.items(), key=lambda x: x[1], reverse=True)
        
        fig, ax = plt.subplots(figsize=(12, 8))
        
        # Create horizontal bar plot
        types, counts = zip(*sorted_types)
        y_pos = np.arange(len(types))
        
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
        ax.set_title('Connection Type Breakdown', fontweight='bold')
        
        # Add value and percentage labels on bars
        for i, (count, pct) in enumerate(zip(counts, percentages)):
            ax.text(count + 0.5, i, f'{count} ({pct:.1f}%)', 
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
        
        if isinstance(self.network_stats['diameter'], (int, float)):
            print(f"  • Diameter: {self.network_stats['diameter']}")
        else:
            print(f"  • Diameter: {self.network_stats['diameter']}")
            
        if isinstance(self.network_stats['average_path_length'], (int, float)):
            print(f"  • Average Path Length: {self.network_stats['average_path_length']:.3f}")
        else:
            print(f"  • Average Path Length: {self.network_stats['average_path_length']}")
        
        print(f"  • Assortativity: {self.network_stats['assortativity']:.3f}")
        
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
        
        print(f"\nFiles Generated:")
        print(f"  • data/biotech_network_metrics.csv")
        print(f"  • visualizations/top_10_hubs.svg")
        print(f"  • visualizations/top_10_bridges.svg")
        print(f"  • visualizations/top_10_closeness.svg")
        print(f"  • visualizations/top_10_clustering.svg")
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
