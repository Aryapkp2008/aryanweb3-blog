# AryanWeb3 Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy from your project directory
```bash
vercel
```

### Step 4: Set up custom domain (Optional)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain: `aryanweb3.com` (if you own it)

## Alternative: Deploy via GitHub

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js app
5. Click "Deploy"

## Environment Variables

Create a `.env.local` file with:
```env
SITE_URL=https://aryanweb3.vercel.app
SITE_NAME=AryanWeb3
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_VERCEL_ANALYTICS=true
```

## After Deployment

Your site will be available at:
- `https://aryanweb3.vercel.app` (Vercel subdomain)
- `https://aryanweb3.com` (if you set up custom domain)

## Features Included
- ✅ SEO optimized
- ✅ PWA ready
- ✅ Dark mode
- ✅ Responsive design
- ✅ Analytics ready
- ✅ RSS feeds
- ✅ Sitemap generation

## Troubleshooting

If you encounter issues:
1. Check the Vercel deployment logs
2. Ensure all environment variables are set
3. Verify your `package.json` scripts are correct
4. Check that all imports are working correctly

## Next Steps
1. Set up Google Analytics (optional)
2. Configure your custom domain
3. Add your content to `src/data/blogPosts.ts`
4. Customize the design and branding
