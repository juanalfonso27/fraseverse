import { NextResponse } from 'next/server';
import { buildSitemapXml } from '../../lib/sitemap';

export function GET() {
  const baseUrl = 'https://motivaverse.vercel.app';
  const xml = buildSitemapXml(baseUrl);
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
