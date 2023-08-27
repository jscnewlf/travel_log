import React, { useState } from 'react';

interface DepoimentItem {
    id: number;
    name: string;
    avatar: string;
    comment: string;
}

interface EditDepoimentItemsProps {
  depoimentItems: DepoimentItem[];
  onUpdate: (updatedDepoiment: DepoimentItem, id: number) => void;
}

export default function EditDepoimentItems({ depoimentItems, onUpdate }: EditDepoimentItemsProps) {
  const handleInputChange = (index: number, field: keyof DepoimentItem, value: string) => {
    const updatedDepoimentItems = [...depoimentItems];
    updatedDepoimentItems[index] = {
      ...updatedDepoimentItems[index],
      [field]: value,
    };
    onUpdate(updatedDepoimentItems[index], updatedDepoimentItems[index].id);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className='flex'>
        <p>Texto</p>
        <p>Link</p>
      </div>
      <div>
        {depoimentItems.map((depoimentItem, index) => (
          <form key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='flex'>
              <div>
                <h3>Item {index + 1}:</h3>
              </div>
              <div>
                <input
                  type='text'
                  value={depoimentItem.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <input
                  type='text'
                  value={depoimentItem.avatar}
                  onChange={(e) => handleInputChange(index, 'avatar', e.target.value)}
                />
              </div>
              <div>
                <button type='submit'>Update</button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
