import axios from 'axios';
import { MenuItem, InspirationalItem } from './interfaces';

export async function fetchMenuData() {
    try {
        const response = await axios.get(`/api/menu/getData`);
        return response.data.menuPages as MenuItem[];
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return [];
    }
}

export async function updateMenuData(updatedMenuItems: MenuItem[]) {
    try {
        const response = await axios.post(`/api/menu/updateData`, { menuPages: updatedMenuItems });
        console.log(response.data.message);
        return true;
    } catch (error) {
        console.error('Error updating menu data:', error);
        return false;
    }
}

export async function fetchInspirationalData() {
    try {
        const response = await axios.get(`/api/inspirational/getData`);
        return response.data.inspirationalContent as InspirationalItem[];
    } catch (error) {
        console.error('Error fetching inspirational data:', error);
        return [];
    }
}

export async function updateInspirationalData(updatedInspirationalItems: InspirationalItem[]) {
    try {
        const response = await axios.post(`/api/inspirational/updateData`, { inspirationalContent: updatedInspirationalItems });
        console.log(response.data.message);
        return true;
    } catch (error) {
        console.error('Error updating inspirational data:', error);
        return false;
    }
}