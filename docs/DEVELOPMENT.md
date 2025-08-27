# 开发文档

## 项目架构详解

### 核心组件说明

#### 1. useClipboard Hook

**文件**: `src/hooks/useClipboard.ts`

**职责**: 管理剪贴板数据的状态和操作

**主要功能**:
- 从localStorage加载数据
- 添加新的文本条目
- 删除指定条目
- 清空所有条目
- 管理加载状态

**使用示例**:
```typescript
const { items, isLoading, addItem, deleteItem, clearAll } = useClipboard();
```

#### 2. 存储工具类

**文件**: `src/utils/storage.ts`

**职责**: 处理与localStorage的交互

**主要方法**:
- `getItems()`: 获取所有存储的条目
- `saveItems(items)`: 保存条目数组
- `addItem(input)`: 添加新条目
- `deleteItem(id)`: 删除指定条目
- `clearAll()`: 清空所有数据

**数据格式**:
```typescript
interface ClipItem {
  id: string;          // 唯一标识符
  content: string;     // 文本内容
  createdAt: Date;     // 创建时间
  updatedAt: Date;     // 更新时间
}
```

#### 3. 剪贴板工具

**文件**: `src/utils/clipboard.ts`

**主要功能**:
- `copyToClipboard(text)`: 复制文本到系统剪贴板
- `formatDate(date)`: 格式化显示时间
- `getCharacterCount(text)`: 获取字符数量统计

**浏览器兼容性处理**:
```typescript
// 优先使用现代 Clipboard API
if (navigator.clipboard && window.isSecureContext) {
  await navigator.clipboard.writeText(text);
} else {
  // 降级到 execCommand 方案
  // ...
}
```

### 组件设计模式

#### 1. 容器组件模式

`src/app/page.tsx` 作为主容器组件：
- 管理全局状态
- 处理业务逻辑
- 协调子组件交互

#### 2. 展示组件模式

各个UI组件只负责展示和用户交互：
- `Header`: 顶部导航和操作按钮
- `ClipboardGrid`: 网格布局容器
- `ClipCard`: 单个文本卡片
- `AddClipModal`: 添加文本弹窗

#### 3. Hook模式

自定义Hook封装业务逻辑：
- 数据获取和状态管理
- 副作用处理
- 可复用的逻辑抽象

## 样式设计系统

### Tailwind CSS 配置

**主要扩展配置**:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
      }
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'slide-up': 'slideUp 0.3s ease-out',
      'scale-in': 'scaleIn 0.2s ease-out',
    }
  }
}
```

### 设计令牌

#### 颜色系统
- **主色调**: 蓝色渐变 (`blue-500` 到 `purple-600`)
- **成功色**: 绿色 (`green-500`)
- **危险色**: 红色渐变 (`red-500` 到 `pink-500`)
- **中性色**: 灰色系列 (`gray-50` 到 `gray-900`)

#### 间距系统
- **组件间距**: `gap-6` (24px)
- **内容边距**: `p-6` (24px)
- **按钮边距**: `px-4 py-2.5` (16px, 10px)

#### 圆角系统
- **卡片圆角**: `rounded-2xl` (16px)
- **按钮圆角**: `rounded-xl` (12px)
- **输入框圆角**: `rounded-xl` (12px)

### 响应式设计

#### 断点策略
```css
/* 移动端优先 */
.grid-cols-1          /* < 768px */
md:grid-cols-2        /* >= 768px */
lg:grid-cols-3        /* >= 1024px */
```

#### 布局适配
- **头部**: 移动端垂直布局，桌面端水平布局
- **网格**: 自适应列数，保持最小宽度350px
- **弹窗**: 移动端几乎全屏，桌面端居中固定宽度

## 性能优化策略

### 1. 代码分割

使用Next.js的自动代码分割：
- 页面级别自动分割
- 动态导入大型组件
- 第三方库单独打包

### 2. 状态优化

- 使用`useState`进行本地状态管理
- 避免不必要的重渲染
- 合理使用`useEffect`依赖项

### 3. 样式优化

- Tailwind CSS的JIT模式
- 自动移除未使用的样式
- CSS-in-JS避免样式冲突

### 4. 数据持久化

- localStorage异步操作
- 错误边界处理
- 数据格式版本控制

## 错误处理机制

### 1. Try-Catch模式

```typescript
const handleAddItem = (content: string) => {
  try {
    addItem({ content });
  } catch (error) {
    console.error('Failed to add item:', error);
    alert('保存文本时出现错误，请重试。');
  }
};
```

### 2. 用户友好提示

- 操作成功：视觉反馈（按钮状态变化）
- 操作失败：alert提示具体错误
- 加载状态：骨架屏占位

### 3. 数据安全

- localStorage访问检查
- JSON解析异常处理
- 数据格式验证

## 测试策略

### 单元测试

推荐测试覆盖：
- 工具函数（`clipboard.ts`, `storage.ts`）
- 自定义Hook（`useClipboard.ts`）
- 核心组件逻辑

### 集成测试

- 用户操作流程
- 数据持久化
- 响应式布局

### E2E测试

- 完整用户场景
- 跨浏览器兼容性
- 性能基准测试

## 扩展指南

### 添加新功能

1. **新建类型定义** (`src/types/index.ts`)
2. **实现业务逻辑** (`src/utils/` 或 `src/hooks/`)
3. **创建UI组件** (`src/components/`)
4. **集成到主应用** (`src/app/page.tsx`)

### 自定义主题

1. **修改Tailwind配置** (`tailwind.config.js`)
2. **更新设计令牌** (颜色、间距、圆角)
3. **调整组件样式类名**

### 部署配置

1. **环境变量配置** (`.env.local`)
2. **构建优化** (`next.config.js`)
3. **静态资源处理** (`public/`)

## 性能监控

### 关键指标

- **FCP**: First Contentful Paint
- **LCP**: Largest Contentful Paint
- **CLS**: Cumulative Layout Shift
- **FID**: First Input Delay

### 监控工具

- Next.js内置性能分析
- Chrome DevTools
- Lighthouse CI
- Vercel Analytics

## 最佳实践

### 代码规范

- 使用TypeScript严格模式
- ESLint + Prettier代码格式化
- 组件和函数命名规范
- 适当的注释和文档

### Git工作流

- 功能分支开发
- 有意义的提交信息
- Code Review流程
- 自动化CI/CD

### 安全考虑

- 用户输入验证
- XSS攻击防护
- 数据大小限制
- 错误信息不泄露敏感信息