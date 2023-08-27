import React, { useState } from 'react';
import axios from 'axios';

interface InspirationalItem {
  mainTitle: string;
  secondaryTitle: string;
  secondaryParagraph: string;
  tertiaryTitle: string;
  tertiaryParagraph: string;
  image: string;
  imageAlt: string;
}

interface EditInspirationalItemsProps {
  inspirationalItems: InspirationalItem[];
  onUpdate: (updatedInspirationalItems: InspirationalItem[]) => void;
}

export default function EditInspirationalItems({
  inspirationalItems,
  onUpdate,
}: EditInspirationalItemsProps) {
  const [updatedItems, setUpdatedItems] = useState<InspirationalItem[]>(inspirationalItems);

  const handleInputChange = (
    index: number,
    field: keyof InspirationalItem,
    value: string | boolean
  ) => {
    const updatedInspirationalItems = [...updatedItems];
    updatedInspirationalItems[index] = {
      ...updatedInspirationalItems[index],
      [field]: value,
    };

    setUpdatedItems(updatedInspirationalItems);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();

    const selectedFileInput = event.currentTarget.querySelector<HTMLInputElement>(
      `input[type="file"][name="image-${index}"]`
    );

    if (selectedFileInput && selectedFileInput.files && selectedFileInput.files.length > 0) {
      const selectedFile = selectedFileInput.files[0];
      await handleImageChange(index, selectedFile);

      return;
    }

    onUpdate(updatedItems);
    alert('Updated successfully');
  };

  const handleImageChange = async (index: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append('image-article', file);

      const response = await axios.post('http://localhost:8080/api/images/upload', formData);
      const imageUrl = response.data.path;

      const updatedInspirationalItems = [...updatedItems];
      updatedInspirationalItems[index] = {
        ...updatedInspirationalItems[index],
        image: imageUrl,
      };

      setUpdatedItems(updatedInspirationalItems);

      onUpdate(updatedInspirationalItems);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <div className="flex border-b-2 border-dark pb-2 mb-2">
        <p className="w-[205px]">Main Title</p>
        <p className="w-[205px]">Secondary Title</p>
        <p>Secondary Paragraph</p>
      </div>
      <div>
        {inspirationalItems.map((inspirationalItem, index) => (
          <form className="even:bg-neutral-200" key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className="flex py-2 rounded my-2 flex-wrap">
              <div className="mr-5">
                <input
                  className="bg-transparent border-2 border-dark rounded pl-2"
                  type="text"
                  defaultValue={inspirationalItem.mainTitle}
                  onChange={(e) => handleInputChange(index, 'mainTitle', e.target.value)}
                />
              </div>
              <div className="mr-5">
                <input
                  className="bg-transparent border-2 border-dark rounded pl-2"
                  type="text"
                  defaultValue={inspirationalItem.secondaryTitle}
                  onChange={(e) => handleInputChange(index, 'secondaryTitle', e.target.value)}
                />
              </div>
              <div className="mr-5">
                <input
                  className="bg-transparent border-2 border-dark rounded pl-2"
                  type="text"
                  defaultValue={inspirationalItem.secondaryParagraph}
                  onChange={(e) => handleInputChange(index, 'secondaryParagraph', e.target.value)}
                />
              </div>

            </div>
            <div className="flex border-b-2 border-dark pb-2 mb-2 mt-8">
              <p className="w-[205px]">Tertiary Title</p>
              <p className="w-[205px]">Tertiary paragraph</p>
              <p>Image Alt</p>
            </div>
            <div className="flex py-2 rounded my-2 flex-wrap items-center">
              <div className="mr-5">
                <input
                  className="bg-transparent border-2 border-dark rounded pl-2"
                  type="text"
                  defaultValue={inspirationalItem.tertiaryTitle}
                  onChange={(e) => handleInputChange(index, 'tertiaryTitle', e.target.value)}
                />
              </div>
              <div className="mr-5">
                <input
                  className="bg-transparent border-2 border-dark rounded pl-2"
                  type="text"
                  defaultValue={inspirationalItem.tertiaryParagraph}
                  onChange={(e) => handleInputChange(index, 'tertiaryParagraph', e.target.value)}
                />
              </div>

              <div>
                <input
                  className="bg-transparent border-2 border-dark rounded pl-2 mr-5"
                  type="text"
                  defaultValue={inspirationalItem.imageAlt}
                  onChange={(e) => handleInputChange(index, 'imageAlt', e.target.value)}
                />
              </div>
              <div className="mr-3">
                <input
                  id={`inputFile-${index}`}
                  className="w-[122px]"
                  type="file"
                  name={`image-${index}`}
                  accept="image/*"
                />
              </div>
            </div>
            <div>
              <button
                className="bg-dark text-white border-dark py-1 w-[200px] block text-center rounded-md hover:opacity-90"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
