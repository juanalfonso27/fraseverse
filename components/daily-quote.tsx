'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Quote } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { QuoteActions } from './quote-actions';
import { getRandomQuote } from '@/lib/quotes'; // Import the new function

/**
 * A component to display a "Quote of the Day".
 * It fetches a random quote from Firestore on the client side.
 */
export function DailyQuote() {
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch a new random quote from the server.
  const getNewQuote = useCallback(async () => {
    setIsLoading(true);
    const randomQuote = await getRandomQuote();
    if (randomQuote) {
      setDailyQuote(randomQuote);
    }
    setIsLoading(false);
  }, []);

  // Fetch a random quote on initial client-side mount.
  useEffect(() => {
    getNewQuote();
  }, [getNewQuote]);

  // Renders a loading skeleton while the quote is being fetched.
  if (isLoading) {
    return (
        <Card className="my-8 animate-pulse">
            <CardHeader><div className="h-8 w-3/4 rounded-md bg-muted"></div></CardHeader>
            <CardContent><div className="h-6 w-full rounded-md bg-muted"></div></CardContent>
            <CardFooter><div className="h-4 w-1/4 rounded-md bg-muted"></div></CardFooter>
        </Card>
    )
  }
  
  if (!dailyQuote) {
    // Can render a specific message if no quote could be fetched.
    return null;
  }

  return (
    <Card className="my-8 border-primary/50 bg-card shadow-lg shadow-primary/10 dark:shadow-primary/5">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Frase del día</CardTitle>
          </div>
          <Button variant="outline" onClick={getNewQuote} disabled={isLoading}>
            Nueva Frase
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="text-xl italic">
          <p>"{dailyQuote.text}"</p>
        </blockquote>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <cite className="text-md text-muted-foreground not-italic">— {dailyQuote.author}</cite>
        <QuoteActions quote={dailyQuote} />
      </CardFooter>
    </Card>
  );
}
