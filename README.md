# 📋 文本剪贴板管理器

一个现代化的文本剪贴板管理Web应用，帮助你轻松管理和组织文本片段。

![Preview](./docs/preview.png)

## ✨ 特性

- 🎨 **现代化设计** - 采用渐变背景和卡片式布局，视觉效果美观
- 📱 **响应式布局** - 完美适配桌面端、平板和移动设备
- ⚡ **快速操作** - 一键复制、删除文本，支持键盘快捷键
- 💾 **本地存储** - 使用浏览器本地存储，数据安全可靠
- 🔍 **智能截断** - 长文本自动截断显示，点击展开查看全文
- 📊 **实时统计** - 显示字符数量和创建时间
- 🌈 **动画效果** - 流畅的过渡动画和交互反馈

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装和运行

1. **克隆项目**
   ```bash
   git clone <your-repository-url>
   cd clip
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

4. **访问应用**
   
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📖 使用说明

### 基本操作

1. **添加文本**
   - 点击右上角的"添加文本"按钮
   - 在弹窗中输入要保存的文本内容
   - 点击"保存"或使用快捷键 `Ctrl/Cmd + Enter`

2. **复制文本**
   - 点击文本卡片下方的"复制"按钮
   - 系统会自动将完整文本复制到剪贴板
   - 按钮会短暂显示"已复制"状态

3. **删除文本**
   - 点击文本卡片下方的"删除"按钮
   - 确认删除操作

4. **清空全部**
   - 点击头部的"清空全部"按钮（仅在有文本时显示）
   - 确认删除所有文本

### 键盘快捷键

- `Escape` - 关闭弹窗
- `Ctrl/Cmd + Enter` - 在弹窗中快速保存文本

### 功能细节

- **智能时间显示**: 自动显示相对时间（如"2分钟前"）和绝对时间
- **字符统计**: 实时显示文本字符数量，支持k/M单位
- **长文本处理**: 超过200字符的文本会自动截断，可点击展开
- **响应式设计**: 在不同屏幕尺寸下自动调整布局

## 🏗️ 技术架构

### 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **存储**: LocalStorage

### 项目结构

```
clip/
├── prototype.html              # 原型设计页面
├── package.json               # 项目配置和依赖
├── package-lock.json          # 依赖锁定文件
├── next.config.js             # Next.js配置文件
├── tsconfig.json              # TypeScript配置
├── tailwind.config.js         # Tailwind CSS配置
├── postcss.config.js          # PostCSS配置
├── .eslintrc.json            # ESLint规则配置
├── .gitignore                # Git忽略文件配置
├── next-env.d.ts             # Next.js类型声明
├── README.md                 # 项目说明文档
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── globals.css       # 全局样式
│   │   ├── layout.tsx        # 根布局组件
│   │   ├── page.tsx          # 主页面组件
│   │   ├── loading.tsx       # 加载状态组件
│   │   └── not-found.tsx     # 404错误页面
│   ├── components/           # React组件
│   │   ├── AddClipModal.tsx  # 添加文本弹窗组件
│   │   ├── ClipCard.tsx      # 文本卡片组件
│   │   ├── ClipboardGrid.tsx # 网格布局组件
│   │   └── Header.tsx        # 页面头部组件
│   ├── hooks/                # 自定义React Hook
│   │   └── useClipboard.ts   # 剪贴板状态管理Hook
│   ├── types/                # TypeScript类型定义
│   │   └── index.ts          # 主要类型接口
│   └── utils/                # 工具函数
│       ├── clipboard.ts      # 剪贴板操作工具
│       └── storage.ts        # 本地存储工具
├── docs/                     # 项目文档
│   ├── DEVELOPMENT.md        # 开发指南和技术架构
│   ├── DEPLOYMENT.md         # 部署指南
│   └── USER_GUIDE.md         # 用户使用手册
├── public/                   # 静态资源文件
│   └── favicon.ico           # 网站图标
├── .next/                    # Next.js构建输出（自动生成）
└── node_modules/             # 依赖包（自动安装）
```

### 数据流设计

1. **状态管理**: 使用 `useClipboard` Hook 管理应用状态
2. **数据持久化**: 通过 `storage` 工具类操作 LocalStorage
3. **组件通信**: 通过 props 传递回调函数实现组件间通信

## 🎨 设计特色

### 视觉设计

- **配色方案**: 蓝紫渐变主题，现代感十足
- **布局系统**: 响应式网格布局，支持多种屏幕尺寸
- **动画效果**: 使用 Tailwind CSS 动画类，流畅自然

### 用户体验

- **操作反馈**: 按钮hover效果、复制成功提示
- **加载状态**: 骨架屏加载效果
- **空状态**: 友好的空状态提示
- **错误处理**: 完善的错误提示和异常处理

## 🔧 开发指南

### 本地开发

```bash
# 启动开发服务器
npm run dev

# 代码检查
npm run lint

# 构建项目
npm run build

# 启动生产服务器
npm run start
```

### 自定义配置

1. **修改样式主题**
   
   编辑 `tailwind.config.js` 中的颜色配置

2. **调整存储策略**
   
   修改 `src/utils/storage.ts` 中的存储逻辑

3. **扩展功能**
   
   在相应的组件中添加新的功能模块

## 📱 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🚀 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 自动构建和部署

### 其他平台

项目支持部署到任何支持 Node.js 的平台：

- Netlify
- Heroku
- Railway
- 自托管服务器

## 📝 更新日志

### v1.0.0 (2024-01-15)

- ✨ 初始版本发布
- 🎨 现代化UI设计
- 📱 响应式布局支持
- 💾 本地存储功能
- ⚡ 快捷键支持

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

### 开发流程

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide](https://lucide.dev/) - 图标库

---

如果这个项目对你有帮助，请考虑给它一个 ⭐️！