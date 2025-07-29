const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Social card dimensions for optimal sharing
const SOCIAL_CARD_WIDTH = 1200;
const SOCIAL_CARD_HEIGHT = 630;

// Create scripts directory if it doesn't exist
const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

async function generateSocialCard() {
  console.log('🚀 Starting social card generation...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to social card dimensions
    await page.setViewport({
      width: SOCIAL_CARD_WIDTH,
      height: SOCIAL_CARD_HEIGHT
    });

    // Create a minimal HTML page that renders just the network without labels
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atlanta TechBio Network</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: transparent;
            font-family: system-ui, -apple-system, sans-serif;
            overflow: hidden;
        }
        
        #network-container {
            width: ${SOCIAL_CARD_WIDTH}px;
            height: ${SOCIAL_CARD_HEIGHT}px;
            position: relative;
            background: transparent;
        }
        
        #network-svg {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div id="network-container">
        <svg id="network-svg"></svg>
    </div>

    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script>
        // Network data (embedded directly for social card generation)
        const networkData = ${JSON.stringify(require('../src/atlanta_techbio_data.js').atlantaTechBioEcosystem)};
        
        // Color scheme for nodes (ensuring all are visible and none are white)
        const nodeColors = {
            'university': '#4A90E2',      // Blue
            'company': '#4CAF50',         // Green
            'vc': '#FFD54F',              // Gold
            'incubator': '#E57373',       // Red
            'government': '#BA68C8',      // Purple
            'serviceProvider': '#9E9E9E', // Gray
            'startup': '#81D4FA',         // Light Blue
            'health_system': '#A5D6A7',   // Light Green
            'facility': '#FFB74D',        // Orange
            'trade': '#F06292',           // Pink
            'development': '#4DB6AC',     // Teal
            'public_company': '#4CAF50',  // Green (same as company)
            'accelerator': '#E57373'      // Red (same as incubator)
        };
        
        // Link styling
        const getLinkStyle = (linkType) => {
            const styles = {
                'spinout': { stroke: '#ff6b6b', strokeWidth: 4, strokeDasharray: 'none', opacity: 0.8 },
                'investment': { stroke: '#4ecdc4', strokeWidth: 4, strokeDasharray: '8,4', opacity: 0.7 },
                'collaboration': { stroke: '#45b7d1', strokeWidth: 4, strokeDasharray: 'none', opacity: 0.6 },
                'research_collaboration': { stroke: '#45b7d1', strokeWidth: 4, strokeDasharray: 'none', opacity: 0.6 },
                'partnership': { stroke: '#96ceb4', strokeWidth: 4, strokeDasharray: '2,2', opacity: 0.6 },
                'service': { stroke: '#ff8c42', strokeWidth: 4, strokeDasharray: '3,3', opacity: 0.7 },
                'support': { stroke: '#dda0dd', strokeWidth: 4, strokeDasharray: '8,4', opacity: 0.6 },
                'affiliation': { stroke: '#a8e6cf', strokeWidth: 3, strokeDasharray: 'none', opacity: 0.5 },
                'pilot': { stroke: '#ffd93d', strokeWidth: 4, strokeDasharray: '4,4', opacity: 0.7 },
                'funding': { stroke: '#6c5ce7', strokeWidth: 4, strokeDasharray: '6,3', opacity: 0.7 },
                'membership': { stroke: '#fd79a8', strokeWidth: 3, strokeDasharray: '2,2', opacity: 0.5 },
                'development': { stroke: '#00b894', strokeWidth: 4, strokeDasharray: 'none', opacity: 0.6 },
                'technology': { stroke: '#fdcb6e', strokeWidth: 4, strokeDasharray: '3,3', opacity: 0.7 },
                'industry': { stroke: '#e17055', strokeWidth: 4, strokeDasharray: 'none', opacity: 0.6 },
                'tenant': { stroke: '#74b9ff', strokeWidth: 3, strokeDasharray: 'none', opacity: 0.5 },
                'origin': { stroke: '#a29bfe', strokeWidth: 4, strokeDasharray: '8,4', opacity: 0.7 },
                'founding_support': { stroke: '#fd79a8', strokeWidth: 4, strokeDasharray: '4,4', opacity: 0.7 },
                'education_program': { stroke: '#9b59b6', strokeWidth: 4, strokeDasharray: '6,3', opacity: 0.7 }
            };
            return styles[linkType] || { stroke: '#a0a0a0', strokeWidth: 4, strokeDasharray: 'none', opacity: 0.4 };
        };
        
        // Initialize the visualization
        function initNetwork() {
            const svg = d3.select('#network-svg');
            const width = ${SOCIAL_CARD_WIDTH};
            const height = ${SOCIAL_CARD_HEIGHT};
            
            // Clear any existing content
            svg.selectAll("*").remove();
            
            // Create a group for the network
            const networkGroup = svg.append("g").attr("class", "network-group");
            
            // Filter to show all nodes (no filtering for social card)
            const nodes = networkData.nodes;
            const links = networkData.links;
            
            // Process links to ensure they reference valid nodes
            const processedLinks = links.map(link => {
                const sourceNode = nodes.find(n => n.id === link.source);
                const targetNode = nodes.find(n => n.id === link.target);
                return {
                    ...link,
                    source: sourceNode,
                    target: targetNode
                };
            }).filter(link => link.source && link.target);
            
            // Create force simulation
            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(processedLinks).id(d => d.id).distance(200))
                .force("charge", d3.forceManyBody().strength(-400))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force("collision", d3.forceCollide().radius(d => Math.max(d.size * 3, 12) + 40));
            
            // Create links
            const linkElements = networkGroup.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(processedLinks)
                .enter().append("line")
                .attr("stroke", d => getLinkStyle(d.type).stroke)
                .attr("stroke-width", d => getLinkStyle(d.type).strokeWidth)
                .attr("stroke-dasharray", d => getLinkStyle(d.type).strokeDasharray)
                .attr("opacity", d => getLinkStyle(d.type).opacity)
                .style("pointer-events", "none");
            
            // Create nodes (no labels for social card)
            const nodeElements = networkGroup.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("r", d => Math.max(d.size * 3, 12))
                .attr("fill", d => nodeColors[d.type] || '#FF6B6B') // Fallback to red if type not found
                .style("filter", "drop-shadow(0 0 8px rgba(255,255,255,0.3))");
            
            // Update positions on simulation tick
            simulation.on("tick", () => {
                linkElements
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);
                
                nodeElements
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);
            });
            
            // Auto-center after simulation settles
            simulation.on("end", () => {
                setTimeout(() => {
                    // Calculate network bounds
                    const xCoords = nodes.map(n => n.x);
                    const yCoords = nodes.map(n => n.y);
                    const minX = Math.min(...xCoords);
                    const maxX = Math.max(...xCoords);
                    const minY = Math.min(...yCoords);
                    const maxY = Math.max(...yCoords);
                    
                    // Calculate center and scale
                    const networkCenterX = (minX + maxX) / 2;
                    const networkCenterY = (minY + maxY) / 2;
                    const networkWidth = maxX - minX;
                    const networkHeight = maxY - minY;
                    const padding = 100;
                    const scaleX = (width - padding * 2) / networkWidth;
                    const scaleY = (height - padding * 2) / networkHeight;
                    const scale = Math.min(scaleX, scaleY, 0.8);
                    
                    // Apply transform to center the network
                    const transform = d3.zoomIdentity
                        .translate(width / 2 - networkCenterX * scale, height / 2 - networkCenterY * scale)
                        .scale(scale);
                    
                    networkGroup.attr("transform", transform);
                }, 1000);
            });
        }
        
        // Initialize when page loads
        window.addEventListener('load', () => {
            setTimeout(initNetwork, 100);
        });
    </script>
</body>
</html>`;

    // Write the HTML to a temporary file
    const tempHtmlPath = path.join(__dirname, 'temp-social-card.html');
    fs.writeFileSync(tempHtmlPath, htmlContent);

    // Navigate to the HTML file
    await page.goto(`file://${tempHtmlPath}`);

    // Wait for the network to render and settle
    console.log('⏳ Waiting for network to render...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Take screenshot
    console.log('📸 Taking screenshot...');
    const screenshotPath = path.join(__dirname, '..', 'public', 'social-card.png');
    
    // Ensure public directory exists
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    await page.screenshot({
      path: screenshotPath,
      width: SOCIAL_CARD_WIDTH,
      height: SOCIAL_CARD_HEIGHT,
      type: 'png'
    });

    console.log(`✅ Social card generated successfully!`);
    console.log(`📁 Saved to: ${screenshotPath}`);
    console.log(`📏 Dimensions: ${SOCIAL_CARD_WIDTH}x${SOCIAL_CARD_HEIGHT}px`);

    // Clean up temporary file
    fs.unlinkSync(tempHtmlPath);

  } catch (error) {
    console.error('❌ Error generating social card:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the script
generateSocialCard().catch(console.error); 