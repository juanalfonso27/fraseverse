"use client";

import { Heart, Share2, Copy } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { useToast } from '@/hooks/use-toast';
import type { Quote } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface QuoteActionsProps {
  quote: Quote;
}

/**
 * A component that provides action buttons for a quote, such as 'favorite' and 'share'.
 */
export function QuoteActions({ quote }: QuoteActionsProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  /**
   * Copies the quote text and author to the clipboard and shows a confirmation toast.
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    toast({
      title: "¡Copiado al portapapeles!",
    });
  };

  /**
   * Uses the Web Share API to share the quote. Falls back to copying if the API is not available.
   */
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Frase de MotivaVerse',
        text: `"${quote.text}" — ${quote.author}`,
        url: window.location.origin,
      }).catch(console.error);
    } else {
      handleCopy();
      toast({
        title: "¡Copiado al portapapeles!",
        description: "La función de compartir no es compatible con este navegador.",
      });
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => toggleFavorite(quote.id)}
        aria-label="Marcar como favorito"
      >
        <Heart
          className={cn('h-5 w-5 transition-colors', {
            'fill-primary text-primary': isFavorite(quote.id),
            'text-muted-foreground': !isFavorite(quote.id),
          })}
        />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Compartir frase">
                <Share2 className="h-5 w-5 text-muted-foreground" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Compartir</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copiar Texto</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  );
}
