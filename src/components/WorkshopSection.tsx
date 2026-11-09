import { SectionRenderer } from '../levelup/components/sections/registry';
import type { SectionConfig } from '../levelup/content/site';

export function WorkshopSection({ section }: { section: SectionConfig }) {
  return <SectionRenderer sections={[section]} onGetStarted={() => window.dispatchEvent(new Event('os-workshop-signup'))} />;
}
