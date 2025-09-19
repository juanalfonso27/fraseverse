import { NextResponse } from 'next/server';
import { buildSitemapXml } from '../../lib/sitemap';

export async function GET() {
  try {
    const baseUrl = 'https://motivaverse.vercel.app';
    const xml = buildSitemapXml(baseUrl);
    
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
