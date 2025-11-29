# 快速开始指南

## ⚠️ 重要提示

**在开始之前，请确保已安装 Node.js！**

如果您的系统提示 `node` 或 `npm` 命令无法识别，请先：
1. 访问 https://nodejs.org/ 下载并安装 Node.js（推荐 LTS 版本）
2. 安装时确保勾选 "Add to PATH" 选项
3. 安装完成后重启终端

详细安装说明请查看 [INSTALL.md](INSTALL.md)

---

## 第一步：安装依赖

在项目根目录运行：

```bash
npm run install-all
```

这个命令会安装：
- 根目录的依赖（concurrently）
- 后端的依赖（Express, SQLite 等）
- 前端的依赖（React 等）

## 第二步：启动服务器

### 方式一：同时启动前后端（推荐）

```bash
npm run dev
```

### 方式二：分别启动

打开两个终端窗口：

**终端 1 - 启动后端：**
```bash
npm run server
```

**终端 2 - 启动前端：**
```bash
npm run client
```

## 第三步：访问应用

- **前端界面**: http://localhost:3000
- **后端 API**: http://localhost:5000/api
- **健康检查**: http://localhost:5000/api/health

## 使用说明

### 学生提交作业

1. 访问 http://localhost:3000
2. 填写学生姓名、学号、作业标题
3. 选择或拖拽文件上传
4. 点击"提交作业"

### 查看作业列表

1. 点击导航栏的"作业列表"
2. 查看所有已提交的作业
3. 可以点击"查看"查看详情
4. 可以点击"下载"下载文件

### 评分和反馈

1. 在作业详情页面
2. 输入评分（0-100）
3. 输入反馈内容
4. 点击"保存评分和反馈"

## 常见问题

### 端口被占用

如果 3000 或 5000 端口被占用，可以：

**修改后端端口：**
在 `backend/server.js` 中修改 `PORT` 变量，或设置环境变量：
```bash
PORT=5001 npm run server
```

**修改前端端口：**
在 `frontend/package.json` 的 scripts 中添加：
```json
"start": "PORT=3001 react-scripts start"
```

### 数据库初始化

数据库会在首次运行时自动创建，位于 `backend/database/assignments.db`

### 文件上传目录

上传的文件存储在 `backend/uploads/` 目录

## 下一步

- 查看 [README.md](README.md) 了解完整功能
- 查看 [DEPLOY.md](DEPLOY.md) 了解部署方法
- 开始使用系统管理学生作业！

