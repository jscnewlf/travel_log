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

  const handleInputChange = (index: number, field: keyof ArticleItem, value: string | boolean) => {
    const updatedArticleItems = [...articleItems];
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

    onUpdate(updatedArticleItems[index], updatedArticleItems[index].id);
  };

  const handleImageChange = async (index: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append('image-article', file);

      const response = await axios.post('http://localhost:8080/api/images/upload', formData); // Use the full URL
      const imageUrl = response.data.path;

      handleInputChange(index, 'image', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
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
                  value={articleItem.title}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                />
              </div>
              <div>
                <input
                  type='text'
                  value={articleItem.subtitle}
                  onChange={(e) => handleInputChange(index, 'subtitle', e.target.value)}
                />
              </div>
              <div>
                <input
                  type='file' name='image-article'
                  
                  accept='image/*'
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      handleImageChange(index, selectedFile);
                    }
                  }}
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
