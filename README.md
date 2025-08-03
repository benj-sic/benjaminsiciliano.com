# Benjamin Siciliano - Personal Website

A modern, interactive personal website featuring an Atlanta Biotech Network visualization built with React and D3.js. This project showcases Benjamin's expertise in computational biology and biotech innovation through an engaging, data-driven interface.

## 🌟 Features

### Interactive Network Visualization
- **Biological Network Styling**: Inspired by STRING/BioGRID protein interaction networks
- **Interactive Nodes**: Clickable organizations with detailed information panels
- **Smart Highlighting**: Click a node to highlight it and dim non-connected nodes
- **Toggle Selection**: Click the same node again to deselect it
- **Advanced Filtering**: Filter by organization type (companies, startups, universities, incubators, VCs, service providers)
- **Zoom & Pan**: Natural zoom range from 10% to 100% with smooth transitions
- **Auto-Centering**: Network automatically re-centers on filter changes
- **Force-Directed Layout**: Dynamic positioning with physics simulation
- **Mobile Optimized**: Touch-friendly interactions on mobile devices

### Network Data
- **116 Organizations**: Comprehensive metro Atlanta biotech ecosystem focused on innovation-generating entities
- **190 Connections**: Partnerships, shared talent, co-location, spinouts, investor relationships
- **Organization Types**: 6 universities, 7 health systems, 39 startups, 16 companies, 6 VCs, 7 incubators, 16 service providers, 3 government agencies, 6 community organizations
- **Connection Types**: 40 collaborations, 28 spinouts, 18 investments, 16 services, 13 support relationships, 9 infrastructure links
- **Major Hubs**: Emory, Georgia Tech, Portal Innovations, ATDC prominently featured
- **Dual Filtering**: Separate filters for startups vs established companies
- **Color-Coded Types**: Visual distinction between organization categories
- **Rich Metadata**: Detailed descriptions, websites, key personnel, and recent news
- **LinkedIn Integration**: Direct links to key personnel profiles where available
- **EBCC Integration**: Emory Biotech Consulting Club connections to supported startups

### Site Features
- **Dark/Light Theme Toggle**: Seamless theme switching with persistent preferences
- **Social Sharing**: Built-in sharing functionality for Twitter and LinkedIn
- **Contact Form**: Professional contact form with Formspree integration
- **Responsive Design**: Mobile-first approach with touch-optimized interactions
- **SEO Optimized**: Meta tags, social cards, and structured data

## 🛠️ Tech Stack

- **Frontend**: React 18 with modern hooks
- **Visualization**: D3.js v7 for network graphics
- **Styling**: CSS3 with modern features (backdrop-filter, gradients, CSS Grid)
- **Typography**: Inter font family
- **Build Tools**: Create React App with custom build scripts
- **Deployment**: Netlify with automated builds
- **Form Handling**: Formspree for contact form processing
- **Social Media**: Custom social card generation with Puppeteer

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/benjaminsiciliano/benjaminsiciliano.com.git
cd benjaminsiciliano.com
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production (includes git date injection)
npm test           # Run tests
npm run eject      # Eject from Create React App
npm run generate-social-card      # Generate social media cards
npm run generate-all-social-images # Generate all social images
npm run inject-git-date          # Inject last commit date into build
```

## 📁 Project Structure

```
benjaminsiciliano.com/
├── public/                    # Static assets
│   ├── index.html            # Main HTML file
│   ├── favicon.svg           # Site favicon
│   ├── BS_headshot.jpeg      # Profile image
│   └── social-cards/         # Generated social media images
├── src/
│   ├── components/           # React components
│   │   ├── NetworkVisualization.js    # Main D3.js network
│   │   ├── NetworkVisualization.css   # Network styles
│   │   ├── ThemeToggle.js             # Theme switcher
│   │   └── ThemeToggle.css            # Theme styles
│   ├── contexts/
│   │   └── ThemeContext.js            # Theme context provider
│   ├── App.js                         # Main app component
│   ├── App.css                        # App styles
│   ├── index.js                       # React entry point
│   └── index.css                      # Global styles
├── scripts/                  # Build and utility scripts
│   ├── generate-social-card.js        # Social card generator
│   ├── generate-all-social-images.js  # Batch social image generator
│   ├── inject-git-date.js            # Git date injection
│   └── README.md                     # Scripts documentation
├── netlify.toml             # Netlify deployment config
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🎨 Design Philosophy

### Visual Design
- **Scientific Aesthetic**: Clean, professional design inspired by biological networks
- **Dark/Light Themes**: Modern theme switching with smooth transitions
- **Biological Network Styling**: Nodes and edges styled like protein interaction networks
- **Mobile Responsive**: Fully responsive design that works on all devices

### User Experience
- **Intuitive Navigation**: Clear navigation between sections
- **Interactive Elements**: Hover effects, smooth transitions, and engaging animations
- **Professional Tone**: Approachable yet professional communication style
- **Accessibility**: High contrast, readable typography, and keyboard navigation

## 🔧 Customization

### Adding New Organizations
To add new organizations to the network:

1. Edit the `networkData` object in `src/components/NetworkVisualization.js`
2. Add new nodes to the `nodes` array with required fields:
   ```javascript
   {
     id: "unique-id",
     name: "Organization Name",
     type: "company|university|incubator|vc|serviceProvider",
     size: 10, // Node size (6-20)
     description: "Organization description"
   }
   ```
3. Add corresponding links to the `links` array:
   ```javascript
   {
     source: "source-node-id",
     target: "target-node-id",
     type: "collaboration|investment|spinout|partnership"
   }
   ```

### Styling Changes
- **Global styles**: `src/index.css`
- **Component-specific styles**: Individual `.css` files in `src/components/`
- **App-wide styles**: `src/App.css`
- **Theme variables**: Defined in `src/contexts/ThemeContext.js`

### Network Configuration
- **Node colors**: Modify `nodeColors` object in `NetworkVisualization.js`
- **Force simulation parameters**: Adjust D3.js force simulation settings
- **Filter options**: Update the `filters` state and filter buttons

## 📊 Network Data Structure

The network visualization uses a graph structure with nodes (organizations) and links (relationships):

```javascript
const networkData = {
  nodes: [
    {
      id: "unique-id",
      name: "Organization Name",
      type: "company|university|incubator|vc|serviceProvider",
      size: 10, // Node size (6-20)
      x: 400, // Initial x position (optional)
      y: 300, // Initial y position (optional)
      description: "Organization description",
      website: "https://example.com",
      keyPersonnel: ["Person 1", "Person 2"],
      linkedInProfiles: ["https://linkedin.com/in/person1"]
    }
  ],
  links: [
    {
      source: "source-node-id",
      target: "target-node-id",
      type: "collaboration|investment|spinout|partnership",
      description: "Relationship description"
    }
  ]
}
```

## 🚀 Deployment

### Netlify (Current Setup)
The site is deployed on Netlify with automatic builds:

1. **Build Command**: `npm run build`
2. **Publish Directory**: `build`
3. **Environment**: Production with optimized assets
4. **Custom Domain**: benjaminsiciliano.com

### Build Process
The build process includes:
- React app compilation
- Git date injection for freshness indicators
- Social card generation
- Asset optimization

### Alternative Deployment Options

#### Vercel
```bash
npm i -g vercel
vercel
```

#### GitHub Pages
1. Add `"homepage": "https://username.github.io/repo-name"` to package.json
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add scripts to package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Run: `npm run deploy`

## 🛠️ Development Tools

### Social Media Cards
The project includes automated social media card generation:

```bash
npm run generate-social-card      # Generate single social card
npm run generate-all-social-images # Generate all social images
```

### Git Integration
- **Date Injection**: Automatically injects last commit date into builds
- **Version Tracking**: Builds include git metadata for freshness indicators

### Performance Optimization
- **Code Splitting**: React.lazy for component loading
- **Asset Optimization**: Compressed images and optimized bundles
- **Caching**: Proper cache headers for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit changes: `git commit -am 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

### Development Guidelines
- Follow React best practices and hooks patterns
- Maintain responsive design principles
- Test on multiple devices and browsers
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- **Email**: ben.siciliano@gmail.com
- **LinkedIn**: [linkedin.com/in/benjaminsiciliano](https://linkedin.com/in/benjaminsiciliano)
- **GitHub**: [github.com/benj-sic](https://github.com/benj-sic)
- **Twitter**: [@benjsiciliano](https://x.com/benjsiciliano)
- **Location**: Atlanta, Georgia

## 🎯 Recent Updates

### v1.4.0 - Network Optimization & EBCC Integration
- ✅ **Network Streamlining**: Removed peripheral organizations to focus on core metro Atlanta biotech ecosystem
- ✅ **EBCC Integration**: Added Emory Biotech Consulting Club connections to supported startups
- ✅ **VC Focus**: Streamlined to biotech-focused venture capital firms
- ✅ **Academic Consolidation**: Focused on metro Atlanta academic institutions
- ✅ **Service Provider Optimization**: Curated service providers to biotech-relevant organizations

### v1.3.0 - Enhanced Social Features & Performance
- ✅ **Social Sharing Integration**: Built-in Twitter and LinkedIn sharing
- ✅ **Theme Toggle**: Dark/light theme switching with persistent preferences
- ✅ **Performance Optimization**: Improved loading times and mobile responsiveness
- ✅ **Contact Form Enhancement**: Better error handling and user feedback
- ✅ **SEO Improvements**: Enhanced meta tags and social cards

### v1.2.0 - Enhanced Filtering & Network Scope
- ✅ **Dual Organization Filtering**: Separate filters for startups vs established companies
- ✅ **Network Scope Optimization**: Curated to focus on innovation-generating entities
- ✅ **Updated Node Descriptions**: Clarified affiliations and relationships
- ✅ **Enhanced Legend**: Updated to distinguish between startups and companies

### v1.1.0 - Enhanced Network Interaction
- ✅ **Smart Node Highlighting**: Click a node to highlight it and dim non-connected nodes
- ✅ **Toggle Selection**: Click the same node again to deselect it
- ✅ **Natural Zoom Range**: Reduced max zoom from 250% to 100% for more realistic interaction
- ✅ **Auto-Centering**: Network automatically re-centers before reappearing on filter changes
- ✅ **LinkedIn Integration**: Direct links to key personnel profiles
- ✅ **Mobile Optimization**: Enhanced touch interactions and performance on mobile devices

## 🎯 Future Enhancements

### **Data & Analytics**
- [ ] **Network Analytics Dashboard**: Centrality metrics, clustering analysis, and ecosystem health indicators
- [ ] **Temporal Network Views**: Historical evolution of the ecosystem (2019-2024)
- [ ] **Funding Flow Visualization**: Investment rounds, funding amounts, and capital flow patterns
- [ ] **Talent Movement Tracking**: Alumni networks and personnel transitions between organizations
- [ ] **Geographic Clustering**: Map-based view showing spatial distribution of organizations

### **User Experience**
- [ ] **Advanced Search & Filtering**: Multi-criteria search (funding stage, technology area, location)
- [ ] **Interactive Tutorials**: Guided tours explaining ecosystem dynamics and key relationships
- [ ] **Export Functionality**: High-resolution PNG/PDF exports for presentations and reports
- [ ] **Mobile App**: Native mobile application for ecosystem exploration
- [ ] **Personalized Dashboards**: User-customizable views and saved searches

### **Data Integration**
- [ ] **Real-time Updates**: API integration with Crunchbase, PitchBook, and LinkedIn for live data
- [ ] **Clinical Trial Integration**: Connect with ClinicalTrials.gov for therapeutic pipeline visibility
- [ ] **Patent Database**: USPTO integration to show intellectual property relationships
- [ ] **Publication Network**: PubMed integration to visualize research collaboration networks
- [ ] **Regulatory Tracking**: FDA approval status and regulatory pathway visualization

### **Advanced Features**
- [ ] **Predictive Analytics**: Machine learning models to identify emerging trends and opportunities
- [ ] **Collaboration Recommendations**: AI-powered suggestions for potential partnerships
- [ ] **Ecosystem Health Metrics**: Automated scoring of ecosystem maturity and growth indicators
- [ ] **Comparative Analysis**: Side-by-side comparison with other biotech hubs (Boston, San Diego)
- [ ] **Interactive Storytelling**: Narrative-driven exploration of ecosystem success stories

### **Technical Infrastructure**
- [ ] **RESTful API**: Public API for third-party integrations and data access
- [ ] **GraphQL Endpoints**: Flexible data querying for advanced use cases
- [ ] **Real-time Collaboration**: Multi-user editing and annotation capabilities
- [ ] **WebSocket Integration**: Live updates and notifications for ecosystem changes
- [ ] **Advanced Caching**: Intelligent caching for improved performance with large datasets 