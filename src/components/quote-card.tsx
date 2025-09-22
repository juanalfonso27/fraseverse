"use client";

import type { Quote } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useFavorites } from '@/hooks/use-favorites';
import { QuoteActions } from './quote-actions';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface QuoteCardProps {
  quote: Quote;
}

/**
 * A card component to display a single quote.
 * It shows the quote text, author, and category, along with actions.
 * The styling changes if the quote is marked as a favorite.
 */
export function QuoteCard({ quote }: QuoteCardProps) {
  const { isFavorite } = useFavorites();
  const favorite = isFavorite(quote.id);

  const categoryLabels: Record<string, string> = {
    motivation: 'Motivación',
    love: 'Amor',
    friendship: 'Amistad',
    success: 'Éxito',
    reflection: 'Reflexión',
  };

  return (
    <Card className={cn(
      "flex h-full flex-col transition-all duration-300 hover:shadow-xl",
      favorite && "border-primary bg-secondary"
    )}>
      <CardHeader>
        <blockquote className="flex-1">
          <p className="text-lg font-medium leading-relaxed">"{quote.text}"</p>
        </blockquote>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
         <cite className="text-sm text-muted-foreground not-italic">— {quote.author}</cite>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
  <Badge variant="outline">{categoryLabels[quote.category] ?? quote.category}</Badge>
        <QuoteActions quote={quote} />
      </CardFooter>
    </Card>
  );
}
