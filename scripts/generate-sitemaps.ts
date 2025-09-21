import fs from 'fs';
import path from 'path';

const quotes = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'quotes.json'), 'utf-8'));
const BASE_URL = 'https://fraseverse.vercel.app';
const OUT_DIR = path.join(__dirname, '..', 'public');

function formatUrl(url: string, lastmod?: string) {
  return `  <url>\n    <loc>${url}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
}

function buildSitemap(urls: string[]) {
  const urlEntries = urls.map(u => formatUrl(u)).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;
}

function writeFile(p: string, content: string) {
  fs.writeFileSync(p, content, 'utf-8');
  console.log(`Wrote ${p}`);
}

// Prepare URLs
const staticPages = ["/", "/categories", "/enviar-frase"];
const quoteUrls = quotes.map((q: any) => `/quotes/${q.id}`);
const allUrls = [...staticPages.map(p => `${BASE_URL}${p}`), ...quoteUrls.map(p => `${BASE_URL}${p}`)];

// Split into chunks of 5000 (safe limit)
const CHUNK_SIZE = 5000;
const chunks: string[][] = [];
for (let i = 0; i < allUrls.length; i += CHUNK_SIZE) {
  chunks.push(allUrls.slice(i, i + CHUNK_SIZE));
}

// Ensure out dir exists
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Generate sitemaps
const sitemapFiles: string[] = [];
chunks.forEach((chunk, idx) => {
  const filename = `sitemap-quotes-${idx + 1}.xml`;
  const filePath = path.join(OUT_DIR, filename);
  writeFile(filePath, buildSitemap(chunk));
  sitemapFiles.push(filename);
});

// Sitemap index
const indexEntries = sitemapFiles.map(f => `  <sitemap>\n    <loc>${BASE_URL}/${f}</loc>\n  </sitemap>`).join('\n');
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries}\n</sitemapindex>`;
writeFile(path.join(OUT_DIR, 'sitemap-index.xml'), indexXml);

// Also write a simple sitemap.xml that points to index (some tools expect it)
writeFile(path.join(OUT_DIR, 'sitemap.xml'), indexXml);

console.log('Sitemaps generated.');
