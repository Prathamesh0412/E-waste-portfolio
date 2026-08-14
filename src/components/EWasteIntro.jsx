import React from 'react';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';

const EWasteIntro = () => {
  const cards = [
    {
      num: "01",
      title: "What counts as E-Waste?",
      desc: "Computers, laptops, smartphones, tablets, monitors, televisions, printers, chargers, batteries, refrigerators, washing machines, air conditioners, and other electronic devices that have reached end of use."
    },
    {
      num: "02",
      title: "Why is E-Waste increasing?",
      desc: "Rapid technological advancement, shorter product lifecycles, growing consumer demand, planned obsolescence, and increasing global access to electronic devices contribute to rising e-waste volumes worldwide."
    },
    {
      num: "03",
      title: "Why is it a problem?",
      desc: "E-waste contains hazardous materials including lead, mercury, cadmium, and brominated flame retardants. Improper disposal contaminates soil, water, and air, posing serious risks to human health and ecosystems."
    },
    {
      num: "04",
      title: "Why should we manage it responsibly?",
      desc: "Responsible e-waste management recovers valuable materials like gold, silver, copper, and rare earth elements, reduces environmental pollution, conserves natural resources, and protects the health of workers and communities."
    }
  ];

  return (
    <section id="ewaste" className="section-padding bg-bg">
      <div className="container-main">
        <ScrollReveal>
          <SectionLabel number="03" label="THE SUBJECT" />
        </ScrollReveal>

        <div className="mt-8 mb-12">
          <ScrollReveal delay={1}>
            <h2 className="font-heading text-section font-bold text-dark mb-8">
              What is<br />E-Waste?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal delay={2}>
              <p className="text-body-lg text-secondary">
                E-waste, or electronic waste, refers to discarded electrical and electronic equipment such as computers, smartphones, televisions, chargers, batteries, appliances, and other electronic devices.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={3}>
              <p className="text-body text-secondary">
                As technology evolves rapidly, devices become obsolete faster, creating a growing stream of electronic waste that requires careful management to protect human health and the environment.
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cards.map((item, idx) => (
            <ScrollReveal key={item.num} delay={idx + 1}>
              <div className="card p-8 h-full">
                <div className="inline-flex items-center justify-center bg-primary/10 text-primary text-label font-bold rounded px-3 py-1 mb-4">
                  {item.num}
                </div>
                <h3 className="font-heading font-semibold text-subtitle text-dark">{item.title}</h3>
                <p className="text-secondary text-body mt-3">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EWasteIntro;
