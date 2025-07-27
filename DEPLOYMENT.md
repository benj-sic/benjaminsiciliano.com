# Deployment Guide for benjaminsiciliano.com

## Option 1: Deploy to Netlify (Recommended)

### Step 1: Prepare for Deployment
1. Your React app is already built and ready for deployment
2. The `netlify.toml` configuration file has been created

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git" or "Add new site" → "Deploy manually"
3. If using Git:
   - Connect your GitHub/GitLab account
   - Select this repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
4. If deploying manually:
   - Drag and drop the `build` folder to Netlify
   - Or zip the `build` folder and upload it

### Step 3: Connect Custom Domain
1. In your Netlify dashboard, go to your site settings
2. Navigate to "Domain management"
3. Click "Add custom domain"
4. Enter: `benjaminsiciliano.com`
5. Follow Netlify's DNS instructions

### Step 4: Configure DNS at Porkbun
1. Log into your Porkbun account
2. Go to your domain management for `benjaminsiciliano.com`
3. Update DNS records as instructed by Netlify:
   - Add A record pointing to Netlify's IP
   - Add CNAME record for www subdomain
4. Wait for DNS propagation (can take up to 48 hours)

## Option 2: Deploy to Vercel

### Alternative deployment option:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect it's a React app
4. Deploy and follow similar domain setup process

## Option 3: Deploy to GitHub Pages

### For GitHub Pages deployment:
1. Add `"homepage": "https://benjaminsiciliano.com"` to package.json
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy script to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
4. Run `npm run deploy`

## Post-Deployment Checklist

- [ ] Site loads correctly at benjaminsiciliano.com
- [ ] All links and navigation work
- [ ] Network visualization loads properly
- [ ] Contact form works (mailto links)
- [ ] Theme toggle works
- [ ] Mobile responsiveness is good
- [ ] SSL certificate is active (https://)

## Troubleshooting

- If the site shows a 404 error, check that the redirect rules are properly configured
- If DNS isn't working, wait longer for propagation or check DNS records
- For build errors, check the build logs in your deployment platform 