# PowerPoint Backdrop Guide

This guide covers the PowerPoint presentation backdrop generated from your Atlanta Biotech Network visualization.

## Generated Backdrop

### **PowerPoint Backdrop (1920x1080px)** - `powerpoint-backdrop.png`
- **Use for**: PowerPoint presentations, Google Slides, Keynote
- **Features**: 
  - 16:9 aspect ratio (standard presentation format)
  - Subtle gradient background for professional appearance
  - Muted network visualization that won't compete with text
  - Optimized opacity and colors for readability
- **File size**: ~200-300KB
- **Dimensions**: 1920x1080px (Full HD)

## Design Features

### Background
- **Gradient**: Subtle light gray gradient (`#f8f9fa` to `#e9ecef`)
- **Professional**: Clean, minimal design suitable for business presentations
- **Text-friendly**: Light background ensures dark text remains readable

### Network Visualization
- **Opacity**: Reduced to 60% to avoid competing with presentation content
- **Colors**: Muted, professional color palette
- **Size**: Larger nodes and more spacing for better visibility at presentation scale
- **Links**: Subtle, thin lines with reduced opacity
- **Overlay**: Gradient overlay to ensure text readability

### Color Scheme
The backdrop uses a professional, muted color palette:
- **Universities**: Muted gray-blue (`#6c757d`)
- **Companies**: Muted green (`#28a745`)
- **VCs**: Muted gold (`#ffc107`)
- **Incubators**: Muted red (`#dc3545`)
- **Government**: Muted purple (`#6f42c1`)
- **Startups**: Muted teal (`#17a2b8`)
- **Health Systems**: Muted mint (`#20c997`)
- **Facilities**: Muted orange (`#fd7e14`)

## Usage Instructions

### 1. Generate the Backdrop
```bash
npm run generate-powerpoint-backdrop
```

### 2. PowerPoint Setup
1. Open PowerPoint
2. Go to **Design** tab
3. Click **Format Background**
4. Select **Picture or texture fill**
5. Click **File** and select `powerpoint-backdrop.png`
6. Adjust transparency if needed (recommended: 0-20%)

### 3. Google Slides Setup
1. Open Google Slides
2. Go to **Slide** → **Change background**
3. Click **Choose image**
4. Upload `powerpoint-backdrop.png`
5. Click **Done**

### 4. Keynote Setup
1. Open Keynote
2. Select a slide
3. Click **Format** → **Slide Background**
4. Choose **Image Fill**
5. Select `powerpoint-backdrop.png`
6. Adjust opacity if needed

## Best Practices

### Text Readability
- **Dark text**: Use dark colors (#333333, #000000) for maximum contrast
- **Font size**: Minimum 24pt for body text, 36pt+ for headings
- **Text boxes**: Consider adding semi-transparent backgrounds for text boxes
- **Positioning**: Place text in areas with less network density

### Content Placement
- **Title area**: Use the top 1/3 of the slide
- **Content area**: Middle section works best
- **Bottom area**: Good for footnotes and additional information
- **Avoid**: Dense network areas in the center

### Color Combinations
- **Primary text**: Dark gray (#333333) or black (#000000)
- **Accent colors**: Use colors from the network palette for consistency
- **Highlights**: Bright versions of the muted colors for emphasis

## Customization

### Modify the Backdrop
Edit `scripts/generate-powerpoint-backdrop.js` to:
- Change background gradient colors
- Adjust network opacity
- Modify node sizes and colors
- Change overall dimensions
- Add text overlays or branding

### Color Adjustments
To change the color scheme:
1. Edit the `nodeColors` object in the script
2. Modify the `getLinkStyle` function for link colors
3. Adjust the background gradient in the CSS
4. Regenerate the backdrop

### Size Variations
For different presentation formats:
- **4:3 ratio**: 1600x1200px
- **Ultra-wide**: 2560x1080px
- **Square**: 1080x1080px

## File Locations

The generated backdrop is saved to:
- `public/powerpoint-backdrop.png` - Main PowerPoint backdrop

## Troubleshooting

### Image Quality
- **Blurry text**: Ensure you're using the full 1920x1080 resolution
- **Pixelated**: Check that PowerPoint isn't scaling the image down
- **Too dark/light**: Adjust the opacity in your presentation software

### Performance
- **Large file size**: The image is optimized for quality vs. size balance
- **Slow loading**: Consider compressing further if needed for web presentations

### Compatibility
- **PowerPoint versions**: Works with PowerPoint 2016 and newer
- **Google Slides**: Fully compatible
- **Keynote**: Works on macOS and iOS versions

## Future Enhancements

Consider adding:
- **Multiple themes**: Light/dark variations
- **Branded versions**: With company logos or text overlays
- **Animated versions**: For dynamic presentations
- **Different aspect ratios**: For various presentation formats
- **Custom color schemes**: Matching your brand colors

## Technical Details

### Generation Process
1. Uses Puppeteer to render the network visualization
2. Applies professional styling and opacity adjustments
3. Captures screenshot at full resolution
4. Saves as PNG for maximum compatibility

### Dependencies
- Node.js
- Puppeteer (for screenshot generation)
- D3.js (for network visualization)
- Your existing network data

### Performance
- Generation time: ~5-10 seconds
- File size: ~200-300KB
- Resolution: 1920x1080px (Full HD)
