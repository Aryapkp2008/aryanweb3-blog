# AryanWeb3 - Netlify Deployment Guide

## Method 2: Deploy to Netlify

### Option A: Deploy via Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Initialize and Deploy
```bash
# Initialize Netlify in your project
netlify init

# Deploy to Netlify
netlify deploy

# For production deployment
netlify deploy --prod
```

### Option B: Deploy via GitHub (Recommended)

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

#### Step 2: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18
5. Click "Deploy site"

### Option C: Drag & Drop Deploy

#### Step 1: Build your project
```bash
npm run build
```

#### Step 2: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `.next` folder to the deploy area
3. Your site will be live instantly!

## Custom Domain Setup

### Step 1: Add Custom Domain
1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings > Domain management
4. Add custom domain: `aryanweb3.netlify.app` or your own domain

### Step 2: Configure DNS (if using custom domain)
- Point your domain to Netlify's servers
- Add CNAME record: `www` → `your-site-name.netlify.app`

## Environment Variables

In Netlify dashboard:
1. Go to Site settings > Environment variables
2. Add these variables:
   - `SITE_URL` = `https://aryanweb3.netlify.app`
   - `SITE_NAME` = `AryanWeb3`
   - `NEXT_PUBLIC_GA_ID` = `your-google-analytics-id`
   - `NEXT_PUBLIC_VERCEL_ANALYTICS` = `false`

## Features Included
- ✅ Automatic deployments from GitHub
- ✅ Custom domain support
- ✅ SSL certificates (free)
- ✅ Form handling
- ✅ Branch previews
- ✅ Edge functions support

## Netlify vs Vercel

| Feature | Netlify | Vercel |
|---------|---------|--------|
| Next.js Support | ✅ Good | ✅ Excellent |
| Custom Domains | ✅ Free | ✅ Free |
| SSL Certificates | ✅ Free | ✅ Free |
| Build Time | Fast | Very Fast |
| Edge Functions | ✅ | ✅ |
| Form Handling | ✅ Built-in | Requires setup |
| Branch Previews | ✅ | ✅ |

## Troubleshooting

### Common Issues:
1. **Build fails**: Check Node.js version (use 18)
2. **404 errors**: Ensure `_redirects` file is in `public/` folder
3. **Environment variables**: Make sure they're set in Netlify dashboard
4. **Custom domain**: Check DNS settings

### Build Commands:
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start
```

## Your Live URLs:
- **Netlify subdomain**: `https://aryanweb3.netlify.app`
- **Custom domain**: `https://aryanweb3.com` (if configured)
