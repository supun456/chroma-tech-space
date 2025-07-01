
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
    
    // Apply theme-specific styles to body
    const themeStyles = {
      light: { 
        backgroundColor: '#ffffff', 
        color: '#1f2937',
        '--theme-primary': '#3b82f6',
        '--theme-secondary': '#8b5cf6'
      },
      dark: { 
        backgroundColor: '#000000', 
        color: '#f3f4f6',
        '--theme-primary': '#22d3ee',
        '--theme-secondary': '#8b5cf6'
      },
      cyberpunk: { 
        backgroundColor: '#0a0a0a', 
        color: '#00ffff',
        '--theme-primary': '#00ffff',
        '--theme-secondary': '#ff00ff'
      },
      ocean: { 
        backgroundColor: '#001122', 
        color: '#87ceeb',
        '--theme-primary': '#00bfff',
        '--theme-secondary': '#4682b4'
      },
      forest: { 
        backgroundColor: '#0d1b0d', 
        color: '#90ee90',
        '--theme-primary': '#32cd32',
        '--theme-secondary': '#228b22'
      }
    };

    const styles = themeStyles[theme];
    document.body.style.backgroundColor = styles.backgroundColor;
    document.body.style.color = styles.color;
    
    // Set CSS custom properties for theme colors
    Object.keys(styles).forEach(key => {
      if (key.startsWith('--')) {
        root.style.setProperty(key, styles[key]);
      }
    });
  }, [theme]);

  const toggleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'cyberpunk', 'ocean', 'forest'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return { theme, setTheme, toggleTheme };
};
