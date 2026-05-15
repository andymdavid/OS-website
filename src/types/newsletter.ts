export type NewsletterIssue = {
  id: string;
  slug: string;
  path: string;
  title: string;
  seoTitle: string;
  subtitle: string;
  intro: string;
  description: string;
  seoDescription: string;
  thumbnail: string;
  ogImage: string;
  webUrl: string;
  published: string;
  displayDate: string;
  authors: string[];
  tags: string[];
  readTime: string;
  noindex: boolean;
  html: string;
};

export type NewsletterPayload = {
  publicationId?: string | null;
  updatedAt?: string;
  configured: boolean;
  items: NewsletterIssue[];
};
