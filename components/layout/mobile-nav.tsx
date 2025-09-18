"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, LayoutGrid, type LucideIcon, Home, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const links: {
  href: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/favorites", label: "Favoritos", icon: Heart },
  { href: "/enviar-frase", label: "Enviar", icon: Send },
  { href: "/categories", label: "Categorías", icon: LayoutGrid },
];

/**
 * A navigation bar for mobile devices, displayed at the bottom of the screen.
 * It provides quick access to the main sections of the app.
 */
export function MobileNav() {
  const pathname = usePathname();
  
  // Only show the mobile nav on the main pages
  const showNav = ["/", "/favorites", "/categories", "/enviar-frase"].includes(pathname);

  if (!showNav) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 p-2 backdrop-blur-sm md:hidden">
      <div className="grid grid-cols-4 h-full max-w-lg mx-auto font-medium">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group inline-flex flex-col items-center justify-center rounded-lg px-5 py-1.5 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <link.icon className={cn("mb-1 h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className="text-xs">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
