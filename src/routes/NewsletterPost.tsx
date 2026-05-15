import { useEffect, useState } from "react";
import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { NewsletterModal } from "@/components/NewsletterModal";
import newsletterPayload from "@/generated/newsletter-issues.json";
import NotFound from "@/routes/NotFound";
import type { NewsletterIssue, NewsletterPayload } from "@/types/newsletter";
import { useParams } from "react-router-dom";
import "@/routes/WritingPost.css";
import "@/routes/NewsletterPost.css";

const payload = newsletterPayload as NewsletterPayload;
const NEWSLETTER_MODAL_STORAGE_KEY = "newsletter-post-modal-dismissed-at";
const NEWSLETTER_MODAL_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

function resolveAbsoluteUrl(value?: string) {
  if (value && /^https?:\/\//.test(value)) {
    return value;
  }

  return `https://otherstuff.ai${value || "/og-default.png"}`;
}

function buildAuthorSchema(issue: NewsletterIssue) {
  if (issue.authors.length === 0) {
    return {
      "@type": "Organization",
      name: "Other Stuff",
    };
  }

  return issue.authors.map((name) => ({
    "@type": "Person",
    name,
  }));
}

export default function NewsletterPost() {
  const { slug } = useParams();
  const issue = payload.items.find((entry) => entry.slug === slug);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  if (!issue) {
    return <NotFound />;
  }

  const keepReading = payload.items
    .filter((entry) => entry.slug !== issue.slug)
    .slice(0, 3);
  const authorLine = issue.authors.length > 0 ? issue.authors.join(", ") : "Other Stuff";
  const issueUrl = `https://otherstuff.ai${issue.path}`;
  const schemaImage = issue.ogImage || issue.thumbnail || "/og-default.png";
  const seoTitle = issue.seoTitle || issue.title;
  const seoDescription = issue.seoDescription || issue.description;

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const dismissedAt = Number(window.localStorage.getItem(NEWSLETTER_MODAL_STORAGE_KEY) || "0");
    if (dismissedAt && Date.now() - dismissedAt < NEWSLETTER_MODAL_COOLDOWN_MS) {
      return undefined;
    }

    let hasOpened = false;

    const handleScroll = () => {
      if (hasOpened) {
        return;
      }

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const progress = window.scrollY / scrollableHeight;
      if (progress >= 0.5) {
        hasOpened = true;
        setIsSignupModalOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [issue.slug]);

  const closeSignupModal = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        NEWSLETTER_MODAL_STORAGE_KEY,
        String(Date.now()),
      );
    }
    setIsSignupModalOpen(false);
  };

  return (
    <div className="os-theme os-draft min-h-screen writing-post-page newsletter-post-page">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={issue.path}
        ogImage={schemaImage}
        ogType="article"
        publishedTime={issue.published}
        noindex={issue.noindex}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${issueUrl}#article`,
            url: issueUrl,
            headline: issue.title,
            description: seoDescription,
            image: resolveAbsoluteUrl(schemaImage),
            datePublished: issue.published,
            dateModified: issue.published,
            author: buildAuthorSchema(issue),
            publisher: {
              "@type": "Organization",
              name: "Other Stuff",
              logo: {
                "@type": "ImageObject",
                url: "https://otherstuff.ai/Logo-Main-Icon.webp",
              },
            },
            isPartOf: {
              "@type": "CreativeWorkSeries",
              name: "The Good Stuff",
              url: "https://otherstuff.ai/newsletter",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": issueUrl,
            },
            articleSection: "The Good Stuff Newsletter",
            inLanguage: "en-AU",
            keywords: issue.tags,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${issueUrl}#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://otherstuff.ai/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Newsletter",
                item: "https://otherstuff.ai/newsletter",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: issue.title,
                item: issueUrl,
              },
            ],
          },
        ]}
      />
      <NavigationDraft titleOverride="THE GOOD STUFF" />
      <main>
        <section className="section writing-post-hero">
          <div className="section-container-wide writing-post-hero-inner">
            <a href="/newsletter" className="writing-post-back">
              Back to Newsletter
            </a>

            <div className="newsletter-post-kicker">The Good Stuff</div>
            <h1 className="writing-post-title">{issue.title}</h1>

            <div className="writing-post-meta">
              <span className="writing-post-author">{authorLine}</span>
              {issue.displayDate ? (
                <span className="writing-post-date">{issue.displayDate}</span>
              ) : null}
              {issue.readTime ? (
                <span className="writing-post-date">{issue.readTime}</span>
              ) : null}
            </div>

            {issue.thumbnail ? (
              <div className="writing-post-feature">
                <img src={issue.thumbnail} alt={issue.title} loading="lazy" />
              </div>
            ) : null}

            {issue.intro ? (
              <p className="writing-post-subheader">{issue.intro}</p>
            ) : null}

            <div className="writing-post-share">
              <span>Share</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(issueUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(issueUrl)}&text=${encodeURIComponent(issue.title)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(issue.title)}&body=${encodeURIComponent(issueUrl)}`}
                rel="noopener noreferrer"
              >
                Email
              </a>
              {issue.webUrl ? (
                <a href={issue.webUrl} target="_blank" rel="noopener noreferrer">
                  Original on Beehiiv
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section writing-post-body">
          <div className="section-container-wide writing-post-body-inner">
            <div className="writing-post-content">
              {issue.html ? (
                <div dangerouslySetInnerHTML={{ __html: issue.html }} />
              ) : (
                <p>
                  Full newsletter content was not available in the local archive for
                  this issue.
                </p>
              )}
            </div>
          </div>
        </section>

        {keepReading.length > 0 ? (
          <section className="section writing-post-keep-reading">
            <div className="section-container-wide">
              <div className="writing-post-keep-header">
                <h2>More issues</h2>
              </div>
              <div className="writing-post-keep-grid">
                {keepReading.map((entry) => (
                  <article key={entry.slug} className="writing-post-keep-card">
                    <a className="writing-post-keep-link" href={entry.path}>
                      {entry.thumbnail ? (
                        <div className="writing-post-keep-media">
                          <img src={entry.thumbnail} alt={entry.title} loading="lazy" />
                        </div>
                      ) : null}
                      <div className="writing-post-keep-meta">
                        <div className="writing-post-keep-title">{entry.title}</div>
                        <div className="writing-post-keep-description">
                          {entry.description}
                        </div>
                        <div className="writing-post-keep-date">{entry.displayDate}</div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <CTASection />
      </main>
      <Footer />
      <NewsletterModal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        pill="KEEP READING"
        heading={<>Enjoying the issue?<br />Get the next Good Stuff newsletter in your inbox.</>}
        description="We publish practical notes for SME leaders using AI to improve margin, free up capital, and reduce operational risk. Subscribe to get each issue direct."
        buttonText="Get The Good Stuff"
      />
    </div>
  );
}
