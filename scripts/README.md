# Scripts Directory

This directory contains build automation scripts, image generation utilities, and testing tools for the benjaminsiciliano.com website.

## Overview

The scripts in this directory handle:
- **Build automation**: Git date injection, optimal zoom calculation
- **Image generation**: Social media cards, PowerPoint backdrops
- **Testing**: Cache system validation

---

## Scripts

### Build Scripts

#### `inject-git-date.js`
**Usage:** Automatically runs during `npm run build`  
**Purpose:** Injects the last git commit date into `public/last-commit-date.json`  
**Output:** `public/last-commit-date.json`

#### `calculate-optimal-zoom.js`
**Usage:** Automatically runs during `npm run build`  
**Purpose:** Calculates optimal zoom and pan settings for network visualization  
**Output:** `public/optimal-zoom.json`

### Image Generation Scripts

#### `generate-social-card.js`
**Usage:** `npm run generate-social-card`  
**Purpose:** Generates a single social media card (1200x630px)  
**Output:** `public/social-card.png`

#### `generate-all-social-images.js`
**Usage:** `npm run generate-all-social-images`  
**Purpose:** Generates all social media images for different platforms  
**Output:** Multiple images in `public/` directory (see Social Media Images section below)

#### `generate-powerpoint-backdrop.js`
**Usage:** `npm run generate-powerpoint-backdrop`  
**Purpose:** Generates a professional PowerPoint backdrop (1920x1080px)  
**Output:** `public/powerpoint-backdrop.png`

### Testing Scripts

#### `test-cache.js`
**Usage:** `npm run test-cache`  
**Purpose:** Tests the caching system functionality  
**Output:** Console logs with test results

---

## Social Media Images

All social media images use the same clean network visualization (no gradient background, no text overlay) optimized for each platform's dimensions.

### Generated Images

#### 1. **Social Card (1200x630px)** - `social-card.png`
- **Use for**: Facebook, LinkedIn, general social media sharing
- **Features**: Clean network visualization without text overlay
- **File size**: ~124KB
- **Meta tags**: Already configured in `index.html`

#### 2. **Twitter Card (1200x600px)** - `twitter-card.png`
- **Use for**: Twitter/X platform specifically
- **Features**: Slightly different aspect ratio optimized for Twitter
- **File size**: ~119KB
- **Note**: Twitter prefers 2:1 ratio (1200x600)

#### 3. **Instagram Story (1080x1920px)** - `instagram-story.png`
- **Use for**: Instagram Stories, TikTok, vertical content
- **Features**: Clean network visualization in vertical format
- **File size**: ~497KB
- **Usage**: Download and upload to Instagram Stories

#### 4. **Pinterest Card (1000x1500px)** - `pinterest-card.png`
- **Use for**: Pinterest sharing
- **Features**: Clean network visualization in tall format
- **File size**: ~175KB
- **Usage**: Download and pin to Pinterest

#### 5. **WhatsApp Card (300x200px)** - `whatsapp-card.png`
- **Use for**: WhatsApp, Telegram, messaging apps
- **Features**: Clean network visualization in compact format
- **File size**: ~36KB
- **Usage**: Download and share in messages

#### 6. **Headshot Card (1200x630px)** - `headshot-card.png`
- **Use for**: Professional networking, personal branding
- **Features**: Clean network visualization (same as main social card)
- **File size**: ~261KB
- **Usage**: For LinkedIn posts, professional sharing

### Generation Commands

#### Generate All Images
```bash
npm run generate-all-social-images
```

#### Generate Only Social Card
```bash
npm run generate-social-card
```

### Platform-Specific Recommendations

#### LinkedIn
- **Primary**: `social-card.png` (already configured in meta tags)
- **Alternative**: `headshot-card.png` (same clean network visualization)
- **Debug**: Use LinkedIn Post Inspector to test

#### Twitter/X
- **Primary**: `twitter-card.png` (better aspect ratio)
- **Meta tags**: Add Twitter-specific meta tags if needed

#### Facebook
- **Primary**: `social-card.png` (already configured)
- **Works well**: Facebook handles 1.91:1 ratio perfectly

#### Instagram
- **Stories**: `instagram-story.png`
- **Posts**: `social-card.png` (crop to square if needed)
- **Note**: Instagram doesn't support link previews in posts

#### Pinterest
- **Primary**: `pinterest-card.png`
- **Usage**: Download and pin with your website URL

#### WhatsApp/Telegram
- **Primary**: `whatsapp-card.png`
- **Usage**: Download and attach to messages

### Meta Tag Configuration

The main social card is already configured in `public/index.html`:

```html
<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:image" content="https://benjaminsiciliano.com/social-card.png?v=2" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:image" content="https://benjaminsiciliano.com/social-card.png?v=2" />
```

### Social Card Features

- **Dimensions**: 1200x630px (optimal for social media platforms)
- **Background**: Transparent background (no gradient)
- **Network**: Shows all nodes and connections without text labels
- **Clean Design**: No text overlay, just the pure network visualization
- **Auto-centering**: Network automatically centers and scales to fit the card
- **LinkedIn Optimized**: Includes additional meta tags and cache-busting parameters

### Customization

#### Modify Image Generation
Edit `scripts/generate-all-social-images.js` to:
- Change colors and styling
- Modify text content
- Adjust dimensions
- Add new platforms

#### Add New Platforms
1. Add new dimensions to `IMAGE_SIZES` object
2. Create new HTML template function
3. Add generation function
4. Update this guide

---

## PowerPoint Backdrop

### Generated Backdrop

**PowerPoint Backdrop (1920x1080px)** - `powerpoint-backdrop.png`
- **Use for**: PowerPoint presentations, Google Slides, Keynote
- **Features**: 
  - 16:9 aspect ratio (standard presentation format)
  - Subtle gradient background for professional appearance
  - Muted network visualization that won't compete with text
  - Optimized opacity and colors for readability
- **File size**: ~200-300KB
- **Dimensions**: 1920x1080px (Full HD)

### Design Features

#### Background
- **Gradient**: Subtle light gray gradient (`#f8f9fa` to `#e9ecef`)
- **Professional**: Clean, minimal design suitable for business presentations
- **Text-friendly**: Light background ensures dark text remains readable

#### Network Visualization
- **Opacity**: Reduced to 60% to avoid competing with presentation content
- **Colors**: Muted, professional color palette
- **Size**: Larger nodes and more spacing for better visibility at presentation scale
- **Links**: Subtle, thin lines with reduced opacity
- **Overlay**: Gradient overlay to ensure text readability

#### Color Scheme
The backdrop uses a professional, muted color palette:
- **Universities**: Muted gray-blue (`#6c757d`)
- **Companies**: Muted green (`#28a745`)
- **VCs**: Muted gold (`#ffc107`)
- **Incubators**: Muted red (`#dc3545`)
- **Government**: Muted purple (`#6f42c1`)
- **Startups**: Muted teal (`#17a2b8`)
- **Health Systems**: Muted mint (`#20c997`)
- **Facilities**: Muted orange (`#fd7e14`)

### Usage Instructions

#### 1. Generate the Backdrop
```bash
npm run generate-powerpoint-backdrop
```

#### 2. PowerPoint Setup
1. Open PowerPoint
2. Go to **Design** tab
3. Click **Format Background**
4. Select **Picture or texture fill**
5. Click **File** and select `powerpoint-backdrop.png`
6. Adjust transparency if needed (recommended: 0-20%)

#### 3. Google Slides Setup
1. Open Google Slides
2. Go to **Slide** → **Change background**
3. Click **Choose image**
4. Upload `powerpoint-backdrop.png`
5. Click **Done**

#### 4. Keynote Setup
1. Open Keynote
2. Select a slide
3. Click **Format** → **Slide Background**
4. Choose **Image Fill**
5. Select `powerpoint-backdrop.png`
6. Adjust opacity if needed

### Best Practices

#### Text Readability
- **Dark text**: Use dark colors (#333333, #000000) for maximum contrast
- **Font size**: Minimum 24pt for body text, 36pt+ for headings
- **Text boxes**: Consider adding semi-transparent backgrounds for text boxes
- **Positioning**: Place text in areas with less network density

#### Content Placement
- **Title area**: Use the top 1/3 of the slide
- **Content area**: Middle section works best
- **Bottom area**: Good for footnotes and additional information
- **Avoid**: Dense network areas in the center

#### Color Combinations
- **Primary text**: Dark gray (#333333) or black (#000000)
- **Accent colors**: Use colors from the network palette for consistency
- **Highlights**: Bright versions of the muted colors for emphasis

### Customization

#### Modify the Backdrop
Edit `scripts/generate-powerpoint-backdrop.js` to:
- Change background gradient colors
- Adjust network opacity
- Modify node sizes and colors
- Change overall dimensions
- Add text overlays or branding

#### Color Adjustments
To change the color scheme:
1. Edit the `nodeColors` object in the script
2. Modify the `getLinkStyle` function for link colors
3. Adjust the background gradient in the CSS
4. Regenerate the backdrop

#### Size Variations
For different presentation formats:
- **4:3 ratio**: 1600x1200px
- **Ultra-wide**: 2560x1080px
- **Square**: 1080x1080px

---

## File Locations

### Generated Images
All generated images are saved to `public/`:
- `public/social-card.png` - Main social card
- `public/twitter-card.png` - Twitter optimized
- `public/instagram-story.png` - Instagram Stories
- `public/pinterest-card.png` - Pinterest optimized
- `public/whatsapp-card.png` - Messaging apps
- `public/headshot-card.png` - Professional networking
- `public/powerpoint-backdrop.png` - PowerPoint presentations

### Build Outputs
- `public/last-commit-date.json` - Last git commit date
- `public/optimal-zoom.json` - Optimal zoom/pan settings

---

## Troubleshooting

### LinkedIn Social Card Issues

If the social card isn't appearing on LinkedIn:
1. **Clear LinkedIn Cache**: Try sharing in a private/incognito window
2. **Use LinkedIn Post Inspector**: Visit https://www.linkedin.com/post-inspector/ and paste your URL
3. **Check Image Accessibility**: Verify the image loads at https://benjaminsiciliano.com/social-card.png?v=2
4. **Wait for Cache**: LinkedIn can take up to 24 hours to update cached images
5. **Test Page**: Visit https://benjaminsiciliano.com/social-test.html for debugging tools

### General Image Issues

1. **Verify images are accessible** at direct URLs
2. **Check file sizes** (should be under 1MB for most platforms)
3. **Ensure HTTPS URLs** for all images
4. **Test with platform-specific debug tools**

### Script Execution Issues

If scripts fail:
1. **Ensure Puppeteer is installed**: `npm install`
2. **Check that network data file exists**: `src/atlanta_biotech_data.js`
3. **Verify the public directory is writable**
4. **On macOS**: You may need to grant screen recording permissions to Terminal/VS Code

### PowerPoint Backdrop Issues

#### Image Quality
- **Blurry text**: Ensure you're using the full 1920x1080 resolution
- **Pixelated**: Check that PowerPoint isn't scaling the image down
- **Too dark/light**: Adjust the opacity in your presentation software

#### Performance
- **Large file size**: The image is optimized for quality vs. size balance
- **Slow loading**: Consider compressing further if needed for web presentations

#### Compatibility
- **PowerPoint versions**: Works with PowerPoint 2016 and newer
- **Google Slides**: Fully compatible
- **Keynote**: Works on macOS and iOS versions

---

## Requirements

- **Node.js** with npm
- **Puppeteer** (already included as dev dependency)
- **D3.js** (loaded from CDN in scripts)
- **Network data**: `src/atlanta_biotech_data.js`

---

## Best Practices

1. **Test before sharing**: Use platform debug tools
2. **Keep file sizes reasonable**: Under 1MB for most platforms
3. **Use appropriate aspect ratios**: Each platform has preferences
4. **Include alt text**: For accessibility
5. **Update regularly**: Regenerate images when content changes
6. **Cache busting**: Use `?v=2` parameter to force refresh

---

## Future Enhancements

Consider adding:
- **Dark/Light theme versions**: For different contexts
- **Animated GIFs**: For platforms that support them
- **Video thumbnails**: For video content
- **Platform-specific branding**: Different styles per platform
- **A/B testing versions**: Multiple designs to test
- **Multiple backdrop themes**: Light/dark variations
- **Branded versions**: With company logos or text overlays
- **Animated versions**: For dynamic presentations
- **Different aspect ratios**: For various presentation formats
- **Custom color schemes**: Matching your brand colors

---

**Last Updated:** January 2025
