import quotes from '@/lib/quotes.json';

function formatUrl(url: string, lastmod?: string) {
  return `  <url>\n    <loc>${url}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
}

export function buildSitemapXml(baseUrl: string) {
  const pages = ["/", "/categories", "/enviar-frase"]; // removed /favorites (private)

  // Add quote pages
  const quoteUrls = (quotes || []).map((q: any) => `/quotes/${q.id}`);

  const urls = [...pages, ...quoteUrls];

  const urlEntries = urls.map(u => formatUrl(`${baseUrl}${u}`)).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;
}
