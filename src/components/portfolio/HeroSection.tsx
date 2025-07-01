
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Mail, Mic, Power } from 'lucide-react';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Initializing SupunAI...",
    "I transform data into actionable strategies.",
    "Deploying full-stack solutions.",
    "Building intelligent UIs.",
    "Processing complex algorithms...",
    "Ready for mission deployment."
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
      {/* Jarvis-style grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
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
          {/* Status indicator */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"
            />
            <span className="text-green-400 text-sm font-mono">SYSTEM ONLINE</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0px 0px 20px rgb(34, 211, 238)"
            }}
            className="text-5xl md:text-7xl font-bold cursor-default"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Supun Perera
            </span>
          </motion.h1>

          {/* Enhanced terminal-style typing */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 font-mono text-left max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-2">SupunAI Terminal</span>
              </div>
              <div className="text-xl md:text-2xl text-green-400">
                <span className="text-cyan-400">$ </span>
                <span>{text}</span>
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-cyan-400"
                >
                  |
                </motion.span>
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Associate Software Engineer with 4+ years of experience in data analytics and backend development.
            Specialized in transforming complex data into scalable tech solutions.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Voice Command Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mic className="w-5 h-5 mr-2" />
                </motion.div>
                Voice Command
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
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
                    boxShadow: "0 10px 25px rgba(34, 211, 238, 0.3)",
                    borderColor: "rgba(34, 211, 238, 0.8)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <link.icon className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <span className="sr-only">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* AI Assistant Status */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-full">
              <Power className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">AI Assistant Ready</span>
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
            className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
