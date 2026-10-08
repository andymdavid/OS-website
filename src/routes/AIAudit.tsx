import { SEO } from '@/components/SEO';
import { AutomationPartnerHero } from '@/components/AutomationPartnerHero';
import { FooterHomeDuplicate } from '@/components/FooterHomeDuplicate';
import { NavigationDraft } from '@/components/NavigationDraft';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CAL_DISCOVERY_URL } from '@/lib/links';
import { ClipboardCheck, FileText, RefreshCw, Send, UserCheck } from 'lucide-react';
import '@/components/Navigation.css';
import '@/components/IntroSection.css';
import '@/components/Hero.css';
import '@/components/HomeDuplicateGoodStuffStrip.css';
import '@/components/HomeDuplicateCanvasSection.css';
import '@/routes/AIAudit.css';

const automationExamples = [
  {
    title: 'Drafts prepared',
    description: 'Proposals, reports and handover packs are assembled from the information already in your systems.',
    image: '/operating-map/people-workflows-card.png',
    Icon: FileText,
  },
  {
    title: 'Routine checks completed',
    description: 'Figures, documents and records are checked against the rules your team already follows.',
    image: '/operating-map/processes-workflows-card.png',
    Icon: ClipboardCheck,
  },
  {
    title: 'Records updated',
    description: 'When work changes, the corresponding client, project and finance records change with it.',
    image: '/operating-map/tools-workflows-card.png',
    Icon: RefreshCw,
  },
  {
    title: 'Follow-up handled',
    description: 'Enquiries, approvals and overdue items are followed up at the right time.',
    image: '/operating-map/people-workflows-card.png',
    Icon: Send,
  },
  {
    title: 'Work sent for approval',
    description: 'Anything that needs judgement goes to the right person with the information needed to decide.',
    image: '/operating-map/processes-workflows-card.png',
    Icon: UserCheck,
  },
];

export default function AIAudit() {
  useScrollAnimation();

  return (
    <div className="os-theme os-draft os-home-duplicate ai-audit-page">
      <SEO
        title="Automation Partner for SMEs | Other Stuff"
        description="Automate time-consuming processes so you can grow your business without growing your headcount."
        path="/ai-audit"
      />

      <aside className="home-duplicate-good-stuff-strip ai-audit-booking-strip" aria-label="Book an Automation Partner call">
        <a href={CAL_DISCOVERY_URL} target="_blank" rel="noopener noreferrer">
          <span>Let’s start automating your time-consuming processes.</span>
          <strong>Book a free 45-minute call →</strong>
        </a>
      </aside>

      <NavigationDraft showPromoStrip={false} />

      <main>
        <AutomationPartnerHero />

        <section className="section ai-audit-automation-section">
          <div className="section-container-wide">
            <header className="ai-audit-section-intro">
              <div className="intro-pill fade-in">AUTOMATION IN PRACTICE</div>
              <h2 className="section-heading fade-in fade-in-stagger-1">
                What happens when we automate a process.
              </h2>
              <p className="fade-in fade-in-stagger-2">
                The process is different in every business. These are the parts we commonly automate.
              </p>
            </header>

            <div className="operating-map ai-audit-automation-map">
              <div className="ai-audit-automation-grid">
                {automationExamples.map(({ title, description, image, Icon }) => (
                  <article className="operating-map-card operating-map-foundation operating-map-feature-card fade-in" key={title}>
                    <div className="operating-map-feature-copy">
                      <div className="operating-map-feature-title">
                        <Icon aria-hidden="true" />
                        <span>{title}</span>
                      </div>
                      <p>{description}</p>
                    </div>
                    <div className="operating-map-feature-graphic">
                      <img src={image} alt="" loading="lazy" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterHomeDuplicate />
    </div>
  );
}
