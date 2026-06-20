'use client';

import React, { useState, useEffect } from 'react';

export const ComingSoonModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find if clicked element or its closest ancestor has data-coming-soon attribute
      const comingSoonElement = target.closest('[data-coming-soon]');
      if (comingSoonElement) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="coming-soon-modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="coming-soon-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="coming-soon-modal-close" onClick={() => setIsOpen(false)} aria-label="Close modal">
          &times;
        </button>
        <div className="coming-soon-modal-icon">✨</div>
        <h3>Coming Soon!</h3>
        <p>This feature is currently under active development. Stay tuned for updates!</p>
        <button className="btn btn-primary" onClick={() => setIsOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
};
