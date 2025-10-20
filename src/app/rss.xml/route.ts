import { blogPosts } from '@/data/blogPosts';

export async function GET() {
  const siteUrl = process.env.SITE_URL || 'https://web3-insights-blog.vercel.app';
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
    <title>Web3 Insights - Ethereum, DeFi & Blockchain Blog</title>
    <description>Your gateway to understanding Ethereum, DeFi, NFTs, and the decentralized future of the internet. Expert insights on blockchain technology, smart contracts, and Web3 innovation.</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <sy:updatePeriod>daily</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <generator>Web3 Insights Blog</generator>
    <webMaster>hello@web3insights.com (Web3 Insights Team)</webMaster>
    <managingEditor>hello@web3insights.com (Web3 Insights Team)</managingEditor>
    <category>Technology</category>
    <category>Finance</category>
    <category>Blockchain</category>
    <image>
      <title>Web3 Insights</title>
      <url>${siteUrl}/og-image.png</url>
      <link>${siteUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    
    ${blogPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>Web3 Insights Team</dc:creator>
      <dc:subject>${post.category}</dc:subject>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
      <enclosure url="${post.coverImage}" type="image/jpeg" length="0"/>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
