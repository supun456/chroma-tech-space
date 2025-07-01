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
  const { theme } = useTheme();

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

  const getThemeColors = () => {
    switch (theme) {
      case 'light':
        return {
          gradient: 'from-blue-600 via-purple-600 to-pink-600',
          primary: 'text-blue-600',
          secondary: 'text-purple-600',
          accent: 'border-blue-500',
          bg: 'bg-white/80',
          text: 'text-gray-800'
        };
      case 'cyberpunk':
        return {
          gradient: 'from-cyan-400 via-purple-500 to-pink-500',
          primary: 'text-cyan-400',
          secondary: 'text-purple-400',
          accent: 'border-cyan-400',
          bg: 'bg-black/80',
          text: 'text-cyan-400'
        };
      case 'ocean':
        return {
          gradient: 'from-blue-400 via-cyan-500 to-teal-500',
          primary: 'text-blue-400',
          secondary: 'text-cyan-400',
          accent: 'border-blue-400',
          bg: 'bg-blue-900/80',
          text: 'text-blue-400'
        };
      case 'forest':
        return {
          gradient: 'from-green-400 via-emerald-500 to-teal-500',
          primary: 'text-green-400',
          secondary: 'text-emerald-400',
          accent: 'border-green-400',
          bg: 'bg-green-900/80',
          text: 'text-green-400'
        };
      default:
        return {
          gradient: 'from-cyan-400 via-purple-500 to-pink-500',
          primary: 'text-cyan-400',
          secondary: 'text-purple-400',
          accent: 'border-cyan-400',
          bg: 'bg-gray-900/80',
          text: 'text-cyan-400'
        };
    }
  };

  const colors = getThemeColors();

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
      {/* Grid overlay */}
      <div className={`absolute inset-0 bg-[linear-gradient(${colors.accent.replace('border-', 'rgba(')}0.1)_1px,transparent_1px),linear-gradient(90deg,${colors.accent.replace('border-', 'rgba(')}0.1)_1px,transparent_1px)] bg-[size:50px_50px]`} />
      
      {/* Scanning line effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-${colors.primary.replace('text-', '')}/20 to-transparent`}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
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
              textShadow: theme === 'light' ? "0px 0px 20px rgb(59, 130, 246)" : "0px 0px 20px rgb(34, 211, 238)"
            }}
            className="text-5xl md:text-7xl font-bold cursor-default"
          >
            <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
              Supun Perera
            </span>
          </motion.h1>

          {/* Enhanced terminal-style typing */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className={`${colors.bg} backdrop-blur-sm ${colors.accent}/30 rounded-lg p-4 font-mono text-left max-w-2xl mx-auto border`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-2">Portfolio Terminal</span>
              </div>
              <div className="text-xl md:text-2xl">
                <span className={colors.primary}>$ </span>
                <span className={colors.text}>{text}</span>
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={colors.primary}
                >
                  |
                </motion.span>
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-xl max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
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
                className={`bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300`}
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
                    boxShadow: theme === 'light' ? "0 10px 25px rgba(59, 130, 246, 0.3)" : "0 10px 25px rgba(34, 211, 238, 0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full ${colors.bg} backdrop-blur-sm border ${colors.accent}/20 hover:${colors.accent}/50 hover:bg-opacity-20 transition-all duration-300`}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <link.icon className={`w-5 h-5 ${colors.primary}`} />
                  </motion.div>
                  <span className="sr-only">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

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
                "0 0 0px rgba(34, 211, 238, 0)",
                "0 0 20px rgba(34, 211, 238, 0.3)",
                "0 0 0px rgba(34, 211, 238, 0)"
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className={`w-6 h-10 border-2 ${colors.accent}/50 rounded-full flex justify-center cursor-pointer`}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className={`w-1 h-3 ${colors.primary.replace('text-', 'bg-')} rounded-full mt-2`}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
