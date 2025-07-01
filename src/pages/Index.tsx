
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Navigation from '@/components/portfolio/Navigation';
import InteractiveBackground from '@/components/portfolio/InteractiveBackground';
import ThemeSelector from '@/components/portfolio/ThemeSelector';
import { useTheme } from '@/hooks/useTheme';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, getThemeConfig } = useTheme();

  useEffect(() => {
    setMounted(true);
    
    // Load theme-specific fonts
    const fontLinks = {
      cyberpunk: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap',
      matrix: 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap',
      quantum: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap',
      terminal: 'https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap',
      tron: 'https://fonts.googleapis.com/css2?family=Audiowide&family=Orbitron:wght@400;700&display=swap'
    };

    // Preload font for current theme
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontLinks[theme];
    document.head.appendChild(link);

    return () => {
      // Cleanup font link if needed
      const existingLink = document.querySelector(`link[href="${fontLinks[theme]}"]`);
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };
  }, [theme]);

  const pageVariants = {
    initial: { 
      opacity: 0,
      scale: 0.98,
      filter: 'blur(4px)'
    },
    in: { 
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    out: { 
      opacity: 0,
      scale: 1.02,
      filter: 'blur(4px)'
    }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
    duration: 0.8
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <motion.div
            className="absolute inset-0 w-12 h-12 border-2 border-purple-400 border-b-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    );
  }

  const themeConfig = getThemeConfig();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`portfolio-${theme}`}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={`
          relative min-h-screen transition-all duration-700 ease-out overflow-x-hidden
          ${themeConfig.background}
        `}
        style={{
          fontFamily: 'var(--font-family)',
          color: 'var(--theme-text-primary)'
        }}
      >
        <InteractiveBackground />
        <ThemeSelector />
        <Navigation />
        
        <main className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
          </motion.div>
        </main>

        {/* Advanced scroll progress indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
          style={{
            background: `linear-gradient(90deg, var(--theme-accent-primary), var(--theme-accent-secondary), var(--theme-accent-tertiary))`,
            boxShadow: '0 0 10px var(--theme-glow)'
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Futuristic corner brackets */}
        {[
          'top-6 left-6 border-l-2 border-t-2',
          'top-6 right-6 border-r-2 border-t-2',
          'bottom-6 left-6 border-l-2 border-b-2',
          'bottom-6 right-6 border-r-2 border-b-2'
        ].map((position, index) => (
          <motion.div
            key={index}
            className={`fixed w-8 h-8 z-40 ${position}`}
            style={{
              borderColor: 'var(--theme-border)',
              filter: 'drop-shadow(0 0 5px var(--theme-glow))'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
            whileHover={{ 
              scale: 1.2,
              filter: 'drop-shadow(0 0 15px var(--theme-glow))'
            }}
          />
        ))}

        {/* Ambient glow effects */}
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse at center, var(--theme-accent-primary)08 0%, transparent 50%)`
          }}
        />
        
        {/* Scanline effect for certain themes */}
        {(theme === 'cyberpunk' || theme === 'terminal') && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-10"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                var(--theme-accent-primary)03 2px,
                var(--theme-accent-primary)03 4px
              )`
            }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
