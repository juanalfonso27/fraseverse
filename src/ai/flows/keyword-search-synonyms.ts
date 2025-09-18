// src/ai/flows/keyword-search-synonyms.ts
'use server';

/**
 * @fileOverview A flow that enhances keyword search by including synonyms.
 *
 * - searchQuotesWithSynonyms - A function that searches quotes using keywords and synonyms.
 * - SearchQuotesWithSynonymsInput - The input type for the searchQuotesWithSynonyms function.
 * - SearchQuotesWithSynonymsOutput - The return type for the searchQuotesWithSynonyms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchQuotesWithSynonymsInputSchema = z.object({
  keyword: z.string().describe('The keyword to search for quotes.'),
});
export type SearchQuotesWithSynonymsInput = z.infer<
  typeof SearchQuotesWithSynonymsInputSchema
>;

const SearchQuotesWithSynonymsOutputSchema = z.object({
  enhancedKeyword: z.string().describe('The keyword including synonyms.'),
});
export type SearchQuotesWithSynonymsOutput = z.infer<
  typeof SearchQuotesWithSynonymsOutputSchema
>;

export async function searchQuotesWithSynonyms(
  input: SearchQuotesWithSynonymsInput
): Promise<SearchQuotesWithSynonymsOutput> {
  return searchQuotesWithSynonymsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'keywordSearchWithSynonymsPrompt',
  input: {schema: SearchQuotesWithSynonymsInputSchema},
  output: {schema: SearchQuotesWithSynonymsOutputSchema},
  prompt: `You are a search enhancer. You take a keyword and return an enhanced keyword that includes synonyms.

Original Keyword: {{{keyword}}}

Enhanced Keyword:`,
});

const searchQuotesWithSynonymsFlow = ai.defineFlow(
  {
    name: 'searchQuotesWithSynonymsFlow',
    inputSchema: SearchQuotesWithSynonymsInputSchema,
    outputSchema: SearchQuotesWithSynonymsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
