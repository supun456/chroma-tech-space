
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Navigation from '@/components/portfolio/Navigation';
import ParticleBackground from '@/components/portfolio/ParticleBackground';
import { useTheme } from '@/hooks/useTheme';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`relative min-h-screen transition-colors duration-300 overflow-x-hidden ${
      theme === 'dark' 
        ? 'bg-black text-gray-100' 
        : 'bg-white text-gray-900'
    }`}>
      <ParticleBackground />
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
