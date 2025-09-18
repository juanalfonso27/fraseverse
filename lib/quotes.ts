import type { Quote } from '@/types';
import { db } from './firebase';
import { collection, getDocs, query, Query, DocumentData, QueryDocumentSnapshot, limit, startAfter, orderBy, where } from 'firebase/firestore';

/**
 * Fetches a single random quote from the Firestore 'quotes' collection.
 * It uses a random number and the quote ID to approximate randomness.
 *
 * @returns A single quote object or null if an error occurs.
 */
export async function getRandomQuote(): Promise<Quote | null> {
    try {
        // This is an approximation. For a precise count, a separate counter document would be needed.
        const totalQuotes = 1050; 
        const randomIndex = Math.floor(Math.random() * totalQuotes) + 1;

        const quotesCollection = collection(db, 'quotes');

        // Query for a quote with an ID greater than or equal to the random index
        let q = query(quotesCollection, where("id", ">=", randomIndex), limit(1));
        let querySnapshot = await getDocs(q);

        // If no quote is found (e.g., random index is too high), try querying backwards.
        if (querySnapshot.empty) {
            q = query(quotesCollection, where("id", "<", randomIndex), orderBy("id", "desc"), limit(1));
            querySnapshot = await getDocs(q);
        }

        if (querySnapshot.empty) {
            return null; // Should not happen if there are quotes in the collection.
        }

        return querySnapshot.docs[0].data() as Quote;

    } catch (error) {
        console.error("Error fetching random quote from Firestore:", error);
        return null;
    }
}


/**
 * Fetches quotes from the Firestore 'quotes' collection with pagination.
 * 
 * @param pageSize The number of quotes to fetch per page.
 * @param lastDoc The last document snapshot from the previous fetch to use for pagination.
 * @param category The category to filter quotes by.
 * @returns An object containing the list of quotes and the last visible document snapshot.
 */
export async function getQuotes(
    pageSize: number = 6, 
    lastDoc: QueryDocumentSnapshot<DocumentData> | null = null,
    category?: string
): Promise<{ quotes: Quote[], lastVisible: QueryDocumentSnapshot<DocumentData> | null }> {
    try {
        const quotesCollection = collection(db, 'quotes');
        let q: Query<DocumentData>;

        // Base query with ordering and limit
        const queryConstraints = [
            orderBy("id"),
            limit(pageSize)
        ];

        // Add category filter if provided
        if (category) {
            q = query(quotesCollection, where("category", "==", category), ...queryConstraints);
        } else {
            q = query(quotesCollection, ...queryConstraints);
        }

        // Add pagination if lastDoc is provided
        if (lastDoc) {
            q = query(q, startAfter(lastDoc));
        }

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { quotes: [], lastVisible: null };
        }

        const quotes = querySnapshot.docs.map(doc => doc.data() as Quote);
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        
        return { quotes, lastVisible };
    } catch (error) {
        console.error("Error fetching from Firestore:", error);
        return { quotes: [], lastVisible: null };
    }
}
