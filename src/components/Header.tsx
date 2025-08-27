interface HeaderProps {
  onAddClick: () => void;
}

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="header">
      <h1>📋 文本剪贴板管理器</h1>
      <button className="add-btn" onClick={onAddClick}>
        ➕ 添加文本
      </button>
    </header>
  );
}