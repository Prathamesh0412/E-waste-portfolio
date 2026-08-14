import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Leaf } from 'lucide-react'

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="bg-bg min-h-[calc(100vh-80px)] flex items-center pt-24 pb-12 lg:pt-28 lg:pb-16">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="text-label uppercase tracking-widest text-primary font-semibold mb-4 text-xs md:text-sm">
              E-Waste Management · Academic Portfolio
            </div>

            <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.1] font-heading font-bold text-dark mb-5">
              Understanding
              <br />
              E-Waste for a
              <br />
              <span className="text-primary">sustainable future.</span>
            </h1>

            <p className="text-body text-secondary max-w-lg mb-6 leading-relaxed">
              An academic portfolio exploring electronic waste, responsible
              technology use, sustainable management, research, and my learning
              journey through the E-Waste Management subject.
            </p>

            <div className="border-t border-border pt-4 mb-6">
              <p className="text-body font-semibold text-dark">Prathamesh Salunkhe</p>
              <p className="text-small text-secondary mt-0.5">
                B.Tech Information Technology
              </p>
              <p className="text-small text-secondary">
                Vidyalankar Institute of Technology, Mumbai
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('#assignments')}
                className="btn-primary flex items-center gap-2"
              >
                Explore Assignments
                <BookOpen className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo('#ewaste')}
                className="btn-secondary flex items-center gap-2"
              >
                Explore E-Waste
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative card rounded-card-lg overflow-hidden p-0 border-0 max-w-[90%] md:max-w-[85%] lg:max-w-full">
              <img
                src="/images/hero-illustration.jpg"
                alt="E-Waste management illustration showing electronic devices with environmental elements"
                className="w-full h-auto"
                loading="eager"
              />
            </div>

            {/* Decorative floating badge */}
            <motion.div
              className="absolute -bottom-4 -left-4 bg-surface card rounded-card-lg shadow-card-hover px-5 py-3 border border-border hidden lg:flex items-center gap-3"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Leaf className="w-6 h-6 text-primary" />
              <div>
                <div className="text-label uppercase tracking-wider text-primary font-semibold">Academic</div>
                <div className="text-small font-medium text-dark">Portfolio</div>
              </div>
            </motion.div>

            {/* Decorative dots */}
            <div className="absolute -top-6 -right-6 w-24 h-24 opacity-10 hidden lg:block">
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-primary" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
