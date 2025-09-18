"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * Provides theme state (light/dark) to the application and handles
 * persisting the theme to localStorage. It also updates the root HTML element
 * with the 'dark' or 'light' class to apply styles.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'motivavarse-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Effect to read the stored theme from localStorage on initial client-side render.
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme) {
        setTheme(storedTheme);
    } else {
        // Fallback to system preference if no theme is stored.
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        setTheme(systemTheme);
    }
  }, [storageKey]);

  // Effect to apply the theme class to the document and update localStorage.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Custom hook to access the current theme and the function to update it.
 * Must be used within a ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
