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

      // Do not update the article until the image is successfully uploaded
      return;
    }

    onUpdate(updatedItems[index], updatedItems[index].id);
  };

  const handleImageChange = async (index: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append('image-article', file);

      const response = await axios.post('http://localhost:8080/api/images/upload', formData);
      const imageUrl = response.data.path;

      // Update the image URL and then update the article after the image upload is complete
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
        <p>Title</p>
        <p>Subtitle</p>
        <p>Image</p>
        <p>Principal</p>
      </div>
      <div>
        {articleItems.map((articleItem, index) => (
          <form key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='flex'>
              <div>
                <p>{index + 1}</p>
              </div>
              <div>
                <input
                  type='text'
                  defaultValue={articleItem.title}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                />
              </div>
              <div>
                <input
                  type='text'
                  defaultValue={articleItem.subtitle}
                  onChange={(e) => handleInputChange(index, 'subtitle', e.target.value)}
                />
              </div>
              <div>
                <input
                  type='file'
                  name={`image-${index}`}
                  accept='image/*'
                />
              </div>
              <div>
                <input
                  type='checkbox'
                  checked={index === checkedIndex && articleItem.isPrincipal}
                  onChange={(e) => handleInputChange(index, 'isPrincipal', e.target.checked)}
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



