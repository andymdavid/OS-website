import { FooterHomeDuplicate } from '@/components/FooterHomeDuplicate';
import { HomeDuplicateWingmanBenefits } from '@/components/HomeDuplicateWingmanBenefits';
import { NavigationDraft } from '@/components/NavigationDraft';
import { SEO } from '@/components/SEO';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import '@/components/Hero.css';
import './Wingman.css';

export default function Wingman() {
  useScrollAnimation();

  return (
    <div className="os-theme os-draft os-home-duplicate os-wingman-page">
      <SEO
        title="Wingman | AI Operating Infrastructure"
        description="Wingman is the operating layer for running AI agents, software, records, approvals and workflows reliably inside your business."
        path="/wingman"
      />
      <NavigationDraft />
      <main>
        <section className="hero-extended wingman-product-hero">
          <div className="hero-sticky">
            <div className="hero-inner">
              <div className="hero-title-block">
                <div className="hero-logo">
                  <img src="/wingman-mark-white.png" alt="Wingman" />
                </div>
                <h1 className="hero-duplicate-heading">The operating layer for AI inside your business.</h1>
                <p>Hero content coming soon.</p>
              </div>
            </div>
          </div>
        </section>
        <HomeDuplicateWingmanBenefits />
      </main>
      <FooterHomeDuplicate />
    </div>
  );
}
