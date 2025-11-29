# 环境安装指南

## 需要安装的软件

### 1. Node.js（必需）

本项目需要 Node.js 运行环境。请按照以下步骤安装：

#### Windows 安装步骤：

1. **访问 Node.js 官网**
   - 打开 https://nodejs.org/
   - 下载 LTS（长期支持）版本（推荐）

2. **运行安装程序**
   - 双击下载的 `.msi` 安装文件
   - 按照安装向导完成安装
   - **重要**：确保勾选 "Add to PATH" 选项

3. **验证安装**
   打开 PowerShell 或命令提示符，运行：
   ```bash
   node --version
   npm --version
   ```
   如果显示版本号，说明安装成功。

#### 其他安装方式：

**使用 Chocolatey（Windows 包管理器）：**
```bash
choco install nodejs-lts
```

**使用 Scoop（Windows 包管理器）：**
```bash
scoop install nodejs-lts
```

## 安装项目依赖

安装完 Node.js 后，在项目根目录运行：

```bash
# 安装根目录依赖
npm install

# 安装后端依赖
cd backend
npm install

# 安装前端依赖
cd ../frontend
npm install
```

或者使用一键安装脚本：

```bash
npm run install-all
```

## 启动项目

安装完所有依赖后，运行：

```bash
npm run dev
```

这将同时启动：
- 后端服务器（端口 5000）
- 前端开发服务器（端口 3000）

## 常见问题

### 问题：npm 命令无法识别

**解决方案**：
1. 重新安装 Node.js，确保勾选 "Add to PATH"
2. 重启 PowerShell/命令提示符
3. 如果仍然不行，手动添加 Node.js 到系统 PATH：
   - 找到 Node.js 安装目录（通常在 `C:\Program Files\nodejs\`）
   - 添加到系统环境变量 PATH 中

### 问题：安装依赖时出错

**解决方案**：
1. 清除 npm 缓存：`npm cache clean --force`
2. 删除 `node_modules` 文件夹和 `package-lock.json`
3. 重新运行 `npm install`

### 问题：端口被占用

**解决方案**：
- 修改后端端口：编辑 `backend/server.js` 中的 `PORT` 变量
- 修改前端端口：在 `frontend/package.json` 的 start 脚本中添加 `PORT=3001`

## 系统要求

- **Node.js**: 版本 16.x 或更高（推荐 18.x LTS）
- **npm**: 版本 8.x 或更高（随 Node.js 一起安装）
- **操作系统**: Windows 10/11, macOS, Linux

## 下一步

安装完 Node.js 后，请查看 [QUICKSTART.md](QUICKSTART.md) 了解如何启动项目。

