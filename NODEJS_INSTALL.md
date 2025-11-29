# Node.js 安装详细步骤

## 下载 Node.js

### 方法一：官方网站下载（推荐）

1. **打开浏览器，访问 Node.js 官网**
   - 中文官网：https://nodejs.org/zh-cn/
   - 英文官网：https://nodejs.org/

2. **选择版本**
   - **推荐选择 LTS 版本**（长期支持版，更稳定）
   - 当前 LTS 版本通常是 18.x 或 20.x
   - 页面会自动检测您的操作系统（Windows）

3. **下载安装包**
   - 点击绿色的 "下载" 或 "Download" 按钮
   - 下载的文件通常是 `node-vXX.X.X-x64.msi` 格式
   - 文件大小约 30-40 MB

### 方法二：直接下载链接

**Windows 64位 LTS 版本：**
- https://nodejs.org/dist/lts/ （选择最新的 vXX.x.x 文件夹，下载 `node-vXX.x.x-x64.msi`）

## 安装 Node.js

### Windows 安装步骤

1. **运行安装程序**
   - 找到下载的 `.msi` 文件（通常在"下载"文件夹）
   - 双击运行安装程序

2. **安装向导设置**
   - 点击 "Next" 继续
   - 接受许可协议，点击 "Next"
   - 选择安装路径（默认即可），点击 "Next"
   
3. **重要：选择功能**
   - ✅ **必须勾选 "Add to PATH"**（添加到系统路径）
   - 其他选项保持默认即可
   - 点击 "Next"

4. **完成安装**
   - 点击 "Install" 开始安装
   - 等待安装完成（可能需要管理员权限）
   - 点击 "Finish" 完成

## 验证安装

### 方法一：使用 PowerShell（推荐）

1. **关闭当前 PowerShell 窗口**（如果已打开）
2. **重新打开 PowerShell**
   - 按 `Win + X`，选择 "Windows PowerShell" 或 "终端"
   - 或者在开始菜单搜索 "PowerShell"

3. **验证 Node.js**
   ```powershell
   node --version
   ```
   应该显示类似：`v20.10.0` 或 `v18.19.0`

4. **验证 npm**
   ```powershell
   npm --version
   ```
   应该显示类似：`10.2.3` 或 `9.2.0`

### 方法二：使用命令提示符（CMD）

1. 按 `Win + R`，输入 `cmd`，按回车
2. 运行验证命令：
   ```cmd
   node -v
   npm -v
   ```

## 如果验证失败

### 问题：命令无法识别

**解决方案：**

1. **检查 PATH 环境变量**
   - 按 `Win + R`，输入 `sysdm.cpl`，按回车
   - 点击 "高级" 选项卡
   - 点击 "环境变量"
   - 在 "系统变量" 中找到 `Path`
   - 确认包含以下路径：
     - `C:\Program Files\nodejs\`
     - 或您自定义的 Node.js 安装路径

2. **手动添加到 PATH**
   - 如果 PATH 中没有 Node.js 路径，点击 "编辑" 添加
   - 添加：`C:\Program Files\nodejs\`
   - 点击 "确定" 保存

3. **重启终端**
   - 关闭所有 PowerShell/CMD 窗口
   - 重新打开并再次验证

### 问题：需要管理员权限

- 右键点击 PowerShell，选择 "以管理员身份运行"
- 然后再次尝试安装或验证

## 安装完成后的下一步

安装成功后，返回项目目录，运行：

```powershell
# 进入项目目录（如果还没在的话）
cd "D:\CURSOR工程\网站"

# 验证 Node.js 和 npm
node --version
npm --version

# 安装项目依赖
npm run install-all

# 启动开发服务器
npm run dev
```

## 推荐版本

- **LTS 版本**：v20.x.x 或 v18.x.x（推荐用于生产环境）
- **Current 版本**：v21.x.x（包含最新功能，适合开发测试）

## 额外工具（可选）

安装 Node.js 后，您还可以安装：

- **nvm-windows**：Node.js 版本管理器（可选）
  - 下载：https://github.com/coreybutler/nvm-windows/releases
  - 可以方便地切换不同版本的 Node.js

## 需要帮助？

如果遇到问题：
1. 查看 [INSTALL.md](INSTALL.md) 中的常见问题
2. 访问 Node.js 官方文档：https://nodejs.org/zh-cn/docs/
3. 检查 Node.js GitHub Issues

---

**安装完成后，请告诉我，我会帮您继续设置项目！** 🚀

