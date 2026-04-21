import { NavigationDraft } from "@/components/NavigationDraft";
import { Footer } from "@/components/Footer";
import "@/routes/WritingPost.css";

interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalPageProps {
  backHref: string;
  backLabel: string;
  title: string;
  effectiveDate: string;
  summary: string;
  sections: LegalSection[];
}

export function LegalPage({
  backHref,
  backLabel,
  title,
  effectiveDate,
  summary,
  sections,
}: LegalPageProps) {
  return (
    <div className="os-theme os-draft min-h-screen writing-post-page legal-page">
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section writing-post-hero">
          <div className="section-container-wide writing-post-hero-inner legal-page-hero-inner">
            <a href={backHref} className="writing-post-back">
              {backLabel}
            </a>

            <h1 className="writing-post-title">{title}</h1>

            <div className="writing-post-meta">
              <span className="writing-post-author">Other Stuff Pty Ltd</span>
              <span className="writing-post-date">Effective {effectiveDate}</span>
            </div>

            <p className="writing-post-subheader">{summary}</p>
          </div>
        </section>

        <section className="section writing-post-body">
          <div className="section-container-wide writing-post-body-inner legal-page-body-inner">
            <div className="writing-post-content legal-page-content">
              {sections.map((section) => (
                <section key={section.title} className="legal-section">
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets?.length ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
