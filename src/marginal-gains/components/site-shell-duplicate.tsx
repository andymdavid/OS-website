import { SectionRenderer } from "@/levelup/components/sections/registry";
import { siteContent } from "@/marginal-gains/content/site-duplicate";

const heroSections = siteContent.sections.filter((s) => s.key === "hero");
const approachSections = siteContent.sections.filter((s) => s.id === "twoColumn");
const restSections = siteContent.sections.filter(
  (s) => s.key !== "hero" && s.id !== "twoColumn" && s.id !== "twoColumn-6",
);

export function MarginalGainsDuplicateHero() {
  return <SectionRenderer sections={heroSections} />;
}

export function MarginalGainsApproachSection() {
  return <SectionRenderer sections={approachSections} />;
}

export function MarginalGainsDuplicateBody() {
  return <SectionRenderer sections={restSections} />;
}
