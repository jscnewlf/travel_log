import React, { useState } from 'react';
import axios from 'axios';

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

  const [uploadingImages, setUploadingImages] = useState<boolean[]>(new Array(depoimentItems.length).fill(false));
  const [updatedItems, setUpdatedItems] = useState<DepoimentItem[]>(depoimentItems);

  const handleInputChange = (index: number, field: keyof DepoimentItem, value: string | boolean) => {
    const updatedDepoimentItems = [...updatedItems];
    updatedDepoimentItems[index] = {
      ...updatedDepoimentItems[index],
      [field]: value,
    };

    setUpdatedItems(updatedDepoimentItems);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();

    const selectedFileInput = event.currentTarget.querySelector<HTMLInputElement>(`input[type="file"][name="image-${index}"]`);
    
    if (selectedFileInput && selectedFileInput.files && selectedFileInput.files.length > 0) {
      const selectedFile = selectedFileInput.files[0];
      await handleImageChange(index, selectedFile);

      return;
    }

    onUpdate(updatedItems[index], updatedItems[index].id);
    alert('Updated successfully');
  };

  const handleImageChange = async (index: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append('image-article', file);

      const response = await axios.post('http://localhost:8080/api/images/upload', formData);
      const imageUrl = response.data.path;

      const updatedDepoimentItems = [...updatedItems];
      updatedDepoimentItems[index] = {
        ...updatedDepoimentItems[index],
        avatar: imageUrl,
      };

      setUpdatedItems(updatedDepoimentItems);
      setUploadingImages((prevUploads) => {
        const updatedUploads = [...prevUploads];
        updatedUploads[index] = false;
        return updatedUploads;
      });

      onUpdate(updatedDepoimentItems[index], updatedDepoimentItems[index].id);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <div className='flex border-b-2 border-dark pb-2 mb-2'>
        <p className='w-10 pl-1 mr-5'>Item</p>
        <p className='w-[205px]'>Name</p>
        <p className='w-[205px]'>Comment</p>
        <p>Avatar</p>
      </div>
      <div>
        {depoimentItems.map((depoimentItem, index) => (
          <form className="even:bg-neutral-200" key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='flex py-2 rounded my-2 flex-wrap'>
              <div className='w-10 text-center mr-5'>
                <p className='font-lato'>{index + 1}</p>
              </div>
              <div className='mr-5'>
                <input className='bg-transparent border-2 border-dark rounded pl-2'
                  type='text'
                  defaultValue={depoimentItem.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
              </div>
              <div className='mr-5'>
                <input className='bg-transparent border-2 border-dark rounded pl-2'
                  type='text'
                  defaultValue={depoimentItem.comment}
                  onChange={(e) => handleInputChange(index, 'comment', e.target.value)}
                />
              </div>
              <div className='mr-3'>
                <input id="inputFile" className='w-[122px]'
                  type='file'
                  name={`image-${index}`}
                  accept='image/*'
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