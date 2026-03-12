import { LegalPage } from "@/components/LegalPage";

const sections = [
  {
    title: "1. Who we are",
    paragraphs: [
      "This Privacy Policy explains how Other Stuff Pty Ltd (ABN 20 682 110 970) handles personal information collected through this website.",
      "We are based in Western Australia. If you have privacy questions or requests, you can contact us at info@otherstuff.studio.",
    ],
  },
  {
    title: "2. What we collect",
    paragraphs: [
      "The personal information we collect depends on how you interact with the site. At present, the main personal information we collect directly through the website is newsletter signup information, such as your email address.",
      "We may also receive limited technical information through website analytics and hosting infrastructure, such as IP address, browser type, device information, pages viewed, referral sources, and approximate location data.",
    ],
  },
  {
    title: "3. How we collect information",
    paragraphs: [
      "We collect personal information when you provide it directly to us, such as when you subscribe to our newsletter.",
      "We may also collect information automatically through cookies, analytics tools, server logs, and similar technologies used by our site, hosting providers, and service providers.",
    ],
  },
  {
    title: "4. Why we collect and use information",
    paragraphs: [
      "We use personal information to operate the website, provide newsletter updates, understand site usage, improve the site, and communicate with people who have asked to hear from us.",
    ],
    bullets: [
      "send newsletter and related communications",
      "monitor site traffic and performance",
      "improve content, design, and user experience",
      "maintain security, detect misuse, and troubleshoot issues",
      "comply with legal obligations",
    ],
  },
  {
    title: "5. Analytics, cookies, and similar technologies",
    paragraphs: [
      "We may use analytics and measurement tools, including Google Analytics, to understand how visitors use the site.",
      "These tools may use cookies or similar technologies to collect information about your interaction with the site. You can usually control cookies through your browser settings, although some site functionality may be affected if cookies are disabled.",
    ],
  },
  {
    title: "6. Third-party service providers",
    paragraphs: [
      "We may share personal information with trusted service providers who help us operate the website or deliver communications.",
    ],
    bullets: [
      "newsletter and email providers, including Beehiiv",
      "analytics providers, including Google Analytics",
      "hosting and infrastructure providers",
    ],
  },
  {
    title: "7. Disclosure and overseas handling",
    paragraphs: [
      "Some of our service providers may store or process information outside Australia. Where that occurs, information may be handled in other jurisdictions.",
      "We take reasonable steps to work with reputable providers, but the laws in those jurisdictions may differ from Australian privacy laws.",
    ],
  },
  {
    title: "8. Storage and security",
    paragraphs: [
      "We take reasonable steps to protect personal information from misuse, interference, loss, unauthorised access, modification, or disclosure.",
      "No online system can be guaranteed completely secure, but we aim to use appropriate technical and organisational safeguards for the information we hold.",
    ],
  },
  {
    title: "9. Access and correction",
    paragraphs: [
      "You can ask to access or correct personal information we hold about you by contacting us at info@otherstuff.studio.",
      "If you no longer want to receive newsletter communications, you can use the unsubscribe link in those emails or contact us directly.",
    ],
  },
  {
    title: "10. Retention",
    paragraphs: [
      "We keep personal information only for as long as reasonably necessary for the purposes described in this policy, or as required by law.",
      "Information that is no longer needed may be deleted or de-identified where appropriate.",
    ],
  },
  {
    title: "11. Privacy Act note",
    paragraphs: [
      "Australian privacy obligations can depend on factors such as annual turnover, the nature of the information handled, and the way services are provided. Regardless of whether specific provisions of the Privacy Act 1988 (Cth) apply at all times, this policy is intended to explain our current information handling practices in a clear and transparent way.",
    ],
  },
  {
    title: "12. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time by publishing a revised version on the site.",
      "The updated version takes effect from the stated effective date.",
    ],
  },
  {
    title: "13. Contact",
    paragraphs: [
      "If you have a privacy question, complaint, access request, or correction request, contact Other Stuff Pty Ltd at info@otherstuff.studio or write to City Beach WA 6015, Australia.",
    ],
  },
] as const;

export default function Privacy() {
  return (
    <LegalPage
      backHref="/"
      backLabel="Back to Home"
      title="Privacy Policy"
      effectiveDate="1 March 2026"
      summary="This policy explains what personal information we collect through the Other Stuff website, how we use it, and how you can contact us about privacy matters."
      sections={sections}
    />
  );
}
