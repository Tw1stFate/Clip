# 部署指南

## 快速部署到Vercel（推荐）

### 1. 准备工作

1. 确保你的代码已经推送到GitHub仓库
2. 注册 [Vercel](https://vercel.com) 账号（可以使用GitHub账号直接登录）

### 2. 部署步骤

1. **导入项目**
   - 登录Vercel控制台
   - 点击"New Project"
   - 选择你的GitHub仓库
   - 点击"Import"

2. **配置项目**
   - 项目名称：可以使用默认或自定义
   - Framework Preset：自动检测为Next.js
   - Root Directory：保持默认（项目根目录）
   - Build Command：`npm run build`
   - Output Directory：`.next`

3. **部署**
   - 点击"Deploy"按钮
   - 等待构建完成（通常1-3分钟）
   - 获得部署链接

### 3. 自动部署

- 每次向主分支推送代码时，Vercel会自动重新部署
- 支持预览部署：Pull Request会自动生成预览链接

## 部署到Netlify

### 1. 准备构建配置

创建 `netlify.toml` 文件：

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. 部署步骤

1. 登录 [Netlify](https://netlify.com)
2. 点击"New site from Git"
3. 选择你的GitHub仓库
4. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `.next`
5. 点击"Deploy site"

## 部署到Railway

### 1. 准备配置

创建 `railway.json` 文件：

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2. 部署步骤

1. 登录 [Railway](https://railway.app)
2. 点击"New Project"
3. 选择"Deploy from GitHub repo"
4. 选择你的仓库
5. 等待自动部署完成

## 自托管部署

### 使用Docker

1. **创建Dockerfile**

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

2. **构建和运行**

```bash
# 构建镜像
docker build -t clipboard-manager .

# 运行容器
docker run -p 3000:3000 clipboard-manager
```

### 使用PM2（生产环境）

1. **安装PM2**

```bash
npm install -g pm2
```

2. **创建PM2配置文件** (`ecosystem.config.js`)

```javascript
module.exports = {
  apps: [
    {
      name: 'clipboard-manager',
      script: 'npm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
```

3. **部署命令**

```bash
# 构建项目
npm run build

# 启动PM2
pm2 start ecosystem.config.js

# 保存PM2配置
pm2 save

# 设置开机自启
pm2 startup
```

## 环境变量配置

### 生产环境变量

创建 `.env.production` 文件：

```env
# 应用配置
NEXT_PUBLIC_APP_NAME=文本剪贴板管理器
NEXT_PUBLIC_APP_VERSION=1.0.0

# 分析工具（可选）
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# 错误监控（可选）
SENTRY_DSN=your-sentry-dsn
```

### 各平台环境变量设置

#### Vercel
1. 进入项目设置
2. 点击"Environment Variables"
3. 添加所需的环境变量

#### Netlify
1. 进入站点设置
2. 点击"Environment variables"
3. 添加所需的环境变量

#### Railway
1. 进入项目设置
2. 点击"Variables"
3. 添加所需的环境变量

## 性能优化配置

### 1. Next.js配置优化

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  
  // 图片优化
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // 压缩配置
  compress: true,
  
  // 输出模式（静态导出）
  // output: 'export', // 如需静态部署取消注释
}

module.exports = nextConfig
```

### 2. CDN配置

如果使用CDN，可以配置静态资源加速：

```javascript
// next.config.js
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://your-cdn-domain.com' 
    : '',
}
```

### 3. 缓存策略

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## 监控和维护

### 1. 日志监控

使用Vercel Analytics或其他监控工具：

```bash
npm install @vercel/analytics
```

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. 错误监控

集成Sentry进行错误监控：

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### 3. 健康检查

创建健康检查端点：

```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  })
}
```

## 域名配置

### 1. 自定义域名

#### Vercel
1. 进入项目设置
2. 点击"Domains"
3. 添加你的域名
4. 按照提示配置DNS记录

#### Netlify
1. 进入站点设置
2. 点击"Domain management"
3. 添加自定义域名
4. 配置DNS记录

### 2. HTTPS配置

大部分平台都会自动提供免费的SSL证书：
- Vercel: 自动配置Let's Encrypt证书
- Netlify: 自动配置Let's Encrypt证书
- Cloudflare: 提供免费SSL

## 故障排除

### 常见问题

1. **构建失败**
   - 检查Node.js版本是否匹配
   - 确认所有依赖都已正确安装
   - 查看构建日志中的具体错误信息

2. **运行时错误**
   - 检查环境变量配置
   - 确认静态资源路径正确
   - 查看浏览器控制台错误

3. **性能问题**
   - 启用压缩和缓存
   - 优化图片和静态资源
   - 使用CDN加速

### 调试工具

- Vercel函数日志
- 浏览器开发者工具
- Next.js内置性能分析
- 第三方监控工具

## 备份策略

### 1. 代码备份
- 使用Git版本控制
- 定期推送到远程仓库
- 创建release标签

### 2. 数据备份
- 本应用使用客户端存储，无需服务端备份
- 可以添加导出/导入功能让用户自行备份

### 3. 配置备份
- 保存环境变量配置
- 备份域名和DNS设置
- 文档化部署流程