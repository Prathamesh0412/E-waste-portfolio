import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const caseStudiesData = [
  {
    id: 1,
    title: "India's E-Waste Management Rules, 2016",
    background: "India introduced the E-Waste (Management) Rules in 2016, building on earlier regulations from 2011, to establish a comprehensive framework for managing electronic waste.",
    problem: "India generates over 3.2 million tonnes of e-waste annually, much of which was processed by the informal sector without adequate safety measures or environmental protections.",
    approach: "The rules introduced Extended Producer Responsibility (EPR), requiring manufacturers to set up collection systems and ensure proper recycling. The regulations also established authorized dismantlers and recyclers.",
    outcome: "The framework created a structured approach to e-waste management in India, though implementation challenges remain in reaching the informal sector and increasing formal collection rates."
  },
  {
    id: 2,
    title: "The Basel Convention on Transboundary Movement of Hazardous Wastes",
    background: "The Basel Convention, adopted in 1989, is an international treaty designed to reduce the movement of hazardous waste between nations, particularly from developed to developing countries.",
    problem: "Developed countries were exporting hazardous waste, including e-waste, to developing countries where environmental and safety regulations were less stringent.",
    approach: "The convention established a framework requiring prior informed consent before hazardous waste could be exported, promoted waste minimization, and encouraged environmentally sound management.",
    outcome: "The convention has been ratified by 189 parties and has helped establish international norms for hazardous waste management, though enforcement challenges persist."
  },
  {
    id: 3,
    title: "EU WEEE Directive",
    background: "The Waste Electrical and Electronic Equipment (WEEE) Directive was first adopted by the European Union in 2003 and revised in 2012 to address the growing stream of e-waste.",
    problem: "Europe's increasing consumption of electronics was creating significant environmental challenges, with much e-waste ending up in landfills or being improperly processed.",
    approach: "The directive established collection, recycling, and recovery targets for all types of electrical equipment. It implemented the Extended Producer Responsibility principle and set collection rate targets.",
    outcome: "EU member states have significantly increased their e-waste collection and recycling rates, with the directive serving as a model for e-waste legislation worldwide."
  },
  {
    id: 4,
    title: "Japan's Home Appliance Recycling Law",
    background: "Japan enacted the Home Appliance Recycling Law in 2001 to address the disposal of large home appliances including televisions, air conditioners, refrigerators, and washing machines.",
    problem: "Millions of large appliances were being discarded annually, with most ending up in landfills despite containing recoverable materials and hazardous substances.",
    approach: "The law requires consumers to pay recycling fees at the time of disposal and mandates manufacturers to take back and recycle their products, achieving specific recycling rate targets.",
    outcome: "Japan has achieved recycling rates exceeding 80% for targeted appliances and has recovered significant quantities of metals and other valuable materials."
  }
];

const CaseStudies = () => {
  const [openId, setOpenId] = useState(caseStudiesData[0].id);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="case-studies" className="section-padding bg-surface relative">
      <div className="container-main">
        <ScrollReveal>
          <SectionLabel number="08" label="CASE STUDIES" />
          <h2 className="text-hero font-heading text-dark mt-6 mb-16 leading-tight">
            E-Waste<br />
            <span className="serif-accent italic text-primary">Case Studies.</span>
          </h2>
        </ScrollReveal>

        <div className="container-text mx-auto space-y-4">
          {caseStudiesData.map((study, index) => (
            <ScrollReveal key={study.id} delay={index * 100}>
              <div className={`card rounded-xl border border-border shadow-sm overflow-hidden transition-all duration-300 ${openId === study.id ? 'bg-bg/50' : 'bg-surface'}`}>
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(study.id)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center focus:outline-none focus:bg-bg/50 hover:bg-bg/30 transition-colors"
                >
                  <div className="pr-6">
                    <h3 className={`font-heading text-subtitle font-bold transition-colors ${openId === study.id ? 'text-primary' : 'text-dark'}`}>
                      {study.title}
                    </h3>
                    {openId !== study.id && (
                      <p className="text-body text-secondary mt-2 line-clamp-1">
                        {study.background}
                      </p>
                    )}
                  </div>
                  
                  <div className={`transform transition-transform duration-300 flex-shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center ${openId === study.id ? 'bg-soft border-primary text-primary rotate-180' : 'bg-surface text-secondary'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {openId === study.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-border"
                    >
                      <div className="p-5 sm:p-6 space-y-6">
                        <div>
                          <h4 className="text-label text-primary font-semibold mb-2">BACKGROUND</h4>
                          <p className="text-body text-secondary">{study.background}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-label text-primary font-semibold mb-2">THE PROBLEM</h4>
                          <p className="text-body text-secondary">{study.problem}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-label text-primary font-semibold mb-2">APPROACH</h4>
                          <p className="text-body text-secondary">{study.approach}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-label text-primary font-semibold mb-2">OUTCOME</h4>
                          <p className="text-body text-secondary">{study.outcome}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
