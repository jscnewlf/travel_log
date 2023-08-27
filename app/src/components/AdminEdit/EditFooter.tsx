import React, { useState } from 'react';

interface FooterItem {
  pageName: string;
  pageLink: string;
}

interface EditFooterItemsProps {
    footerItems: FooterItem[];
  onUpdate: (updatedFooterItems: FooterItem[]) => void;
}
export default function EditFooterItems({ footerItems, onUpdate }: EditFooterItemsProps) {
  const handleInputChange = (index: number, field: keyof FooterItem, value: string) => {
    const updatedFooterItems = [...footerItems];
    updatedFooterItems[index][field] = value;
    onUpdate(updatedFooterItems);
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
        {footerItems.map((footerItem, index) => (

          <form key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='flex'>
              <div>
                <h3>Item {index + 1}:</h3>
              </div>
              <div>
                <input
                  type="text"
                  value={footerItem.pageName}
                  onChange={(e) => handleInputChange(index, 'pageName', e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={footerItem.pageLink}
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
