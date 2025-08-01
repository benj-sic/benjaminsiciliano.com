# Social Card Generation

This directory contains scripts for generating social media cards for the Atlanta Biotech Network visualization.

## Files

- `generate-social-card.js` - Script to generate a social card image of the network visualization
- `generate-all-social-images.js` - Comprehensive script to generate all social media images
- `SOCIAL_IMAGES_GUIDE.md` - Complete guide for all social media images and their use cases
- `README.md` - This documentation file

## Social Card Generation

The social card is a static image of the Atlanta Biotech Network visualization without labels, optimized for social media sharing.

### Features

- **Dimensions**: 1200x630px (optimal for social media platforms)
- **Background**: Transparent background (no gradient)
- **Network**: Shows all nodes and connections without text labels
- **Clean Design**: No text overlay, just the pure network visualization
- **Auto-centering**: Network automatically centers and scales to fit the card
- **LinkedIn Optimized**: Includes additional meta tags and cache-busting parameters

### Usage

To generate a new social card:

```bash
npm run generate-social-card
```

This will:
1. Create a temporary HTML file with the network visualization
2. Use Puppeteer to render the network
3. Take a screenshot at 1200x630px
4. Save the image as `public/social-card.png`
5. Clean up temporary files

### Output

The generated social card will be saved to:
- `public/social-card.png` (503KB, 1200x630px)

### Meta Tags

The social card is automatically referenced in the HTML meta tags for:
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Other social media platforms

### Customization

To modify the social card:

1. **Colors**: Edit the `nodeColors` object in the script
2. **Background**: Modify the CSS gradient in the HTML template
3. **Text**: Update the title and subtitle text
4. **Dimensions**: Change `SOCIAL_CARD_WIDTH` and `SOCIAL_CARD_HEIGHT` constants

### Requirements

- Node.js with npm
- Puppeteer (already included as dev dependency)
- D3.js (loaded from CDN in the script)

### Troubleshooting

If the script fails:
1. Ensure Puppeteer is installed: `npm install`
2. Check that the network data file exists: `src/atlanta_biotech_data.js`
3. Verify the public directory is writable
4. On macOS, you may need to grant screen recording permissions to Terminal/VS Code

#### LinkedIn Social Card Issues

If the social card isn't appearing on LinkedIn:
1. **Clear LinkedIn Cache**: Try sharing in a private/incognito window
2. **Use LinkedIn Post Inspector**: Visit https://www.linkedin.com/post-inspector/ and paste your URL
3. **Check Image Accessibility**: Verify the image loads at https://benjaminsiciliano.com/social-card.png?v=2
4. **Wait for Cache**: LinkedIn can take up to 24 hours to update cached images
5. **Test Page**: Visit https://benjaminsiciliano.com/social-test.html for debugging tools

### Integration

The social card is automatically referenced in the HTML meta tags for social media sharing. When someone shares your website on social media, they'll see the beautiful network visualization as the preview image. 