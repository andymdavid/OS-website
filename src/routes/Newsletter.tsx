import { useState } from "react";
import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import newsletterPayload from "@/generated/newsletter-issues.json";
import { absoluteUrl, canonicalPath } from "@/lib/structured-data";
import type { NewsletterPayload } from "@/types/newsletter";
import "@/components/Hero.css";
import "@/components/GoodStuff.css";
import "@/routes/Writing.css";
import "@/routes/Newsletter.css";

const INITIAL_VISIBLE_ISSUES = 8;
const ISSUE_INCREMENT = 8;

const getPublishedTime = (published: string) => {
  const date = new Date(published);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

export default function Newsletter() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ISSUES);
  const payload = newsletterPayload as NewsletterPayload;
  const indexableIssues = payload.items
    .filter((issue) => !issue.noindex)
    .sort((a, b) => getPublishedTime(b.published) - getPublishedTime(a.published));
  const issues = indexableIssues.slice(0, visibleCount);
  const archiveSchema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://otherstuff.ai/newsletter#collection",
      url: absoluteUrl("/newsletter"),
      name: "Intelligence Snacks Newsletter",
      description:
        "Intelligence Snacks develops long conversations about AI, software and business into useful ideas.",
      inLanguage: "en-AU",
      isPartOf: {
        "@type": "WebSite",
        name: "Other Stuff",
        url: "https://otherstuff.ai",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": "https://otherstuff.ai/newsletter#issues",
      itemListElement: indexableIssues.map((issue, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(issue.path),
        name: issue.title,
        description: issue.seoDescription || issue.description,
      })),
    },
  ];

  return (
    <div className="os-theme os-draft min-h-screen writing-page newsletter-page">
      <SEO
        title="Intelligence Snacks | Ideas for the age of AI"
        description="Long conversations about AI, software and business, developed into useful ideas."
        path="/newsletter"
        schema={archiveSchema}
      />
      <NavigationDraft
        titleSwapOnScroll={{
          before: "OTHER STUFF",
          after: "INTELLIGENCE SNACKS",
          targetId: "newsletter-hero",
        }}
      />
      <main>
        <section id="newsletter-hero" className="section writing-hero newsletter-hero">
          <div className="section-container-wide writing-hero-inner">
            <div className="hero-title-block newsletter-hero-copy">
              <h1>Big ideas compound.</h1>
              <p className="hero-bridge">
                For people building and running modern businesses, Intelligence
                Snacks helps you quickly digest the big ideas emerging from AI,
                software, business, work and technological change.
              </p>
              <div className="hero-cta newsletter-hero-signup">
                <EmailCaptureForm
                  variant="inline"
                  placeholder="Enter your email"
                  buttonText="Send me snacks"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section writing-posts newsletter-issues">
          <div className="newsletter-section-top">
            <div className="good-stuff-pill">RECENT ISSUES</div>
            <p className="newsletter-section-note">
              The latest ideas from Intelligence Snacks on AI, software and
              business.
            </p>
          </div>

          {issues.length > 0 ? (
            <>
              <div className="writing-posts-grid newsletter-posts-grid">
                {issues.map((issue, index) => (
                  <article key={issue.id} className="writing-post">
                    <a className="writing-post-link" href={canonicalPath(issue.path)}>
                      <div className="writing-post-media newsletter-post-media">
                        {issue.thumbnail ? (
                          <img src={issue.thumbnail} alt={issue.title} loading="lazy" />
                        ) : (
                          <div className="newsletter-post-media-fallback">
                            <span>Intelligence Snacks</span>
                          </div>
                        )}
                      </div>
                      <div className="writing-post-header">
                        <span className="writing-post-id">
                          [{String(index + 1).padStart(2, "0")}]
                        </span>
                        <div className="writing-post-meta">
                          <div className="writing-post-title">{issue.title}</div>
                          <div className="writing-post-description">
                            {issue.description ||
                              issue.subtitle ||
                              "Read the full issue on-site."}
                          </div>
                          {issue.displayDate ? (
                            <div className="writing-post-date">
                              {issue.displayDate}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
              {indexableIssues.length > visibleCount ? (
                <div className="newsletter-show-more">
                  <button
                    type="button"
                    className="newsletter-show-more-btn"
                    onClick={() =>
                      setVisibleCount((count) =>
                        Math.min(count + ISSUE_INCREMENT, indexableIssues.length),
                      )
                    }
                  >
                    Show more
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="newsletter-empty">
              <p>
                {payload.configured
                  ? "No newsletter issues are currently available in the local archive."
                  : "The issue archive will populate here from Beehiiv once the publication credentials are present in the build environment."}
              </p>
            </div>
          )}
        </section>

        <section id="newsletter-signup" className="section good-stuff-section newsletter-signup">
          <div className="good-stuff-top newsletter-signup-top">
            <div className="good-stuff-pill">SUBSCRIBE</div>
            <h2 className="good-stuff-heading">
              Get each issue direct.
            </h2>
            <p className="good-stuff-subpara newsletter-signup-subpara">
              Quickly digest the big ideas emerging from the world of AI,
              delivered to your inbox each week.
            </p>
            <div className="good-stuff-cta newsletter-signup-cta">
              <EmailCaptureForm
                variant="inline"
                placeholder="Enter your email"
                buttonText="Send me snacks"
              />
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
