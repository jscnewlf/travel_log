import React, { useState } from 'react';
import axios from 'axios';

interface ArticleItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  isPrincipal: boolean;
}

interface EditArticleItemsProps {
  articleItems: ArticleItem[];
  onUpdate: (updatedArticle: ArticleItem, id: number) => void;
}


export default function EditArticleItems({ articleItems, onUpdate }: EditArticleItemsProps) {
  const [checkedIndex, setCheckedIndex] = useState<number>(-1);
  const [uploadingImages, setUploadingImages] = useState<boolean[]>(new Array(articleItems.length).fill(false));
  const [updatedItems, setUpdatedItems] = useState<ArticleItem[]>(articleItems);

  const handleInputChange = (index: number, field: keyof ArticleItem, value: string | boolean) => {
    const updatedArticleItems = [...updatedItems];
    updatedArticleItems[index] = {
      ...updatedArticleItems[index],
      [field]: value,
    };

    if (field === 'isPrincipal') {
      if (value === true) {
  
        if (checkedIndex !== -1) {
          alert('Please update the previous checkbox before selecting a new one.');
          return;
        }
        setCheckedIndex(index);
      } else {
        setCheckedIndex(-1);
      }

      for (let i = 0; i < updatedArticleItems.length; i++) {
        if (i !== index) {
          updatedArticleItems[i].isPrincipal = false;
        }
      }
    }

    setUpdatedItems(updatedArticleItems);
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

      const updatedArticleItems = [...updatedItems];
      updatedArticleItems[index] = {
        ...updatedArticleItems[index],
        image: imageUrl,
      };

      setUpdatedItems(updatedArticleItems);
      setUploadingImages((prevUploads) => {
        const updatedUploads = [...prevUploads];
        updatedUploads[index] = false;
        return updatedUploads;
      });

      onUpdate(updatedArticleItems[index], updatedArticleItems[index].id);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <div className='flex border-b-2 border-dark pb-2 mb-2'>
        <p className='w-10 pl-1 mr-5'>Item</p>
        <p className='w-[205px]'>Title</p>
        <p>Subtitle</p>
      </div>
      <div>
        {articleItems.map((articleItem, index) => (
          <form className="even:bg-neutral-200" key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='flex py-2 rounded my-2 flex-wrap'>
              <div className='w-10 text-center mr-5'>
                <p className='font-lato'>{index + 1}</p>
              </div>
              <div className='mr-5'>
                <input className='bg-transparent border-2 border-dark rounded pl-2'
                  type='text'
                  defaultValue={articleItem.title}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                />
              </div>
              <div className='mr-5'>
                <input className='bg-transparent border-2 border-dark rounded pl-2'
                  type='text'
                  defaultValue={articleItem.subtitle}
                  onChange={(e) => handleInputChange(index, 'subtitle', e.target.value)}
                />
              </div>
              <div className='mr-3'>
                <input id="inputFile" className='w-[122px]'
                  type='file'
                  name={`image-${index}`}
                  accept='image/*'
                />
              </div>
              <div className='mr-5 flex items-center gap-2'>
              <input
                  type='checkbox' name="isPrincipal"
                  checked={index === checkedIndex && articleItem.isPrincipal}
                  onChange={(e) => handleInputChange(index, 'isPrincipal', e.target.checked)}
                />
                <label htmlFor="isPrincipal" className='mr-2'>Principal</label>
                
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



