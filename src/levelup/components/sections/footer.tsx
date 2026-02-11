import { Container } from "@/levelup/components/layout/container";
import {
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

// Custom TikTok icon since lucide doesn't have one
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

interface FooterProps {
  logo: string;
  logoText?: string;
  tagline?: string;
  links: Array<{
    title: string;
    items: Array<{ label: string; href: string }>;
  }>;
  social: Array<{ platform: string; href: string }>;
  contact?: {
    email?: string;
    phone?: string;
    address?: string[];
  };
  privacyLink?: {
    label: string;
    href: string;
  };
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  tiktok: TikTokIcon,
  instagram: Instagram,
  youtube: Youtube,
};

export function Footer({ logo, logoText, links, social, contact, privacyLink }: FooterProps) {
  const navItems = links.flatMap((group) => group.items).slice(0, 4);

  return (
    <footer className="relative overflow-hidden bg-[#2a2a2a] min-h-[400px] sm:min-h-[300px]">
      {/* Curved background shape */}
      <div className="absolute bottom-0 left-4 right-4 sm:left-10 sm:right-10 h-96 sm:h-72">
        <div className="relative h-full w-full overflow-hidden rounded-t-[28px] bg-[#1a1a1a]">
          <div className="h-full w-full bg-[#1a1a1a] [clip-path:polygon(0_70%,100%_15%,100%_100%,0_100%)]" />
          {/* Other Stuff logo + label */}
          <div className="absolute top-6 left-6 sm:left-8 md:left-10 flex items-center gap-3 text-white">
            <img
              src="/OS-Logo-Icon.png"
              alt="Other Stuff logo"
              width={36}
              height={36}
              className="h-9 w-9"
              loading="lazy"
            />
            <span className="font-alfabet text-[18px] sm:text-[20px] leading-none">
              Other Stuff
            </span>
          </div>
        </div>
      </div>

      {/* Large GETHYPED logo on the left */}
      <div className="absolute bottom-4 left-6 sm:left-8 md:left-12 z-10">
        <div
          className="font-bungee text-[54px] sm:text-[100px] md:text-[140px] lg:text-[180px] leading-none text-white tracking-tighter"
          style={{ transform: "translateY(14%)" }}
        >
          {logoText || logo}
        </div>
      </div>

      <Container>
        <div className="relative z-10 pt-12 pb-24 min-h-[400px] sm:min-h-[300px] flex flex-col justify-start md:justify-end md:pt-6 md:pb-6 px-4 sm:px-0">
          {/* Main content - right aligned */}
          <div className="flex flex-col items-start md:items-end gap-6 text-left md:text-right pl-2 sm:pl-0">
            {/* Navigation and Contact Row */}
            <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-12 md:justify-end">
              {/* Navigation pills */}
              <div className="flex flex-wrap items-center justify-end gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#201d1d] shadow-sm hover:shadow-md transition-shadow"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Contact info */}
              {contact && (
                <div className="text-left md:text-right text-sm text-white/80">
                  <div className="font-semibold mb-1 text-white">Contact</div>
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {contact.email}
                    </a>
                  )}
                  {contact.phone && <div>{contact.phone}</div>}
                  {contact.address && contact.address.length > 0 && (
                    <>
                      {contact.address.map((line, i) => (
                        <div key={i}>
                          {i === 0 ? (
                            <a
                              href="https://otherstuff.ai"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white transition-colors"
                            >
                              {line}
                            </a>
                          ) : (
                            line
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Social icons */}
            {social.length > 0 && (
              <div className="flex items-center justify-start md:justify-end gap-3">
                <span className="text-xs font-semibold text-white/80">
                  Follow us
                </span>
                {social.map((item) => {
                  const Icon = socialIcons[item.platform.toLowerCase()];
                  return (
                    <a
                      key={item.platform}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#201d1d] shadow-sm hover:shadow-md transition-shadow"
                      aria-label={item.platform}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom row - copyright and privacy */}
          <div className="mt-6 md:mt-8 flex items-end justify-start md:justify-end gap-4 pb-0">
            {privacyLink && (
              <a
                href={privacyLink.href}
                className="text-xs text-[#201d1d]/60 hover:text-[#201d1d] transition-colors"
              >
                {privacyLink.label}
              </a>
            )}
            <div className="text-xs text-white/60">
              © 2025 Other Stuff Pty Ltd. All rights reserved.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
