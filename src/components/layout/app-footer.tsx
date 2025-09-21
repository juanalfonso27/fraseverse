import Image from 'next/image';
import { Heart } from "lucide-react";
import Link from "next/link";

/**
 * The main application footer.
 * Includes branding, copyright, and links.
 */
export function AppFooter() {
  return (
    <footer className="border-t bg-background/80">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center space-x-0">
                    <Image src="/logo.png" alt="fraseVerse Logo" width={56} height={56} priority className="h-14 w-14" />
          
          <span className="font-headline text-lg font-bold">FraseVerse</span>
        </div>
        <p className="flex items-center gap-1.5 text-center text-sm text-muted-foreground">
          <Link href="/enviar-frase" className="font-semibold text-foreground hover:text-primary hover:underline">
            Envía tu Frase
          </Link>
          <span className="mx-2">|</span>
          <span>
            Hecho con <Heart className="inline-block h-4 w-4 fill-primary text-primary" /> por{' '}
            <a
              href="https://www.instagram.com/juan_vazquez018"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-primary hover:underline"
            >
              Juan Alfonso
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
