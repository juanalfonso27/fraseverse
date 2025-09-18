"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Quote } from '@/types';
import { QuoteCard } from './quote-card';
import { CategoryFilter } from './category-filter';
import { SearchBar } from './search-bar';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, startAfter, limit, getDocs, where, Query, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface QuoteListProps {
  initialCategory?: string;
}

const QUOTES_PER_PAGE = 6;

/**
 * A client component that manages and displays the list of quotes with pagination from Firestore.
 * It handles client-side filtering, searching, and fetching more quotes on demand.
 */
export function QuoteList({ initialCategory }: QuoteListProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory || null);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchQuotes = useCallback(async (loadMore = false) => {
    if (!loadMore) {
      setLoading(true);
      setQuotes([]);
      setLastVisible(null);
    } else {
      setLoadingMore(true);
    }

    try {
      let q: Query<DocumentData>;

      if (activeCategory) {
        q = query(collection(db, 'quotes'), where('category', '==', activeCategory), orderBy('id'), limit(QUOTES_PER_PAGE));
      } else {
        q = query(collection(db, 'quotes'), orderBy('id'), limit(QUOTES_PER_PAGE));
      }

      if (loadMore && lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const documentSnapshots = await getDocs(q);

      let newQuotes = documentSnapshots.docs.map(doc => doc.data() as Quote);
      
      // Client-side search filtering
      if (searchQuery) {
        const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
        newQuotes = newQuotes.filter(q => 
            searchTerms.some(term => 
                q.text.toLowerCase().includes(term) || q.author.toLowerCase().includes(term)
            )
        );
      }

      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastDoc);

      if (documentSnapshots.empty || documentSnapshots.docs.length < QUOTES_PER_PAGE) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setQuotes(prevQuotes => loadMore ? [...prevQuotes, ...newQuotes] : newQuotes);

    } catch (error) {
      console.error("Error fetching quotes: ", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [activeCategory, lastVisible, searchQuery]);

  // Initial fetch and fetch when filters change
  useEffect(() => {
    // Reset and fetch new data when filters change
    setQuotes([]);
    setLastVisible(null);
    setHasMore(true);
    fetchQuotes(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, searchQuery]);

  // Effect to handle initialCategory prop changes
  useEffect(() => {
    setActiveCategory(initialCategory || null);
  }, [initialCategory]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchQuotes(true);
    }
  };

  return (
    <div className="py-8 w-full">
      <div className="space-y-6">
        <SearchBar onSearch={setSearchQuery} />
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      <Separator className="my-8" />

      {loading && !loadingMore ? (
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: QUOTES_PER_PAGE }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
          ))}
        </div>
      ) : quotes.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>
          {hasMore && (
            <div className="mt-8 flex justify-center">
              <Button onClick={handleLoadMore} size="lg" disabled={loadingMore}>
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Cargando...
                  </>
                ) : (
                  "Ver más"
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="col-span-full mt-10 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-20 text-center">
          <h2 className="font-headline text-2xl font-semibold">No se encontraron frases</h2>
          <p className="mt-2 text-muted-foreground">
            Intenta ajustar tu búsqueda o filtros.
          </p>
        </div>
      )}
    </div>
  );
}
