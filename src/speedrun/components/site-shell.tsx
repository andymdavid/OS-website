import { useState } from "react";
import { SectionRenderer } from "@/levelup/components/sections/registry";
import { GetStartedModal } from "@/levelup/components/ui/get-started-modal";
import { siteContent } from "@/speedrun/content/site";

export function SpeedrunSiteShell() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SectionRenderer
        sections={siteContent.sections}
        onGetStarted={() => setModalOpen(true)}
      />
      <GetStartedModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
