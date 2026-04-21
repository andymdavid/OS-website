import { SEO } from "@/components/SEO";
import { LegalPage } from "@/components/LegalPage";

const sections = [
  {
    title: "1. Who we are",
    paragraphs: [
      "These Terms of Service apply to the Other Stuff website and related pages operated by Other Stuff Pty Ltd (ABN 20 682 110 970) from Western Australia.",
      "If you use this website, you agree to these terms. If you do not agree, you should not use the site.",
    ],
  },
  {
    title: "2. Website purpose",
    paragraphs: [
      "This website provides information about Other Stuff, our services, workshops, products, media, and related offerings.",
      "Content on this site is provided for general information only. It is not professional, legal, financial, or technical advice and should not be relied on as a substitute for advice tailored to your circumstances.",
    ],
  },
  {
    title: "3. Acceptable use",
    paragraphs: [
      "You must use the site lawfully and in a way that does not interfere with the site, our systems, or other users.",
    ],
    bullets: [
      "use the site for unlawful, fraudulent, abusive, or misleading purposes",
      "attempt to gain unauthorised access to the site, accounts, infrastructure, or connected systems",
      "copy, scrape, reproduce, or republish site content except as permitted by law or with our written consent",
      "upload or transmit malicious code, spam, or harmful material through the site",
    ],
  },
  {
    title: "4. Accounts and third-party services",
    paragraphs: [
      "Some links on this site may take you to third-party products, sign-in pages, platforms, or services. Those services are operated by third parties and are subject to their own terms and privacy practices.",
      "Where user accounts or sign-in experiences are provided through third-party systems, we may not directly retain or manage that account information ourselves.",
    ],
  },
  {
    title: "5. Intellectual property",
    paragraphs: [
      "Unless otherwise stated, the content on this site, including text, branding, graphics, layout, images, videos, and downloadable material, is owned by or licensed to Other Stuff Pty Ltd.",
      "You may view the site for personal or internal business reference, but you must not reproduce, adapt, distribute, or commercially exploit site content without prior written permission.",
    ],
  },
  {
    title: "6. External links",
    paragraphs: [
      "This site may contain links to third-party websites, platforms, and content. We provide those links for convenience only.",
      "We are not responsible for third-party sites, their availability, their content, or their privacy and security practices.",
    ],
  },
  {
    title: "7. No warranty",
    paragraphs: [
      "To the maximum extent permitted by law, this website is provided on an 'as is' and 'as available' basis.",
      "We do not guarantee that the site will be uninterrupted, error-free, secure, or always available, or that content will always be complete, current, or suitable for your intended purpose.",
    ],
  },
  {
    title: "8. Liability",
    paragraphs: [
      "To the maximum extent permitted by law, Other Stuff Pty Ltd excludes liability for loss, damage, cost, or expense arising from or in connection with your use of, or inability to use, this site.",
      "Nothing in these terms excludes rights or remedies that cannot be excluded under applicable law, including rights that may arise under the Australian Consumer Law.",
    ],
  },
  {
    title: "9. Privacy",
    paragraphs: [
      "Our handling of personal information is described in our Privacy Policy.",
      "By using the site or submitting information through it, you acknowledge that we may handle personal information in accordance with that policy.",
    ],
  },
  {
    title: "10. Changes",
    paragraphs: [
      "We may update these terms from time to time by publishing a revised version on this website.",
      "The updated version takes effect from the stated effective date.",
    ],
  },
  {
    title: "11. Governing law",
    paragraphs: [
      "These terms are governed by the laws of Western Australia and the laws of the Commonwealth of Australia that apply there.",
      "You submit to the non-exclusive jurisdiction of the courts of Western Australia.",
    ],
  },
  {
    title: "12. Contact",
    paragraphs: [
      "If you have questions about these terms, contact us at info@otherstuff.studio or write to Other Stuff Pty Ltd, City Beach WA 6015, Australia.",
    ],
  },
] as const;

export default function Terms() {
  return (
    <>
    <SEO
      title="Terms of Service"
      description="Terms of Service for the Other Stuff website. Rules, limitations, and legal framework for using otherstuff.ai."
      path="/terms"
    />
    <LegalPage
      backHref="/"
      backLabel="Back to Home"
      title="Terms of Service"
      effectiveDate="1 March 2026"
      summary="These terms govern use of the Other Stuff website and explain the basic rules, limitations, and legal framework that apply when you browse or use this site."
      sections={sections}
    />
    </>
  );
}
