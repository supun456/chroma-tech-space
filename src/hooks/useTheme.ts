
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
    
    // Apply comprehensive theme-specific styles
    const themeStyles = {
      light: { 
        '--background': '0 0% 100%',
        '--foreground': '222.2 84% 4.9%',
        '--card': '0 0% 100%',
        '--card-foreground': '222.2 84% 4.9%',
        '--primary': '221.2 83.2% 53.3%',
        '--primary-foreground': '210 40% 98%',
        '--secondary': '210 40% 96.1%',
        '--secondary-foreground': '222.2 47.4% 11.2%',
        '--accent': '210 40% 96.1%',
        '--accent-foreground': '222.2 47.4% 11.2%',
        '--border': '214.3 31.8% 91.4%',
        '--theme-primary': '#3b82f6',
        '--theme-secondary': '#8b5cf6',
        '--theme-bg': '#ffffff',
        '--theme-text': '#1f2937'
      },
      dark: { 
        '--background': '222.2 84% 4.9%',
        '--foreground': '210 40% 98%',
        '--card': '222.2 84% 4.9%',
        '--card-foreground': '210 40% 98%',
        '--primary': '217.2 91.2% 59.8%',
        '--primary-foreground': '222.2 47.4% 11.2%',
        '--secondary': '217.2 32.6% 17.5%',
        '--secondary-foreground': '210 40% 98%',
        '--accent': '217.2 32.6% 17.5%',
        '--accent-foreground': '210 40% 98%',
        '--border': '217.2 32.6% 17.5%',
        '--theme-primary': '#22d3ee',
        '--theme-secondary': '#8b5cf6',
        '--theme-bg': '#000000',
        '--theme-text': '#f3f4f6'
      },
      cyberpunk: { 
        '--background': '0 0% 4%',
        '--foreground': '180 100% 50%',
        '--card': '0 0% 4%',
        '--card-foreground': '180 100% 50%',
        '--primary': '180 100% 50%',
        '--primary-foreground': '0 0% 4%',
        '--secondary': '300 100% 50%',
        '--secondary-foreground': '0 0% 4%',
        '--accent': '180 100% 50%',
        '--accent-foreground': '0 0% 4%',
        '--border': '180 100% 25%',
        '--theme-primary': '#00ffff',
        '--theme-secondary': '#ff00ff',
        '--theme-bg': '#0a0a0a',
        '--theme-text': '#00ffff'
      },
      ocean: { 
        '--background': '210 100% 7%',
        '--foreground': '195 53% 79%',
        '--card': '210 100% 7%',
        '--card-foreground': '195 53% 79%',
        '--primary': '195 100% 50%',
        '--primary-foreground': '210 100% 7%',
        '--secondary': '210 29% 29%',
        '--secondary-foreground': '195 53% 79%',
        '--accent': '195 100% 50%',
        '--accent-foreground': '210 100% 7%',
        '--border': '210 29% 29%',
        '--theme-primary': '#00bfff',
        '--theme-secondary': '#4682b4',
        '--theme-bg': '#001122',
        '--theme-text': '#87ceeb'
      },
      forest: { 
        '--background': '120 100% 5%',
        '--foreground': '120 73% 75%',
        '--card': '120 100% 5%',
        '--card-foreground': '120 73% 75%',
        '--primary': '120 100% 25%',
        '--primary-foreground': '120 100% 5%',
        '--secondary': '120 43% 15%',
        '--secondary-foreground': '120 73% 75%',
        '--accent': '120 100% 25%',
        '--accent-foreground': '120 100% 5%',
        '--border': '120 43% 15%',
        '--theme-primary': '#32cd32',
        '--theme-secondary': '#228b22',
        '--theme-bg': '#0d1b0d',
        '--theme-text': '#90ee90'
      }
    };

    const styles = themeStyles[theme];
    
    // Apply all CSS custom properties
    Object.entries(styles).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply body styles
    document.body.style.backgroundColor = styles['--theme-bg'];
    document.body.style.color = styles['--theme-text'];
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, [theme]);

  const toggleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'cyberpunk', 'ocean', 'forest'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return { theme, setTheme, toggleTheme };
};
