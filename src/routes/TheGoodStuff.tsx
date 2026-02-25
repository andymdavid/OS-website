import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import "@/components/Hero.css";
import "@/routes/TheGoodStuff.css";

export default function TheGoodStuff() {
  const episodes = [
    {
      id: "01",
      title: "Episode Title",
      description: "Short description of the episode goes here.",
      thumbnail: "/Hero-Background.png",
    },
    {
      id: "02",
      title: "Episode Title",
      description: "Short description of the episode goes here.",
      thumbnail: "/Hero-Background.png",
    },
    {
      id: "03",
      title: "Episode Title",
      description: "Short description of the episode goes here.",
      thumbnail: "/Hero-Background.png",
    },
    {
      id: "04",
      title: "Episode Title",
      description: "Short description of the episode goes here.",
      thumbnail: "/Hero-Background.png",
    },
    {
      id: "05",
      title: "Episode Title",
      description: "Short description of the episode goes here.",
      thumbnail: "/Hero-Background.png",
    },
    {
      id: "06",
      title: "Episode Title",
      description: "Short description of the episode goes here.",
      thumbnail: "/Hero-Background.png",
    },
    {
      id: "07",
      title: "Episode Title",
      description: "Short description of the episode goes here.",
      thumbnail: "/Hero-Background.png",
    },
    {
      id: "08",
      title: "Episode Title",
      description: "Short description of the episode goes here.",
      thumbnail: "/Hero-Background.png",
    },
    {
      id: "09",
      title: "Episode Title",
      description: "Short description of the episode goes here.",
      thumbnail: "/Hero-Background.png",
    },
    {
      id: "10",
      title: "Episode Title",
      description: "Short description of the episode goes here.",
      thumbnail: "/Hero-Background.png",
    },
  ];

  return (
    <div className="os-theme os-draft min-h-screen the-good-stuff-page">
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section good-stuff-hero">
          <div className="section-container-wide good-stuff-hero-inner">
            <div className="hero-title-block">
              <h1>
                {"The Good Stuff is a low-fi dialogue\nwith Pete Winn and Andy David."
                  .split("\n")
                  .map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
              </h1>
              <p className="hero-bridge">
                A podcast exploring our everyday experiences working with artificial intelligence, and how it's changing the rules of work, business, entrepreneurship, the economy and human potential.
              </p>
              <div className="hero-cta">
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = "https://www.youtube.com/@OtherStuffAI")}
                >
                  Explore the Pod
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="section good-stuff-blank">
          <div className="good-stuff-portfolio">
            {episodes.map((episode) => (
              <article key={episode.id} className="good-stuff-episode">
                <div className="good-stuff-episode-header">
                  <span className="good-stuff-episode-id">[{episode.id}]</span>
                  <div>
                    <div className="good-stuff-episode-title">{episode.title}</div>
                    <div className="good-stuff-episode-description">{episode.description}</div>
                  </div>
                </div>
                <div className="good-stuff-episode-media">
                  <img src={episode.thumbnail} alt={episode.title} loading="lazy" />
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
