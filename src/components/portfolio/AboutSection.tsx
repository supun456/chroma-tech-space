
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import SkillsChart from './SkillsChart';
import Timeline from './Timeline';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative">
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Results-driven data and software professional with over 4 years of experience at Velou,
            transitioning from Data Excellence Analyst to Associate Software Engineer.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-6">My Journey</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Started as a Data Excellence Analyst, skilled in data analytics, team leadership, 
                  and backend development. Successfully led data literacy initiatives, enhanced team 
                  capabilities, and improved forecasting accuracy by 35%.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Recently transitioned into software engineering, leveraging a strong foundation 
                  in data modeling and analytics to build scalable and efficient tech solutions. 
                  Currently pursuing Bachelor of Software Engineering Honours at Open University.
                </p>
              </CardContent>
            </Card>

            <Timeline />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SkillsChart />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
