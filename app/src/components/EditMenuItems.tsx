import React, { useState } from 'react';

interface MenuItem {
  pageName: string;
  pageLink: string;
}

interface EditMenuItemsProps {
  menuItems: MenuItem[];
  onUpdate: (updatedMenuItems: MenuItem[]) => void;
}

const EditMenuItems: React.FC<EditMenuItemsProps> = ({ menuItems, onUpdate }) => {
  const handleInputChange = (index: number, field: keyof MenuItem, value: string) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index][field] = value;
    onUpdate(updatedMenuItems);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para salvar as alterações no JSON ou onde for necessário.
  };

  return (
    <div>
      <h2>Menu Pages</h2>
      {menuItems.map((menuItem, index) => (
        <form key={index} onSubmit={(e) => handleSubmit(e, index)}>
          <h3>Menu {index + 1}:</h3>
          <label>
            Page Name:
            <input
              type="text"
              value={menuItem.pageName}
              onChange={(e) => handleInputChange(index, 'pageName', e.target.value)}
            />
          </label>
          <label>
            Page Link:
            <input
              type="text"
              value={menuItem.pageLink}
              onChange={(e) => handleInputChange(index, 'pageLink', e.target.value)}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      ))}
    </div>
  );
};

export default EditMenuItems;
