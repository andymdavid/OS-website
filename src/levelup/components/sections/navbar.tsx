
import { useEffect, useState } from "react";
import { Container } from "@/levelup/components/layout/container";
import { Button } from "@/levelup/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/levelup/components/ui/sheet";
import { Menu } from "lucide-react";

interface NavbarProps {
  links: Array<{ label: string; href: string }>;
  cta: {
    label: string;
    href: string;
  };
}

export function Navbar({ links, cta }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full pt-4">
      <div className="flex justify-center px-4">
        <nav className="flex items-center justify-between bg-black rounded-md p-2 w-full max-w-xl">
          {/* Menu Trigger */}
          {mounted ? (
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
                  <Menu className="h-5 w-5" />
                  <span className="text-sm font-medium">Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-black border-r-neutral-800">
                <SheetHeader>
                  <SheetTitle className="text-white font-bungee text-2xl tracking-tight">LEVEL-UP</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={handleLinkClick}
                        className="block px-4 py-3 text-sm font-medium text-white rounded-md transition-colors hover:bg-neutral-800"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <button
              className="flex items-center gap-2 text-white/80"
              type="button"
              aria-hidden="true"
            >
              <Menu className="h-5 w-5" />
              <span className="text-sm font-medium">Menu</span>
            </button>
          )}

          {/* Center Logo */}
          <a
            href="#"
            className="absolute left-1/2 -translate-x-1/2 text-white font-bungee text-3xl tracking-tight"
          >
            LEVEL-UP
          </a>

          {/* Login Button */}
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="bg-[#a1ff62] hover:bg-[#8fe650] text-black rounded-md px-5"
          >
            <a href={cta.href} target="_blank" rel="noopener noreferrer">
              {cta.label}
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
