
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const Timeline = () => {
  const experiences = [
    {
      year: '2024 - Present',
      title: 'Associate Software Engineer',
      company: 'Velou, Engineering Center',
      description: 'Transitioned into software engineering role, contributing to backend development projects and leveraging data expertise to build efficient systems.',
    },
    {
      year: '2023 - 2024',
      title: 'Lead - Data Excellence Team',
      company: 'Velou, Engineering Center',
      description: 'Led the Data Excellence team, overseeing data strategy and governance initiatives. Streamlined data workflows and ensured data integrity across business functions.',
    },
    {
      year: '2022 - 2023',
      title: 'Senior Data Excellence Analyst',
      company: 'Velou, Engineering Center',
      description: 'Trained cross-functional teams on data best practices, championed data literacy programs, and created forecasting models that improved prediction accuracy by 35%.',
    },
    {
      year: '2021 - 2022',
      title: 'Data Excellence Analyst',
      company: 'Velou, Engineering Center',
      description: 'Transformed complex data into actionable insights, supporting faster decisions and utilizing advanced analytics tools to improve data interpretation quality.',
    },
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
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="mt-8">
      <motion.h3 
        className="text-2xl font-semibold text-cyan-400 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ x: 10 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        Experience Timeline
      </motion.h3>
      <div className="relative">
        <motion.div 
          className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500"
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative mb-8 last:mb-0"
              whileHover={{ x: 10 }}
            >
              <motion.div 
                className="absolute left-2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-black"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ 
                  scale: 1.5,
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.8)"
                }}
              />
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="ml-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <motion.div 
                      className="flex items-center gap-4 mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    >
                      <motion.span 
                        className="text-cyan-400 font-bold text-lg"
                        whileHover={{ scale: 1.1, textShadow: "0 0 10px rgba(34, 211, 238, 0.8)" }}
                      >
                        {exp.year}
                      </motion.span>
                      <motion.div 
                        className="h-px bg-gray-600 flex-1"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                      />
                    </motion.div>
                    <motion.h4 
                      className="text-xl font-semibold text-white mb-1"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.4 }}
                      whileHover={{ color: "#22d3ee" }}
                    >
                      {exp.title}
                    </motion.h4>
                    <motion.p 
                      className="text-purple-400 font-medium mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                    >
                      {exp.company}
                    </motion.p>
                    <motion.p 
                      className="text-gray-300"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.6 }}
                    >
                      {exp.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;
