import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { RelatedNewsletterLinks } from "@/components/RelatedNewsletterLinks";
import { ValueTrapChart } from "@/components/ValueTrapChart";
import writingPosts from "@/generated/writing-posts.json";
import NotFound from "@/routes/NotFound";
import { useParams } from "react-router-dom";
import "@/routes/WritingPost.css";

const EMBED_MARKER = '<div data-embed="value-trap-chart"></div>';
const relatedNewsletterByPost: Record<string, string[]> = {
  "where-custom-ai-systems-create-margin-first": [
    "is-ai-really-saving-you-time",
    "building-rhinos-not-chasing-unicorns",
  ],
  "navigating-the-ai-value-trap": [
    "building-rhinos-not-chasing-unicorns",
    "tgs-01",
  ],
  "on-the-business-model-of-ai": [
    "building-ai-that-respects-you",
    "is-ai-really-saving-you-time",
  ],
};

export default function WritingPost() {
  const { slug } = useParams();
  const post = writingPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const keepReading = writingPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3);
  const bodyParts = post.html.split(EMBED_MARKER);

  return (
    <div className="os-theme os-draft min-h-screen writing-post-page">
      <SEO
        title={post.title}
        description={post.description}
        path={`/writing/${post.slug}`}
        ogImage={post.ogImage}
        ogType="article"
        publishedTime={post.date}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `https://otherstuff.ai/writing/${post.slug}#article`,
          url: `https://otherstuff.ai/writing/${post.slug}`,
          headline: post.title,
          description: post.description,
          image: `https://otherstuff.ai${post.ogImage ?? post.thumbnail}`,
          datePublished: post.date,
          dateModified: post.date,
          keywords: post.tags.join(', '),
          author: {
            "@type": "Organization",
            name: post.author,
          },
          publisher: {
            "@type": "Organization",
            name: "Other Stuff",
            logo: {
              "@type": "ImageObject",
              url: "https://otherstuff.ai/Logo-Main-Icon.webp",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://otherstuff.ai/writing/${post.slug}`,
          },
        }}
      />
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section writing-post-hero">
          <div className="section-container-wide writing-post-hero-inner">
            <a href="/writing" className="writing-post-back">
              Back to Writing
            </a>

            <h1 className="writing-post-title">{post.title}</h1>

            <div className="writing-post-meta">
              <span className="writing-post-author">{post.author}</span>
              <span className="writing-post-date">{post.displayDate}</span>
              <span className="writing-post-date">{post.readTime}</span>
            </div>

            <div className="writing-post-feature">
              <img src={post.thumbnail} alt={post.title} loading="lazy" />
            </div>

            <p className="writing-post-subheader">
              {post.intro}
            </p>

            <div className="writing-post-share">
              <span>Share</span>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://otherstuff.ai/writing/${post.slug}`} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={`https://twitter.com/intent/tweet?url=https://otherstuff.ai/writing/${post.slug}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                X
              </a>
              <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`https://otherstuff.ai/writing/${post.slug}`)}`} rel="noopener noreferrer">
                Email
              </a>
            </div>
          </div>
        </section>

        <section className="section writing-post-body">
          <div className="section-container-wide writing-post-body-inner">
            <div className="writing-post-content">
              {bodyParts.map((part, index) => (
                <div key={`${post.slug}-part-${index}`}>
                  {part ? (
                    <div dangerouslySetInnerHTML={{ __html: part }} />
                  ) : null}
                  {index < bodyParts.length - 1 ? <ValueTrapChart /> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <RelatedNewsletterLinks
          slugs={relatedNewsletterByPost[post.slug] || []}
          heading="Related Good Stuff issues"
        />

        {keepReading.length > 0 ? (
        <section className="section writing-post-keep-reading">
          <div className="section-container-wide">
            <div className="writing-post-keep-header">
              <h2>Keep reading</h2>
            </div>
            <div className="writing-post-keep-grid">
              {keepReading.map((post) => (
                <article key={post.slug} className="writing-post-keep-card">
                  <a className="writing-post-keep-link" href={`/writing/${post.slug}`}>
                    <div className="writing-post-keep-media">
                      <img src={post.thumbnail} alt={post.title} loading="lazy" />
                    </div>
                    <div className="writing-post-keep-meta">
                      <div className="writing-post-keep-title">{post.title}</div>
                      <div className="writing-post-keep-description">{post.description}</div>
                      <div className="writing-post-keep-date">{post.displayDate}</div>
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
    </div>
  );
}
