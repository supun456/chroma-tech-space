
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import SkillsChart from './SkillsChart';
import Timeline from './Timeline';

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0px 0px 8px rgb(168, 85, 247)"
            }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Results-driven data and software professional with over 4 years of experience at Velou,
            transitioning from Data Excellence Analyst to Associate Software Engineer.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(34, 211, 238, 0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <CardContent className="p-8">
                  <motion.h3 
                    className="text-2xl font-semibold text-cyan-400 mb-6"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    My Journey
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 text-lg leading-relaxed mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    Started as a Data Excellence Analyst, skilled in data analytics, team leadership, 
                    and backend development. Successfully led data literacy initiatives, enhanced team 
                    capabilities, and improved forecasting accuracy by 35%.
                  </motion.p>
                  <motion.p 
                    className="text-gray-300 text-lg leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Recently transitioned into software engineering, leveraging a strong foundation 
                    in data modeling and analytics to build scalable and efficient tech solutions. 
                    Currently pursuing Bachelor of Software Engineering Honours at Open University.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>

            <Timeline />
          </motion.div>

          <motion.div variants={cardVariants}>
            <SkillsChart />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
