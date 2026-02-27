import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import "@/routes/WritingPost.css";

const keepReading = [
  {
    id: "01",
    title: "Post Title",
    description: "Short description of the post goes here.",
    date: "2026-02-01",
    thumbnail: "/Hero-Background.png",
  },
  {
    id: "02",
    title: "Post Title",
    description: "Short description of the post goes here.",
    date: "2026-01-18",
    thumbnail: "/Hero-Background.png",
  },
  {
    id: "03",
    title: "Post Title",
    description: "Short description of the post goes here.",
    date: "2026-01-04",
    thumbnail: "/Hero-Background.png",
  },
];

export default function WritingPost() {
  return (
    <div className="os-theme os-draft min-h-screen writing-post-page">
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section
          className="section writing-post-hero"
          style={{ paddingTop: "96px", paddingBottom: "24px" }}
        >
          <div className="section-container-wide writing-post-hero-inner">
            <a href="/writing" className="writing-post-back">
              Back to Writing
            </a>

            <h1 className="writing-post-title" style={{ marginTop: "16px" }}>
              Post Title Goes Here
            </h1>

            <div className="writing-post-meta" style={{ marginTop: "12px" }}>
              <span className="writing-post-author">Author Name</span>
              <span className="writing-post-date">Feb 20, 2026</span>
            </div>

            <div className="writing-post-feature" style={{ marginTop: "20px" }}>
              <img src="/Hero-Background.png" alt="Post featured" loading="lazy" />
            </div>

            <p className="writing-post-subheader" style={{ marginTop: "20px" }}>
              Subheader or lead-in summary of the post goes here. Keep it short and
              punchy so readers know what they will get from the piece.
            </p>

            <div className="writing-post-share" style={{ marginTop: "12px" }}>
              <span>Share</span>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                X
              </a>
              <a href="mailto:?subject=The%20Good%20Stuff" target="_blank" rel="noopener noreferrer">
                Email
              </a>
            </div>
          </div>
        </section>

        <section
          className="section writing-post-body"
          style={{ paddingTop: "32px", paddingBottom: "32px" }}
        >
          <div className="section-container-wide writing-post-body-inner">
            <div className="writing-post-content">
              <p>
                This is where the blog content will go. We'll wire this up to markdown
                files next so each post can render headings, paragraphs, and images.
              </p>
              <p>
                Add more paragraphs, pull quotes, and section headers as needed.
              </p>
            </div>
          </div>
        </section>

        <section className="section writing-post-keep-reading">
          <div className="section-container-wide">
            <div className="writing-post-keep-header">
              <h2>Keep reading</h2>
            </div>
            <div className="writing-post-keep-grid">
              {keepReading.map((post) => (
                <article key={post.id} className="writing-post-keep-card">
                  <div className="writing-post-keep-media">
                    <img src={post.thumbnail} alt={post.title} loading="lazy" />
                  </div>
                  <div className="writing-post-keep-meta">
                    <div className="writing-post-keep-title">{post.title}</div>
                    <div className="writing-post-keep-description">{post.description}</div>
                    <div className="writing-post-keep-date">{post.date}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
