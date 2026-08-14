import { useState } from 'react'
import ScrollReveal from './ui/ScrollReveal'
import { User, Monitor, Code, Database, Server, Terminal, Settings, Layers, Cpu, Globe } from 'lucide-react'

const skillsList = [
  { name: 'HTML & CSS', progress: 95, icon: Globe },
  { name: 'JavaScript & React.js', progress: 85, icon: Monitor },
  { name: 'Java & Spring Boot', progress: 85, icon: Code },
  { name: 'Node.js & REST APIs', progress: 80, icon: Server },
  { name: 'Python', progress: 80, icon: Terminal },
  { name: 'PostgreSQL & MySQL', progress: 85, icon: Database },
  { name: 'C / C++', progress: 75, icon: Cpu },
  { name: 'Git & GitHub', progress: 90, icon: Layers },
  { name: 'Docker & Maven', progress: 70, icon: Settings },
];

export default function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="about" className="bg-surface section-padding overflow-hidden">
      <div className="container-main">
        
        {/* Full Width Header */}
        <ScrollReveal className="mb-12 lg:mb-16">
          <h3 className="text-label text-primary font-bold tracking-widest uppercase mb-4">About Me</h3>
          <h2 className="text-hero font-heading font-bold text-dark mt-2 leading-tight max-w-4xl">
            Curious about technology. <span className="text-primary italic serif-accent">Responsible</span> about its impact.
          </h2>
        </ScrollReveal>

        {/* Top Section: Intro & Photo */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left — Content */}
          <div className="order-2 lg:order-1">
            <ScrollReveal delay={1}>
              <div className="space-y-5 text-body-lg text-secondary leading-relaxed mb-10">
                <p>
                  Hi, I'm Prathamesh Salunkhe, a B.Tech Information Technology
                  student at Vidyalankar Institute of Technology, Mumbai. I am
                  interested in software development, problem solving, emerging
                  technologies, and building practical digital solutions.
                </p>
                <p>
                  My technical background includes Java, Python, C, C++, HTML,
                  CSS, JavaScript, React.js, Node.js, Spring Boot, REST APIs,
                  PostgreSQL, MySQL, Git, GitHub, Docker, Maven, and VS Code.
                </p>
                <p>
                  Along with developing my technical skills, I am interested in
                  understanding the environmental impact of technology. Studying
                  E-Waste Management has helped me understand responsible
                  technology use, electronic waste reduction, reuse, recycling,
                  resource conservation, and sustainable development.
                </p>
              </div>

            </ScrollReveal>
          </div>

          {/* Right — Photo with reference styling */}
          <div className="order-1 lg:order-2 relative flex justify-center items-center py-10 lg:py-0 min-h-[400px]">
            <ScrollReveal delay={1} className="relative flex justify-center items-center w-full">
              {/* Background Circular Shape */}
              <div className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full bg-primary/10 blur-xl"></div>
              <div className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full bg-soft"></div>
              
              {/* Main Photo */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white w-[260px] md:w-[320px] aspect-[4/5] bg-bg flex items-center justify-center">
                {!imgError ? (
                  <img
                    src="/images/profile.jpg"
                    alt="Prathamesh Salunkhe"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center text-center p-4">
                    <User className="w-16 h-16 text-primary/40 mb-4" />
                    <p className="text-small text-secondary">Photo placeholder</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Section: Skills Progress Bars */}
        <div className="mt-32 pt-16 border-t border-border">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h3 className="text-label text-primary font-bold tracking-widest uppercase mb-3">My Skills</h3>
              <h2 className="text-hero font-heading font-bold text-dark">Technologies I Master</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
              {skillsList.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <ScrollReveal key={skill.name} delay={index * 50}>
                    <div className="group">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-soft flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <Icon size={16} />
                          </div>
                          <span className="text-body font-bold text-dark">{skill.name}</span>
                        </div>
                        <span className="text-small font-mono font-medium text-secondary">{skill.progress}%</span>
                      </div>
                      <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full transition-all duration-1000 ease-out relative" 
                          style={{ width: `${skill.progress}%` }}
                        >
                          <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  )
}
