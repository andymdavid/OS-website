import { useEffect, useState } from "react";
import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import "@/components/Hero.css";
import "@/routes/TheGoodStuff.css";

export default function TheGoodStuff() {
  const [episodes, setEpisodes] = useState<
    Array<{
      id?: string;
      title: string;
      description: string;
      thumbnail: string;
      link: string;
    }>
  >([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const response = await fetch("/podcast-episodes.json");
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data.items)) {
          setEpisodes(data.items);
        }
      } catch {
        // Silent fallback to empty state.
      }
    };

    loadEpisodes();
  }, []);

  const displayedEpisodes =
    episodes.length > 0
      ? episodes
      : [
          {
            id: "01",
            title: "Episode Title",
            description: "Short description of the episode goes here.",
            thumbnail: "/Hero-Background.webp",
            link: "https://www.youtube.com/@OtherStuffAI",
          },
          {
            id: "02",
            title: "Episode Title",
            description: "Short description of the episode goes here.",
            thumbnail: "/Hero-Background.webp",
            link: "https://www.youtube.com/@OtherStuffAI",
          },
          {
            id: "03",
            title: "Episode Title",
            description: "Short description of the episode goes here.",
            thumbnail: "/Hero-Background.webp",
            link: "https://www.youtube.com/@OtherStuffAI",
          },
          {
            id: "04",
            title: "Episode Title",
            description: "Short description of the episode goes here.",
            thumbnail: "/Hero-Background.webp",
            link: "https://www.youtube.com/@OtherStuffAI",
          },
          {
            id: "05",
            title: "Episode Title",
            description: "Short description of the episode goes here.",
            thumbnail: "/Hero-Background.webp",
            link: "https://www.youtube.com/@OtherStuffAI",
          },
          {
            id: "06",
            title: "Episode Title",
            description: "Short description of the episode goes here.",
            thumbnail: "/Hero-Background.webp",
            link: "https://www.youtube.com/@OtherStuffAI",
          },
          {
            id: "07",
            title: "Episode Title",
            description: "Short description of the episode goes here.",
            thumbnail: "/Hero-Background.webp",
            link: "https://www.youtube.com/@OtherStuffAI",
          },
          {
            id: "08",
            title: "Episode Title",
            description: "Short description of the episode goes here.",
            thumbnail: "/Hero-Background.webp",
            link: "https://www.youtube.com/@OtherStuffAI",
          },
          {
            id: "09",
            title: "Episode Title",
            description: "Short description of the episode goes here.",
            thumbnail: "/Hero-Background.webp",
            link: "https://www.youtube.com/@OtherStuffAI",
          },
          {
            id: "10",
            title: "Episode Title",
            description: "Short description of the episode goes here.",
            thumbnail: "/Hero-Background.webp",
            link: "https://www.youtube.com/@OtherStuffAI",
          },
        ];

  const visibleEpisodes = displayedEpisodes.slice(0, visibleCount);
  const extractEpisodeNumber = (title: string) => {
    const match = title.match(/\bGood Stuff\s+(\d+)/i);
    return match ? match[1] : null;
  };

  return (
    <div className="os-theme os-draft min-h-screen the-good-stuff-page">
      <SEO
        title="The Good Stuff — AI Podcast from Perth"
        description="An Australian AI podcast with Pete Winn and Andy David exploring everyday experiences working with AI and how it's changing work, business, and human potential."
        path="/the-good-stuff"
        schema={{
          "@context": "https://schema.org",
          "@type": "PodcastSeries",
          "name": "The Good Stuff",
          "description": "A low-fi dialogue with Pete Winn and Andy David exploring everyday experiences working with AI and how it's changing work, business, and human potential.",
          "url": "https://otherstuff.ai/the-good-stuff",
          "webFeed": "https://www.youtube.com/feeds/videos.xml?channel_id=UC_OtherStuffAI",
          "author": [
            { "@type": "Person", "name": "Pete Winn" },
            { "@type": "Person", "name": "Andy David" }
          ],
          "publisher": {
            "@type": "Organization",
            "name": "Other Stuff",
            "url": "https://otherstuff.ai"
          },
          "inLanguage": "en-AU"
        }}
      />
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section good-stuff-hero">
          <div className="section-container-wide good-stuff-hero-inner">
            <div className="hero-title-block">
              <h1>
                {"The Good Stuff is a low-fi dialogue with Pete Winn and Andy David."
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
            {visibleEpisodes.map((episode, index) => {
              const episodeNumber = extractEpisodeNumber(episode.title);
              const label = episodeNumber
                ? episodeNumber
                : String(index + 1).padStart(2, "0");
              return (
              <article key={episode.id ?? episode.title} className="good-stuff-episode">
                <div className="good-stuff-episode-header">
                  <span className="good-stuff-episode-id">
                    [{label}]
                  </span>
                  <div>
                    <div className="good-stuff-episode-title">{episode.title}</div>
                    <div className="good-stuff-episode-description">{episode.description}</div>
                  </div>
                </div>
                <a
                  className="good-stuff-episode-media"
                  href={episode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={episode.thumbnail} alt={episode.title} loading="lazy" />
                </a>
              </article>
            );
            })}
          </div>
          {displayedEpisodes.length > visibleCount && (
            <div className="good-stuff-show-more">
              <button
                type="button"
                className="good-stuff-show-more-btn"
                onClick={() => setVisibleCount((count) => Math.min(count + 10, displayedEpisodes.length))}
              >
                Show more
              </button>
            </div>
          )}
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
