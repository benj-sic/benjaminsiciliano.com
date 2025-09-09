# Atlanta Biotech Network Analysis

A standalone Python script for analyzing the Atlanta biotech ecosystem network using NetworkX.

## Overview

This analysis tool calculates standard network metrics and generates presentation-quality visualizations from your biotech network data.

## Features

### Network Metrics Calculated
- **Degree centrality** - Number of connections per node
- **Betweenness centrality** - Bridge importance in the network
- **Closeness centrality** - Average distance to all other nodes
- **Clustering coefficient** - Local connectivity density
- **Community detection** - Using Louvain algorithm
- **Network-level stats** - Density, diameter, average path length, assortativity

### Output Files
- `biotech_network_metrics.csv` - Node-level metrics in spreadsheet format
- `top_10_hubs.svg` - Bar chart of most connected nodes
- `top_10_bridges.svg` - Bar chart of most important bridge nodes
- `degree_vs_betweenness.svg` - Scatterplot showing centrality relationships
- `community_network.svg` - Network visualization colored by community
- `network_dashboard.svg` - Summary dashboard with key statistics

## Quick Start

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the analysis:**
   ```bash
   python analyze_network.py
   ```

The script will automatically:
- Convert your JavaScript data to JSON format (if needed)
- Calculate all network metrics
- Generate visualizations
- Export results to CSV

## Data Format

The script expects your network data in this format:

```json
{
  "nodes": [
    {
      "id": "emory",
      "name": "Emory University",
      "type": "university",
      "description": "...",
      "website": "..."
    }
  ],
  "links": [
    {
      "source": "emory",
      "target": "gatech",
      "type": "collaboration",
      "description": "..."
    }
  ],
  "nodeColors": {
    "university": "#FF6B6B",
    "startup": "#4ECDC4"
  }
}
```

## Customization

### Adding New Metrics
To add new network metrics, modify the `calculate_metrics()` method:

```python
# Add your metric calculation
your_metric = nx.your_metric_function(self.G)

# Store in node_metrics
for node in self.G.nodes():
    self.node_metrics[node]['your_metric'] = your_metric.get(node, 0)
```

### Customizing Visualizations
Modify the plotting methods in the `create_visualizations()` section:
- `_plot_top_hubs()` - Top nodes by degree
- `_plot_top_bridges()` - Top nodes by betweenness
- `_plot_degree_vs_betweenness()` - Centrality scatterplot
- `_plot_community_network()` - Community visualization
- `_plot_dashboard_summary()` - Summary dashboard

### Changing Output Format
To save plots in different formats, modify the `plt.savefig()` calls:
```python
plt.savefig('filename.png', format='png', dpi=300, bbox_inches='tight')
plt.savefig('filename.pdf', format='pdf', bbox_inches='tight')
```

## Dependencies

- **NetworkX** - Network analysis and algorithms
- **pandas** - Data manipulation and CSV export
- **matplotlib** - Plotting and visualization
- **seaborn** - Statistical visualization styling
- **numpy** - Numerical computations
- **python-louvain** - Community detection algorithm

## Troubleshooting

### Data Conversion Issues
If the JavaScript-to-JSON conversion fails, the script will create a minimal test dataset. You can manually convert your data using:

```bash
python convert_data.py
```

### Memory Issues
For very large networks (>10,000 nodes), consider:
- Using `nx.DiGraph()` for directed networks
- Sampling the network for initial analysis
- Using more efficient layout algorithms

### Visualization Issues
If plots don't render correctly:
- Check that all dependencies are installed
- Try different matplotlib backends
- Reduce network size for community visualization

## Example Output

The analysis will generate a summary like:

```
ATLANTA BIOTECH NETWORK ANALYSIS SUMMARY
============================================================

Network Structure:
  • Nodes: 150
  • Edges: 300
  • Density: 0.027
  • Communities: 8
  • Modularity: 0.456
  • Diameter: 6
  • Average Path Length: 3.2
  • Assortativity: 0.123

Top 5 Hubs (by Degree):
  1. emory: 25 connections
  2. gatech: 22 connections
  3. biolocity: 18 connections
  ...

Files Generated:
  • biotech_network_metrics.csv
  • top_10_hubs.svg
  • top_10_bridges.svg
  • degree_vs_betweenness.svg
  • community_network.svg
  • network_dashboard.svg
```

## License

This analysis tool is part of the benjaminsiciliano.com project.
Copyright (c) 2025 Benjamin Siciliano. All rights reserved.
