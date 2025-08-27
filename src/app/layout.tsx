import './globals.css';

export const metadata = {
  title: '文本剪贴板管理器',
  description: '一个现代化的文本剪贴板管理Web应用',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}