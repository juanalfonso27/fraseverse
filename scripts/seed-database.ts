// To run this script, from the root of your project:
// npx tsx src/scripts/seed-database.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, writeBatch, doc } from "firebase/firestore";
import * as fs from 'fs';
import * as path from 'path';

// IMPORTANT: Replace with your actual Firebase project configuration
const firebaseConfig = {
  projectId: "studio-8796513175-54517",
  appId: "1:328726928315:web:23a42f4d09fc21e847829e",
  storageBucket: "studio-8796513175-54517.firebasestorage.app",
  apiKey: "AIzaSyCNtzNmELdOmcYER5mES3gAzzeYobwIZ5Y",
  authDomain: "studio-8796513175-54517.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "328726928315"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

type Quote = {
  id: number;
  text: string;
  author: string;
  category: string;
};

async function seedDatabase() {
  try {
    console.log("Reading quotes from JSON file...");
    // Adjust the path to be relative to the script's execution location (project root)
    const filePath = path.join(process.cwd(), 'src', 'lib', 'quotes.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const quotes: Quote[] = JSON.parse(fileContent);
    console.log(`Found ${quotes.length} quotes.`);

    if (quotes.length === 0) {
      console.log("No quotes to seed. Exiting.");
      return;
    }

    const quotesCollection = collection(db, "quotes");
    const batch = writeBatch(db);

    quotes.forEach((quote) => {
      // Create a document with a specific ID (using the quote's numeric id as a string)
      const docRef = doc(quotesCollection, String(quote.id));
      batch.set(docRef, quote);
    });

    console.log("Starting to write batch to Firestore...");
    await batch.commit();
    console.log("✅ Successfully seeded the database with all quotes!");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

seedDatabase().then(() => {
  // The process will exit automatically when the async operations are done.
  // We add a small delay to ensure logs are flushed.
  setTimeout(() => process.exit(0), 1000);
});
