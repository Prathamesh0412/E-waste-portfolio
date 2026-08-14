import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const facts = [
  {
    fact: "Approximately 62 million tonnes of e-waste were generated globally in 2022, and only 22.3% was formally documented as collected and recycled.",
    source: "Global E-waste Monitor 2024, UNITAR",
    year: "2022 data"
  },
  {
    fact: "E-waste is the fastest-growing waste stream in the world, increasing at a rate of approximately 2.6 million tonnes per year.",
    source: "Global E-waste Monitor 2024, UNITAR",
    year: "2022 data"
  },
  {
    fact: "The raw materials contained in global e-waste are estimated to be worth approximately $91 billion USD.",
    source: "Global E-waste Monitor 2024, UNITAR",
    year: "2022 estimate"
  }
];

const DidYouKnow = () => {
  return (
    <section id="didyouknow" className="bg-surface section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-label text-primary mx-auto mb-6">
            <span className="ml-2">QUICK KNOWLEDGE</span>
          </div>
          <h2 className="text-hero font-heading font-bold text-dark mt-6">
            Did You Know? <Lightbulb className="inline-block w-12 h-12 text-primary" />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 md:p-8 shadow-card bg-white flex flex-col justify-between"
            >
              <div>
                <Lightbulb className="w-8 h-8 text-primary mb-6 opacity-50" />
                <p className="text-body-lg text-dark leading-relaxed font-medium">
                  "{fact.fact}"
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-small text-secondary font-medium">
                  {fact.source}
                </p>
                <p className="text-small text-secondary/70 mt-1">
                  {fact.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DidYouKnow;
