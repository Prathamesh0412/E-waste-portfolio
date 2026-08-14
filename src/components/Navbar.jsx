import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  {
    label: 'E-Waste',
    children: [
      { label: 'What is E-Waste?', href: '#ewaste' },
      { label: 'E-Waste Lifecycle', href: '#lifecycle' },
      { label: 'Management Methods', href: '#management' },
      { label: '5R Framework', href: '#framework' },
    ],
  },
  { label: 'Assignments', href: '#assignments' },
  {
    label: 'Learning',
    children: [
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Research & Resources', href: '#research' },
      { label: 'Sustainability Commitment', href: '#sustainability' },
      { label: 'Journey Milestones', href: '#journey' },
      { label: 'Quick Knowledge', href: '#didyouknow' },
      { label: 'Interactive Quiz', href: '#quiz' },
    ],
  },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (href) => {
    setMobileOpen(false)
    setActiveDropdown(null)
    const el = document.querySelector(href)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-nav'
            : 'bg-white border-b border-border'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-main flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="flex items-center gap-1 group"
            aria-label="Go to home"
          >
            <span className="text-2xl font-heading font-bold text-primary">
              EW
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 group-hover:scale-125 transition-transform" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => !item.children && scrollTo(item.href)}
                  className="nav-link px-4 py-2 rounded-lg hover:bg-soft transition-colors inline-flex items-center gap-1"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180 text-primary' : 'text-secondary'}`} />
                  )}
                </button>

                {/* Desktop Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-card shadow-card-hover py-2 min-w-[220px] animate-fade-in">
                    {item.children.map((child) => (
                      <button
                        key={child.href}
                        onClick={() => scrollTo(child.href)}
                        className="w-full text-left px-4 py-2.5 text-sm text-secondary hover:text-primary hover:bg-soft/50 transition-colors"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/admin/login"
              className="nav-link px-4 py-2 rounded-lg hover:bg-soft/50 transition-colors text-secondary/60 text-sm"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-dark"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="mobile-menu-overlay lg:hidden" onClick={() => setMobileOpen(false)}>
          <div
            className="fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-white shadow-modal z-50 overflow-y-auto animate-slide-in"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideIn 0.3s ease-out' }}
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <span className="text-xl font-heading font-bold text-primary">EW</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-soft transition-colors text-dark"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-5 space-y-1">
              {navLinks.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between py-3 px-3 rounded-lg text-dark font-medium hover:bg-soft/50 transition-colors"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 text-secondary transition-transform duration-300 ${mobileExpanded === item.label ? 'rotate-180 text-primary' : ''}`} />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="ml-4 space-y-0.5 mb-2">
                          {item.children.map((child) => (
                            <button
                              key={child.href}
                              onClick={() => scrollTo(child.href)}
                              className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-secondary hover:text-primary hover:bg-soft/50 transition-colors"
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="w-full text-left py-3 px-3 rounded-lg text-dark font-medium hover:bg-soft/50 transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}

              <div className="pt-4 mt-4 border-t border-border">
                <Link
                  to="/admin/login"
                  className="block py-3 px-3 rounded-lg text-secondary/60 text-sm hover:bg-soft/50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}
