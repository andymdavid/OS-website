export const SITE_URL = "https://otherstuff.ai";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

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
    { "@type": "Person", name: "Pete Winn", jobTitle: "Co-Founder" },
    { "@type": "Person", name: "Andy David", jobTitle: "Co-Founder" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/otherstuffvs/",
    "https://www.youtube.com/@OtherStuffAI",
    "https://x.com/OtherStuffAU",
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
    "@id": `${SITE_URL}${path}#service`,
    name,
    url: `${SITE_URL}${path}`,
    description,
    serviceType,
    provider: getOrganizationRef(),
    brand: getOrganizationRef(),
    mainEntityOfPage: `${SITE_URL}${path}`,
    areaServed,
    audience,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}${path}`,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}${path}`,
      availability: "https://schema.org/InStock",
    },
  };
}
