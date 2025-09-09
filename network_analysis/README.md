# Atlanta Biotech Network Analysis

A comprehensive standalone analysis tool for the Atlanta biotech ecosystem network using NetworkX. This tool generates publication-quality visualizations and detailed network metrics.

## Quick Start

### Option 1: From Project Root (Recommended)
```bash
python network_analysis/analyze_biotech_network.py
```

### Option 2: From Analysis Directory
```bash
cd network_analysis
python scripts/analyze_network.py
```

### Option 3: Complete Data Pipeline (After Data Updates)
```bash
cd network_analysis
python scripts/simple_node_extractor.py  # Extract data from website
python scripts/clean_duplicates.py      # Clean duplicate connections
python scripts/add_missing_nodes.py     # Add missing organizations
python scripts/clean_duplicate_organizations.py  # Remove duplicate orgs
python scripts/analyze_network.py       # Run analysis
```

## Running After Data Updates

When you update the data in `src/atlanta_biotech_data.js` on your website:

1. **Run the complete pipeline** to extract and clean the new data:
   ```bash
   cd network_analysis
   python scripts/simple_node_extractor.py
   python scripts/clean_duplicates.py
   python scripts/add_missing_nodes.py
   python scripts/clean_duplicate_organizations.py
   python scripts/analyze_network.py
   ```

2. **Or run just the analysis** if data is already clean:
   ```bash
   python network_analysis/analyze_biotech_network.py
   ```

## Directory Structure

```
network_analysis/
├── README.md                           # This file
├── requirements.txt                    # Python dependencies
├── analyze_biotech_network.py         # Main entry point
├── ANALYSIS_RESULTS.md                # Comprehensive results report
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
    ├── top_10_closeness.svg          # Top nodes by closeness centrality
    ├── top_10_clustering.svg         # Top nodes by clustering coefficient
    ├── organization_types.svg        # Organization type breakdown
    └── connection_types.svg          # Connection type breakdown
```

## What It Does

### Network Metrics Calculated
- **Degree centrality** - Number of connections per node (hubs)
- **Betweenness centrality** - Bridge importance in the network (brokers)
- **Closeness centrality** - Average distance to all other nodes
- **Clustering coefficient** - Local connectivity density
- **Community detection** - Using Louvain algorithm with descriptive labels
- **Network-level stats** - Density, modularity, assortativity, connectivity

### Analysis Features
- **Top 10 Rankings** - For all centrality measures with display names
- **Network Health Assessment** - Connectivity, hub concentration, community integration
- **Composition Analysis** - Organization and connection type breakdowns
- **Publication-Quality Plots** - Scientific journal styling (18pt font, bold text)
- **Comprehensive Report** - Detailed findings and strategic recommendations

### Output Files
- **CSV export** with all node-level metrics
- **6 SVG visualizations** ready for Illustrator editing
- **Comprehensive analysis report** (ANALYSIS_RESULTS.md)

## Current Results

Your Atlanta biotech network analysis shows:
- **122 organizations** and **201 connections** (cleaned data)
- **30 communities** detected with **0.433 modularity**
- **Density: 0.027** (sparse but well-connected)
- **Top hubs**: Emory University (44 connections), Georgia Tech (34), GRA (18)
- **Top bridges**: Emory University (0.368), Georgia Tech (0.187), Portal Innovations (0.104)
- **Network Health**: Disconnected main component with high hub concentration

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
- `_plot_top_hubs()` - Top 10 nodes by degree centrality
- `_plot_top_bridges()` - Top 10 nodes by betweenness centrality
- `_plot_top_closeness()` - Top 10 nodes by closeness centrality
- `_plot_top_clustering()` - Top 10 nodes by clustering coefficient
- `_plot_organization_types()` - Organization type breakdown
- `_plot_connection_types()` - Connection type breakdown

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
- `data/biotech_network_metrics.csv` - Complete node-level metrics with all centrality measures

### Visualizations (Publication-Quality SVG)
- `visualizations/top_10_hubs.svg` - Most connected organizations
- `visualizations/top_10_bridges.svg` - Most important bridge organizations
- `visualizations/top_10_closeness.svg` - Closeness centrality leaders
- `visualizations/top_10_clustering.svg` - Clustering coefficient leaders
- `visualizations/organization_types.svg` - Organization type breakdown with percentages
- `visualizations/connection_types.svg` - Connection type breakdown with percentages

### Reports
- `ANALYSIS_RESULTS.md` - Comprehensive results report with:
  - Executive summary and network overview
  - Top 10 rankings for all metrics
  - Network health assessment
  - Strategic implications and recommendations
  - Organization and connection type breakdowns

## Next Steps

### For Regular Analysis
1. **Run the analysis**: `python network_analysis/analyze_biotech_network.py`
2. **Read the results**: `ANALYSIS_RESULTS.md` for detailed findings
3. **Open SVG files** in Illustrator for customization
4. **Import CSV** into Excel, R, or other analysis tools

### After Data Updates
1. **Update your website data** in `src/atlanta_biotech_data.js`
2. **Run the complete pipeline**:
   ```bash
   cd network_analysis
   python scripts/simple_node_extractor.py
   python scripts/clean_duplicates.py
   python scripts/add_missing_nodes.py
   python scripts/clean_duplicate_organizations.py
   python scripts/analyze_network.py
   ```
3. **Review updated results** in `ANALYSIS_RESULTS.md`

### Customization
- **Extend the analysis** by adding new metrics or visualizations
- **Modify plot styling** in the plotting methods
- **Add new centrality measures** in `calculate_metrics()`
- **Use results** in presentations or reports

---

**Ready to analyze your Atlanta biotech network!** 🧬📊
