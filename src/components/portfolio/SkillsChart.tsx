
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SkillsChart = () => {
  const skills = [
    { name: 'Data Analysis', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'MongoDB', level: 85, color: 'from-green-500 to-emerald-500' },
    { name: 'Backend Development', level: 80, color: 'from-purple-500 to-pink-500' },
    { name: 'Forecasting Models', level: 90, color: 'from-yellow-500 to-orange-500' },
    { name: 'Data Governance', level: 85, color: 'from-orange-500 to-red-500' },
    { name: 'Team Leadership', level: 85, color: 'from-blue-600 to-purple-600' },
    { name: 'Process Optimization', level: 80, color: 'from-cyan-500 to-blue-500' },
    { name: 'MS Office', level: 90, color: 'from-indigo-500 to-purple-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.8
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
    <motion.div
      whileHover={{ 
        scale: 1.02,
        rotateY: -5,
        boxShadow: "0 20px 40px rgba(168, 85, 247, 0.1)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
        <CardHeader>
          <motion.div
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <CardTitle className="text-2xl font-semibold text-cyan-400">
              Technical Skills
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={skillVariants}
                className="space-y-2"
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between items-center">
                  <motion.span 
                    className="text-gray-300 font-medium"
                    whileHover={{ color: "#22d3ee" }}
                  >
                    {skill.name}
                  </motion.span>
                  <motion.span 
                    className="text-cyan-400 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    initial={{ width: 0, boxShadow: "0 0 0px rgba(34, 211, 238, 0)" }}
                    whileInView={{ 
                      width: `${skill.level}%`,
                      boxShadow: "0 0 10px rgba(34, 211, 238, 0.5)"
                    }}
                    transition={{ 
                      delay: index * 0.1 + 0.3, 
                      duration: 1.2,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      boxShadow: "0 0 15px rgba(34, 211, 238, 0.8)",
                      scaleY: 1.2
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillsChart;
