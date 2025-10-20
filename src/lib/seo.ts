import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  title: 'Web3 Insights - Ethereum, DeFi & Blockchain Blog',
  titleTemplate: '%s | Web3 Insights',
  description: 'Your gateway to understanding Ethereum, DeFi, NFTs, and the decentralized future of the internet. Expert insights on blockchain technology, smart contracts, and Web3 innovation.',
  canonical: 'https://web3-insights-blog.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://web3-insights-blog.vercel.app',
    siteName: 'Web3 Insights',
    title: 'Web3 Insights - Ethereum, DeFi & Blockchain Blog',
    description: 'Your gateway to understanding Ethereum, DeFi, NFTs, and the decentralized future of the internet.',
    images: [
      {
        url: 'https://web3-insights-blog.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Web3 Insights Blog',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: '@web3insights',
    site: '@web3insights',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'theme-color',
      content: '#8b5cf6',
    },
    {
      name: 'msapplication-TileColor',
      content: '#8b5cf6',
    },
    {
      name: 'msapplication-config',
      content: '/browserconfig.xml',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Web3 Insights',
    },
    {
      name: 'application-name',
      content: 'Web3 Insights',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'msapplication-starturl',
      content: '/',
    },
    {
      name: 'msapplication-tap-highlight',
      content: 'no',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'googlebot',
      content: 'index, follow',
    },
    {
      name: 'bingbot',
      content: 'index, follow',
    },
    {
      name: 'author',
      content: 'Web3 Insights Team',
    },
    {
      name: 'publisher',
      content: 'Web3 Insights',
    },
    {
      name: 'copyright',
      content: 'Web3 Insights',
    },
    {
      name: 'language',
      content: 'English',
    },
    {
      name: 'revisit-after',
      content: '1 day',
    },
    {
      name: 'rating',
      content: 'General',
    },
    {
      name: 'distribution',
      content: 'Global',
    },
    {
      name: 'target',
      content: 'all',
    },
    {
      name: 'audience',
      content: 'all',
    },
    {
      name: 'coverage',
      content: 'Worldwide',
    },
    {
      name: 'category',
      content: 'Technology, Finance, Blockchain',
    },
    {
      name: 'keywords',
      content: 'Web3, Ethereum, DeFi, NFTs, Blockchain, Smart Contracts, Cryptocurrency, Decentralized Finance, Layer 2, DAO, Staking, Gaming, Metaverse, Tokenization',
    },
    {
      name: 'news_keywords',
      content: 'Web3, Ethereum, DeFi, NFTs, Blockchain, Smart Contracts, Cryptocurrency, Decentralized Finance, Layer 2, DAO, Staking, Gaming, Metaverse, Tokenization',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#8b5cf6',
    },
    {
      rel: 'canonical',
      href: 'https://web3-insights-blog.vercel.app',
    },
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'Web3 Insights RSS Feed',
      href: '/rss.xml',
    },
    {
      rel: 'alternate',
      type: 'application/atom+xml',
      title: 'Web3 Insights Atom Feed',
      href: '/atom.xml',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://images.unsplash.com',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://cdn.jsdelivr.net',
    },
  ],
};

export const blogPostSEO = (post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  coverImage?: string;
}) => ({
  title: post.title,
  description: post.excerpt,
  canonical: `https://web3-insights-blog.vercel.app/blog/${post.slug}`,
  openGraph: {
    title: post.title,
    description: post.excerpt,
    url: `https://web3-insights-blog.vercel.app/blog/${post.slug}`,
    type: 'article',
    article: {
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      authors: ['Web3 Insights Team'],
      tags: post.tags,
      section: post.category,
    },
    images: [
      {
        url: post.coverImage || 'https://web3-insights-blog.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@web3insights',
    site: '@web3insights',
  },
  additionalMetaTags: [
    {
      name: 'article:author',
      content: 'Web3 Insights Team',
    },
    {
      name: 'article:published_time',
      content: new Date(post.date).toISOString(),
    },
    {
      name: 'article:modified_time',
      content: new Date(post.date).toISOString(),
    },
    {
      name: 'article:section',
      content: post.category,
    },
    {
      name: 'article:tag',
      content: post.tags.join(', '),
    },
    {
      name: 'keywords',
      content: post.tags.join(', '),
    },
  ],
});
