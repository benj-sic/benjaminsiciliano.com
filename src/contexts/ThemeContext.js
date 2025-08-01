import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  // Function to get system preference
  const getSystemPreference = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark'; // fallback
  };

  // Function to get stored theme or system preference
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored && (stored === 'light' || stored === 'dark')) {
        return stored;
      }
      return getSystemPreference();
    }
    return 'dark';
  };

  // Function to apply theme to document
  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Initialize theme
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    
    const handleChange = (e) => {
      const stored = localStorage.getItem('theme');
      // Only auto-switch if user hasn't manually set a preference
      if (!stored) {
        const newTheme = e.matches ? 'light' : 'dark';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext }; 