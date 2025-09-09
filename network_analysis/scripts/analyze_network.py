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
    
    def __init__(self, data_file='../data/biotech_network_data.json'):
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
                'clustering_coefficient': clustering_coefficient.get(node, 0),
                'community': self.communities.get(node, 0)
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
    
    def export_csv(self, filename='../data/biotech_network_metrics.csv'):
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
        viz_dir = Path('../visualizations')
        viz_dir.mkdir(parents=True, exist_ok=True)
        
        # Set up the plotting style
        plt.rcParams['figure.figsize'] = (12, 8)
        plt.rcParams['font.size'] = 12
        plt.rcParams['axes.titlesize'] = 14
        plt.rcParams['axes.labelsize'] = 12
        
        # 1. Top 10 Hubs (Degree Centrality)
        self._plot_top_hubs()
        
        # 2. Top 10 Bridges (Betweenness Centrality)
        self._plot_top_bridges()
        
        # 3. Degree vs Betweenness Scatterplot
        self._plot_degree_vs_betweenness()
        
        # 4. Community-colored Network (if feasible)
        self._plot_community_network()
        
        # 5. Dashboard Summary
        self._plot_dashboard_summary()
        
        print("All visualizations created!")
    
    def _plot_top_hubs(self):
        """Plot top 10 nodes by degree centrality."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_hubs = df.nlargest(10, 'degree_centrality')
        
        plt.figure(figsize=(12, 8))
        bars = plt.barh(range(len(top_hubs)), top_hubs['degree_centrality'], 
                       color=plt.cm.viridis(np.linspace(0, 1, len(top_hubs))))
        plt.yticks(range(len(top_hubs)), top_hubs['node_id'], rotation=0)
        plt.xlabel('Degree Centrality')
        plt.title('Top 10 Network Hubs (by Degree Centrality)')
        plt.grid(axis='x', alpha=0.3)
        
        # Add value labels on bars
        for i, (idx, row) in enumerate(top_hubs.iterrows()):
            plt.text(row['degree_centrality'] + 0.001, i, f'{row["degree_centrality"]:.3f}', 
                    va='center', ha='left')
        
        plt.tight_layout()
        plt.savefig('../visualizations/top_10_hubs.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_top_bridges(self):
        """Plot top 10 nodes by betweenness centrality."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_bridges = df.nlargest(10, 'betweenness_centrality')
        
        plt.figure(figsize=(12, 8))
        bars = plt.barh(range(len(top_bridges)), top_bridges['betweenness_centrality'],
                       color=plt.cm.plasma(np.linspace(0, 1, len(top_bridges))))
        plt.yticks(range(len(top_bridges)), top_bridges['node_id'], rotation=0)
        plt.xlabel('Betweenness Centrality')
        plt.title('Top 10 Network Bridges (by Betweenness Centrality)')
        plt.grid(axis='x', alpha=0.3)
        
        # Add value labels on bars
        for i, (idx, row) in enumerate(top_bridges.iterrows()):
            plt.text(row['betweenness_centrality'] + 0.001, i, f'{row["betweenness_centrality"]:.3f}', 
                    va='center', ha='left')
        
        plt.tight_layout()
        plt.savefig('../visualizations/top_10_bridges.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_degree_vs_betweenness(self):
        """Plot degree vs betweenness centrality scatterplot."""
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        
        plt.figure(figsize=(10, 8))
        scatter = plt.scatter(df['degree_centrality'], df['betweenness_centrality'], 
                            c=df['community'], cmap='tab20', alpha=0.7, s=60)
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
        plt.savefig('../visualizations/degree_vs_betweenness.svg', format='svg', dpi=300, bbox_inches='tight')
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
        
        plt.title(f'Atlanta Biotech Network by Community\n({len(unique_communities)} communities detected)')
        plt.axis('off')
        plt.tight_layout()
        plt.savefig('../visualizations/community_network.svg', format='svg', dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_dashboard_summary(self):
        """Create a dashboard-style summary chart."""
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(16, 12))
        
        # 1. Network Statistics
        stats_text = f"""
        Network Statistics:
        • Organizations: {self.network_stats['raw_nodes']:,}
        • Connections: {self.network_stats['raw_links']:,}
        • Unique Edges: {self.network_stats['num_edges']:,}
        • Density: {self.network_stats['density']:.3f}
        • Communities: {self.network_stats['num_communities']}
        • Modularity: {self.network_stats['modularity']:.3f}
        """
        
        if isinstance(self.network_stats['diameter'], (int, float)):
            stats_text += f"• Diameter: {self.network_stats['diameter']}\n"
        else:
            stats_text += f"• Diameter: {self.network_stats['diameter']}\n"
            
        if isinstance(self.network_stats['average_path_length'], (int, float)):
            stats_text += f"• Avg Path Length: {self.network_stats['average_path_length']:.3f}\n"
        else:
            stats_text += f"• Avg Path Length: {self.network_stats['average_path_length']}\n"
        
        ax1.text(0.1, 0.5, stats_text, transform=ax1.transAxes, fontsize=12,
                verticalalignment='center', fontfamily='monospace')
        ax1.set_title('Network Overview', fontsize=14, fontweight='bold')
        ax1.axis('off')
        
        # 2. Degree Distribution
        degrees = [data['degree'] for data in self.node_metrics.values()]
        ax2.hist(degrees, bins=20, alpha=0.7, color='skyblue', edgecolor='black')
        ax2.set_xlabel('Degree')
        ax2.set_ylabel('Frequency')
        ax2.set_title('Degree Distribution')
        ax2.grid(True, alpha=0.3)
        
        # 3. Centrality Comparison (Top 10)
        df = pd.DataFrame.from_dict(self.node_metrics, orient='index')
        top_10 = df.nlargest(10, 'degree_centrality')
        
        x = np.arange(len(top_10))
        width = 0.35
        
        ax3.bar(x - width/2, top_10['degree_centrality'], width, label='Degree', alpha=0.8)
        ax3.bar(x + width/2, top_10['betweenness_centrality'], width, label='Betweenness', alpha=0.8)
        
        ax3.set_xlabel('Nodes')
        ax3.set_ylabel('Centrality')
        ax3.set_title('Top 10 Nodes: Degree vs Betweenness Centrality')
        ax3.set_xticks(x)
        ax3.set_xticklabels(top_10['node_id'], rotation=45, ha='right')
        ax3.legend()
        ax3.grid(True, alpha=0.3)
        
        # 4. Community Size Distribution
        community_sizes = {}
        for node, community in self.communities.items():
            community_sizes[community] = community_sizes.get(community, 0) + 1
        
        communities = list(community_sizes.keys())
        sizes = list(community_sizes.values())
        
        ax4.bar(communities, sizes, alpha=0.7, color='lightcoral')
        ax4.set_xlabel('Community ID')
        ax4.set_ylabel('Number of Nodes')
        ax4.set_title('Community Size Distribution')
        ax4.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig('../visualizations/network_dashboard.svg', format='svg', dpi=300, bbox_inches='tight')
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
        print(f"  • visualizations/network_dashboard.svg")
        
        print("\n" + "="*60)

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
        
        # Print summary
        analyzer.print_summary()
        
        print("\nAnalysis complete! Check the generated files.")
        
    except Exception as e:
        print(f"Error during analysis: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
