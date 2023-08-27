import React, { useState } from 'react';

interface InspirationalItem {
  mainTitle: string,
  secondaryTitle: string,
  secondaryParagraph: string,
  tertiaryTitle: string,
  tertiaryParagraph: string,
  image: string,
  imageAlt: string
}

interface EditInspirationalItemsProps {
  inspirationalItems: InspirationalItem[];
  onUpdate: (updatedInspirationalItems: InspirationalItem[]) => void;
}
export default function EditInspirationalItems({ inspirationalItems, onUpdate }: EditInspirationalItemsProps) {
  const handleInputChange = (index: number, field: keyof InspirationalItem, value: string) => {
    const updatedInspirationalItems = [...inspirationalItems];
    updatedInspirationalItems[index][field] = value;
    onUpdate(updatedInspirationalItems);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();

  };

  return (
    <div>
      <div className='flex'>
        <p>Texto</p>
        <p>Link</p>
      </div>
      <div>
        {inspirationalItems.map((inspirationalItem, index) => (

          <form key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='flex'>
              <div>
                <h3>Item {index + 1}:</h3>
              </div>
              <div>
                <input
                  type="text"
                  value={inspirationalItem.mainTitle}
                  onChange={(e) => handleInputChange(index, 'mainTitle', e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={inspirationalItem.secondaryTitle}
                  onChange={(e) => handleInputChange(index, 'secondaryTitle', e.target.value)}
                />
              </div>
            </div>
          </form>
        ))}
      </div>
    </div >
  );
};
