'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      // Light theme: 6 AM to 6 PM (6-18)
      // Dark theme: 6 PM to 6 AM (18-6)
      const newTheme = hour >= 6 && hour < 17 ? 'light' : 'dark';
      setTheme(newTheme);
      
      // Apply theme to document
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
    };

    // Update theme immediately
    updateTheme();

    // Update theme every minute
    const interval = setInterval(updateTheme, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}