import { NextResponse } from 'next/server';
import { buildSitemapXml } from '../../src/lib/sitemap';

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://motivaverse.vercel.app';
  const xml = buildSitemapXml(baseUrl);
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
