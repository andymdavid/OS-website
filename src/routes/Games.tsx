import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { levelUpGames } from "@/levelup/content/games";
import "@/components/Hero.css";
import "@/routes/Writing.css";
import "@/routes/Games.css";

export default function Games() {
  return (
    <div className="os-theme os-draft min-h-screen writing-page games-page">
      <SEO
        title="Games Built with AI"
        description="Playable games built with AI by Other Stuff in Perth — examples of what's possible when you use AI tools to build quickly and experiment freely."
        path="/games"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Games Built with AI",
          "description": "Playable games built with AI by Other Stuff in Perth — examples of what's possible when you use AI tools to build quickly and experiment freely.",
          "url": "https://otherstuff.ai/games",
          "publisher": {
            "@type": "Organization",
            "name": "Other Stuff",
            "url": "https://otherstuff.ai"
          }
        }}
      />
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section writing-hero">
          <div className="section-container-wide writing-hero-inner">
            <div className="hero-title-block">
              <h1>Through our hands-on work with AI, we accidentally became a games studio.</h1>
              <p className="hero-bridge">
                They’re simple, playable examples of what’s possible when you use these tools to build quickly, experiment freely, and turn ideas into working software.
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
            {levelUpGames.map((game, index) => (
              <article key={game.id} className="writing-post">
                <a
                  href={game.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="games-post-link"
                >
                  <div className="writing-post-header">
                    <span className="writing-post-id">[{String(index + 1).padStart(2, "0")}]</span>
                    <div className="writing-post-meta">
                      <div className="writing-post-title">{game.title}</div>
                      <div className="writing-post-description">{game.description}</div>
                    </div>
                  </div>
                  <div className="writing-post-media">
                    <img src={game.image} alt={game.title} loading="lazy" />
                  </div>
                </a>
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
