export const SITE_URL = "https://otherstuff.ai";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const GOOGLE_BUSINESS_PROFILE_URL = "https://maps.app.goo.gl/fQ4DiY5A8tBs6eM37";

export function canonicalPath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  if (/\.[^/]+$/.test(path)) {
    return path;
  }

  return path.endsWith("/") ? path : `${path}/`;
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${canonicalPath(path)}`;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORGANIZATION_ID,
  name: "Other Stuff",
  legalName: "Other Stuff Pty Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/Logo-Main-Icon.webp`,
  image: `${SITE_URL}/og-default.png`,
  email: "info@otherstuff.studio",
  description:
    "Other Stuff is a Perth AI automation and product studio helping small and medium-sized businesses turn AI consulting, workflow design, and product thinking into working systems.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "City Beach",
    addressRegion: "WA",
    postalCode: "6015",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -31.9408,
    longitude: 115.7556,
  },
  areaServed: [
    { "@type": "City", name: "Perth" },
    { "@type": "State", name: "Western Australia" },
    { "@type": "Country", name: "Australia" },
  ],
  founder: [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#pete-winn`,
      name: "Pete Winn",
      jobTitle: "Co-Founder / Director",
      description:
        "Co-Founder and Director of Other Stuff, with a background in process redesign, deep tech, and large enterprise deployments.",
      sameAs: "https://www.linkedin.com/in/pete-winn-otherstuff/",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#andy-david`,
      name: "Andy David",
      jobTitle: "Co-Founder / Director",
      description:
        "Co-Founder and Director of Other Stuff, with a background in venture design, consulting, and technology startups.",
      sameAs: "https://www.linkedin.com/in/andymdavid/",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/otherstuffvs/",
    "https://www.youtube.com/@OtherStuffAI",
    "https://x.com/OtherStuffAU",
    GOOGLE_BUSINESS_PROFILE_URL,
  ],
  subjectOf: [
    {
      "@type": "PodcastSeries",
      name: "The Good Stuff",
      url: `${SITE_URL}/the-good-stuff/`,
      description:
        "An Australian AI podcast from Pete Winn and Andy David on AI, business, operations, entrepreneurship, and the broader economic shift around these tools.",
      author: [
        { "@id": `${SITE_URL}/#pete-winn` },
        { "@id": `${SITE_URL}/#andy-david` },
      ],
      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Other Stuff",
  publisher: {
    "@id": ORGANIZATION_ID,
  },
};

export function getOrganizationRef() {
  return { "@id": ORGANIZATION_ID };
}

export function getServiceSchema({
  path,
  name,
  description,
  serviceType,
  audience,
  areaServed,
}: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  audience: Record<string, unknown>;
  areaServed: Record<string, unknown>[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    url: absoluteUrl(path),
    description,
    serviceType,
    provider: getOrganizationRef(),
    brand: getOrganizationRef(),
    mainEntityOfPage: absoluteUrl(path),
    areaServed,
    audience,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(path),
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(path),
      availability: "https://schema.org/InStock",
    },
  };
}
