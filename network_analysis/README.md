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

### Network Metrics Calculated (19 Total)

#### Basic Metrics
- **Degree centrality** - Number of connections per node (hubs)
- **Betweenness centrality** - Bridge importance in the network (brokers)
- **Closeness centrality** - Average distance to all other nodes
- **Harmonic centrality** - Alternative closeness measure
- **Clustering coefficient** - Local clustering tendency
- **Community detection** - Using Louvain algorithm with descriptive labels
- **Network-level stats** - Density, modularity, assortativity, connectivity

#### Advanced Metrics
- **Eigenvector centrality** - Influence based on connected nodes' influence
- **PageRank** - Google's influence algorithm
- **Transitivity** - Global clustering tendency
- **Average clustering** - Mean local clustering
- **Rich club coefficient** - High-degree node connectivity
- **Structural holes** - Brokerage and information control
- **Core-periphery analysis** - Network hierarchy identification
- **Network resilience metrics** - Robustness to failures and attacks
- **Community quality metrics** - Community cohesion analysis

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

### Key Insights Discovered
- **Emory University dominates** across all centrality measures
- **Network vulnerability** is high (0.906) - over-dependence on key nodes
- **100% core classification** - all organizations are well-connected
- **High structural holes** - good brokerage positions exist
- **Moderate community quality** - communities are reasonably well-defined

### Potential Issues Identified
- **Over-centralization** - too dependent on few key nodes
- **Single points of failure** - removing Emory could fragment network
- **Possible data bias** - Emory dominance might reflect data collection
- **Low algebraic connectivity** - network lacks structural robustness

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

## Metrics Progress & TODO

### ✅ Completed Metrics (19 Total)

#### Basic Network Metrics (8)
- [x] **Degree Centrality** - Number of connections per node
- [x] **Betweenness Centrality** - Bridge/connector importance
- [x] **Closeness Centrality** - How close to all other nodes
- [x] **Clustering Coefficient** - Local clustering tendency
- [x] **Network Density** - Overall connectivity level
- [x] **Modularity** - Community structure quality
- [x] **Assortativity** - Similarity of connected nodes
- [x] **Community Detection** - Louvain algorithm

#### Additional Metrics (11)
- [x] **Eigenvector Centrality** - Influence based on connected nodes' influence
- [x] **Transitivity** - Global clustering tendency
- [x] **Average Clustering** - Mean local clustering
- [x] **Rich Club Coefficient** - High-degree node connectivity
- [x] **Harmonic Centrality** - Alternative closeness measure
- [x] **PageRank** - Google's influence algorithm
- [x] **Community Quality Metrics** - Community cohesion analysis
- [x] **Structural Holes** - Brokerage and information control
- [x] **Core-Periphery Analysis** - Network hierarchy identification
- [x] **Network Resilience Metrics** - Robustness to failures and attacks

### 📋 Remaining Metrics to Add

#### High Priority Metrics
- [ ] **Katz Centrality** - Alternative influence measure with different damping
- [ ] **Communicability Centrality** - Information flow efficiency
- [ ] **Triadic Census** - Network pattern analysis (triangles, etc.)
- [ ] **Community Overlap** - Nodes belonging to multiple communities
- [ ] **Cascading Failure Analysis** - How failures spread through network

#### Advanced Centrality Measures
- [ ] **Subgraph Centrality** - Based on closed walks of all lengths
- [ ] **Load Centrality** - Alternative betweenness considering all shortest paths
- [ ] **Current Flow Betweenness** - Electrical current analogy for information flow
- [ ] **Random Walk Betweenness** - Based on random walks rather than shortest paths
- [ ] **Communicability Betweenness** - Alternative to betweenness centrality

#### Network Motifs and Patterns
- [ ] **Network Motifs** - Recurring subgraph patterns
- [ ] **Clique Analysis** - Identification of fully connected subgroups
- [ ] **Bipartite Projections** - If we had two-mode network data
- [ ] **Hierarchical Community Detection** - Communities within communities

#### Information Flow Metrics
- [ ] **Information Centrality** - How much information flows through each node
- [ ] **Network Efficiency** - Global efficiency of information transfer
- [ ] **Local Efficiency** - Efficiency of local neighborhoods
- [ ] **Vulnerability Analysis** - Node/edge importance for connectivity

#### Temporal/Evolution Metrics (if time-series data available)
- [ ] **Network Growth Rate** - How the network has grown over time
- [ ] **Preferential Attachment** - Whether new nodes connect to high-degree nodes
- [ ] **Network Evolution** - Changes in structure over time
- [ ] **Temporal Centrality** - How centrality changes over time

#### Economic/Strategic Metrics
- [ ] **Network Value** - Economic value of network positions
- [ ] **Strategic Importance** - Business value of connections
- [ ] **Market Power** - Influence over market dynamics
- [ ] **Innovation Potential** - Based on network position

#### Advanced Robustness and Resilience
- [ ] **Network Recovery** - How quickly the network recovers from failures
- [ ] **Fragmentation Analysis** - How the network breaks apart
- [ ] **Redundancy Analysis** - Alternative pathways in the network
- [ ] **Critical Path Analysis** - Most important connection sequences

#### Network Comparison Metrics
- [ ] **Network Similarity** - Compare to other biotech networks
- [ ] **Benchmarking** - Compare against industry standards
- [ ] **Network Distance** - How different from random networks
- [ ] **Small World Properties** - Clustering vs path length analysis

### 🎯 Recommended Next Additions

#### Immediate Priority (Next 3-5 metrics)
1. **Katz Centrality** - Different perspective on influence from PageRank
2. **Triadic Census** - Fundamental network pattern analysis
3. **Community Overlap** - Nodes in multiple communities
4. **Cascading Failure Analysis** - Advanced resilience testing
5. **Subgraph Centrality** - Alternative influence measure

#### Medium Priority (Next 5-10 metrics)
1. **Communicability Centrality** - Information flow analysis
2. **Load Centrality** - Alternative betweenness measure
3. **Network Motifs** - Pattern recognition
4. **Clique Analysis** - Fully connected subgroups
5. **Information Centrality** - Information flow through nodes

### 📊 Current Analysis Status

#### Files Generated
- ✅ `ANALYSIS_RESULTS.md` - Comprehensive results report
- ✅ `biotech_network_metrics.csv` - All node and network metrics
- ✅ 11 individual visualization files (SVG format)
- ✅ All visualizations properly ordered (highest to lowest, top to bottom)
- ✅ Top 10 filtering applied to relevant plots

#### Technical Notes
- **Scripts Updated**: `scripts/analyze_network.py` - Main analysis script with all metrics
- **Visualization Standards**: All plots ordered highest to lowest, Top 10 filtering, consistent color schemes, SVG format
- **Data Quality Considerations**: Network shows signs of potential over-centralization, recommend data quality verification

### 📝 Resumption Instructions

To resume adding metrics:
1. Choose a metric from the "High Priority" or "Immediate Priority" lists
2. Add calculation method to `_calculate_[metric_name]()` in `scripts/analyze_network.py`
3. Add to `node_metrics` or `network_stats` as appropriate
4. Create visualization function `_plot_[metric_name]()` if needed
5. Update summary and results report sections
6. Run analysis and verify results
7. Update this TODO section with completion status

---

**Ready to analyze your Atlanta biotech network!** 🧬📊

*Last Updated: January 2025*  
*Total Metrics Completed: 19 (8 basic + 11 additional)*  
*Remaining Metrics: ~25-30 potential additions*
