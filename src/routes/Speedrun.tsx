import { SpeedrunSiteShell } from "@/speedrun/components/site-shell";
import "@/levelup/levelup.fonts.css";
import "@/levelup/levelup.generated.css";
import "@/speedrun/speedrun.css";

export default function Speedrun() {
  return (
    <div className="levelup-theme levelup-theme-vars min-h-screen font-sans">
      <SpeedrunSiteShell />
    </div>
  );
}
