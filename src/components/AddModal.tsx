'use client';

import { useState, useEffect } from 'react';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
}

export default function AddModal({ isOpen, onClose, onSave }: AddModalProps) {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      alert('请输入文本内容');
      return;
    }

    setIsSaving(true);
    try {
      onSave(trimmedContent);
      setContent('');
      onClose();
      alert('文本已保存！\n\n预览：' + trimmedContent.substring(0, 100) + (trimmedContent.length > 100 ? '...' : ''));
    } catch (error) {
      console.error('Error saving clip:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (!isSaving) {
      setContent('');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal show">
        <h2>添加新文本</h2>
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="在这里输入你要保存的文本内容..."
          disabled={isSaving}
          autoFocus
          maxLength={5000}
        />
        <div className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={handleClose} disabled={isSaving}>
            取消
          </button>
          <button className="modal-btn save-btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
}