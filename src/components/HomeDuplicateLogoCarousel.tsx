import './HomeDuplicateLogoCarousel.css';

const logos = [
  { src: '/logos/home-duplicate/adapt.png', alt: 'Adapt' },
  { src: '/logos/home-duplicate/stakwork.png', alt: 'Stakwork' },
  { src: '/logos/home-duplicate/rocky-bay.png', alt: 'Rocky Bay' },
  { src: '/logos/home-duplicate/plantrite.svg', alt: 'Plantrite' },
];

const logoSet = [
  logos[0],
  logos[1],
  logos[2],
  logos[3],
  logos[0],
  logos[1],
  logos[2],
  logos[3],
  logos[0],
  logos[1],
  logos[2],
  logos[3],
];

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="home-duplicate-client-bar__logo-set" aria-hidden={hidden || undefined}>
      {logoSet.map((logo, index) => (
        <img
          key={`${logo.src}-${index}`}
          src={logo.src}
          alt={hidden || index >= logos.length ? '' : logo.alt}
          className="home-duplicate-client-bar__logo"
          loading="eager"
          decoding="async"
        />
      ))}
    </div>
  );
}

export function HomeDuplicateLogoCarousel() {
  return (
    <section className="home-duplicate-client-bar" aria-label="Selected client logos">
      <div className="home-duplicate-client-bar__inner">
        <div className="home-duplicate-client-bar__track">
          <div className="home-duplicate-client-bar__logos">
            <LogoSet />
            <LogoSet hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
