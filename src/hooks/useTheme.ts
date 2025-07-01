
import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light' | 'cyberpunk' | 'ocean' | 'forest';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored && ['dark', 'light', 'cyberpunk', 'ocean', 'forest'].includes(stored)) {
        return stored;
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('light', 'dark', 'cyberpunk', 'ocean', 'forest');
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Store in localStorage
    localStorage.setItem('theme', theme);
    
    // Apply immediate styling based on theme
    const themeStyles = {
      light: { backgroundColor: '#ffffff', color: '#1f2937' },
      dark: { backgroundColor: '#000000', color: '#f3f4f6' },
      cyberpunk: { backgroundColor: '#0a0a0a', color: '#00ffff' },
      ocean: { backgroundColor: '#001122', color: '#87ceeb' },
      forest: { backgroundColor: '#0d1b0d', color: '#90ee90' }
    };

    const styles = themeStyles[theme];
    document.body.style.backgroundColor = styles.backgroundColor;
    document.body.style.color = styles.color;
  }, [theme]);

  const toggleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'cyberpunk', 'ocean', 'forest'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return { theme, setTheme, toggleTheme };
};
