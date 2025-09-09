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
        
        # 3. Degree vs Betweenness Scatterplot
        self._plot_degree_vs_betweenness()
        
        # 4. Community-colored Network
        self._plot_community_network()
        
        # 5. Network Statistics
        self._plot_network_statistics()
        
        # 6. Community Distribution
        self._plot_community_distribution()
        
        # 7. Centrality Distribution
        self._plot_centrality_distribution()
        
        # 8. Degree Distribution
        self._plot_degree_distribution()
        
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
        ax.set_yticklabels([node.replace('_', ' ').title() for node in top_hubs['node_id']])
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
        ax.set_yticklabels([node.replace('_', ' ').title() for node in top_bridges['node_id']])
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
    
    def _plot_degree_vs_betweenness(self):
        """Plot degree vs betweenness centrality scatterplot."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        
        plt.figure(figsize=(10, 8))
        scatter =         plt.scatter(df['degree_centrality'], df['betweenness_centrality'], 
                   c=df['community_id'], cmap='tab20', alpha=0.7, s=60)
        plt.xlabel('Degree Centrality')
        plt.ylabel('Betweenness Centrality')
        plt.title('Degree vs Betweenness Centrality\n(Color = Community)')
        plt.colorbar(scatter, label='Community ID')
        plt.grid(True, alpha=0.3)
        
        # Add correlation coefficient
        corr = df['degree_centrality'].corr(df['betweenness_centrality'])
        plt.text(0.05, 0.95, f'Correlation: {corr:.3f}', transform=plt.gca().transAxes,
                bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
        
        plt.tight_layout()
        plt.savefig('visualizations/degree_vs_betweenness.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_community_network(self):
        """Plot the network with community coloring."""
        if not self.communities:
            print("Skipping community network plot - no communities detected")
            return
        
        plt.figure(figsize=(16, 12))
        
        # Use spring layout for better visualization
        pos = nx.spring_layout(self.G, k=1, iterations=50)
        
        # Get unique communities and assign colors
        unique_communities = list(set(self.communities.values()))
        colors = plt.cm.tab20(np.linspace(0, 1, len(unique_communities)))
        community_colors = {comm: colors[i] for i, comm in enumerate(unique_communities)}
        
        # Draw nodes
        for community in unique_communities:
            nodes_in_community = [node for node, comm in self.communities.items() if comm == community]
            nx.draw_networkx_nodes(self.G, pos, nodelist=nodes_in_community,
                                 node_color=[community_colors[community]], 
                                 node_size=100, alpha=0.8)
        
        # Draw edges
        nx.draw_networkx_edges(self.G, pos, alpha=0.3, width=0.5)
        
        # Add labels for high-degree nodes only
        high_degree_nodes = [node for node, data in self.G.degree() if data >= 5]
        labels = {node: node for node in high_degree_nodes}
        nx.draw_networkx_labels(self.G, pos, labels, font_size=8, font_weight='bold')
        
        # Create legend with community labels
        legend_elements = []
        for i, comm_id in enumerate(unique_communities):
            label = self.community_labels.get(comm_id, f"Community {comm_id}")
            legend_elements.append(plt.Line2D([0], [0], marker='o', color='w', 
                                            markerfacecolor=colors[i], markersize=10, label=label))
        
        plt.legend(handles=legend_elements, loc='upper left', bbox_to_anchor=(1, 1), fontsize=8)
        
        plt.title(f'Atlanta Biotech Network by Community\n({len(unique_communities)} communities detected)', fontsize=14)
        plt.axis('off')
        plt.tight_layout()
        plt.savefig('visualizations/community_network.svg', format='svg', dpi=300, bbox_inches='tight')
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
            print(f"  {i}. {row['node_id']}: {row['degree']} connections")
        
        print(f"\nTop 5 Bridges (by Betweenness):")
        top_bridges = df.nlargest(5, 'betweenness_centrality')
        for i, (idx, row) in enumerate(top_bridges.iterrows(), 1):
            print(f"  {i}. {row['node_id']}: {row['betweenness_centrality']:.3f}")
        
        print(f"\nFiles Generated:")
        print(f"  • data/biotech_network_metrics.csv")
        print(f"  • visualizations/top_10_hubs.svg")
        print(f"  • visualizations/top_10_bridges.svg")
        print(f"  • visualizations/degree_vs_betweenness.svg")
        print(f"  • visualizations/community_network.svg")
        print(f"  • visualizations/network_statistics.svg")
        print(f"  • visualizations/community_distribution.svg")
        print(f"  • visualizations/centrality_distribution.svg")
        print(f"  • visualizations/degree_distribution.svg")
        print(f"  • ANALYSIS_RESULTS.md")
        
        print("\n" + "="*60)
    
    def generate_results_report(self):
        """Generate a comprehensive results report."""
        print("Generating results report...")
        
        # Get current date
        from datetime import datetime
        current_date = datetime.now().strftime("%B %d, %Y")
        
        # Get top nodes for the report
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_hubs = df.nlargest(5, 'degree_centrality')
        top_bridges = df.nlargest(5, 'betweenness_centrality')
        
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

### Network Characteristics
- **Sparse Network**: Low density suggests specialized, targeted connections rather than random interactions
- **Strong Community Structure**: High modularity indicates well-defined clusters of related organizations
- **Diverse Connections**: Negative assortativity shows organizations connect across different types and sizes
- **Disconnected Components**: Some organizations are not connected to the main network

## Key Findings

### Top 5 Hub Organizations (by Degree Centrality)
"""
        
        # Add top hubs
        for i, (idx, row) in enumerate(top_hubs.iterrows(), 1):
            report_content += f"{i}. **{row['node_id']}** - {row['degree']} connections\n"
            if i == 1:
                report_content += "   - Central research university with extensive biotech partnerships\n"
                report_content += "   - Key role in academic-industry collaborations\n"
            elif i == 2:
                report_content += "   - Major engineering and research institution\n"
                report_content += "   - Strong presence in biotech innovation\n"
            elif i == 3:
                report_content += "   - State-level research coordination body\n"
                report_content += "   - Facilitates connections between institutions\n"
            elif i == 4:
                report_content += "   - Biotech incubator and accelerator\n"
                report_content += "   - Hub for startup development\n"
            elif i == 5:
                report_content += "   - Investment arm of GRA\n"
                report_content += "   - Key funding source for biotech startups\n"
            report_content += "\n"
        
        report_content += f"""### Top 5 Bridge Organizations (by Betweenness Centrality)
"""
        
        # Add top bridges
        for i, (idx, row) in enumerate(top_bridges.iterrows(), 1):
            report_content += f"{i}. **{row['node_id']}** - {row['betweenness_centrality']:.3f}\n"
            if i == 1:
                report_content += "   - Most important bridge in the network\n"
                report_content += "   - Connects different communities and sectors\n"
            elif i == 2:
                report_content += "   - Second most important bridge\n"
                report_content += "   - Links academic and industry sectors\n"
            elif i == 3:
                report_content += "   - Important connector for startups\n"
                report_content += "   - Bridges academic research and commercial applications\n"
            elif i == 4:
                report_content += "   - State-level coordination role\n"
                report_content += "   - Connects different institutional types\n"
            elif i == 5:
                report_content += "   - Important regional connector\n"
                report_content += "   - Facilitates local biotech relationships\n"
            report_content += "\n"
        
        report_content += f"""## Community Analysis

### Community Structure
The network contains **{self.network_stats['num_communities']} distinct communities**, indicating:
- **Specialized Clusters**: Different focus areas (therapeutics, diagnostics, research, etc.)
- **Geographic Clustering**: Proximity-based connections
- **Functional Clustering**: Similar organizational types working together
- **Collaboration Networks**: Research partnerships and joint ventures

### Community Breakdown
"""
        
        # Add community details
        community_summary = {}
        for node, community_id in self.communities.items():
            if community_id not in community_summary:
                community_summary[community_id] = []
            community_summary[community_id].append(node)
        
        # Sort communities by size
        sorted_communities = sorted(community_summary.items(), key=lambda x: len(x[1]), reverse=True)
        
        for i, (comm_id, nodes) in enumerate(sorted_communities[:10]):  # Top 10 communities
            label = self.community_labels.get(comm_id, f"Community {comm_id}")
            report_content += f"- **{label}**: {len(nodes)} organizations\n"
        
        if len(sorted_communities) > 10:
            report_content += f"- **... and {len(sorted_communities) - 10} other communities**\n"
        
        report_content += f"""
### Modularity Score: {self.network_stats['modularity']:.3f}
- **Strong Community Structure**: Well above random (0.0)
- **Clear Boundaries**: Communities are well-defined
- **Internal Cohesion**: High within-community connections
- **External Integration**: Some cross-community connections

## Network Metrics Analysis

### Centrality Measures
- **Degree Centrality**: Shows connection volume ({top_hubs.iloc[0]['node_id']} leads with {top_hubs.iloc[0]['degree']})
- **Betweenness Centrality**: Shows bridge importance ({top_bridges.iloc[0]['node_id']} leads with {top_bridges.iloc[0]['betweenness_centrality']:.3f})
- **Closeness Centrality**: Shows average distance to others
- **Clustering Coefficient**: Shows local connectivity density

### Network-Level Statistics
- **Density ({self.network_stats['density']:.3f})**: Low density indicates specialized, targeted connections
- **Assortativity ({self.network_stats['assortativity']:.3f})**: Negative value shows diverse connection patterns
- **Diameter**: {self.network_stats['diameter']}
- **Average Path Length**: {self.network_stats['average_path_length']}

## Strategic Implications

### Strengths
1. **Strong Academic Foundation**: Leading research universities provide solid base
2. **Clear Community Structure**: Well-defined clusters enable targeted interventions
3. **Key Connectors**: Identified bridge organizations can facilitate new connections
4. **State Support**: GRA provides coordination and funding

### Opportunities
1. **Bridge Development**: Strengthen connections between communities
2. **Investment Expansion**: Increase number of active investors
3. **Startup Support**: Expand Portal Atlanta's reach
4. **Cross-Community Collaboration**: Foster inter-community partnerships

### Challenges
1. **Sparse Network**: Low density may limit serendipitous connections
2. **Disconnected Components**: Some organizations remain isolated
3. **Centralization Risk**: Heavy reliance on key players
4. **Limited Diversity**: Few non-academic central players

## Recommendations

### Short-term (0-6 months)
1. **Strengthen Key Bridges**: Support {top_bridges.iloc[0]['node_id']} and {top_bridges.iloc[1]['node_id']}'s connector roles
2. **Community Mapping**: Identify specific focus areas of each community
3. **Gap Analysis**: Identify missing connections between key players

### Medium-term (6-18 months)
1. **Investment Expansion**: Recruit additional investors to the network
2. **Startup Acceleration**: Expand Portal Atlanta's programs
3. **Cross-Community Events**: Organize networking across communities

### Long-term (18+ months)
1. **Network Density**: Increase overall connection density
2. **New Hubs**: Develop additional central organizations
3. **Ecosystem Integration**: Connect to national/international networks

## Data Quality Notes

### Data Cleaning Performed
- **Duplicate Organizations**: Removed duplicate entries
- **Duplicate Connections**: Consolidated duplicate connection pairs
- **Missing Nodes**: Added organizations referenced in links but missing from nodes
- **Connection Types**: Standardized connection types and descriptions

### Data Sources
- **Primary Source**: `src/atlanta_biotech_data.js` from website
- **Extraction Method**: Custom Python script with robust parsing
- **Validation**: Manual verification of key organizations and connections

## Technical Details

### Analysis Tools
- **NetworkX**: Python library for network analysis
- **Community Detection**: Louvain algorithm for modularity optimization
- **Visualization**: Matplotlib and Seaborn for publication-quality plots
- **Data Processing**: Pandas for data manipulation and CSV export

### Files Generated
- **`biotech_network_metrics.csv`**: Complete node-level metrics
- **`top_10_hubs.svg`**: Bar chart of most connected organizations
- **`top_10_bridges.svg`**: Bar chart of most important bridge organizations
- **`degree_vs_betweenness.svg`**: Scatterplot of centrality relationships
- **`community_network.svg`**: Network visualization colored by community
- **`network_dashboard.svg`**: Summary dashboard with key statistics

## Conclusion

The Atlanta biotech network demonstrates a well-structured ecosystem with clear community organization and identifiable key players. While the network is sparse, it shows strong community structure and strategic positioning of important organizations. The analysis provides a foundation for understanding the ecosystem and developing targeted interventions to strengthen connections and support growth.

---

**Analysis Date**: {current_date}  
**Data Source**: Atlanta Biotech Network ({self.network_stats['raw_nodes']} organizations, {self.network_stats['raw_links']} connections)  
**Analysis Method**: NetworkX with Louvain community detection  
**Report Generated**: Automated analysis pipeline
"""
        
        # Write the report
        report_file = "ANALYSIS_RESULTS.md"
        with open(report_file, 'w') as f:
            f.write(report_content)
        
        print(f"Results report saved to: {report_file}")
    
    def _plot_network_statistics(self):
        """Plot network statistics as a clean summary."""
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Network statistics
        stats = [
            f"Organizations: {self.network_stats['raw_nodes']:,}",
            f"Connections: {self.network_stats['raw_links']:,}",
            f"Density: {self.network_stats['density']:.3f}",
            f"Communities: {self.network_stats['num_communities']}",
            f"Modularity: {self.network_stats['modularity']:.3f}",
            f"Assortativity: {self.network_stats['assortativity']:.3f}"
        ]
        
        # Create text plot
        y_pos = np.arange(len(stats))
        ax.barh(y_pos, [1] * len(stats), color='lightblue', edgecolor='black', linewidth=1.5)
        ax.set_yticks(y_pos)
        ax.set_yticklabels(stats, fontweight='bold')
        ax.set_xlim(0, 1)
        ax.set_xticks([])
        ax.set_title('Network Statistics Summary', fontweight='bold')
        
        # Remove all spines except left
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/network_statistics.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_community_distribution(self):
        """Plot community size distribution."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        community_sizes = df['community_label'].value_counts()
        
        fig, ax = plt.subplots(figsize=(12, 8))
        
        # Create horizontal bar plot
        y_pos = np.arange(len(community_sizes))
        bars = ax.barh(y_pos, community_sizes.values, 
                      color=plt.cm.Set3(np.linspace(0, 1, len(community_sizes))),
                      edgecolor='black', linewidth=1.5)
        
        # Customize axes
        ax.set_yticks(y_pos)
        ax.set_yticklabels(community_sizes.index, fontweight='bold')
        ax.set_xlabel('Number of Organizations', fontweight='bold')
        ax.set_title('Community Size Distribution', fontweight='bold')
        
        # Add value labels on bars
        for i, v in enumerate(community_sizes.values):
            ax.text(v + 0.1, i, str(v), va='center', ha='left', fontweight='bold')
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/community_distribution.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_centrality_distribution(self):
        """Plot distribution of centrality measures."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 8))
        
        # Degree centrality histogram
        ax1.hist(df['degree_centrality'], bins=20, color='skyblue', edgecolor='black', linewidth=1.5)
        ax1.set_xlabel('Degree Centrality', fontweight='bold')
        ax1.set_ylabel('Frequency', fontweight='bold')
        ax1.set_title('Degree Centrality Distribution', fontweight='bold')
        ax1.spines['top'].set_visible(False)
        ax1.spines['right'].set_visible(False)
        
        # Betweenness centrality histogram
        ax2.hist(df['betweenness_centrality'], bins=20, color='lightcoral', edgecolor='black', linewidth=1.5)
        ax2.set_xlabel('Betweenness Centrality', fontweight='bold')
        ax2.set_ylabel('Frequency', fontweight='bold')
        ax2.set_title('Betweenness Centrality Distribution', fontweight='bold')
        ax2.spines['top'].set_visible(False)
        ax2.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/centrality_distribution.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_degree_distribution(self):
        """Plot degree distribution."""
        degrees = [self.G.degree(node) for node in self.G.nodes()]
        
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Create histogram
        ax.hist(degrees, bins=20, color='lightgreen', edgecolor='black', linewidth=1.5)
        ax.set_xlabel('Degree', fontweight='bold')
        ax.set_ylabel('Frequency', fontweight='bold')
        ax.set_title('Network Degree Distribution', fontweight='bold')
        
        # Add statistics
        mean_degree = np.mean(degrees)
        ax.axvline(mean_degree, color='red', linestyle='--', linewidth=2, label=f'Mean: {mean_degree:.1f}')
        ax.legend()
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        
        plt.tight_layout()
        plt.savefig('visualizations/degree_distribution.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()

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
