import React, { createContext, useContext, useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check if theme preference is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Update data-theme attribute on document root
    document.documentElement.setAttribute('data-theme', theme);
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      <div 
        className={`theme-transition-overlay ${isTransitioning ? 'active' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 9999
        }}
      />
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          zIndex: 1000,
          fontSize: '1.5rem'
        }}
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    </ThemeContext.Provider>
  );
} 