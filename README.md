# Benjamin Siciliano - Personal Website

A modern, interactive personal website featuring an Atlanta TechBio Network visualization built with React and D3.js.

## 🌟 Features

### Interactive Network Visualization
- **Biological Network Styling**: Inspired by STRING/BioGRID protein interaction networks
- **Interactive Nodes**: Clickable organizations with detailed tooltips
- **Filtering System**: Filter by organization type (companies, universities, incubators, VCs, service providers)
- **Zoom & Pan**: Full D3.js-powered interaction
- **Force-Directed Layout**: Dynamic positioning with physics simulation

### Network Data
- **50+ Organizations**: Atlanta's biotech/healthtech ecosystem
- **200+ Connections**: Partnerships, shared talent, co-location, spinouts, investor relationships
- **Major Hubs**: Emory, Georgia Tech, Portal Innovations, ATDC prominently featured
- **Color-Coded Types**: Visual distinction between organization categories

### Site Sections
- **Hero Section**: Compelling headline with ecosystem statistics
- **Network Visualization**: Main interactive feature
- **Submission Form**: "Request to Join" functionality for new organizations
- **About Section**: Benjamin's background, achievements, and positioning
- **Contact Section**: Professional contact information and opportunities

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Visualization**: D3.js v7
- **Styling**: CSS3 with modern features (backdrop-filter, gradients)
- **Typography**: Inter font family
- **Responsive Design**: Mobile-first approach

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

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── NetworkVisualization.js    # Main D3.js network visualization
│   ├── NetworkVisualization.css   # Network-specific styles
│   ├── Hero.js                    # Hero section component
│   ├── Hero.css                   # Hero styles
│   ├── About.js                   # About section
│   ├── About.css                  # About styles
│   ├── Contact.js                 # Contact information
│   ├── Contact.css                # Contact styles
│   ├── SubmissionForm.js          # Organization submission form
│   └── SubmissionForm.css         # Form styles
├── App.js                         # Main app component
├── App.css                        # App-specific styles
├── index.js                       # React entry point
└── index.css                      # Global styles
```

## 🎨 Design Philosophy

### Visual Design
- **Scientific Aesthetic**: Clean, professional design inspired by biological networks
- **Dark Theme**: Modern dark gradient background with subtle transparency effects
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
2. Add new nodes to the `nodes` array
3. Add corresponding links to the `links` array
4. Update the organization type mapping if needed

### Styling Changes
- Global styles: `src/index.css`
- Component-specific styles: Individual `.css` files in `src/components/`
- App-wide styles: `src/App.css`

### Network Configuration
- Node colors: Modify `nodeColors` object in `NetworkVisualization.js`
- Force simulation parameters: Adjust D3.js force simulation settings
- Filter options: Update the `filters` state and filter buttons

## 📊 Network Data Structure

```javascript
const networkData = {
  nodes: [
    {
      id: "unique-id",
      name: "Organization Name",
      type: "company|university|incubator|vc|serviceProvider",
      size: 10, // Node size (6-20)
      x: 400, // Initial x position
      y: 300, // Initial y position
      description: "Organization description"
    }
  ],
  links: [
    {
      source: "source-node-id",
      target: "target-node-id",
      strength: 0.5 // Connection strength (0-1)
    }
  ]
}
```

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on git push

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### GitHub Pages
1. Add `"homepage": "https://username.github.io/repo-name"` to package.json
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add scripts to package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Run: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- **Email**: ben.siciliano@gmail.com
- **LinkedIn**: [linkedin.com/in/benjaminsiciliano](https://linkedin.com/in/benjaminsiciliano)
- **Location**: Atlanta, Georgia

## 🎯 Future Enhancements

- [ ] Neurotech subnetworks
- [ ] RTP expansion
- [ ] Automated updates from API
- [ ] Real-time collaboration features
- [ ] Advanced filtering and search
- [ ] Network analytics dashboard
- [ ] Integration with external data sources 