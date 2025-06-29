
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const Timeline = () => {
  const experiences = [
    {
      year: '2024',
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovation Inc.',
      description: 'Leading development of cloud-native applications using React, Node.js, and AWS.',
    },
    {
      year: '2022',
      title: 'Full Stack Developer',
      company: 'Digital Solutions Co.',
      description: 'Built scalable web applications serving 100K+ users with React and Python.',
    },
    {
      year: '2020',
      title: 'Frontend Developer',
      company: 'StartupX',
      description: 'Developed responsive web interfaces and improved user experience by 40%.',
    },
    {
      year: '2019',
      title: 'Junior Developer',
      company: 'WebDev Agency',
      description: 'Started my professional journey building websites and learning modern frameworks.',
    },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-cyan-400 mb-8">Experience Timeline</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500"></div>
        
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative mb-8 last:mb-0"
          >
            <div className="absolute left-2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-black"></div>
            <Card className="ml-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-cyan-400 font-bold text-lg">{exp.year}</span>
                  <div className="h-px bg-gray-600 flex-1"></div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-1">{exp.title}</h4>
                <p className="text-purple-400 font-medium mb-3">{exp.company}</p>
                <p className="text-gray-300">{exp.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
