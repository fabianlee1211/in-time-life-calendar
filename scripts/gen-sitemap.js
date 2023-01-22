const fs = require('fs');

async function genSitemap() {
  const { globby } = await import('globby');
  const pages = await globby([
    'src/pages/*.tsx',
    '!src/pages/_*.tsx',
    '!src/pages/api',
    '!src/pages/404.tsx',
    '!src/pages/500.tsx'
  ]);

  const pagesToProcess = [...pages];

  const paths = pagesToProcess.map((page) => {
    return page.replace('pages', '').replace('.tsx', '');
  });

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${paths
        .map((path) => {
          const route = path === '/index' ? '' : path;

          return `
            <url>
              <loc>${`https://${process.env.NEXT_PUBLIC_VERCEL_URL}${route}`}</loc>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  const robots = `
    User-agent: *
    Allow: /
    Sitemap: https://${process.env.NEXT_PUBLIC_VERCEL_URL}/sitemap.xml
    Host: https://${process.env.NEXT_PUBLIC_VERCEL_URL}
  `;

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', sitemap);
  fs.writeFileSync('public/robots.txt', robots);
}

genSitemap();
