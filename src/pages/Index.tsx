
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Navigation from '@/components/portfolio/Navigation';
import ParticleBackground from '@/components/portfolio/ParticleBackground';
import { useTheme } from '@/hooks/useTheme';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const pageVariants = {
    initial: { 
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    in: { 
      opacity: 1,
      scale: 1,
      y: 0
    },
    out: { 
      opacity: 0,
      scale: 1.05,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: [0.23, 1, 0.32, 1] as const,
    duration: 0.6
  };

  const getThemeBackground = () => {
    switch (theme) {
      case 'light':
        return 'bg-white text-gray-900';
      case 'cyberpunk':
        return 'bg-gradient-to-br from-black via-purple-900 to-black text-cyan-100';
      case 'ocean':
        return 'bg-gradient-to-br from-blue-900 via-blue-800 to-black text-blue-100';
      case 'forest':
        return 'bg-gradient-to-br from-green-900 via-green-800 to-black text-green-100';
      default:
        return 'bg-gradient-to-br from-black via-slate-900 to-black text-gray-100';
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ 
            rotate: 360,
            boxShadow: [
              "0 0 0px rgba(34, 211, 238, 0)",
              "0 0 20px rgba(34, 211, 238, 0.8)",
              "0 0 0px rgba(34, 211, 238, 0)"
            ]
          }}
          transition={{ 
            rotate: { duration: 1, repeat: Infinity, ease: "linear" },
            boxShadow: { duration: 2, repeat: Infinity }
          }}
          className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="portfolio"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={`relative min-h-screen transition-colors duration-500 overflow-x-hidden ${getThemeBackground()}`}
      >
        <ParticleBackground />
        <Navigation />
        
        <main className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
          </motion.div>
        </main>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 origin-left z-50"
          style={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner accents */}
        <div className="fixed top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50 z-40" />
        <div className="fixed top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50 z-40" />
        <div className="fixed bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50 z-40" />
        <div className="fixed bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50 z-40" />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
