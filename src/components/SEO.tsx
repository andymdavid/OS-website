import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://otherstuff.ai';
const SITE_NAME = 'Other Stuff';
const DEFAULT_OG_IMAGE = '/og-default.png';

function resolveImageUrl(image?: string) {
  if (image && /^https?:\/\//.test(image)) {
    return image;
  }

  return `${SITE_URL}${image || DEFAULT_OG_IMAGE}`;
}

interface SEOProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEO({ title, description, path, noindex, ogImage, ogType = 'website', publishedTime, schema }: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === '/' ? `${SITE_NAME} | ${title}` : `${title} | ${SITE_NAME}`;
  const imageUrl = resolveImageUrl(ogImage);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {schema && (Array.isArray(schema)
        ? schema.map((s, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(s)}
            </script>
          ))
        : (
            <script type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          )
      )}
    </Helmet>
  );
}
