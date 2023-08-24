import React, { useState, useEffect } from 'react';
import EditMenuItems from '../components/EditMenuItems';
import axios from 'axios';

interface MenuItem {
  pageName: string;
  pageLink: string;
}

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/getData');
        setMenuItems(response.data.menuPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleMenuUpdate = async (updatedMenuItems: MenuItem[]) => {
    try {
      const response = await axios.post('/api/updateData', { menuPages: updatedMenuItems });
      console.log(response.data.message);
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <main >
      <div >
        <EditMenuItems menuItems={menuItems} onUpdate={handleMenuUpdate} />
      </div>
     
    </main>
  );
}
