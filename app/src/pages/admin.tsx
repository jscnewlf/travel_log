import React, { useState, useEffect } from 'react';
import Accordion from '@/components/Accordion/Accordion';
//Edit + Types
import EditMenuItems from '../components/AdminEdit/EditMenu';
import EditInspirationalItems from '@/components/AdminEdit/EditInspirational';
import EditFooterItems from '@/components/AdminEdit/EditFooter';
import EditArticleItems from '@/components/AdminEdit/EditArticles';
import EditDepoimentItems from '@/components/AdminEdit/EditDepoiments';

import { fetchMenuData, updateMenuData, 
  fetchInspirationalData, updateInspirationalData, 
  fetchFooterData, updateFooterData, 
  fetchArticleData, updateSingleArticleData, 
  fetchDepoimentData, updateSingleDepoimentData 
} from '@/types/apiHandlers';
import { MenuItem, InspirationalItem, FooterItem, ArticleItem, DepoimentItem } from '@/types/interfaces';

export default function Admin() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [inspirationalItems, setInspirationalItems] = useState<InspirationalItem[]>([]);
  const [footerItems, setFooterItems] = useState<FooterItem[]>([]);
  const [articleItems, setArticleItems] = useState<ArticleItem[]>([]);
  const [depoimentItems, setDepoimentItems] = useState<DepoimentItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedMenuItems = await fetchMenuData();
      setMenuItems(fetchedMenuItems);

      const fetchedInspirationalItems = await fetchInspirationalData();
      setInspirationalItems(fetchedInspirationalItems);

      const fetchedFooterItems = await fetchFooterData();
      setFooterItems(fetchedFooterItems);

      const fetchedDepoimentItems = await fetchDepoimentData();
      setDepoimentItems(fetchedDepoimentItems);
    }

    fetchData();
  }, []);

  const handleMenuUpdate = async (updatedMenuItems: MenuItem[]) => {
    if (await updateMenuData(updatedMenuItems)) {
      setMenuItems(updatedMenuItems);
    }
  };

  const handleInspirationalUpdate = async (updatedInspirationalItems: InspirationalItem[]) => {
    if (await updateInspirationalData(updatedInspirationalItems)) {
      setInspirationalItems(updatedInspirationalItems);
    }
  };

  const handleFooterUpdate = async (updatedFooterItems: FooterItem[]) => {
    if (await updateFooterData(updatedFooterItems)) {
      setFooterItems(updatedFooterItems);
    }
  };

  const handleArticleUpdate = async (updatedArticle: ArticleItem, id: number) => {
    if (await updateSingleArticleData(id, updatedArticle)) {
      const updatedArticleItems = articleItems.map((article) => {
        if (article.id === id) {
          return updatedArticle;
        }
        return article;
      });
      setArticleItems(updatedArticleItems);
    }
  };

  const handleDepoimentUpdate = async (updatedDepoiment: DepoimentItem, id: number) => {
    if (await updateSingleDepoimentData(id, updatedDepoiment)) {
      const updatedDepoimentItems = depoimentItems.map((depoiment) => {
        if (depoiment.id === id) {
          return updatedDepoiment;
        }
        return depoiment;
      });
      setDepoimentItems(updatedDepoimentItems);
    }
  };


  return (
    <>
      <div>
        <div>
          <h2>My Travels Log - Panel Admin</h2>
          <a href="http://localhost:3000/" target="_target">Go to Website</a>
        </div>
        <Accordion title="MENU">
          <EditMenuItems menuItems={menuItems} onUpdate={handleMenuUpdate} />
        </Accordion>
        <Accordion title="ARTICLES">
          <EditArticleItems articleItems={articleItems} onUpdate={handleArticleUpdate} />
        </Accordion>
        <Accordion title="INSPIRATIONAL">
          <EditInspirationalItems inspirationalItems={inspirationalItems} onUpdate={handleInspirationalUpdate} />
        </Accordion>
        <Accordion title="DEPOIMENTS">
          <EditDepoimentItems depoimentItems={depoimentItems} onUpdate={handleDepoimentUpdate} />
        </Accordion>
        <Accordion title="FOOTER">
          <EditFooterItems footerItems={footerItems} onUpdate={handleFooterUpdate} />
        </Accordion>
      </div>
    </>
  );
}
