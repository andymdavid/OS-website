import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import newsletterPayload from "@/generated/newsletter-issues.json";
import type { NewsletterPayload } from "@/types/newsletter";
import "@/components/Hero.css";
import "@/components/GoodStuff.css";
import "@/routes/Writing.css";
import "@/routes/Newsletter.css";

export default function Newsletter() {
  const payload = newsletterPayload as NewsletterPayload;
  const issues = payload.items.slice(0, 8);
  const archiveSchema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://otherstuff.ai/newsletter#collection",
      url: "https://otherstuff.ai/newsletter",
      name: "The Good Stuff Newsletter",
      description:
        "The Good Stuff is the operating memo for SME leaders using AI to improve margin, capital efficiency, and risk.",
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
      itemListElement: payload.items.map((issue, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://otherstuff.ai${issue.path}`,
        name: issue.title,
        description: issue.seoDescription || issue.description,
      })),
    },
  ];

  return (
    <div className="os-theme os-draft min-h-screen writing-page newsletter-page">
      <SEO
        title="The Good Stuff Newsletter | Margin Up, Capital Up, Risk Down"
        description="The Good Stuff is the operating memo for SME leaders using AI to improve margin, capital efficiency, and risk."
        path="/newsletter"
        schema={archiveSchema}
      />
      <NavigationDraft
        titleSwapOnScroll={{
          before: "OTHER STUFF",
          after: "THE GOOD STUFF",
          targetId: "newsletter-hero",
        }}
      />
      <main>
        <section id="newsletter-hero" className="section writing-hero newsletter-hero">
          <div className="section-container-wide writing-hero-inner">
            <div className="hero-title-block newsletter-hero-copy">
              <h1>
                The operating memo for SME leaders wanting to use AI to
                increase margins, capital, and reduce risk.
              </h1>
              <p className="hero-bridge">
                The Good Stuff newsletter helps SME owners and leaders turn AI
                from noise into operating advantage, with short practical notes
                on where AI can lift margin, free up capital, and reduce
                operational risk inside the workflows that run the business.
              </p>
              <div className="hero-cta newsletter-hero-signup">
                <EmailCaptureForm
                  variant="inline"
                  placeholder="Enter your email"
                  buttonText="Join the Good Stuff"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section writing-posts newsletter-issues">
          <div className="newsletter-section-top">
            <div className="good-stuff-pill">RECENT ISSUES</div>
            <p className="newsletter-section-note">
              Practical essays and operating memos from the edge of AI
              implementation.
            </p>
          </div>

          {issues.length > 0 ? (
            <div className="writing-posts-grid newsletter-posts-grid">
              {issues.map((issue, index) => (
                <article key={issue.id} className="writing-post">
                  <a className="writing-post-link" href={issue.path}>
                    <div className="writing-post-media newsletter-post-media">
                      {issue.thumbnail ? (
                        <img src={issue.thumbnail} alt={issue.title} loading="lazy" />
                      ) : (
                        <div className="newsletter-post-media-fallback">
                          <span>The Good Stuff</span>
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
              Practical notes on where AI can improve margin, free up capital,
              and reduce operational risk inside SME workflows that actually
              matter.
            </p>
            <div className="good-stuff-cta newsletter-signup-cta">
              <EmailCaptureForm
                variant="inline"
                placeholder="Enter your email"
                buttonText="Join the Good Stuff"
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
