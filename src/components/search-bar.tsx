"use client";

import { useState, useTransition, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { getEnhancedSearch } from '@/app/actions';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

/**
 * A search bar component that allows users to search for quotes.
 * It uses a server action to get AI-enhanced search terms for better results.
 */
export function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Use a transition to avoid blocking the UI while the search is processed.
    startTransition(async () => {
      const enhancedQuery = await getEnhancedSearch(inputValue);
      onSearch(enhancedQuery);
    });
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Busca frases por palabra clave..."
          className="pl-10 text-base"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Search className="h-5 w-5 md:hidden" />
        )}
        <span className="hidden md:inline">Buscar</span>
      </Button>
    </form>
  );
}
