"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { getQuotes } from "@/lib/quotes";
import { QuoteCard } from "@/components/quote-card";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { Quote } from "@/types";

/**
 * The Favorites page, which displays all quotes the user has saved.
 * It uses the `useFavorites` hook to get the list of favorite quote IDs.
 */
export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const allQuotes = getQuotes() || []; // <-- Solución: Asegurarse de que allQuotes sea un array
  const favoriteQuotes = allQuotes.filter((quote) => favorites.includes(quote.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <Heart className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold">Tus Favoritos</h1>
      </div>
      {favoriteQuotes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteQuotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-20 text-center">
          <Heart className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h2 className="font-headline text-2xl font-semibold">Aún no tienes favoritos</h2>
          <p className="mt-2 text-muted-foreground">
            Empieza a añadir frases a tus favoritos para verlas aquí.
          </p>
        </div>
      )}
    </div>
  );
}
