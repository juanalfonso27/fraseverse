import quotes from '@/lib/quotes.json';

function formatUrl(url: string, lastmod?: string) {
  return `  <url>\n    <loc>${url}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
}

const DEFAULT_SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://motivaverse.vercel.app';

export function buildSitemapXml(baseUrl: string = DEFAULT_SITE) {
  const normalizedBase = baseUrl.replace(/\/$/, '');
  const pages = ["/", "/categories", "/enviar-frase"]; // removed /favorites (private)

  // Add quote pages
  const quoteUrls = (quotes || []).map((q: any) => `/quotes/${q.id}`);

  const urls = [...pages, ...quoteUrls];

  const urlEntries = urls.map(u => formatUrl(`${normalizedBase}${u}`)).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;
}
