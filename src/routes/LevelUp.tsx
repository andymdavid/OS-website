import { SEO } from '@/components/SEO';
import { SiteShell } from '@/levelup/components/sections/site-shell';
import { NavigationDraft } from '@/components/NavigationDraft';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { getServiceSchema } from '@/lib/structured-data';
import '@/levelup/levelup.fonts.css';
import '@/levelup/levelup.generated.css';
import '@/levelup/levelup.css';

export default function LevelUp() {
  return (
    <div className="os-theme levelup-theme levelup-theme-vars min-h-screen levelup-page" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SEO
        title="Level Up — AI Incursion for Schools | Perth WA"
        description="A 90-minute AI incursion for Perth and WA schools. Students build a game with AI in a practical school workshop and STEM learning session with no coding required."
        path="/levelup"
        ogImage="/og-levelup.png"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "What age range is Level Up designed for?", "acceptedAnswer": { "@type": "Answer", "text": "Level Up is designed for junior to middle high school students. The workshop supports mixed abilities and does not require any prior coding or technical experience." }},
              { "@type": "Question", "name": "What do students need to participate?", "acceptedAnswer": { "@type": "Answer", "text": "Students need access to a laptop or desktop computer and an internet connection. The workshop is designed to work with standard school devices and existing classroom setups." }},
              { "@type": "Question", "name": "How many students can take part in a session?", "acceptedAnswer": { "@type": "Answer", "text": "Level Up works well with typical class sizes. We can adapt facilitation to suit different group sizes and classroom contexts." }},
              { "@type": "Question", "name": "What role do teachers play during the workshop?", "acceptedAnswer": { "@type": "Answer", "text": "Teachers are welcome to take part alongside students, but are not expected to lead or have prior AI knowledge. The session is facilitated by our team from start to finish." }},
              { "@type": "Question", "name": "What happens after the workshop?", "acceptedAnswer": { "@type": "Answer", "text": "Students leave with a playable game they've built and a practical understanding of how AI works. The workshop is designed to stand alone, while also giving students a strong foundation for future learning." }}
            ]
          },
          {
            ...getServiceSchema({
              path: "/levelup",
              name: "Level Up",
              description: "A private AI incursion for Perth and Western Australia schools where students build a game with AI in a practical STEM learning format.",
              serviceType: "AI incursion for schools",
              audience: {
                "@type": "EducationalAudience",
                educationalRole: "student",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Perth",
                },
                {
                  "@type": "State",
                  name: "Western Australia",
                },
              ],
            }),
            category: [
              "AI incursion for schools",
              "STEM incursion",
              "AI workshop for students",
            ],
          },
        ]}
      />
      <NavigationDraft
        titleSwapOnScroll={{
          before: "OTHER STUFF",
          after: "LEVEL-UP",
          targetId: "hero",
        }}
      />
      <SiteShell />
      <CTASection
        intro="Let's talk about bringing Level-Up to your school."
      />
      <Footer />
    </div>
  );
}
