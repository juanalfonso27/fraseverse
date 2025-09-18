// This file defines shared TypeScript types used throughout the application.

/**
 * Represents the structure of a single quote object.
 */
export type Quote = {
  id: number;
  text: string;
  author: string;
  category: string;
};

/**
 * Defines the available quote categories as a string literal type for type safety.
 */
export type Category = 'motivation' | 'love' | 'friendship' | 'success' | 'reflection';
