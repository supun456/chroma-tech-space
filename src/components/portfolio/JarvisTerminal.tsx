
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';

interface Command {
  input: string;
  output: string;
  timestamp: string;
}

const JarvisTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [commands, setCommands] = useState<Command[]>([
    {
      input: 'system --status',
      output: 'SupunAI System Online. All modules operational.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const commandMap: Record<string, string> = {
    'help': 'Available commands: about, skills, projects, contact, clear, system',
    'about': 'Associate Software Engineer with 4+ years of experience in data analytics and backend development.',
    'skills': 'Data Analysis (95%), MongoDB (85%), Backend Development (80%), Forecasting Models (90%)',
    'projects': 'E-Commerce Platform, AI Chat Application, DevOps Monitoring Dashboard',
    'contact': 'Email: supun6623@gmail.com | Phone: +94 77 995 9466 | Location: Sri Lanka',
    'clear': 'CLEAR_TERMINAL',
    'system': 'SupunAI v2.0 - Personal Portfolio Assistant',
    'whoami': 'Supun Perera - Data-driven Software Engineer',
    'ls': 'about.txt skills.json projects/ contact.md experience.log',
  };

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    const timestamp = new Date().toLocaleTimeString();
    
    if (command === 'clear') {
      setCommands([]);
      return;
    }

    const output = commandMap[command] || `Command '${command}' not found. Type 'help' for available commands.`;
    
    setCommands(prev => [...prev, {
      input: cmd,
      output,
      timestamp
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-full hover:border-cyan-500/50 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Terminal className="w-6 h-6 text-cyan-400" />
      </motion.button>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-4xl max-h-[80vh]"
            >
              <Card className="bg-black/90 backdrop-blur-md border border-cyan-500/30 overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center justify-between p-3 bg-gray-900/50 border-b border-cyan-500/20">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-cyan-400 font-mono text-sm">SupunAI Terminal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      <Minimize2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4 font-mono text-sm">
                  {/* Command History */}
                  <div className="h-96 overflow-y-auto mb-4 space-y-2">
                    {commands.map((cmd, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-green-400">supun@jarvis:~$</span>
                          <span className="text-white">{cmd.input}</span>
                          <span className="text-gray-500 text-xs ml-auto">{cmd.timestamp}</span>
                        </div>
                        <div className="text-cyan-400 pl-4 whitespace-pre-wrap">{cmd.output}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Command Input */}
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <span className="text-green-400">supun@jarvis:~$</span>
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1 bg-transparent border-none text-white font-mono focus:ring-0 focus:outline-none"
                      placeholder="Type 'help' for available commands..."
                      autoFocus
                    />
                  </form>

                  {/* Help Text */}
                  <div className="mt-4 text-xs text-gray-500">
                    Press Ctrl+` to toggle terminal | Type 'help' for commands
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default JarvisTerminal;
