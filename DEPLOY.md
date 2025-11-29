# 部署指南

本指南将帮助您将学生作业提交系统部署到免费的云平台。

## 部署方案

### 方案一：Vercel（前端）+ Railway（后端）

#### 前端部署到 Vercel

1. **准备前端代码**
   - 确保 `frontend/package.json` 中的构建脚本正确
   - 在 `frontend` 目录创建 `vercel.json` 配置文件

2. **部署步骤**
   - 访问 [Vercel](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 导入您的 GitHub 仓库
   - 设置项目：
     - Framework Preset: Create React App
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `build`
   - 添加环境变量：
     - `REACT_APP_API_URL`: 您的后端 API 地址（Railway 提供的 URL）
   - 点击 "Deploy"

#### 后端部署到 Railway

1. **准备后端代码**
   - 确保 `backend/package.json` 中有 `start` 脚本
   - 创建 `Procfile` 或使用 `package.json` 的 start 脚本

2. **部署步骤**
   - 访问 [Railway](https://railway.app)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择您的仓库
   - 设置项目：
     - Root Directory: `backend`
     - 环境变量：
       - `PORT`: Railway 会自动设置
       - `NODE_ENV`: `production`
   - Railway 会自动检测 Node.js 项目并部署

3. **配置数据库持久化**
   - Railway 提供持久化存储
   - 数据库文件会保存在 Railway 的持久化卷中
   - 上传的文件也需要配置持久化存储

### 方案二：Netlify（前端）+ Render（后端）

#### 前端部署到 Netlify

1. **创建 `netlify.toml`**（在 `frontend` 目录）
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **部署步骤**
   - 访问 [Netlify](https://netlify.com)
   - 使用 GitHub 账号登录
   - 点击 "New site from Git"
   - 选择您的仓库
   - 设置：
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `build`
   - 添加环境变量：`REACT_APP_API_URL`

#### 后端部署到 Render

1. **创建 `render.yaml`**（在 `backend` 目录）
```yaml
services:
  - type: web
    name: assignment-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

2. **部署步骤**
   - 访问 [Render](https://render.com)
   - 使用 GitHub 账号登录
   - 点击 "New +" → "Web Service"
   - 连接您的 GitHub 仓库
   - 设置：
     - Root Directory: `backend`
     - Environment: Node
     - Build Command: `npm install`
     - Start Command: `npm start`

### 方案三：全栈部署到 Vercel

如果使用 Vercel 的 Serverless Functions，可以将后端也部署到 Vercel。

1. **创建 API 路由**
   - 在 `frontend/api` 目录创建 serverless functions
   - 将后端逻辑转换为 Vercel functions

2. **部署**
   - 整个项目部署到 Vercel
   - 前端和 API 都在同一个域名下

## 环境变量配置

### 前端环境变量

在部署平台设置以下环境变量：

- `REACT_APP_API_URL`: 后端 API 的完整 URL（例如：`https://your-backend.railway.app/api`）

### 后端环境变量

- `PORT`: 服务器端口（通常由平台自动设置）
- `NODE_ENV`: `production`

## 数据库迁移

### SQLite 数据库

SQLite 数据库文件需要持久化存储：

1. **Railway**: 使用持久化卷存储 `database/` 目录
2. **Render**: 使用磁盘存储
3. **其他平台**: 考虑使用外部数据库（如 Supabase、PlanetScale）

### 迁移到 PostgreSQL（可选）

如果需要更好的生产环境支持，可以迁移到 PostgreSQL：

1. 安装 `pg` 和 `pg-hstore`
2. 修改 `backend/models/Assignment.js` 使用 PostgreSQL
3. 更新数据库连接配置

## 文件存储

### 本地文件存储限制

免费平台通常不提供持久化文件存储，建议：

1. **使用云存储服务**
   - AWS S3
   - 阿里云 OSS
   - Cloudflare R2（免费额度较大）

2. **修改上传逻辑**
   - 将文件上传到云存储
   - 在数据库中存储文件 URL 而不是路径

## 安全建议

1. **CORS 配置**
   - 在生产环境中限制 CORS 来源
   - 只允许您的前端域名

2. **文件上传限制**
   - 限制文件大小
   - 验证文件类型
   - 扫描恶意文件

3. **API 限流**
   - 添加速率限制中间件
   - 防止滥用

## 监控和日志

1. **错误监控**
   - 集成 Sentry 或其他错误监控服务

2. **日志**
   - 使用日志服务（如 Logtail、Papertrail）

## 常见问题

### 问题：前端无法连接到后端 API

**解决方案**：
- 检查 `REACT_APP_API_URL` 环境变量是否正确
- 确保后端 CORS 配置允许前端域名
- 检查后端是否正常运行

### 问题：文件上传失败

**解决方案**：
- 检查文件大小限制
- 验证文件类型
- 确保上传目录有写入权限

### 问题：数据库连接失败

**解决方案**：
- 确保数据库文件路径正确
- 检查文件系统权限
- 考虑使用外部数据库服务

## 免费额度说明

- **Vercel**: 无限静态网站，100GB 带宽/月
- **Netlify**: 100GB 带宽/月，300 分钟构建时间/月
- **Railway**: $5 免费额度/月
- **Render**: 750 小时/月免费实例

## 支持

如有问题，请查看：
- 项目 README.md
- 各平台的官方文档
- GitHub Issues

