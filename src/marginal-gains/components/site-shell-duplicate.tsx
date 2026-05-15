import { SectionRenderer } from "@/levelup/components/sections/registry";
import { siteContent } from "@/marginal-gains/content/site-duplicate";

const heroSections = siteContent.sections.filter((s) => s.key === "hero");
const restSections = siteContent.sections.filter((s) => s.key !== "hero");

export function MarginalGainsDuplicateHero() {
  return <SectionRenderer sections={heroSections} />;
}

export function MarginalGainsDuplicateBody() {
  return <SectionRenderer sections={restSections} />;
}
