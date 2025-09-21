import Link from "next/link";
import Image from 'next/image';
import { Menu, Heart, LayoutGrid, Send } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
    { href: "/favorites", label: "Favoritos", icon: Heart },
    { href: "/categories", label: "Categorías", icon: LayoutGrid },
    { href: "/enviar-frase", label: "Enviar Frase", icon: Send },
];

/**
 * The main application header.
 * Includes branding, theme toggle, and navigation menu.
 */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-0">
          <Image src="/logo.png" alt="MotivaVerse Logo" width={56} height={56} priority className="h-14 w-14" />
          <span className="font-headline text-lg font-bold">FraseVerse</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-4 md:flex">
              <Link href="/favorites" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Favoritos</Link>
              <Link href="/categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Categorías</Link>
              <Link href="/enviar-frase" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Enviar Frase</Link>
          </nav>
          <ThemeToggle />
          <div className="md:hidden">
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                      <Menu />
                      <span className="sr-only">Abrir menú</span>
                  </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                  {navLinks.map((link) => (
                      <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="flex items-center gap-2">
                          <link.icon className="h-4 w-4" />
                          <span>{link.label}</span>
                      </Link>
                      </DropdownMenuItem>
                  ))}
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
