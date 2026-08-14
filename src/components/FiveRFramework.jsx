import React from 'react';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';

const frameworks = [
  {
    num: "01",
    title: "Refuse",
    def: "Avoid purchasing unnecessary electronic devices. Question whether a new device is truly needed before buying.",
    example: "Skip upgrading a phone that still works perfectly.",
  },
  {
    num: "02",
    title: "Reduce",
    def: "Minimize electronic consumption by choosing durable, energy-efficient devices and reducing usage.",
    example: "Choose a laptop that meets your needs without excess features.",
  },
  {
    num: "03",
    title: "Reuse",
    def: "Extend the life of electronics by using them longer, sharing with others, or finding new purposes.",
    example: "Convert an old tablet into a digital photo frame.",
  },
  {
    num: "04",
    title: "Repair",
    def: "Fix broken or malfunctioning devices instead of replacing them immediately.",
    example: "Replace a cracked screen instead of buying a new phone.",
  },
  {
    num: "05",
    title: "Recycle",
    def: "When a device reaches end of life, dispose of it through certified e-waste recycling facilities.",
    example: "Take old electronics to an authorized recycling center.",
  }
];

const FiveRFramework = () => {
  return (
    <section id="framework" className="section-padding bg-surface">
      <div className="container-main">
        <ScrollReveal>
          <SectionLabel number="06" label="5R FRAMEWORK" />
        </ScrollReveal>

        <div className="mt-8 mb-16 lg:mb-20 text-center">
          <ScrollReveal delay={1}>
            <h2 className="font-heading text-section font-bold leading-tight text-dark mb-4">
              The 5R Framework.
            </h2>
            <p className="text-subtitle text-secondary">
              Responsible use of electronics.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {frameworks.map((item, idx) => (
            <ScrollReveal key={idx} delay={(idx % 5) + 1} className="h-full">
              <div className="card p-6 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-heading text-subtitle font-bold mb-6 shadow-md">
                  {item.num}
                </div>
                <h3 className="font-heading text-subtitle font-bold text-dark mb-4">{item.title}</h3>
                <p className="text-secondary text-body mb-6 flex-grow">{item.def}</p>
                <div className="mt-auto w-full pt-4 border-t border-border">
                  <p className="text-small text-primary italic font-medium">{item.example}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FiveRFramework;
