
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme, Theme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

const ThemeSelector = () => {
  const { theme, setTheme, getThemeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const themes: { id: Theme; name: string; icon: string; description: string }[] = [
    { id: 'cyberpunk', name: 'Cyberpunk', icon: '🚀', description: 'Purple + Cyan Neon' },
    { id: 'matrix', name: 'Matrix', icon: '🔋', description: 'Digital Rain Effect' },
    { id: 'quantum', name: 'Quantum', icon: '🌌', description: 'Pink + Teal Glow' },
    { id: 'terminal', name: 'Terminal', icon: '💻', description: 'Green Hacker Style' },
    { id: 'tron', name: 'Tron', icon: '⚡', description: 'Blue Grid System' }
  ];
  
  const currentTheme = getThemeConfig();

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            bg-black/50 backdrop-blur-sm border border-[var(--theme-accent-primary)]/30 
            hover:border-[var(--theme-accent-primary)]/60 text-[var(--theme-text-primary)]
            hover:shadow-[0_0_20px_var(--theme-glow)] transition-all duration-300
            font-mono px-4 py-2 rounded-lg
          `}
        >
          <span className="mr-2">{currentTheme.icon}</span>
          <span className="hidden sm:inline">{currentTheme.name}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="ml-2"
          >
            ▼
          </motion.span>
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`
                absolute top-full right-0 mt-2 w-64 
                bg-black/80 backdrop-blur-md border border-[var(--theme-accent-primary)]/30 
                rounded-lg shadow-[0_0_30px_var(--theme-glow)] overflow-hidden
              `}
            >
              {themes.map((themeOption, index) => (
                <motion.button
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id);
                    setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    w-full p-4 text-left hover:bg-[var(--theme-accent-primary)]/10 
                    transition-all duration-200 border-b border-[var(--theme-accent-primary)]/20
                    ${theme === themeOption.id ? 'bg-[var(--theme-accent-primary)]/20' : ''}
                    group relative overflow-hidden
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{themeOption.icon}</span>
                      <div>
                        <div className="text-[var(--theme-text-primary)] font-semibold font-mono">
                          {themeOption.name}
                        </div>
                        <div className="text-[var(--theme-text-secondary)] text-sm">
                          {themeOption.description}
                        </div>
                      </div>
                    </div>
                    {theme === themeOption.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-[var(--theme-accent-primary)] shadow-[0_0_10px_var(--theme-accent-primary)]"
                      />
                    )}
                  </div>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[var(--theme-accent-primary)]/0 via-[var(--theme-accent-primary)]/20 to-[var(--theme-accent-primary)]/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ThemeSelector;
