import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  {
    title: 'Started E-Waste Management',
    description: 'Began studying E-Waste Management as part of my B.Tech curriculum, exploring the fundamentals of electronic waste.'
  },
  {
    title: 'Learned about E-Waste',
    description: 'Gained understanding of what constitutes e-waste, its sources, types, and the scale of the global e-waste challenge.'
  },
  {
    title: 'Studied Environmental & Health Impacts',
    description: 'Explored how improper e-waste disposal affects soil, water, air quality, and human health, particularly in developing regions.'
  },
  {
    title: 'Completed Assignments',
    description: 'Worked on academic assignments covering various aspects of e-waste management, policy, and technology.'
  },
  {
    title: 'Explored Management Methods',
    description: 'Studied collection, segregation, recycling, material recovery, and responsible disposal techniques for electronic waste.'
  },
  {
    title: 'Studied Sustainable Technology',
    description: 'Learned about sustainable design principles, circular economy concepts, and the role of technology in environmental conservation.'
  },
  {
    title: 'Applied My Learning',
    description: 'Integrated e-waste management knowledge with my technology studies, developing a holistic understanding of responsible innovation.'
  }
];

const Journey = () => {
  return (
    <section id="journey" className="bg-bg section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-label text-primary mb-6">
            <span className="ml-2">MILESTONES</span>
          </div>
          <h2 className="text-hero font-heading font-bold text-dark mb-16">
            My Learning<br />Journey.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Horizontal line for desktop */}
          <div className="absolute top-[24px] left-0 right-0 h-px bg-border hidden md:block"></div>
          {/* Vertical line for mobile */}
          <div className="absolute left-[24px] top-0 bottom-0 w-px bg-border md:hidden"></div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-4 overflow-x-auto pb-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="relative flex md:flex-col items-start md:items-center min-w-[250px] flex-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Number circle */}
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold z-10 border-4 border-bg flex-shrink-0 md:mb-6">
                  {index + 1}
                </div>

                {/* Content card */}
                <div className="ml-6 md:ml-0 md:text-center mt-2 md:mt-0">
                  <h3 className="font-heading font-semibold text-subtitle text-dark">{milestone.title}</h3>
                  <p className="text-secondary text-body mt-2">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
