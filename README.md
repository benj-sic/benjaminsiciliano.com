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

## **Styling Architecture & Modification Guide**

### 🎯 **Purpose**
This guide provides clear instructions for modifying styling and functionality on different pages without causing unintended conflicts between components.

### 🏗️ **Architecture Overview**

The application has **two distinct styling systems** that must remain separate:

1. **Main Page (`/`)** - Uses `App.css` and embedded components
2. **NetworkOnly Page (`/network`, `/biotech`, `/tech`)** - Uses `NetworkOnly.css` and isolated components

### 📁 **File Structure & Responsibilities**

#### **Main Page Styling & Functionality**
```
src/App.css                    ← Main page styles ONLY
src/App.js                     ← Main page layout & share popup
src/components/ThemeToggle.css ← Global theme toggle styles
src/components/ThemeToggle.js  ← Global theme toggle component
```

**What to change here:**
- Main page layout and styling
- Main page share popup (sophisticated version with backdrop)
- Global theme toggle appearance
- Main page responsive behavior

#### **NetworkOnly Page Styling & Functionality**
```
src/components/NetworkOnly.css ← NetworkOnly page styles ONLY
src/components/NetworkOnly.js  ← NetworkOnly page layout & share popup
```

**What to change here:**
- NetworkOnly page layout and styling
- NetworkOnly page share popup (simple version)
- NetworkOnly page controls, legend, filters
- NetworkOnly page responsive behavior

#### **Shared/Global Components**
```
src/components/NetworkVisualization.css ← Network visualization styles
src/components/NetworkVisualization.js  ← Network visualization component
src/contexts/ThemeContext.js            ← Global theme context
src/utils/*.js                         ← Global utility functions
```

**What to change here:**
- Network visualization behavior (affects both pages)
- Global theme system
- Utility functions used by both pages

### 🚨 **Critical Rules - NEVER BREAK THESE**

#### **CSS Class Naming Convention**
- **Main page classes**: Use standard names (e.g., `.share-dropdown`, `.control-button`)
- **NetworkOnly classes**: MUST be prefixed with `.network-only` (e.g., `.network-only .control-button`)
- **Shared classes**: Use descriptive prefixes (e.g., `.network-visualization`, `.theme-toggle`)

#### **Component Isolation**
- **Main page components** should NOT import NetworkOnly-specific styles
- **NetworkOnly components** should NOT import main page styles
- **Shared components** should use their own CSS files

### 📝 **Modification Instructions**

#### **To Change Main Page Only:**
1. **Edit these files:**
   - `src/App.css` - Main page styling
   - `src/App.js` - Main page layout and functionality
2. **DO NOT touch:**
   - `src/components/NetworkOnly.css`
   - `src/components/NetworkOnly.js`
3. **Safe to modify:**
   - Main page share popup styling
   - Main page layout and sections
   - Main page responsive behavior

#### **To Change NetworkOnly Page Only:**
1. **Edit these files:**
   - `src/components/NetworkOnly.css` - NetworkOnly styling
   - `src/components/NetworkOnly.js` - NetworkOnly layout and functionality
2. **DO NOT touch:**
   - `src/App.css`
   - `src/App.js`
3. **Safe to modify:**
   - NetworkOnly page share popup styling
   - NetworkOnly page controls and layout
   - NetworkOnly page responsive behavior

#### **To Change Both Pages:**
1. **Edit these files:**
   - `src/components/NetworkVisualization.css` - Network visualization styles
   - `src/components/NetworkVisualization.js` - Network visualization behavior
   - `src/contexts/ThemeContext.js` - Global theme system
2. **Consider impact on both pages**
3. **Test both routes** after changes

#### **To Change Global Elements:**
1. **Edit these files:**
   - `src/components/ThemeToggle.css` - Theme toggle appearance
   - `src/components/ThemeToggle.js` - Theme toggle behavior
2. **Test on both pages** to ensure consistency

### 🔧 **Common Modification Scenarios**

#### **Scenario 1: "I want to change the share popup on the main page"**
```
✅ DO: Edit src/App.css and src/App.js
❌ DON'T: Touch src/components/NetworkOnly.css or NetworkOnly.js
```

#### **Scenario 2: "I want to change the share popup on the network page"**
```
✅ DO: Edit src/components/NetworkOnly.css and NetworkOnly.js
❌ DON'T: Touch src/App.css or App.js
```

#### **Scenario 3: "I want to change how the network visualization works"**
```
✅ DO: Edit src/components/NetworkVisualization.css and NetworkVisualization.js
⚠️  WARNING: This affects BOTH pages - test thoroughly
```

#### **Scenario 4: "I want to change the theme toggle appearance"**
```
✅ DO: Edit src/components/ThemeToggle.css
⚠️  WARNING: This affects BOTH pages - test thoroughly
```

### 🧪 **Testing Checklist**

After ANY modification, test these routes:

#### **Main Page (`/`)**
- [ ] Share popup opens and closes correctly
- [ ] Share popup styling matches expectations
- [ ] All sections display properly
- [ ] Responsive behavior works

#### **NetworkOnly Page (`/biotech`, `/tech`)**
- [ ] Share popup opens and closes correctly
- [ ] Share popup styling matches expectations
- [ ] All controls work properly
- [ ] Legend and filters function correctly
- [ ] Responsive behavior works

#### **Cross-Page Testing**
- [ ] Switching between routes works
- [ ] No CSS conflicts between pages
- [ ] Theme toggle works on both pages
- [ ] Network visualization behaves consistently

### 🚨 **Troubleshooting Common Issues**

#### **Issue: "My changes on the main page are affecting the network page"**
**Cause:** CSS class conflicts or shared component issues  
**Solution:** Ensure NetworkOnly styles are properly scoped with `.network-only` prefix

#### **Issue: "My changes on the network page are affecting the main page"**
**Cause:** CSS class conflicts or shared component issues  
**Solution:** Ensure NetworkOnly styles are properly scoped with `.network-only` prefix

#### **Issue: "Changes aren't taking effect"**
**Cause:** Browser cache or incorrect file editing  
**Solution:** Clear browser cache, restart dev server, verify correct file

#### **Issue: "Styling looks broken on one page"**
**Cause:** CSS specificity issues or missing styles  
**Solution:** Check browser dev tools, verify CSS class scoping

### 📚 **Quick Reference**

| What to Change | Edit These Files | Don't Touch These |
|----------------|------------------|-------------------|
| Main page styling | `src/App.css` | `NetworkOnly.css` |
| Main page functionality | `src/App.js` | `NetworkOnly.js` |
| NetworkOnly styling | `NetworkOnly.css` | `src/App.css` |
| NetworkOnly functionality | `NetworkOnly.js` | `src/App.js` |
| Both pages | `NetworkVisualization.*` | Main page files |
| Global elements | `ThemeToggle.*` | Page-specific files |

### **Best Practices**
1. **Always scope NetworkOnly CSS** with `.network-only` prefix
2. **Test both pages** after any modification
3. **Use descriptive class names** to avoid conflicts
4. **Keep shared components minimal** and well-documented
5. **Document any new shared dependencies**

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
│   ├── generate-powerpoint-backdrop.js ← PowerPoint backdrop generation
│   ├── calculate-optimal-zoom.js  ← Network positioning optimization
│   ├── inject-git-date.js        ← Git integration for versioning
│   ├── test-cache.js             ← Cache system testing
│   └── README.md                 ← Complete scripts documentation
├── network_analysis/              ← Standalone network analysis tool
│   ├── scripts/                   ← Analysis pipeline scripts
│   ├── data/                      ← Extracted and processed network data
│   ├── visualizations/            ← Generated analysis charts and plots
│   ├── analyze_biotech_network.py ← Main analysis entry point
│   ├── FINAL_ANALYSIS_REPORT.md   ← Complete analysis results summary
│   └── README.md                  ← Analysis tool documentation
└── README.md                      ← This file (includes styling and caching guides)
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
   - **Data:** `data/biotech_network_metrics.csv`
   - **Visualizations:** `visualizations/`
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

1. **Always review the Styling Architecture section above before making changes**
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

## **Caching System**

### **Overview**

The website includes a comprehensive caching system that significantly improves performance, user experience, and data management. This system provides intelligent caching for network data, user preferences, performance metrics, and assets.

### **Features**

#### **Multi-Layer Caching**
- **Memory Cache**: Fast in-memory storage for frequently accessed data
- **Local Storage**: Persistent storage for user preferences and session data
- **Session Storage**: Temporary storage for current session data
- **Asset Caching**: Caching for external resources and API responses

#### **Intelligent Cache Management**
- **Automatic Expiration**: Different expiry times for different data types
- **Smart Eviction**: Removes oldest items when cache is full
- **Cache Warming**: Pre-loads common data for faster initial load
- **Health Monitoring**: Tracks cache performance and provides recommendations

#### **Performance Monitoring**
- **Page Load Metrics**: Tracks total load time, DOM ready, and first paint
- **Memory Usage**: Monitors JavaScript heap usage and limits
- **User Interactions**: Tracks interaction performance and patterns
- **Network Requests**: Monitors API call performance and success rates

### **Cache Types**

| Cache Type | Purpose | Expiry | Data Stored |
|------------|---------|--------|-------------|
| **Network** | Store network visualization states | 24 hours | Filters, zoom levels, pan positions, theme |
| **User Preferences** | Store user settings | 30 days | Theme, visit count, last visit time |
| **Search Results** | Cache search queries | 10 minutes | Search queries and filtered results |
| **Performance Metrics** | Store performance data | 1 hour | Load times, memory usage, interaction metrics |
| **Theme Data** | Cache theme-specific data | 24 hours | Theme configurations and assets |
| **Assets** | Cache external resources | 7 days | Images, API responses, external data |

### **Usage**

#### **Basic Caching**
```javascript
import cacheManager from './utils/cache.js';

// Cache data
cacheManager.set('network', 'current-state', {
  filters: { companies: true, universities: true },
  zoom: 1.5,
  pan: { x: 100, y: 200 }
});

// Retrieve cached data
const state = cacheManager.get('network', 'current-state');
```

#### **Performance Monitoring**
```javascript
import performanceMonitor from './utils/performance.js';

// Start monitoring
performanceMonitor.start();

// Track user interactions
performanceMonitor.trackUserInteraction('zoom-in', 45);

// Track network requests
performanceMonitor.trackNetworkInteraction('api-call', 1200, true);
```

### **Testing**

Run the cache testing script to verify the system:

```bash
npm run test-cache
```

This will test:
- Basic caching and retrieval
- Network state caching
- Search results caching
- Cache warming
- Cache statistics
- Performance metrics
- Cache expiration
- Cache clearing

### **API Reference**

#### **CacheManager Methods**
```javascript
// Basic operations
cacheManager.set(type, identifier, data, expiry)
cacheManager.get(type, identifier)
cacheManager.delete(type, identifier)
cacheManager.clear()

// Network-specific
cacheManager.cacheNetworkState(filters, zoom, pan, theme)
cacheManager.getNetworkState(filters, zoom, pan, theme)

// User preferences
cacheManager.cacheUserPrefs(preferences)
cacheManager.getUserPrefs()

// Search results
cacheManager.cacheSearchResults(query, results)
cacheManager.getSearchResults(query)

// Performance metrics
cacheManager.cachePerformanceMetrics(metrics)
cacheManager.getPerformanceMetrics()

// Utilities
cacheManager.warmCache()
cacheManager.getStats()
cacheManager.healthCheck()
```

#### **PerformanceMonitor Methods**
```javascript
// Monitoring
performanceMonitor.start()
performanceMonitor.trackUserInteraction(action, duration)
performanceMonitor.trackNetworkInteraction(action, duration, success)

// Analysis
performanceMonitor.getStats()
performanceMonitor.getRecommendations()
performanceMonitor.exportData()

// Utilities
performanceMonitor.measureExecution(func, name)
performanceMonitor.clear()
```

### **Best Practices**

#### **Cache Strategy**
1. **Cache Frequently Accessed Data**: Network states, user preferences
2. **Use Appropriate Expiry Times**: Short for dynamic data, long for static data
3. **Implement Cache Warming**: Pre-load common data
4. **Monitor Cache Performance**: Track hit rates and memory usage

#### **Performance Optimization**
1. **Measure Everything**: Track all user interactions
2. **Set Performance Budgets**: Define acceptable load times
3. **Optimize Critical Path**: Focus on above-the-fold content
4. **Use Progressive Enhancement**: Ensure basic functionality without cache

### **Troubleshooting**

#### **Common Issues**

1. **Cache Not Working**
   - Check browser localStorage support
   - Verify cache permissions
   - Clear browser cache

2. **Performance Issues**
   - Monitor memory usage
   - Check cache size limits
   - Review cache expiration settings

3. **Data Stale**
   - Adjust cache expiry times
   - Implement cache invalidation
   - Use cache warming

## **Need Help?**

- **Styling conflicts?** Check the Styling Architecture section above
- **Unsure which file to edit?** Use the Quick Reference table in the Styling Architecture section
- **Caching issues?** Review the Caching System section above
- **Social media issues?** Check [scripts/README.md](./scripts/README.md)
- **Still having issues?** Check the troubleshooting sections above

---

**Remember:** This project has separate styling systems that must remain isolated. When in doubt, scope NetworkOnly styles with `.network-only` and test all pages! 