import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, form submission logic goes here
  };

  return (
    <section id="contact" className="bg-surface section-padding-lg">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-label text-primary mb-6">
              <span className="ml-2">GET IN TOUCH</span>
            </div>
            <h2 className="text-hero font-heading font-bold text-dark mt-6">
              Let's<br /><span className="text-primary">Connect.</span>
            </h2>
            
            <p className="text-body-lg text-secondary mt-6 max-w-md">
              Have a question or want to connect? Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>

            <div className="mt-10 space-y-6">
              <a 
                href="mailto:prathameshsalunkhe2006@gmail.com"
                className="flex items-center gap-4 text-secondary hover:text-primary transition-colors text-body-lg"
              >
                <div className="w-12 h-12 rounded-full bg-soft flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                prathameshsalunkhe2006@gmail.com
              </a>
              <a 
                href="https://www.linkedin.com/in/prathamesh-salunkhe-0412v/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-secondary hover:text-primary transition-colors text-body-lg"
              >
                <div className="w-12 h-12 rounded-full bg-soft flex items-center justify-center text-primary">
                  <LinkedinIcon />
                </div>
                LinkedIn
              </a>
              <a 
                href="https://github.com/Prathamesh0412"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-secondary hover:text-primary transition-colors text-body-lg"
              >
                <div className="w-12 h-12 rounded-full bg-soft flex items-center justify-center text-primary">
                  <GithubIcon />
                </div>
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card p-8 md:p-10 shadow-card bg-white">
              {isSubmitted ? (
                <div className="text-center py-16">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h3 className="font-heading text-section font-bold text-dark mb-4">Thank you!</h3>
                  <p className="text-body text-secondary mb-8">Your message has been received. I'll get back to you soon.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="text-label text-dark block mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      placeholder="Your name" 
                      className="form-input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-label text-dark block mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      placeholder="your.email@example.com" 
                      className="form-input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-label text-dark block mb-2">Message</label>
                    <textarea 
                      id="message" 
                      required
                      placeholder="How can I help you?" 
                      rows="5"
                      className="form-input w-full resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
