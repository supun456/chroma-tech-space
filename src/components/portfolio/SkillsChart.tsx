
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

  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-cyan-400">
          Technical Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">{skill.name}</span>
              <span className="text-cyan-400 text-sm">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillsChart;
