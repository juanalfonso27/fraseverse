"use client";

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'motivavarse-favorites';

/**
 * A custom hook to manage a user's favorite quotes.
 * It syncs the list of favorite quote IDs with localStorage.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  // On initial mount, load favorites from localStorage.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
      if (item) {
        setFavorites(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      setFavorites([]);
    }
  }, []);

  // Helper function to update state and localStorage.
  const saveFavorites = (newFavorites: number[]) => {
    try {
      setFavorites(newFavorites);
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  };

  /**
   * Toggles a quote's favorite status.
   * @param quoteId The ID of the quote to toggle.
   */
  const toggleFavorite = useCallback((quoteId: number) => {
    setFavorites(prevFavorites => {
      const isCurrentlyFavorite = prevFavorites.includes(quoteId);
      const newFavorites = isCurrentlyFavorite
        ? prevFavorites.filter((id) => id !== quoteId)
        : [...prevFavorites, quoteId];
      
      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }

      return newFavorites;
    });
  }, []);

  /**
   * Checks if a quote is in the user's favorites.
   * @param quoteId The ID of the quote to check.
   * @returns True if the quote is a favorite, false otherwise.
   */
  const isFavorite = useCallback((quoteId: number) => {
    return favorites.includes(quoteId);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
