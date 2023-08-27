import React, { useState } from 'react';

interface MenuItem {
  pageName: string;
  pageLink: string;
}

interface EditMenuItemsProps {
  menuItems: MenuItem[];
  onUpdate: (updatedMenuItems: MenuItem[]) => void;
}
export default function EditMenuItems({ menuItems, onUpdate }: EditMenuItemsProps) {
  const handleInputChange = (index: number, field: keyof MenuItem, value: string) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index][field] = value;
    onUpdate(updatedMenuItems);
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
        {menuItems.map((menuItem, index) => (

          <form key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='flex'>
              <div>
                <h3>Item {index + 1}:</h3>
              </div>
              <div>
                <input
                  type="text"
                  value={menuItem.pageName}
                  onChange={(e) => handleInputChange(index, 'pageName', e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={menuItem.pageLink}
                  onChange={(e) => handleInputChange(index, 'pageLink', e.target.value)}
                />
              </div>
            </div>
          </form>
        ))}
      </div>
    </div >
  );
};
