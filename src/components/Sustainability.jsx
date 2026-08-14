import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const Sustainability = () => {
  return (
    <section id="sustainability" className="bg-surface section-padding">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-primary/10 to-teal/10 rounded-card-lg overflow-hidden shadow-card bg-white p-2 md:p-3">
              <img 
                src="/images/commitment.jpeg" 
                alt="My Sustainability Pledge" 
                className="w-full h-auto rounded-xl object-contain"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-label text-primary mb-6">
              <span className="ml-2">COMMITMENT</span>
            </div>
            <h2 className="text-hero font-heading font-bold text-dark mb-8">
              My Commitment<br />to a <span className="text-primary">sustainable</span> future.
            </h2>
            
            <div className="space-y-6 text-body-lg text-secondary leading-relaxed">
              <p>
                As a technology student, I believe innovation should improve lives while respecting the environment.
              </p>
              <p>
                This commitment represents my intention to use technology responsibly, reduce electronic waste, encourage reuse and recycling, conserve resources, and support sustainable innovation.
              </p>
              <p>
                Through studying E-Waste Management, I have gained awareness of the environmental consequences of technology and the importance of making informed, responsible choices as both a consumer and a future technology professional.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {['Responsible Technology', 'Green Computing', 'E-Waste Awareness', 'Resource Conservation', 'Sustainable Innovation'].map((badge, idx) => (
                <span key={idx} className="tag">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
