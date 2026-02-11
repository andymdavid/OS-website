import { SiteShell } from '@/levelup/components/sections/site-shell';
import '@/levelup/levelup.fonts.css';
import '@/levelup/levelup.generated.css';

export default function LevelUp() {
  return (
    <div className="levelup-theme levelup-theme-vars min-h-screen font-sans">
      <SiteShell />
    </div>
  );
}
