import { NavigationDraft } from "@/components/NavigationDraft";
import "@/components/Hero.css";

export default function TheGoodStuff() {
  return (
    <div className="os-theme os-draft min-h-screen">
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main />
    </div>
  );
}
