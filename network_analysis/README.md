# Atlanta Biotech Network Analysis

A comprehensive standalone analysis tool for the Atlanta biotech ecosystem network using NetworkX.

## Quick Start

### Option 1: From Project Root
```bash
python analyze_biotech_network.py
```

### Option 2: From Analysis Directory
```bash
cd network_analysis
python scripts/analyze_network.py
```

### Option 3: Complete Pipeline
```bash
cd network_analysis
python scripts/simple_node_extractor.py  # Extract data
python scripts/clean_duplicates.py      # Clean duplicates
python scripts/add_missing_nodes.py     # Add missing nodes
python scripts/analyze_network.py       # Run analysis
```

## Directory Structure

```
network_analysis/
├── README.md                           # This file
├── requirements.txt                    # Python dependencies
├── analyze_biotech_network.py         # Main entry point
├── scripts/                           # Analysis scripts
│   ├── analyze_network.py            # Main analysis script
│   ├── simple_node_extractor.py      # Data extraction
│   ├── clean_duplicates.py           # Remove duplicate connections
│   ├── add_missing_nodes.py          # Add missing organizations
│   └── clean_duplicate_organizations.py # Remove duplicate orgs
├── data/                              # Network data
│   ├── biotech_network_data.json     # Extracted network data
│   └── biotech_network_metrics.csv   # Node-level metrics
└── visualizations/                    # Generated plots
    ├── top_10_hubs.svg               # Top nodes by degree
    ├── top_10_bridges.svg            # Top nodes by betweenness
    ├── degree_vs_betweenness.svg     # Centrality scatterplot
    ├── community_network.svg         # Community visualization
    └── network_dashboard.svg         # Summary dashboard
```

## What It Does

### Network Metrics Calculated
- **Degree centrality** - Number of connections per node
- **Betweenness centrality** - Bridge importance in the network
- **Closeness centrality** - Average distance to all other nodes
- **Clustering coefficient** - Local connectivity density
- **Community detection** - Using Louvain algorithm
- **Network-level stats** - Density, diameter, average path length, assortativity

### Output Files
- **CSV export** with all node-level metrics
- **5 SVG visualizations** ready for Illustrator editing
- **Comprehensive analysis summary**

## Current Results

Your Atlanta biotech network analysis shows:
- **119 organizations** and **201 connections** (cleaned data)
- **30 communities** detected with **0.427 modularity**
- **Density: 0.027** (sparse but well-connected)
- **Top hubs**: Emory (44 connections), Georgia Tech (34), GRA (18)
- **Top bridges**: Emory (0.368), Georgia Tech (0.187), Portal (0.104)

## Installation

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run analysis:**
   ```bash
   python analyze_biotech_network.py
   ```

## Customization

### Adding New Metrics
Edit `scripts/analyze_network.py` in the `calculate_metrics()` method:

```python
# Add your metric calculation
eigenvector_centrality = nx.eigenvector_centrality(self.G)
for node in self.G.nodes():
    self.node_metrics[node]['eigenvector_centrality'] = eigenvector_centrality.get(node, 0)
```

### Customizing Visualizations
Modify the plotting methods in `scripts/analyze_network.py`:
- `_plot_top_hubs()` - Top nodes by degree
- `_plot_top_bridges()` - Top nodes by betweenness
- `_plot_degree_vs_betweenness()` - Centrality scatterplot
- `_plot_community_network()` - Community visualization
- `_plot_dashboard_summary()` - Summary dashboard

### Changing Output Format
Modify the `plt.savefig()` calls to save in different formats:
```python
plt.savefig('filename.png', format='png', dpi=300, bbox_inches='tight')
plt.savefig('filename.pdf', format='pdf', bbox_inches='tight')
```

## Troubleshooting

### Data Issues
- **Duplicate organizations**: Run `python scripts/clean_duplicate_organizations.py`
- **Missing nodes**: Run `python scripts/add_missing_nodes.py`
- **Duplicate connections**: Run `python scripts/clean_duplicates.py`

### Dependencies
- Requires Python 3.7+
- Install with: `pip install -r requirements.txt`

### File Paths
- All scripts use relative paths from the `network_analysis/` directory
- Run from project root with `python analyze_biotech_network.py`

## Files Generated

After running the analysis, you'll find:

### Data Files
- `data/biotech_network_metrics.csv` - Complete node-level metrics

### Visualizations
- `visualizations/top_10_hubs.svg` - Most connected nodes
- `visualizations/top_10_bridges.svg` - Most important bridge nodes
- `visualizations/degree_vs_betweenness.svg` - Centrality relationships
- `visualizations/community_network.svg` - Network by community
- `visualizations/network_dashboard.svg` - Summary dashboard

## Results Report

For detailed analysis results and insights, see:
- **`ANALYSIS_RESULTS.md`** - Comprehensive results report with key findings

## Next Steps

1. **Run the analysis**: `python analyze_biotech_network.py`
2. **Read the results**: `ANALYSIS_RESULTS.md` for detailed findings
3. **Open SVG files** in Illustrator for customization
4. **Import CSV** into Excel, R, or other analysis tools
5. **Extend the analysis** by adding new metrics or visualizations
6. **Use results** in presentations or reports

---

**Ready to analyze your Atlanta biotech network!** 🧬📊
