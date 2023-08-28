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

  const [updatedItems, setUpdatedItems] = useState<MenuItem[]>(menuItems);

  const handleInputChange = (index: number, field: keyof MenuItem, value: string | boolean) => {
    const updatedMenuItems = [...updatedItems];
    updatedMenuItems[index] = {
      ...updatedMenuItems[index],
      [field]: value,
    };

    setUpdatedItems(updatedMenuItems);
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
        {menuItems.map((menuItem, index) => (
          <form className="even:bg-neutral-200" key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='flex py-2 rounded my-2 flex-wrap'>
              <div className='w-10 text-center mr-5'>
                <p className='font-lato'>{index + 1}</p>
              </div>
              <div className='mr-5'>
                <input className='bg-transparent border-2 border-dark rounded pl-2'
                  type='text'
                  defaultValue={menuItem.pageName}
                  onChange={(e) => handleInputChange(index, 'pageName', e.target.value)}
                />
              </div>
              <div className='mr-5'>
                <input className='bg-transparent border-2 border-dark rounded pl-2'
                  type='text'
                  defaultValue={menuItem.pageLink}
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
