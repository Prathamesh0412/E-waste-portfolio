import React from 'react';
import { ArrowRight } from 'lucide-react';

const AssignmentCard = ({ assignment, onClick }) => {
  const formattedDate = new Date(assignment.date || assignment.createdAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div 
      className="card flex flex-col h-full overflow-hidden cursor-pointer group p-0 border-0"
      onClick={() => onClick(assignment)}
    >
      {/* Top Preview Area */}
      <div className="w-full aspect-video relative overflow-hidden bg-bg border-b border-border">
        {assignment.preview_image ? (
          <img 
            src={assignment.preview_image} 
            alt={assignment.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-soft to-bg">
            <span className="font-heading text-hero text-primary opacity-20">
              #{assignment.number || 'A'}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-label uppercase tracking-wider text-primary font-semibold">
            ASSIGNMENT {assignment.number || ''}
          </span>
          {assignment.category && (
            <span className="tag text-small px-2 py-0.5">{assignment.category}</span>
          )}
        </div>
        
        <div className="text-small text-secondary mb-3">
          {formattedDate}
        </div>

        <h3 className="font-heading text-subtitle text-dark line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {assignment.title}
        </h3>
        
        <p className="text-body text-secondary line-clamp-3 flex-grow">
          {assignment.description}
        </p>

        {Array.isArray(assignment.tags) && assignment.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {assignment.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="tag text-small px-2 py-0.5">{tag}</span>
            ))}
            {assignment.tags.length > 3 && (
              <span className="tag text-small px-2 py-0.5">+{assignment.tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="mt-5 pt-4">
          <button className="btn-secondary w-full inline-flex items-center justify-center gap-2">
            View Assignment
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
