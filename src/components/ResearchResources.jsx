import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const resources = [
  {
    category: 'Research Papers & Reports',
    title: 'Global E-waste Monitor 2024',
    source: 'United Nations Institute for Training and Research (UNITAR)',
    description: 'Comprehensive global report on e-waste statistics, trends, and management practices across regions.',
    url: 'https://ewastemonitor.info/'
  },
  {
    category: 'Research Papers & Reports',
    title: 'E-Waste Management in India: Challenges and Opportunities',
    source: 'Ministry of Environment, Forest and Climate Change, India',
    description: 'Overview of India\'s e-waste landscape, policy framework, and implementation strategies.',
    url: 'https://moef.gov.in/'
  },
  {
    category: 'Government & Regulatory Resources',
    title: 'E-Waste (Management) Rules, 2016',
    source: 'Central Pollution Control Board (CPCB), India',
    description: 'Official regulations governing e-waste management, Extended Producer Responsibility, and authorized recycling in India.',
    url: 'https://cpcb.nic.in/'
  },
  {
    category: 'Government & Regulatory Resources',
    title: 'Basel Convention on Hazardous Wastes',
    source: 'United Nations Environment Programme (UNEP)',
    description: 'International treaty on the control of transboundary movements of hazardous wastes and their disposal.',
    url: 'http://www.basel.int/'
  },
  {
    category: 'Guidelines & Standards',
    title: 'StEP Initiative — Solving the E-Waste Problem',
    source: 'StEP Initiative / United Nations University',
    description: 'Global platform addressing e-waste challenges through research, policy guidance, and capacity building.',
    url: 'https://www.step-initiative.org/'
  },
  {
    category: 'Guidelines & Standards',
    title: 'WEEE Directive — European Commission',
    source: 'European Commission',
    description: 'EU legislation setting collection, recycling, and recovery targets for electrical and electronic equipment.',
    url: 'https://environment.ec.europa.eu/'
  },
  {
    category: 'Educational Resources',
    title: 'E-Waste: From Toxic to Green',
    source: 'Coursera / University of Illinois',
    description: 'Online course covering e-waste fundamentals, environmental impact, and sustainable management approaches.',
    url: 'https://www.coursera.org/'
  },
  {
    category: 'Educational Resources',
    title: 'Sustainable Electronics Initiative',
    source: 'US Environmental Protection Agency (EPA)',
    description: 'Resources on sustainable management of electronics throughout their lifecycle.',
    url: 'https://www.epa.gov/smm-electronics'
  }
];

const ResearchResources = () => {
  return (
    <section id="research" className="bg-bg section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <span className="text-primary font-semibold ml-2">RESEARCH & RESOURCES</span>
          </div>
          <h2 className="text-hero font-heading text-dark mt-6 mb-16">
            Research &<br />Resources.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              className="card p-6 flex flex-col h-full bg-surface"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-label text-primary font-semibold tracking-wider">
                {resource.category}
              </div>
              <h3 className="font-heading text-subtitle text-dark mt-2">
                {resource.title}
              </h3>
              <p className="text-small text-secondary mt-1 font-medium">
                {resource.source}
              </p>
              <p className="text-body text-secondary mt-4 flex-grow">
                {resource.description}
              </p>
              <div className="mt-6">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  View Resource <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchResources;
