import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import "@/components/Hero.css";
import "@/routes/Writing.css";

const posts = [
  {
    id: "01",
    title: "Post Title",
    description: "Short description of the post goes here.",
    date: "2026-02-01",
  },
  {
    id: "02",
    title: "Post Title",
    description: "Short description of the post goes here.",
    date: "2026-01-18",
  },
  {
    id: "03",
    title: "Post Title",
    description: "Short description of the post goes here.",
    date: "2026-01-04",
  },
  {
    id: "04",
    title: "Post Title",
    description: "Short description of the post goes here.",
    date: "2025-12-20",
  },
  {
    id: "05",
    title: "Post Title",
    description: "Short description of the post goes here.",
    date: "2025-12-06",
  },
  {
    id: "06",
    title: "Post Title",
    description: "Short description of the post goes here.",
    date: "2025-11-22",
  },
  {
    id: "07",
    title: "Post Title",
    description: "Short description of the post goes here.",
    date: "2025-11-08",
  },
  {
    id: "08",
    title: "Post Title",
    description: "Short description of the post goes here.",
    date: "2025-10-25",
  },
];

export default function Writing() {
  return (
    <div className="os-theme os-draft min-h-screen writing-page">
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

        <section className="section writing-posts">
          <div className="writing-posts-grid">
            {posts.map((post) => (
              <article key={post.id} className="writing-post">
                <div className="writing-post-header">
                  <span className="writing-post-id">[{post.id}]</span>
                  <div className="writing-post-meta">
                    <div className="writing-post-title">{post.title}</div>
                    <div className="writing-post-description">{post.description}</div>
                    <div className="writing-post-date">{post.date}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
