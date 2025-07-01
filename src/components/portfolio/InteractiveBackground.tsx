
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Initialize particles based on theme
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = theme === 'matrix' ? 150 : 100;
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          life: Math.random() * 100,
          maxLife: 100,
          char: theme === 'matrix' ? String.fromCharCode(0x30A0 + Math.random() * 96) : null
        });
      }
    };

    initParticles();

    const getThemeColors = () => {
      switch (theme) {
        case 'cyberpunk':
          return {
            primary: 'rgba(0, 255, 255, ',
            secondary: 'rgba(127, 90, 240, ',
            tertiary: 'rgba(255, 0, 255, '
          };
        case 'matrix':
          return {
            primary: 'rgba(0, 255, 0, ',
            secondary: 'rgba(0, 200, 0, ',
            tertiary: 'rgba(0, 150, 0, '
          };
        case 'quantum':
          return {
            primary: 'rgba(255, 102, 196, ',
            secondary: 'rgba(34, 211, 238, ',
            tertiary: 'rgba(168, 85, 247, '
          };
        case 'terminal':
          return {
            primary: 'rgba(0, 255, 0, ',
            secondary: 'rgba(255, 255, 0, ',
            tertiary: 'rgba(255, 0, 0, '
          };
        case 'tron':
          return {
            primary: 'rgba(0, 204, 255, ',
            secondary: 'rgba(0, 136, 204, ',
            tertiary: 'rgba(255, 255, 255, '
          };
        default:
          return {
            primary: 'rgba(0, 255, 255, ',
            secondary: 'rgba(127, 90, 240, ',
            tertiary: 'rgba(255, 0, 255, '
          };
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const colors = getThemeColors();
      const mouseX = mousePos.x * canvas.width;
      const mouseY = mousePos.y * canvas.height;

      // Draw grid for Tron theme
      if (theme === 'tron') {
        ctx.strokeStyle = colors.primary + '0.1)';
        ctx.lineWidth = 1;
        
        const gridSize = 50;
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Reset if life is over
        if (particle.life <= 0) {
          particle.life = particle.maxLife;
          particle.opacity = Math.random() * 0.7 + 0.3;
        }

        // Draw particle
        const alpha = particle.opacity * (particle.life / particle.maxLife);
        
        if (theme === 'matrix' && particle.char) {
          ctx.fillStyle = colors.primary + alpha + ')';
          ctx.font = '12px monospace';
          ctx.fillText(particle.char, particle.x, particle.y);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = colors.primary + alpha + ')';
          ctx.fill();
          
          // Add glow effect
          ctx.shadowBlur = 10;
          ctx.shadowColor = colors.primary + alpha + ')';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Connect nearby particles
      if (theme !== 'matrix') {
        particlesRef.current.forEach((particle1, i) => {
          particlesRef.current.slice(i + 1).forEach(particle2 => {
            const dx = particle1.x - particle2.x;
            const dy = particle1.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const alpha = (100 - distance) / 100 * 0.3;
              ctx.beginPath();
              ctx.moveTo(particle1.x, particle1.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.strokeStyle = colors.secondary + alpha + ')';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        });
      }

      // Mouse spotlight effect
      const gradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 200
      );
      gradient.addColorStop(0, colors.primary + '0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, mousePos]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />
      
      {/* Additional theme-specific overlays */}
      {theme === 'cyberpunk' && (
        <motion.div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)`
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {theme === 'terminal' && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-green-400/5 animate-pulse" />
          <div 
            className="absolute w-full h-0.5 bg-green-400/30 animate-pulse"
            style={{
              top: `${mousePos.y * 100}%`,
              animation: 'scan 2s linear infinite'
            }}
          />
        </div>
      )}
    </>
  );
};

export default InteractiveBackground;
