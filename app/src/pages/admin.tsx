// admin.tsx
import React, { useState, useEffect } from 'react';
import Accordion from '@/components/Accordion/Accordion';
import EditMenuItems from '../components/AdminEdit/EditMenu';
import EditInspirationalItems from '@/components/AdminEdit/EditInspirational';
import { fetchMenuData, updateMenuData, fetchInspirationalData, updateInspirationalData } from '@/types/apiHandlers';
import { MenuItem, InspirationalItem } from '@/types/interfaces';

export default function Admin() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [inspirationalItems, setInspirationalItems] = useState<InspirationalItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedMenuItems = await fetchMenuData();
      setMenuItems(fetchedMenuItems);

      const fetchedInspirationalItems = await fetchInspirationalData();
      setInspirationalItems(fetchedInspirationalItems);
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
        <Accordion title="INSPIRATIONAL">
          <EditInspirationalItems inspirationalItems={inspirationalItems} onUpdate={handleInspirationalUpdate} />
        </Accordion>
      </div>
    </>
  );
}
