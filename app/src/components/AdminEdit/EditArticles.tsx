import React, { useState } from 'react';

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
  const handleInputChange = (index: number, field: keyof ArticleItem, value: string) => {
    const updatedArticleItems = [...articleItems];
    updatedArticleItems[index] = {
      ...updatedArticleItems[index],
      [field]: value,
    };
    onUpdate(updatedArticleItems[index], updatedArticleItems[index].id);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className='flex'>
        <p>Texto</p>
        <p>Link</p>
      </div>
      <div>
        {articleItems.map((articleItem, index) => (
          <form key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='flex'>
              <div>
                <h3>Item {index + 1}:</h3>
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
                <button type='submit'>Update</button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
