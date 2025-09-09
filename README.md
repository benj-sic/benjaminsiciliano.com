# Benjamin Siciliano, PhD - Personal Website

Bridging science, software, and strategy to accelerate biotech innovation.

## **Project Overview**

This is a comprehensive personal website featuring interactive network visualizations that map both the **Atlanta Biotech** and **Atlanta Tech ecosystems**. The project showcases the interconnected networks of universities, startups, VCs, research institutions, and key personnel driving innovation in Georgia.

### **Key Features**
- **Dual Ecosystem Visualizations**: Interactive D3.js-powered network graphs for both biotech and tech ecosystems
- **Biotech Network**: 117+ organizations and 206+ connections in the life sciences sector
- **Tech Network**: 50+ organizations including VCs (Mosley Ventures, Atlanta Ventures, Valor Ventures, Zane Venture Fund) and their portfolio companies
- **Explore Mode (`/explore`)**: Interactive exploration system with save/keep/hide functionality for focused network discovery
- **Multi-Page Architecture**: Main page with portfolio sections + dedicated network exploration pages
- **Social Media Integration**: Automated generation of social cards and meta images
- **Performance Optimization**: Intelligent caching system and optimal zoom calculations
- **Responsive Design**: Mobile-optimized with theme switching capabilities
- **Data-Driven**: Comprehensive datasets of Atlanta's innovation ecosystems

## **Project Architecture**

### **Core Components**
- **Main Page (`/`)**: Portfolio, about, contact sections with embedded biotech network preview
- **Biotech Network Page (`/biotech`)**: Full-screen interactive biotech ecosystem visualization
- **Tech Network Page (`/tech`)**: Full-screen interactive tech ecosystem visualization
- **Explore Mode (`/explore`)**: Interactive biotech network exploration with node management system
- **Network Visualization**: D3.js-powered force-directed graph with filtering and search
- **Theme System**: Dark/light mode with global context management

### **Data & Analytics**
- **Atlanta Biotech Dataset**: 123+ organizations with detailed metadata
- **Atlanta Tech Dataset**: 50+ organizations including VCs, startups, and innovation hubs
- **Network Analysis**: Community detection algorithms and relationship mapping
- **Performance Monitoring**: Caching strategies and optimization metrics
- **Standalone Analysis Tool**: Comprehensive Python-based network analysis with NetworkX

### **Build & Automation**
- **Social Media Generation**: Automated creation of platform-specific images
- **Git Integration**: Last commit date injection and version tracking
- **Optimal Zoom Calculation**: Automated network positioning for best viewing experience

## **Critical: Styling Architecture & Modification Guide**

**Before making ANY changes to styling or functionality, please read the comprehensive guide:**

**[STYLING_ARCHITECTURE.md](./STYLING_ARCHITECTURE.md)**

### **Quick Reference - Which Files to Edit:**

| What to Change | Edit These Files | Don't Touch These |
|----------------|------------------|-------------------|
| **Main page styling** | `src/App.css` | `NetworkOnly.css` |
| **Main page functionality** | `src/App.js` | `NetworkOnly.js` |
| **NetworkOnly pages styling** | `NetworkOnly.css` | `src/App.css` |
| **NetworkOnly pages functionality** | `NetworkOnly.js` | `src/App.js` |
| **Both pages** | `NetworkVisualization.*` | Main page files |
| **Global elements** | `ThemeToggle.*` | Page-specific files |

### **Why This Matters:**
- **Main page (`/`)** and **NetworkOnly pages (`/biotech`, `/tech`)** have completely separate styling systems
- **CSS conflicts can break functionality** on any page
- **Always scope NetworkOnly styles** with `.network-only` prefix
- **Test all pages** after any modification

---

## **Project Structure**

```
benjaminsiciliano.com/
├── src/
│   ├── App.css                    ← Main page styles ONLY
│   ├── App.js                     ← Main page layout & share popup
│   ├── atlanta_biotech_data.js    ← Complete biotech ecosystem dataset
│   ├── atlanta_tech_data.js       ← Complete tech ecosystem dataset
│   ├── components/
│   │   ├── NetworkOnly.css        ← NetworkOnly page styles ONLY
│   │   ├── NetworkOnly.js         ← NetworkOnly page component (handles both /biotech and /tech)
│   │   ├── NetworkVisualization.css ← Network visualization (both pages)
│   │   ├── NetworkVisualization.js  ← Network visualization component
│   │   ├── ThemeToggle.css        ← Global theme toggle styles
│   │   └── ThemeToggle.js         ← Global theme toggle component
│   ├── contexts/
│   │   └── ThemeContext.js        ← Global theme context
│   └── utils/                     ← Global utility functions
│       ├── cache.js               ← Caching system for network data
│       ├── louvain.js             ← Community detection algorithms
│       └── performance.js         ← Performance monitoring utilities
├── scripts/                       ← Build automation & utilities
│   ├── generate-social-card.js    ← Social media image generation
│   ├── generate-all-social-images.js ← Comprehensive social media setup
│   ├── calculate-optimal-zoom.js  ← Network positioning optimization
│   ├── inject-git-date.js        ← Git integration for versioning
│   ├── demo-community-detection.js ← Community detection examples
│   └── SOCIAL_IMAGES_GUIDE.md    ← Social media setup guide
├── network_analysis/              ← Standalone network analysis tool
│   ├── scripts/                   ← Analysis pipeline scripts
│   ├── data/                      ← Extracted and processed network data
│   ├── visualizations/            ← Generated analysis charts and plots
│   └── README.md                  ← Analysis tool documentation
├── analyze_biotech_network.py     ← Main analysis entry point
├── FINAL_ANALYSIS_REPORT.md       ← Complete analysis results summary
├── STYLING_ARCHITECTURE.md        ← COMPREHENSIVE MODIFICATION GUIDE
└── README.md                      ← This file
```

## **Getting Started**

### **Website Development**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

### **Network Analysis Tool**

1. **Install Python dependencies:**
   ```bash
   cd network_analysis
   pip install -r requirements.txt
   ```

2. **Run complete analysis:**
   ```bash
   python analyze_biotech_network.py
   ```

3. **View results:**
   - **Data:** `network_analysis/data/biotech_network_metrics.csv`
   - **Visualizations:** `network_analysis/visualizations/`
   - **Report:** `FINAL_ANALYSIS_REPORT.md`

## **Available Routes**

- **`/`** - Main page with welcome, about, contact sections + biotech network preview
- **`/biotech`** - Full-screen biotech network visualization with advanced controls
- **`/tech`** - Full-screen tech network visualization with advanced controls
- **`/explore`** - Interactive exploration mode for focused network discovery with save/keep/hide functionality

## **Styling Systems**

### **Main Page (`/`)**
- **File:** `src/App.css`
- **Features:** Sophisticated share popup with backdrop, full layout
- **Isolation:** Completely separate from NetworkOnly styling

### **NetworkOnly Pages (`/biotech` and `/tech`)**
- **File:** `src/components/NetworkOnly.css`
- **Features:** Simple share popup, full-screen controls, isolated styling
- **Isolation:** All styles scoped with `.network-only` prefix
- **Data Sources:** Dynamically loads biotech or tech data based on route

### **Shared Components**
- **Network Visualization:** `src/components/NetworkVisualization.css`
- **Theme Toggle:** `src/components/ThemeToggle.css`
- **Global Context:** `src/contexts/ThemeContext.js`

## **Development Guidelines**

1. **Always read [STYLING_ARCHITECTURE.md](./STYLING_ARCHITECTURE.md) first**
2. **Test both routes** after any modification
3. **Scope NetworkOnly styles** with `.network-only` prefix
4. **Keep shared components minimal** and well-documented
5. **Document any new dependencies** or shared functionality

## **Key Features & Capabilities**

### **Network Visualization**
- **Interactive Graph**: Force-directed layout with D3.js
- **Node Types**: Universities, startups, VCs, research institutions, key personnel
- **Filtering System**: Type-based, search-based, and relationship filtering
- **Community Detection**: Louvain algorithm for identifying ecosystem clusters
- **Performance Optimization**: Intelligent caching and optimal zoom calculations
- **Smart Search**: Search for hidden nodes with automatic visibility and popup management
- **Connection Management**: First-degree connections automatically revealed when saving nodes

### **Explore Mode (`/explore`)**
- **Interactive Node Management**: Three-state system for focused network exploration
  - **Save**: Full-color nodes that are actively selected and their connections visible
  - **Keep**: Greyed-out nodes that remain visible but not selected
  - **Hide**: Completely hidden nodes to reduce visual clutter
- **Smart Connection Visibility**: Connections only appear when both connected nodes are saved
- **First-Degree Discovery**: Saving a node automatically reveals all its connected nodes
- **Enhanced Search**: Search for hidden nodes with automatic visibility and popup management
- **Starting Node Selection**: Choose any node as your exploration starting point
- **State Persistence**: Explore state is saved and restored across sessions
- **Popup Management**: Smart positioning system ensures node popups stay on screen
- **Visual Feedback**: Clear status indicators for node states (hidden, visible, selected)

### **Social Media Integration**
- **Automated Generation**: Scripts for creating platform-specific images
- **Meta Tag Management**: Open Graph, Twitter Cards, LinkedIn optimization
- **Cache Busting**: Version control for social media previews

### **Data Management**
- **Biotech Dataset**: 123+ organizations with detailed metadata in life sciences
- **Tech Dataset**: 50+ organizations including VCs and their portfolio companies
- **Relationship Mapping**: Connections between entities with context
- **Real-time Updates**: Git integration for version tracking

### **Network Analysis Tool**
- **Comprehensive Metrics**: Degree, betweenness, closeness centrality, clustering coefficient
- **Community Detection**: Louvain algorithm for identifying ecosystem clusters
- **Network Statistics**: Density, diameter, average path length, assortativity
- **Data Export**: CSV files with all node-level metrics for further analysis
- **Visualization Generation**: Presentation-quality SVG charts and network plots
- **Standalone Operation**: Complete analysis pipeline with one command execution

## **Recent Enhancements**

### **Explore Mode Features (Latest)**
- **Interactive Node Management**: Save (full color), Keep (greyed out), or Hide nodes during exploration
- **Smart Connection Visibility**: Connections only appear when both nodes are saved
- **First-Degree Discovery**: Saving a node automatically reveals its connected nodes
- **Enhanced Search**: Search for hidden nodes with automatic visibility and popup management
- **Improved Popup Positioning**: Smart positioning system ensures popups stay on screen
- **Connection Details Reordering**: Relationship type, description, then connected organizations

### **UI/UX Improvements**
- **Responsive Popup System**: Handles window resizing and edge cases gracefully
- **Status Indicators**: Clear visual feedback for node states (hidden, visible, selected)
- **Optimized Performance**: Fixed React Hook dependencies and removed unused code
- **Enhanced Accessibility**: Better keyboard navigation and screen reader support

## **Need Help?**

- **Styling conflicts?** Check [STYLING_ARCHITECTURE.md](./STYLING_ARCHITECTURE.md)
- **Unsure which file to edit?** Use the Quick Reference table above
- **Social media issues?** Check [SOCIAL_IMAGES_GUIDE.md](./scripts/SOCIAL_IMAGES_GUIDE.md)
- **Still having issues?** Check the troubleshooting section in the architecture guide

---

**Remember:** This project has separate styling systems that must remain isolated. When in doubt, scope NetworkOnly styles with `.network-only` and test all pages! 