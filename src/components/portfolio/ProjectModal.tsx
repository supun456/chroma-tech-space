
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Github, ExternalLink, CheckCircle } from 'lucide-react';

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl border border-cyan-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-t-2xl" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-black/50"
                onClick={onClose}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <Badge
                      key={tech}
                      className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/10"
                  onClick={() => window.open(project.github, '_blank')}
                >
                  <Github className="w-5 h-5 mr-2" />
                  View Source Code
                </Button>
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                  onClick={() => window.open(project.live, '_blank')}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
