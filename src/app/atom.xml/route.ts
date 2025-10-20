import { blogPosts } from '@/data/blogPosts';

export async function GET() {
  const siteUrl = process.env.SITE_URL || 'https://web3-insights-blog.vercel.app';
  
  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <title>Web3 Insights - Ethereum, DeFi & Blockchain Blog</title>
  <subtitle>Your gateway to understanding Ethereum, DeFi, NFTs, and the decentralized future of the internet. Expert insights on blockchain technology, smart contracts, and Web3 innovation.</subtitle>
  <link href="${siteUrl}" rel="alternate" type="text/html"/>
  <link href="${siteUrl}/atom.xml" rel="self" type="application/atom+xml"/>
  <id>${siteUrl}/</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>Web3 Insights Team</name>
    <email>hello@web3insights.com</email>
  </author>
  <rights>Copyright © ${new Date().getFullYear()} Web3 Insights</rights>
  <icon>${siteUrl}/favicon.ico</icon>
  <logo>${siteUrl}/og-image.png</logo>
  
  ${blogPosts.map(post => `
  <entry>
    <title type="html"><![CDATA[${post.title}]]></title>
    <link href="${siteUrl}/blog/${post.slug}" rel="alternate" type="text/html"/>
    <id>${siteUrl}/blog/${post.slug}</id>
    <published>${new Date(post.date).toISOString()}</published>
    <updated>${new Date(post.date).toISOString()}</updated>
    <author>
      <name>Web3 Insights Team</name>
      <email>hello@web3insights.com</email>
    </author>
    <summary type="html"><![CDATA[${post.excerpt}]]></summary>
    <content type="html" xml:base="${siteUrl}/blog/${post.slug}"><![CDATA[${post.content}]]></content>
    <category term="${post.category}" label="${post.category}"/>
    ${post.tags.map(tag => `<category term="${tag}" label="${tag}"/>`).join('')}
    <dc:subject>${post.category}</dc:subject>
  </entry>
  `).join('')}
</feed>`;

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
