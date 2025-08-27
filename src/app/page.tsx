'use client';

import { useState, useEffect } from 'react';
import { ClipItem } from '@/types';
import { storage } from '@/utils/storage';
import Header from '@/components/Header';
import ClipCard from '@/components/ClipCard';
import AddModal from '@/components/AddModal';

export default function HomePage() {
  const [items, setItems] = useState<ClipItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 加载数据
  useEffect(() => {
    const loadItems = () => {
      try {
        let savedItems = storage.getItems();
        
        // 如果没有数据，添加示例数据
        if (savedItems.length === 0) {
          const sampleItems = [
            {
              id: '1',
              content: '这是一段示例文本内容，展示了如何在卡片中显示剪贴板内容。这段文本会自动截断显示，当内容过长时会显示渐变效果...',
              createdAt: new Date(Date.now() - 30 * 60 * 1000) // 30分钟前
            },
            {
              id: '2', 
              content: '另一段示例文本，演示多个剪贴板项目的展示效果。界面采用现代化的卡片设计，支持响应式布局。',
              createdAt: new Date(Date.now() - 75 * 60 * 1000) // 75分钟前
            },
            {
              id: '3',
              content: '这是一段更长的文本内容，用来测试当文本内容较多时的显示效果。系统会自动处理长文本的显示，确保界面的整洁性和用户体验。文本会在适当的位置被截断，并显示渐变效果来提示用户还有更多内容。点击复制按钮可以获取完整的文本内容。',
              createdAt: new Date(Date.now() - 160 * 60 * 1000) // 160分钟前
            }
          ];
          
          storage.saveItems(sampleItems);
          savedItems = sampleItems;
        }
        
        setItems(savedItems);
      } catch (error) {
        console.error('Error loading items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  const handleAddItem = (content: string) => {
    try {
      const newItem = storage.addItem(content);
      setItems(prev => [newItem, ...prev]);
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('保存文本时出现错误，请重试。');
    }
  };

  const handleDeleteItem = (id: string) => {
    try {
      storage.deleteItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('删除文本时出现错误，请重试。');
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <Header onAddClick={() => setIsModalOpen(true)} />
        <main>
          <div className="clips-grid">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="clip-card">
                <div className="clip-meta">
                  <span className="clip-date">加载中...</span>
                  <span className="clip-length">-- 字符</span>
                </div>
                <div className="clip-content">
                  正在加载内容...
                </div>
                <div className="clip-actions">
                  <button className="action-btn copy-btn" disabled>
                    📋 复制
                  </button>
                  <button className="action-btn delete-btn" disabled>
                    🗑️ 删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container">
      <Header onAddClick={() => setIsModalOpen(true)} />
      
      <main>
        {items.length === 0 ? (
          <div className="empty-state">
            <h3>📝 还没有保存的文本</h3>
            <p>点击右上角的"添加文本"按钮来保存你的第一段文本</p>
          </div>
        ) : (
          <div className="clips-grid">
            {items.map((item) => (
              <ClipCard
                key={item.id}
                item={item}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        )}
      </main>

      <AddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddItem}
      />
    </div>
  );
}