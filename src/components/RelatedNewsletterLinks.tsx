import newsletterPayload from "@/generated/newsletter-issues.json";
import type { NewsletterIssue, NewsletterPayload } from "@/types/newsletter";
import "@/components/RelatedNewsletterLinks.css";

const payload = newsletterPayload as NewsletterPayload;

interface RelatedNewsletterLinksProps {
  slugs: string[];
  eyebrow?: string;
  heading?: string;
}

export function getNewsletterIssuesBySlug(slugs: string[]): NewsletterIssue[] {
  return slugs
    .map((slug) => payload.items.find((issue) => issue.slug === slug))
    .filter((issue): issue is NewsletterIssue => Boolean(issue));
}

export function RelatedNewsletterLinks({
  slugs,
  eyebrow = "Related reading",
  heading = "From The Good Stuff",
}: RelatedNewsletterLinksProps) {
  const issues = getNewsletterIssuesBySlug(slugs);

  if (issues.length === 0) {
    return null;
  }

  return (
    <section className="section related-newsletter-section">
      <div className="section-container-wide related-newsletter-inner">
        <div className="related-newsletter-head">
          <div className="related-newsletter-eyebrow">{eyebrow}</div>
          <h2>{heading}</h2>
        </div>
        <div className="related-newsletter-grid">
          {issues.map((issue) => (
            <article key={issue.slug} className="related-newsletter-card">
              <a href={issue.path} className="related-newsletter-link">
                <div className="related-newsletter-meta">
                  <span>The Good Stuff</span>
                  {issue.displayDate ? <span>{issue.displayDate}</span> : null}
                </div>
                <h3>{issue.title}</h3>
                <p>{issue.seoDescription || issue.description}</p>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
