import React from 'react';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';

const stages = [
  {
    num: "1",
    title: "DESIGN",
    desc: "Products are conceived with materials, functionality, and aesthetics in mind.",
  },
  {
    num: "2",
    title: "PRODUCTION",
    desc: "Raw materials are extracted and assembled into electronic devices.",
  },
  {
    num: "3",
    title: "PURCHASE",
    desc: "Consumers acquire devices for personal, educational, or professional use.",
  },
  {
    num: "4",
    title: "USE",
    desc: "Devices serve their purpose during their functional lifespan.",
  },
  {
    num: "5",
    title: "REPAIR / REUSE",
    desc: "Extending device life through maintenance, repair, or passing to new users.",
  },
  {
    num: "6",
    title: "COLLECTION",
    desc: "End-of-life devices are gathered through take-back programs or collection centers.",
  },
  {
    num: "7",
    title: "RECYCLING",
    desc: "Devices are dismantled and materials are separated for processing.",
  },
  {
    num: "8",
    title: "RESOURCE RECOVERY",
    desc: "Valuable materials like metals and plastics are extracted for reuse.",
  },
  {
    num: "9",
    title: "RESPONSIBLE DISPOSAL",
    desc: "Non-recoverable materials are safely disposed following environmental regulations.",
  },
];

const Lifecycle = () => {
  return (
    <section id="lifecycle" className="section-padding bg-surface">
      <div className="container-main">
        <ScrollReveal>
          <SectionLabel number="04" label="LIFECYCLE" />
        </ScrollReveal>

        <div className="mt-8 mb-16 lg:mb-24">
          <ScrollReveal delay={1}>
            <h2 className="font-heading text-section font-bold leading-tight text-dark">
              From device<br />
              to <span className="serif-accent">resource.</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Mobile Layout (Vertical Timeline) */}
        <div className="block lg:hidden relative ml-4 border-l border-border py-4">
          {stages.map((stage, idx) => (
            <ScrollReveal key={idx} delay={(idx % 4) + 1}>
              <div className="mb-10 relative pl-8">
                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-sm bg-primary text-white shadow-sm ring-4 ring-surface">
                  {stage.num}
                </div>
                <div className="card p-5">
                  <h3 className="font-heading font-semibold text-dark mb-1">{stage.title}</h3>
                  <p className="text-small text-secondary">{stage.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Desktop Layout (Horizontal Timeline) */}
        <div className="hidden lg:block relative py-20 overflow-x-auto w-full pb-32 no-scrollbar">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border transform -translate-y-1/2 w-max min-w-full"></div>
          
          <div className="flex justify-between items-center w-max min-w-full px-4 gap-8">
            {stages.map((stage, idx) => {
              const isTop = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col items-center w-52 shrink-0">
                  <ScrollReveal delay={(idx % 4) + 1} className="w-full flex flex-col items-center">
                    {/* Top Content */}
                    <div className={`w-full card p-4 mb-4 transition-opacity ${isTop ? 'opacity-100' : 'opacity-0 invisible'}`}>
                      <h3 className="font-heading font-semibold text-dark mb-1 text-center text-sm">{stage.title}</h3>
                      <p className="text-tiny text-secondary text-center">{stage.desc}</p>
                    </div>

                    {/* Node */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-base bg-primary text-white shadow-md z-10 my-2 ring-4 ring-surface">
                      {stage.num}
                    </div>

                    {/* Bottom Content */}
                    <div className={`w-full card p-4 mt-4 transition-opacity ${!isTop ? 'opacity-100' : 'opacity-0 invisible'}`}>
                      <h3 className="font-heading font-semibold text-dark mb-1 text-center text-sm">{stage.title}</h3>
                      <p className="text-tiny text-secondary text-center">{stage.desc}</p>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifecycle;
