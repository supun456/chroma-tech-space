
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme, getThemeConfig } = useTheme();

  const phrases = [
    "Full-Stack Developer",
    "Data Analytics Expert", 
    "Backend Solutions Architect",
    "Tech Problem Solver"
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < currentPhrase.length) {
          setText(currentPhrase.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentIndex > 0) {
          setText(currentPhrase.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentPhraseIndex, phrases]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/supun456", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/supun-perera-64423a212/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:supun6623@gmail.com", label: "Email" },
  ];

  const themeConfig = getThemeConfig();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Theme-specific grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(var(--theme-accent-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--theme-accent-primary) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Dynamic scanning line effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(90deg, transparent, var(--theme-accent-primary), transparent)`
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.h1
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              textShadow: `0px 0px 30px var(--theme-glow)`
            }}
            className="text-5xl md:text-7xl font-bold cursor-default"
            style={{
              background: `linear-gradient(45deg, var(--theme-accent-primary), var(--theme-accent-secondary), var(--theme-accent-tertiary))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 20px var(--theme-glow))`
            }}
          >
            Supun Perera
          </motion.h1>

          {/* Enhanced terminal-style typing */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div 
              className="backdrop-blur-sm rounded-lg p-4 font-mono text-left max-w-2xl mx-auto border"
              style={{
                backgroundColor: 'var(--theme-bg-secondary)80',
                borderColor: 'var(--theme-border)',
                boxShadow: `0 0 30px var(--theme-glow)`
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
                <span 
                  className="text-sm ml-2 opacity-60"
                  style={{ color: 'var(--theme-text-secondary)' }}
                >
                  Portfolio Terminal v2.0
                </span>
              </div>
              <div className="text-xl md:text-2xl">
                <span style={{ color: 'var(--theme-accent-primary)' }}>$ </span>
                <span style={{ color: 'var(--theme-text-primary)' }}>{text}</span>
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ color: 'var(--theme-accent-primary)' }}
                >
                  |
                </motion.span>
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--theme-text-secondary)' }}
          >
            Associate Software Engineer with 4+ years of experience in data analytics and backend development.
            Specialized in transforming complex data into scalable tech solutions.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 border"
                style={{
                  background: `linear-gradient(45deg, var(--theme-accent-primary), var(--theme-accent-secondary))`,
                  borderColor: 'var(--theme-accent-primary)',
                  color: 'var(--theme-bg-primary)',
                  boxShadow: `0 0 20px var(--theme-glow)`
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Download className="w-5 h-5 mr-2" />
                </motion.div>
                Download CV
              </Button>
            </motion.div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    boxShadow: `0 10px 25px var(--theme-glow)`
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full backdrop-blur-sm border transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--theme-bg-secondary)50',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-accent-primary)'
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.div>
                  <span className="sr-only">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              boxShadow: [
                `0 0 0px var(--theme-glow)`,
                `0 0 20px var(--theme-glow)`,
                `0 0 0px var(--theme-glow)`
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-6 h-10 border-2 rounded-full flex justify-center cursor-pointer"
            style={{ borderColor: 'var(--theme-border)' }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-1 h-3 rounded-full mt-2"
              style={{ backgroundColor: 'var(--theme-accent-primary)' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
