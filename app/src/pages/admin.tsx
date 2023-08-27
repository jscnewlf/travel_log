import React, { useState, useEffect } from 'react';
import Accordion from '@/components/Accordion/Accordion';
//Edit + Types
import EditMenuItems from '../components/AdminEdit/EditMenu';
import EditInspirationalItems from '@/components/AdminEdit/EditInspirational';
import EditFooterItems from '@/components/AdminEdit/EditFooter';
import EditArticleItems from '@/components/AdminEdit/EditArticles';
import { fetchMenuData, updateMenuData, fetchInspirationalData, updateInspirationalData, fetchFooterData, updateFooterData, fetchArticleData, updateArticleData } from '@/types/apiHandlers';
import { MenuItem, InspirationalItem, FooterItem, ArticleItem } from '@/types/interfaces';

export default function Admin() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [inspirationalItems, setInspirationalItems] = useState<InspirationalItem[]>([]);
  const [footerItems, setFooterItems] = useState<FooterItem[]>([]);
  const [articleItems, setArticleItems] = useState<ArticleItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedMenuItems = await fetchMenuData();
      setMenuItems(fetchedMenuItems);

      const fetchedInspirationalItems = await fetchInspirationalData();
      setInspirationalItems(fetchedInspirationalItems);

      const fetchedFooterItems = await fetchFooterData();
      setFooterItems(fetchedFooterItems);

      const fetchedArticleItems = await fetchArticleData();
      setArticleItems(fetchedArticleItems);
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

  const handleArticleUpdate = async (updatedArticleItems: ArticleItem[]) => {
    if (await updateArticleData(updatedArticleItems)) {
      setArticleItems(updatedArticleItems);
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
        <Accordion title="FOOTER">
          <EditFooterItems footerItems={footerItems} onUpdate={handleFooterUpdate} />
        </Accordion>
      </div>
    </>
  );
}
