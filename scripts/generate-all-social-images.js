const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Image dimensions for different platforms
const IMAGE_SIZES = {
  socialCard: { width: 1200, height: 630 },      // Facebook, LinkedIn, general
  twitterCard: { width: 1200, height: 600 },     // Twitter (slightly different ratio)
  instagramStory: { width: 1080, height: 1920 }, // Instagram Stories
  pinterest: { width: 1000, height: 1500 },      // Pinterest
  whatsapp: { width: 300, height: 200 },         // WhatsApp, Telegram
  headshotCard: { width: 1200, height: 630 }     // Headshot-focused version
};

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function generateAllImages() {
  console.log('🚀 Starting comprehensive social image generation...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Generate each type of image
    await generateSocialCard(browser);
    await generateTwitterCard(browser);
    await generateInstagramStory(browser);
    await generatePinterestCard(browser);
    await generateWhatsAppCard(browser);
    await generateHeadshotCard(browser);
    
    console.log('✅ All social images generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating images:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function generateSocialCard(browser) {
  console.log('📸 Generating social card (1200x630)...');
  const { width, height } = IMAGE_SIZES.socialCard;
  
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  
  const htmlContent = createNetworkHTML(width, height, false);
  const tempHtmlPath = path.join(__dirname, 'temp-social-card.html');
  fs.writeFileSync(tempHtmlPath, htmlContent);
  
  await page.goto(`file://${tempHtmlPath}`);
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const screenshotPath = path.join(publicDir, 'social-card.png');
  await page.screenshot({
    path: screenshotPath,
    width,
    height,
    type: 'png'
  });
  
  fs.unlinkSync(tempHtmlPath);
  console.log(`✅ Social card saved: ${screenshotPath}`);
}

async function generateTwitterCard(browser) {
  console.log('📸 Generating Twitter card (1200x600)...');
  const { width, height } = IMAGE_SIZES.twitterCard;
  
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  
  const htmlContent = createNetworkHTML(width, height, false);
  const tempHtmlPath = path.join(__dirname, 'temp-twitter-card.html');
  fs.writeFileSync(tempHtmlPath, htmlContent);
  
  await page.goto(`file://${tempHtmlPath}`);
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const screenshotPath = path.join(publicDir, 'twitter-card.png');
  await page.screenshot({
    path: screenshotPath,
    width,
    height,
    type: 'png'
  });
  
  fs.unlinkSync(tempHtmlPath);
  console.log(`✅ Twitter card saved: ${screenshotPath}`);
}

async function generateInstagramStory(browser) {
  console.log('📸 Generating Instagram Story (1080x1920)...');
  const { width, height } = IMAGE_SIZES.instagramStory;
  
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  
  const htmlContent = createNetworkHTML(width, height, false);
  const tempHtmlPath = path.join(__dirname, 'temp-instagram-story.html');
  fs.writeFileSync(tempHtmlPath, htmlContent);
  
  await page.goto(`file://${tempHtmlPath}`);
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const screenshotPath = path.join(publicDir, 'instagram-story.png');
  await page.screenshot({
    path: screenshotPath,
    width,
    height,
    type: 'png'
  });
  
  fs.unlinkSync(tempHtmlPath);
  console.log(`✅ Instagram Story saved: ${screenshotPath}`);
}

async function generatePinterestCard(browser) {
  console.log('📸 Generating Pinterest card (1000x1500)...');
  const { width, height } = IMAGE_SIZES.pinterest;
  
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  
  const htmlContent = createNetworkHTML(width, height, false);
  const tempHtmlPath = path.join(__dirname, 'temp-pinterest.html');
  fs.writeFileSync(tempHtmlPath, htmlContent);
  
  await page.goto(`file://${tempHtmlPath}`);
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const screenshotPath = path.join(publicDir, 'pinterest-card.png');
  await page.screenshot({
    path: screenshotPath,
    width,
    height,
    type: 'png'
  });
  
  fs.unlinkSync(tempHtmlPath);
  console.log(`✅ Pinterest card saved: ${screenshotPath}`);
}

async function generateWhatsAppCard(browser) {
  console.log('📸 Generating WhatsApp card (300x200)...');
  const { width, height } = IMAGE_SIZES.whatsapp;
  
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  
  const htmlContent = createNetworkHTML(width, height, false);
  const tempHtmlPath = path.join(__dirname, 'temp-whatsapp.html');
  fs.writeFileSync(tempHtmlPath, htmlContent);
  
  await page.goto(`file://${tempHtmlPath}`);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const screenshotPath = path.join(publicDir, 'whatsapp-card.png');
  await page.screenshot({
    path: screenshotPath,
    width,
    height,
    type: 'png'
  });
  
  fs.unlinkSync(tempHtmlPath);
  console.log(`✅ WhatsApp card saved: ${screenshotPath}`);
}

async function generateHeadshotCard(browser) {
  console.log('📸 Generating headshot card (1200x630)...');
  const { width, height } = IMAGE_SIZES.headshotCard;
  
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  
  const htmlContent = createNetworkHTML(width, height, false);
  const tempHtmlPath = path.join(__dirname, 'temp-headshot.html');
  fs.writeFileSync(tempHtmlPath, htmlContent);
  
  await page.goto(`file://${tempHtmlPath}`);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const screenshotPath = path.join(publicDir, 'headshot-card.png');
  await page.screenshot({
    path: screenshotPath,
    width,
    height,
    type: 'png'
  });
  
  fs.unlinkSync(tempHtmlPath);
  console.log(`✅ Headshot card saved: ${screenshotPath}`);
}

function createNetworkHTML(width, height, includeTitle = false) {
  return `
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
            width: ${width}px;
            height: ${height}px;
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
        
        // Color scheme for nodes
        const nodeColors = {
            'university': '#4A90E2',
            'company': '#4CAF50',
            'vc': '#FFD54F',
            'incubator': '#E57373',
            'government': '#BA68C8',
            'serviceProvider': '#9E9E9E',
            'startup': '#81D4FA',
            'health_system': '#A5D6A7',
            'facility': '#FFB74D',
            'trade': '#F06292',
            'development': '#4DB6AC',
            'public_company': '#4CAF50',
            'accelerator': '#E57373'
        };
        
        // Initialize the visualization
        function initNetwork() {
            const svg = d3.select('#network-svg');
            const width = ${width};
            const height = ${height};
            
            svg.selectAll("*").remove();
            const networkGroup = svg.append("g").attr("class", "network-group");
            
            const nodes = networkData.nodes;
            const links = networkData.links;
            
            const processedLinks = links.map(link => {
                const sourceNode = nodes.find(n => n.id === link.source);
                const targetNode = nodes.find(n => n.id === link.target);
                return {
                    ...link,
                    source: sourceNode,
                    target: targetNode
                };
            }).filter(link => link.source && link.target);
            
            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(processedLinks).id(d => d.id).distance(200))
                .force("charge", d3.forceManyBody().strength(-400))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force("collision", d3.forceCollide().radius(d => Math.max(d.size * 3, 12) + 40));
            
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
            
            const nodeElements = networkGroup.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("r", d => Math.max(d.size * 3, 12))
                .attr("fill", d => nodeColors[d.type] || '#FF6B6B')
                .style("filter", "drop-shadow(0 0 8px rgba(255,255,255,0.3))");
            
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
            
            simulation.on("end", () => {
                setTimeout(() => {
                    const xCoords = nodes.map(n => n.x);
                    const yCoords = nodes.map(n => n.y);
                    const minX = Math.min(...xCoords);
                    const maxX = Math.max(...xCoords);
                    const minY = Math.min(...yCoords);
                    const maxY = Math.max(...yCoords);
                    
                    const networkCenterX = (minX + maxX) / 2;
                    const networkCenterY = (minY + maxY) / 2;
                    const networkWidth = maxX - minX;
                    const networkHeight = maxY - minY;
                    const padding = 100;
                    const scaleX = (width - padding * 2) / networkWidth;
                    const scaleY = (height - padding * 2) / networkHeight;
                    const scale = Math.min(scaleX, scaleY, 0.8);
                    
                    const transform = d3.zoomIdentity
                        .translate(width / 2 - networkCenterX * scale, height / 2 - networkCenterY * scale)
                        .scale(scale);
                    
                    networkGroup.attr("transform", transform);
                }, 1000);
            });
        }
        
        function getLinkStyle(linkType) {
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
        }
        
        window.addEventListener('load', () => {
            setTimeout(initNetwork, 100);
        });
    </script>
</body>
</html>`;
}



// Run the script
generateAllImages().catch(console.error); 