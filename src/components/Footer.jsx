import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white/90">
      <div className="container-main py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start flex-wrap gap-8">
          <div>
            <div className="text-2xl font-heading font-bold text-white mb-2">EW</div>
            <p className="text-small text-white/70">E-Waste Management</p>
            <p className="text-small text-white/70">Academic Portfolio</p>
          </div>
          
          <div className="md:text-right">
            <p className="text-white font-medium mb-1">Prathamesh Salunkhe</p>
            <p className="text-small text-white/60">B.Tech Information Technology</p>
            <p className="text-small text-white/60">Vidyalankar Institute of Technology, Mumbai</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-tiny text-white/40">
            © 2026 Prathamesh Salunkhe. All rights reserved.
          </p>
          <p className="text-tiny text-white/40">
            Built as an academic portfolio for E-Waste Management.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
