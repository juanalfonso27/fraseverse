import { NextResponse } from 'next/server';
import { buildSitemapXml } from '../../lib/sitemap';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const isGooglebot = userAgent.toLowerCase().includes('googlebot');
    
    const baseUrl = 'https://motivaverse.vercel.app';
    const xml = buildSitemapXml(baseUrl);
    
    // Log for debugging
    console.log(`Serving sitemap to ${userAgent}`);
    
    const response = new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Tag': 'all',
        'Access-Control-Allow-Origin': '*',
      },
    });
    
    return response;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
