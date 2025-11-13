const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// PowerPoint backdrop dimensions (16:9 aspect ratio for presentations)
const POWERPOINT_WIDTH = 1920;
const POWERPOINT_HEIGHT = 1080;

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function generatePowerPointBackdrop() {
  console.log('🚀 Starting PowerPoint backdrop generation...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to PowerPoint dimensions
    await page.setViewport({
      width: POWERPOINT_WIDTH,
      height: POWERPOINT_HEIGHT
    });

    // Create HTML content optimized for PowerPoint backdrop
    const htmlContent = createPowerPointBackdropHTML();

    // Write the HTML to a temporary file
    const tempHtmlPath = path.join(__dirname, 'temp-powerpoint-backdrop.html');
    fs.writeFileSync(tempHtmlPath, htmlContent);

    // Navigate to the HTML file
    await page.goto(`file://${tempHtmlPath}`);

    // Wait for the network to render and settle
    console.log('⏳ Waiting for network to render...');
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Take screenshot
    console.log('📸 Taking screenshot...');
    const screenshotPath = path.join(publicDir, 'powerpoint-backdrop.png');
    
    await page.screenshot({
      path: screenshotPath,
      width: POWERPOINT_WIDTH,
      height: POWERPOINT_HEIGHT,
      type: 'png'
    });

    console.log(`✅ PowerPoint backdrop generated successfully!`);
    console.log(`📁 Saved to: ${screenshotPath}`);
    console.log(`📏 Dimensions: ${POWERPOINT_WIDTH}x${POWERPOINT_HEIGHT}px`);

    // Clean up temporary file
    fs.unlinkSync(tempHtmlPath);

  } catch (error) {
    console.error('❌ Error generating PowerPoint backdrop:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

function createPowerPointBackdropHTML() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atlanta Biotech Network - PowerPoint Backdrop</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            font-family: system-ui, -apple-system, sans-serif;
            overflow: hidden;
        }
        
        #backdrop-container {
            width: ${POWERPOINT_WIDTH}px;
            height: ${POWERPOINT_HEIGHT}px;
            position: relative;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        
        #network-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.6;
        }
        
        #network-svg {
            width: 100%;
            height: 100%;
        }
        
        /* Subtle overlay for better text readability */
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                to bottom,
                rgba(248, 249, 250, 0.3) 0%,
                rgba(248, 249, 250, 0.1) 30%,
                rgba(248, 249, 250, 0.05) 70%,
                rgba(248, 249, 250, 0.2) 100%
            );
            pointer-events: none;
        }
    </style>
</head>
<body>
    <div id="backdrop-container">
        <div id="network-container">
            <svg id="network-svg"></svg>
        </div>
        <div class="overlay"></div>
    </div>

    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script>
        // Network data (embedded directly for backdrop generation)
        const networkData = ${JSON.stringify(require('../src/atlanta_biotech_data.js').atlantaBiotechEcosystem)};
        
        // Muted color scheme for PowerPoint backdrop (less vibrant, more professional)
        const nodeColors = {
            'university': '#6c757d',      // Muted gray-blue
            'company': '#28a745',         // Muted green
            'vc': '#ffc107',              // Muted gold
            'incubator': '#dc3545',       // Muted red
            'government': '#6f42c1',      // Muted purple
            'serviceProvider': '#6c757d', // Muted gray
            'startup': '#17a2b8',         // Muted teal
            'health_system': '#20c997',   // Muted mint
            'facility': '#fd7e14',        // Muted orange
            'trade': '#e83e8c',           // Muted pink
            'development': '#20c997',     // Muted teal
            'public_company': '#28a745',  // Muted green
            'accelerator': '#dc3545'      // Muted red
        };
        
        // Subtle link styling for backdrop
        const getLinkStyle = (linkType) => {
            const styles = {
                'spinout': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: 'none', opacity: 0.3 },
                'investment': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: '8,4', opacity: 0.25 },
                'collaboration': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: 'none', opacity: 0.2 },
                'research_collaboration': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: 'none', opacity: 0.2 },
                'partnership': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: '2,2', opacity: 0.2 },
                'service': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: '3,3', opacity: 0.25 },
                'support': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: '8,4', opacity: 0.2 },
                'affiliation': { stroke: '#6c757d', strokeWidth: 1.5, strokeDasharray: 'none', opacity: 0.15 },
                'pilot': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: '4,4', opacity: 0.25 },
                'funding': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: '6,3', opacity: 0.25 },
                'membership': { stroke: '#6c757d', strokeWidth: 1.5, strokeDasharray: '2,2', opacity: 0.15 },
                'development': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: 'none', opacity: 0.2 },
                'technology': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: '3,3', opacity: 0.25 },
                'industry': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: 'none', opacity: 0.2 },
                'tenant': { stroke: '#6c757d', strokeWidth: 1.5, strokeDasharray: 'none', opacity: 0.15 },
                'origin': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: '8,4', opacity: 0.25 },
                'founding_support': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: '4,4', opacity: 0.25 },
                'education_program': { stroke: '#6c757d', strokeWidth: 2, strokeDasharray: '6,3', opacity: 0.25 }
            };
            return styles[linkType] || { stroke: '#6c757d', strokeWidth: 1.5, strokeDasharray: 'none', opacity: 0.1 };
        };
        
        // Initialize the visualization
        function initNetwork() {
            const svg = d3.select('#network-svg');
            const width = ${POWERPOINT_WIDTH};
            const height = ${POWERPOINT_HEIGHT};
            
            // Clear any existing content
            svg.selectAll("*").remove();
            
            // Create a group for the network
            const networkGroup = svg.append("g").attr("class", "network-group");
            
            // Filter to show all nodes
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
            
            // Create force simulation with adjusted parameters for backdrop
            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(processedLinks).id(d => d.id).distance(300))
                .force("charge", d3.forceManyBody().strength(-300))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force("collision", d3.forceCollide().radius(d => Math.max(d.size * 4, 15) + 60));
            
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
            
            // Create nodes (larger and more subtle for backdrop)
            const nodeElements = networkGroup.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("r", d => Math.max(d.size * 4, 15))
                .attr("fill", d => nodeColors[d.type] || '#6c757d')
                .style("filter", "drop-shadow(0 0 4px rgba(0,0,0,0.1))")
                .attr("opacity", 0.7);
            
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
                    const padding = 200;
                    const scaleX = (width - padding * 2) / networkWidth;
                    const scaleY = (height - padding * 2) / networkHeight;
                    const scale = Math.min(scaleX, scaleY, 0.6);
                    
                    // Apply transform to center the network
                    const transform = d3.zoomIdentity
                        .translate(width / 2 - networkCenterX * scale, height / 2 - networkCenterY * scale)
                        .scale(scale);
                    
                    networkGroup.attr("transform", transform);
                }, 1500);
            });
        }
        
        // Initialize when page loads
        window.addEventListener('load', () => {
            setTimeout(initNetwork, 100);
        });
    </script>
</body>
</html>`;
}

// Run the script
generatePowerPointBackdrop().catch(console.error);
