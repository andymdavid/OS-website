import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import writingPosts from "@/generated/writing-posts.json";
import "@/components/Hero.css";
import "@/routes/Writing.css";

export default function Writing() {
  return (
    <div className="os-theme os-draft min-h-screen writing-page">
      <SEO
        title="Writing on AI Systems, Operations, and the Value Trap"
        description="Essays and field notes from Other Stuff on custom AI systems, AI workflow automation, operations, and the economic implications of AI."
        path="/writing"
      />
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section writing-hero">
          <div className="section-container-wide writing-hero-inner">
            <div className="hero-title-block">
              <h1>Writing</h1>
              <p className="hero-bridge">
                Notes, ideas, and fieldwork from building with AI.
              </p>
              <div className="hero-cta">
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Talk to Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {writingPosts.length > 0 ? (
          <section className="section writing-posts">
            <div className="writing-posts-grid">
              {writingPosts.map((post, index) => (
                <article key={post.slug} className="writing-post">
                  <a className="writing-post-link" href={`/writing/${post.slug}`}>
                    <div className="writing-post-media">
                      <img src={post.thumbnail} alt={post.title} loading="lazy" />
                    </div>
                    <div className="writing-post-header">
                      <span className="writing-post-id">[{String(index + 1).padStart(2, "0")}]</span>
                      <div className="writing-post-meta">
                        <div className="writing-post-title">{post.title}</div>
                        <div className="writing-post-description">{post.description}</div>
                        <div className="writing-post-date">{post.displayDate}</div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
