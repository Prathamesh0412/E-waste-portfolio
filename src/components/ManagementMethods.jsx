import React from 'react';
import { Package, Shuffle, Wrench, RefreshCw, Sparkles, Recycle, Gem, Shield } from 'lucide-react';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';

const methods = [
  {
    icon: <Package className="w-8 h-8 text-primary" />,
    title: "Collection",
    desc: "Gathering end-of-life electronics through designated collection centers, take-back programs, and community collection drives.",
    example: "Example: Municipal e-waste collection events",
  },
  {
    icon: <Shuffle className="w-8 h-8 text-primary" />,
    title: "Segregation",
    desc: "Separating collected e-waste by type, material composition, and hazard level for appropriate processing.",
    example: "Example: Sorting batteries from circuit boards",
  },
  {
    icon: <Wrench className="w-8 h-8 text-primary" />,
    title: "Repair",
    desc: "Fixing malfunctioning devices to restore functionality and extend their useful life.",
    example: "Example: Replacing a broken laptop screen",
  },
  {
    icon: <RefreshCw className="w-8 h-8 text-primary" />,
    title: "Reuse",
    desc: "Redirecting functional devices to new users or purposes, reducing the need for new manufacturing.",
    example: "Example: Donating old computers to schools",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "Refurbishment",
    desc: "Restoring and upgrading used devices to meet quality standards for resale or redistribution.",
    example: "Example: Refurbished smartphones sold with warranty",
  },
  {
    icon: <Recycle className="w-8 h-8 text-primary" />,
    title: "Recycling",
    desc: "Dismantling devices and processing materials for recovery and reuse in manufacturing.",
    example: "Example: Extracting copper from circuit boards",
  },
  {
    icon: <Gem className="w-8 h-8 text-primary" />,
    title: "Material Recovery",
    desc: "Extracting valuable materials such as gold, silver, copper, palladium, and rare earth elements.",
    example: "Example: Recovering gold from processor chips",
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Responsible Disposal",
    desc: "Safely disposing of non-recoverable and hazardous materials following environmental regulations and standards.",
    example: "Example: Certified hazardous waste treatment facilities",
  }
];

const ManagementMethods = () => {
  return (
    <section id="management" className="section-padding bg-bg">
      <div className="container-main">
        <ScrollReveal>
          <SectionLabel number="05" label="MANAGEMENT" />
        </ScrollReveal>

        <div className="mt-8 mb-16 lg:mb-20">
          <ScrollReveal delay={1}>
            <h2 className="font-heading text-section font-bold leading-tight text-dark">
              E-Waste<br />Management Methods.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method, idx) => (
            <ScrollReveal key={idx} delay={(idx % 4) + 1} className="h-full">
              <div className="card p-6 lg:p-8 h-full flex flex-col">
                <div className="mb-4">{method.icon}</div>
                <h3 className="font-heading font-semibold text-subtitle text-dark mt-2">{method.title}</h3>
                <p className="text-secondary text-body mt-2 flex-grow">{method.desc}</p>
                <p className="text-small text-primary mt-4 italic font-medium">{method.example}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManagementMethods;
