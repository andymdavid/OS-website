import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import "@/components/Hero.css";
import "@/routes/Writing.css";

const posts: Array<{
  id: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
}> = [];

export default function Writing() {
  return (
    <div className="os-theme os-draft min-h-screen writing-page">
      <SEO
        title="Writing"
        description="Notes, ideas, and fieldwork from building with AI. Insights from the Other Stuff team in Perth on practical AI capability."
        path="/writing"
        noindex
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
                  onClick={() => (window.location.href = "mailto:info@otherstuff.studio")}
                >
                  Talk to Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {posts.length > 0 ? (
          <section className="section writing-posts">
            <div className="writing-posts-grid">
              {posts.slice(0, 4).map((post) => (
                <article key={post.id} className="writing-post">
                  <div className="writing-post-header">
                    <span className="writing-post-id">[{post.id}]</span>
                    <div className="writing-post-meta">
                      <div className="writing-post-title">{post.title}</div>
                      <div className="writing-post-description">{post.description}</div>
                      <div className="writing-post-date">{post.date}</div>
                    </div>
                  </div>
                  <div className="writing-post-media">
                    <img src={post.thumbnail} alt={post.title} loading="lazy" />
                  </div>
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
