'use client';

import { useState } from 'react';
import { ClipItem } from '@/types';
import { copyToClipboard, formatDate, getCharacterCount } from '@/utils/clipboard';

interface ClipCardProps {
  item: ClipItem;
  onDelete: (id: string) => void;
}

export default function ClipCard({ item, onDelete }: ClipCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopy = async () => {
    try {
      const success = await copyToClipboard(item.content);
      if (success) {
        alert('已复制到剪贴板！\n\n内容：' + item.content.substring(0, 100) + (item.content.length > 100 ? '...' : ''));
      }
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    
    if (window.confirm('确定要删除这段文本吗？')) {
      setIsDeleting(true);
      try {
        onDelete(item.id);
      } catch (error) {
        console.error('Failed to delete:', error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`clip-card ${isDeleting ? 'opacity-50' : ''}`}>
      <div className="clip-meta">
        <span className="clip-date">{formatDate(item.createdAt)}</span>
        <span className="clip-length">{getCharacterCount(item.content)}</span>
      </div>
      <div className="clip-content">
        {item.content}
      </div>
      <div className="clip-actions">
        <button className="action-btn copy-btn" onClick={handleCopy}>
          📋 复制
        </button>
        <button className="action-btn delete-btn" onClick={handleDelete} disabled={isDeleting}>
          🗑️ {isDeleting ? '删除中...' : '删除'}
        </button>
      </div>
    </div>
  );
}