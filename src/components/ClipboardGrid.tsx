'use client';

import { ClipItem } from '@/types';
import ClipCard from './ClipCard';

interface ClipboardGridProps {
  items: ClipItem[];
  onDeleteItem: (id: string) => void;
  onViewItem: (item: ClipItem) => void;
  isLoading: boolean;
}

export default function ClipboardGrid({ items, onDeleteItem, onViewItem, isLoading }: ClipboardGridProps) {
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-5">
        <div 
          className="grid gap-5"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white/95 rounded-2xl p-6 animate-pulse border border-white/20"
              style={{boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'}}
            >
              {/* 头部骨架 */}
              <div className="flex justify-between items-center mb-4">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
              
              {/* 内容骨架 */}
              <div className="mb-5">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              
              {/* 按钮骨架 */}
              <div className="flex gap-3">
                <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                <div className="w-20 h-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-white/90 mb-3">
            📝 还没有保存的文本
          </h3>
          <p className="text-white/70 text-lg leading-relaxed">
            点击右上角的"添加文本"按钮来保存你的第一段文本
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5">
      <div 
        className="grid gap-5"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
        }}
      >
        {items.map((item) => (
          <ClipCard
            key={item.id}
            item={item}
            onDelete={onDeleteItem}
            onView={onViewItem}
          />
        ))}
      </div>
    </div>
  );
}