import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}


export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
      
    </div>
  );
};

