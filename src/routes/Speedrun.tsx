import { SpeedrunSiteShell } from "@/speedrun/components/site-shell";
import "@/levelup/levelup.fonts.css";
import "@/levelup/levelup.generated.css";
import "@/speedrun/speedrun.css";

export default function Speedrun() {
  return (
    <div className="os-theme levelup-theme levelup-theme-vars min-h-screen speedrun-page" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SpeedrunSiteShell />
    </div>
  );
}
