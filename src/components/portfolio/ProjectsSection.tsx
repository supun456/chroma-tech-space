
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Filter } from 'lucide-react';
import ProjectModal from './ProjectModal';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management',
      longDescription: 'A comprehensive e-commerce platform built with React, Node.js, and PostgreSQL. Features include real-time inventory tracking, payment processing with Stripe, advanced search and filtering, order management, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: 'fullstack',
      github: 'https://github.com',
      live: 'https://example.com',
      features: ['Real-time inventory', 'Payment processing', 'Admin dashboard', 'Order management']
    },
    {
      id: 2,
      title: 'AI Chat Application',
      description: 'Real-time chat app with AI-powered responses and sentiment analysis',
      longDescription: 'Modern chat application featuring AI-powered responses, real-time messaging, sentiment analysis, and group conversations. Built with React, Socket.io, and OpenAI API.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
      technologies: ['React', 'Socket.io', 'OpenAI', 'MongoDB'],
      category: 'frontend',
      github: 'https://github.com',
      live: 'https://example.com',
      features: ['Real-time messaging', 'AI responses', 'Sentiment analysis', 'Group chats']
    },
    {
      id: 3,
      title: 'DevOps Monitoring Dashboard',
      description: 'Comprehensive monitoring solution for cloud infrastructure',
      longDescription: 'Enterprise-grade monitoring dashboard for cloud infrastructure with real-time metrics, alerting system, and performance analytics. Supports AWS, GCP, and Azure.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      technologies: ['Vue.js', 'Python', 'Docker', 'Kubernetes'],
      category: 'backend',
      github: 'https://github.com',
      live: 'https://example.com',
      features: ['Real-time metrics', 'Multi-cloud support', 'Custom alerts', 'Performance analytics']
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of my recent work and side projects that demonstrate my skills
            and passion for creating innovative solutions.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setFilter(category.id)}
              variant={filter === category.id ? "default" : "outline"}
              className={`transition-all duration-300 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700'
                  : 'border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/10'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden group h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 flex-1">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-600 hover:border-cyan-500/50 hover:bg-cyan-500/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.live, '_blank');
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
