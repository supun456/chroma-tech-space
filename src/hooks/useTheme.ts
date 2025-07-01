
import { useState, useEffect } from 'react';

export type Theme = 'cyberpunk' | 'matrix' | 'quantum' | 'terminal' | 'tron';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio-theme') as Theme;
      if (stored && ['cyberpunk', 'matrix', 'quantum', 'terminal', 'tron'].includes(stored)) {
        return stored;
      }
    }
    return 'cyberpunk';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('cyberpunk', 'matrix', 'quantum', 'terminal', 'tron');
    root.classList.add(theme);
    
    // Store in localStorage
    localStorage.setItem('portfolio-theme', theme);
    
    // Theme-specific CSS variables
    const themeStyles = {
      cyberpunk: {
        '--theme-bg-primary': '#0a0a0a',
        '--theme-bg-secondary': '#1a0826',
        '--theme-bg-tertiary': '#0f0514',
        '--theme-accent-primary': '#00ffff',
        '--theme-accent-secondary': '#7f5af0',
        '--theme-accent-tertiary': '#ff00ff',
        '--theme-text-primary': '#ffffff',
        '--theme-text-secondary': '#b4b4b8',
        '--theme-border': 'rgba(0, 255, 255, 0.3)',
        '--theme-glow': 'rgba(0, 255, 255, 0.5)',
        '--font-family': '"Orbitron", "Courier New", monospace'
      },
      matrix: {
        '--theme-bg-primary': '#000000',
        '--theme-bg-secondary': '#001100',
        '--theme-bg-tertiary': '#002200',
        '--theme-accent-primary': '#00ff00',
        '--theme-accent-secondary': '#00cc00',
        '--theme-accent-tertiary': '#008800',
        '--theme-text-primary': '#00ff00',
        '--theme-text-secondary': '#00cc00',
        '--theme-border': 'rgba(0, 255, 0, 0.3)',
        '--theme-glow': 'rgba(0, 255, 0, 0.5)',
        '--font-family': '"Share Tech Mono", "Courier New", monospace'
      },
      quantum: {
        '--theme-bg-primary': '#0d1117',
        '--theme-bg-secondary': '#161b22',
        '--theme-bg-tertiary': '#21262d',
        '--theme-accent-primary': '#ff66c4',
        '--theme-accent-secondary': '#22d3ee',
        '--theme-accent-tertiary': '#a855f7',
        '--theme-text-primary': '#f0f6fc',
        '--theme-text-secondary': '#8b949e',
        '--theme-border': 'rgba(255, 102, 196, 0.3)',
        '--theme-glow': 'rgba(255, 102, 196, 0.5)',
        '--font-family': '"Inter", "SF Pro Display", sans-serif'
      },
      terminal: {
        '--theme-bg-primary': '#000000',
        '--theme-bg-secondary': '#0a0a0a',
        '--theme-bg-tertiary': '#1a1a1a',
        '--theme-accent-primary': '#00ff00',
        '--theme-accent-secondary': '#ffff00',
        '--theme-accent-tertiary': '#ff0000',
        '--theme-text-primary': '#00ff00',
        '--theme-text-secondary': '#008800',
        '--theme-border': 'rgba(0, 255, 0, 0.5)',
        '--theme-glow': 'rgba(0, 255, 0, 0.7)',
        '--font-family': '"Ubuntu Mono", "Consolas", monospace'
      },
      tron: {
        '--theme-bg-primary': '#001122',
        '--theme-bg-secondary': '#001a33',
        '--theme-bg-tertiary': '#002244',
        '--theme-accent-primary': '#00ccff',
        '--theme-accent-secondary': '#0088cc',
        '--theme-accent-tertiary': '#ffffff',
        '--theme-text-primary': '#ffffff',
        '--theme-text-secondary': '#88ccff',
        '--theme-border': 'rgba(0, 204, 255, 0.4)',
        '--theme-glow': 'rgba(0, 204, 255, 0.6)',
        '--font-family': '"Audiowide", "Orbitron", sans-serif'
      }
    };

    const styles = themeStyles[theme];
    
    // Apply CSS variables
    Object.entries(styles).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply body styles with theme
    document.body.style.backgroundColor = styles['--theme-bg-primary'];
    document.body.style.color = styles['--theme-text-primary'];
    document.body.style.fontFamily = styles['--font-family'];
    document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  }, [theme]);

  const cycleTheme = () => {
    const themes: Theme[] = ['cyberpunk', 'matrix', 'quantum', 'terminal', 'tron'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeConfig = () => {
    const configs = {
      cyberpunk: {
        name: 'Cyberpunk',
        icon: '🚀',
        background: 'bg-gradient-to-br from-black via-purple-900/30 to-black',
        primary: 'text-cyan-400',
        secondary: 'text-purple-400',
        accent: 'border-cyan-400',
        glow: 'shadow-cyan-400/50'
      },
      matrix: {
        name: 'Matrix',
        icon: '🔋',
        background: 'bg-gradient-to-br from-black via-green-900/20 to-black',
        primary: 'text-green-400',
        secondary: 'text-green-300',
        accent: 'border-green-400',
        glow: 'shadow-green-400/50'
      },
      quantum: {
        name: 'Quantum',
        icon: '🌌',
        background: 'bg-gradient-to-br from-gray-900 via-pink-900/20 to-gray-900',
        primary: 'text-pink-400',
        secondary: 'text-cyan-300',
        accent: 'border-pink-400',
        glow: 'shadow-pink-400/50'
      },
      terminal: {
        name: 'Terminal',
        icon: '💻',
        background: 'bg-black',
        primary: 'text-green-400',
        secondary: 'text-yellow-400',
        accent: 'border-green-400',
        glow: 'shadow-green-400/70'
      },
      tron: {
        name: 'Tron',
        icon: '⚡',
        background: 'bg-gradient-to-br from-blue-950 via-blue-900/30 to-black',
        primary: 'text-blue-400',
        secondary: 'text-cyan-300',
        accent: 'border-blue-400',
        glow: 'shadow-blue-400/60'
      }
    };
    
    return configs[theme];
  };

  return { 
    theme, 
    setTheme, 
    cycleTheme, 
    getThemeConfig 
  };
};
