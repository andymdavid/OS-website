import { useState } from "react";
import { SectionRenderer } from "@/levelup/components/sections/registry";
import { GetStartedModal } from "@/levelup/components/ui/get-started-modal";
import { siteContent } from "@/marginal-gains/content/site-duplicate";

const heroSections = siteContent.sections.filter((s) => s.key === "hero");
const restSections = siteContent.sections.filter((s) => s.key !== "hero");

export function MarginalGainsDuplicateHero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SectionRenderer
        sections={heroSections}
        onGetStarted={() => setModalOpen(true)}
      />
      <GetStartedModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export function MarginalGainsDuplicateBody() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SectionRenderer
        sections={restSections}
        onGetStarted={() => setModalOpen(true)}
      />
      <GetStartedModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
