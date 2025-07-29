# Social Media Images Guide

This guide covers all the different social media images generated for the website and when to use them.

## Generated Images

All images use the same clean network visualization (no gradient background, no text overlay) optimized for each platform's dimensions.

### 1. **Social Card (1200x630px)** - `social-card.png`
- **Use for**: Facebook, LinkedIn, general social media sharing
- **Features**: Clean network visualization without text overlay
- **File size**: ~124KB
- **Meta tags**: Already configured in `index.html`

### 2. **Twitter Card (1200x600px)** - `twitter-card.png`
- **Use for**: Twitter/X platform specifically
- **Features**: Slightly different aspect ratio optimized for Twitter
- **File size**: ~119KB
- **Note**: Twitter prefers 2:1 ratio (1200x600)

### 3. **Instagram Story (1080x1920px)** - `instagram-story.png`
- **Use for**: Instagram Stories, TikTok, vertical content
- **Features**: Clean network visualization in vertical format
- **File size**: ~497KB
- **Usage**: Download and upload to Instagram Stories

### 4. **Pinterest Card (1000x1500px)** - `pinterest-card.png`
- **Use for**: Pinterest sharing
- **Features**: Clean network visualization in tall format
- **File size**: ~175KB
- **Usage**: Download and pin to Pinterest

### 5. **WhatsApp Card (300x200px)** - `whatsapp-card.png`
- **Use for**: WhatsApp, Telegram, messaging apps
- **Features**: Clean network visualization in compact format
- **File size**: ~36KB
- **Usage**: Download and share in messages

### 6. **Headshot Card (1200x630px)** - `headshot-card.png`
- **Use for**: Professional networking, personal branding
- **Features**: Clean network visualization (same as main social card)
- **File size**: ~261KB
- **Usage**: For LinkedIn posts, professional sharing

## Generation Commands

### Generate All Images
```bash
npm run generate-all-social-images
```

### Generate Only Social Card
```bash
npm run generate-social-card
```

## Platform-Specific Recommendations

### LinkedIn
- **Primary**: `social-card.png` (already configured in meta tags)
- **Alternative**: `headshot-card.png` (same clean network visualization)
- **Debug**: Use LinkedIn Post Inspector to test

### Twitter/X
- **Primary**: `twitter-card.png` (better aspect ratio)
- **Meta tags**: Add Twitter-specific meta tags if needed

### Facebook
- **Primary**: `social-card.png` (already configured)
- **Works well**: Facebook handles 1.91:1 ratio perfectly

### Instagram
- **Stories**: `instagram-story.png`
- **Posts**: `social-card.png` (crop to square if needed)
- **Note**: Instagram doesn't support link previews in posts

### Pinterest
- **Primary**: `pinterest-card.png`
- **Usage**: Download and pin with your website URL

### WhatsApp/Telegram
- **Primary**: `whatsapp-card.png`
- **Usage**: Download and attach to messages

## Meta Tag Configuration

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

## Customization

### Modify Image Generation
Edit `scripts/generate-all-social-images.js` to:
- Change colors and styling
- Modify text content
- Adjust dimensions
- Add new platforms

### Add New Platforms
1. Add new dimensions to `IMAGE_SIZES` object
2. Create new HTML template function
3. Add generation function
4. Update this guide

## Troubleshooting

### LinkedIn Issues
1. Use LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
2. Clear cache by sharing in incognito mode
3. Wait up to 24 hours for cache refresh
4. Check image accessibility at direct URL

### General Issues
1. Verify images are accessible at direct URLs
2. Check file sizes (should be under 1MB for most platforms)
3. Ensure HTTPS URLs for all images
4. Test with platform-specific debug tools

## File Locations

All generated images are saved to:
- `public/social-card.png` - Main social card
- `public/twitter-card.png` - Twitter optimized
- `public/instagram-story.png` - Instagram Stories
- `public/pinterest-card.png` - Pinterest optimized
- `public/whatsapp-card.png` - Messaging apps
- `public/headshot-card.png` - Professional networking

## Best Practices

1. **Test before sharing**: Use platform debug tools
2. **Keep file sizes reasonable**: Under 1MB for most platforms
3. **Use appropriate aspect ratios**: Each platform has preferences
4. **Include alt text**: For accessibility
5. **Update regularly**: Regenerate images when content changes
6. **Cache busting**: Use `?v=2` parameter to force refresh

## Future Enhancements

Consider adding:
- **Dark/Light theme versions**: For different contexts
- **Animated GIFs**: For platforms that support them
- **Video thumbnails**: For video content
- **Platform-specific branding**: Different styles per platform
- **A/B testing versions**: Multiple designs to test 