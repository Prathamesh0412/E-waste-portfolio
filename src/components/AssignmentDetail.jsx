import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AssignmentDetail = ({ assignment, onClose }) => {
  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!assignment) return null;

  // Prevent closing when clicking inside the modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const formattedDate = new Date(assignment.date || assignment.createdAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-surface max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-card relative flex flex-col"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={handleModalClick}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-soft rounded-full p-2 transition-colors z-10"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Modal content */}
          <div className="p-8 sm:p-10">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <span className="text-tiny uppercase tracking-wider text-primary font-semibold">
                ASSIGNMENT {assignment.number || ''}
              </span>
              {assignment.category && (
                <span className="tag px-2 py-1 text-xs">{assignment.category}</span>
              )}
              <span className="text-tiny text-secondary sm:ml-auto">
                {formattedDate}
              </span>
            </div>

            <h2 className="text-section font-heading text-dark mb-6 pr-8">
              {assignment.title}
            </h2>

            {assignment.tags && assignment.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {assignment.tags.map((tag, i) => (
                  <span key={i} className="tag px-2 py-1 text-xs">{tag}</span>
                ))}
              </div>
            )}

            <hr className="border-border mb-8" />

            {/* Image (if present) */}
            {assignment.preview_image && (
              <div className="mb-8 rounded-lg overflow-hidden border border-border">
                <img 
                  src={assignment.preview_image} 
                  alt={assignment.title} 
                  className="w-full h-auto object-cover max-h-[400px]"
                  loading="lazy"
                />
              </div>
            )}

            {/* Description */}
            <div className="prose prose-lg prose-p:text-secondary max-w-none mb-8">
              <p className="text-body-lg text-secondary">{assignment.description}</p>
            </div>

            {/* Content */}
            {assignment.content && (
              <div className="mb-8">
                <h3 className="font-heading text-xl text-dark mb-4">Details</h3>
                <div className="text-body text-secondary whitespace-pre-wrap">
                  {assignment.content}
                </div>
              </div>
            )}

            {/* Learning Outcomes */}
            {assignment.learning_outcomes && assignment.learning_outcomes.length > 0 && (
              <div className="mb-8 bg-bg p-6 rounded-lg border border-border">
                <h3 className="font-heading text-xl text-dark mb-4">Learning Outcomes</h3>
                <ul className="list-disc list-outside ml-5 text-secondary space-y-2">
                  {assignment.learning_outcomes.map((outcome, i) => (
                    <li key={i}>{outcome}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer with actions */}
            <div className="mt-10 flex flex-wrap gap-4 pt-6 border-t border-border justify-between items-center">
              {assignment.pdf_file ? (
                <a 
                  href={`/uploads/${assignment.pdf_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Download PDF
                </a>
              ) : (
                <div></div>
              )}
              
              <button onClick={onClose} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AssignmentDetail;
