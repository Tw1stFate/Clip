import { ClipItem } from '@/types';

const STORAGE_KEY = 'clipboard-items';

export const storage = {
  getItems(): ClipItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const items = localStorage.getItem(STORAGE_KEY);
      if (!items) return [];
      
      const parsedItems = JSON.parse(items);
      return parsedItems.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      }));
    } catch (error) {
      console.error('Error loading clipboard items:', error);
      return [];
    }
  },

  saveItems(items: ClipItem[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving clipboard items:', error);
    }
  },

  addItem(content: string): ClipItem {
    const newItem: ClipItem = {
      id: Date.now().toString(),
      content: content.trim(),
      createdAt: new Date(),
    };

    const items = this.getItems();
    const updatedItems = [newItem, ...items];
    this.saveItems(updatedItems);
    
    return newItem;
  },

  deleteItem(id: string): void {
    const items = this.getItems();
    const updatedItems = items.filter(item => item.id !== id);
    this.saveItems(updatedItems);
  }
};