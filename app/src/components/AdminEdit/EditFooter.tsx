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

  const [updatedItems, setUpdatedItems] = useState<FooterItem[]>(footerItems);

  const handleInputChange = (index: number, field: keyof FooterItem, value: string | boolean) => {
    const updatedFooterItems = [...updatedItems];
    updatedFooterItems[index] = {
      ...updatedFooterItems[index],
      [field]: value,
    };

    setUpdatedItems(updatedFooterItems);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();


    onUpdate(updatedItems);
    alert('Updated successfully');
  };



  return (
    <div>
      <div className='flex border-b-2 border-dark pb-2 mb-2'>
        <p className='w-10 pl-1 mr-5'>Item</p>
        <p className='w-[205px]'>Text</p>
        <p>Link</p>
      </div>
      <div>
        {footerItems.map((footerItem, index) => (
          <form className="even:bg-neutral-200" key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='flex py-2 rounded my-2 flex-wrap'>
              <div className='w-10 text-center mr-5'>
                <p className='font-lato'>{index + 1}</p>
              </div>
              <div className='mr-5'>
                <input className='bg-transparent border-2 border-dark rounded pl-2'
                  type='text'
                  defaultValue={footerItem.pageName}
                  onChange={(e) => handleInputChange(index, 'pageName', e.target.value)}
                />
              </div>
              <div className='mr-5'>
                <input className='bg-transparent border-2 border-dark rounded pl-2'
                  type='text'
                  defaultValue={footerItem.pageLink}
                  onChange={(e) => handleInputChange(index, 'pageLink', e.target.value)}
                />
              </div>
              <div>
                <button className="bg-dark text-white border-dark py-1 w-[200px] block text-center rounded-md hover:opacity-90 " type='submit'>Update</button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
