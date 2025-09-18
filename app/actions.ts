'use server';

import { searchQuotesWithSynonyms } from '@/ai/flows/keyword-search-synonyms';
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { Category } from '@/types';

/**
 * A server action that enhances a search keyword by generating synonyms using an AI model.
 * This helps to broaden the search results for quotes.
 * 
 * @param keyword The user's original search keyword.
 * @returns An enhanced search string including synonyms, or the original keyword on failure.
 */
export async function getEnhancedSearch(keyword: string) {
    if (!keyword) return '';
    try {
        const result = await searchQuotesWithSynonyms({ keyword });
        return result.enhancedKeyword;
    } catch (error) {
        console.error("AI search enhancement failed:", error);
        // Fallback to the original keyword if the AI service fails.
        return keyword;
    }
}

/**
 * A server action to add a new quote submitted by a user to the Firestore database.
 * The quote is stored in a 'submitted_quotes' collection with a status of 'pending'.
 * 
 * @param quoteData The data for the new quote.
 * @returns An object with the ID of the newly created document.
 */
export async function addQuote(quoteData: { text: string; author: string; category: Category; }) {
    try {
        const docRef = await addDoc(collection(db, "submitted_quotes"), {
            ...quoteData,
            status: 'pending', // 'pending', 'approved', 'rejected'
            createdAt: serverTimestamp(),
        });
        return { id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Could not add quote to database.");
    }
}
