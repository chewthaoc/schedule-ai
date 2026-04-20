# Vercel 部署指南

## 方式一：通过 Vercel 网页部署（推荐）

### 步骤 1: 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com/new)
2. 创建新仓库：
   - Repository name: `schedule-ai`
   - Description: `AI-powered schedule management system`
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"
3. 点击 "Create repository"

### 步骤 2: 推送代码到 GitHub

复制 GitHub 提供的命令，或使用以下命令：

```bash
# 添加远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/你的用户名/schedule-ai.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤 3: 在 Vercel 部署

1. 访问 [Vercel](https://vercel.com)
2. 点击 "Add New" → "Project"
3. 导入你的 GitHub 仓库 `schedule-ai`
4. 配置项目：
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **添加环境变量**（重要！）：
   点击 "Environment Variables"，添加以下变量：
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=你的_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_supabase_anon_key
   OPENAI_API_KEY=你的_openai_api_key
   NEXT_PUBLIC_APP_URL=https://你的项目.vercel.app
   ```

6. 点击 "Deploy"

### 步骤 4: 等待部署完成

- 部署通常需要 2-3 分钟
- 完成后会显示部署 URL
- 访问 URL 查看你的应用

---

## 方式二：使用 Vercel CLI（快速）

### 安装 Vercel CLI

```bash
npm install -g vercel
```

### 登录 Vercel

```bash
vercel login
```

### 部署项目

```bash
# 在项目目录运行
vercel

# 按照提示操作：
# - Set up and deploy? Yes
# - Which scope? 选择你的账户
# - Link to existing project? No
# - What's your project's name? schedule-ai
# - In which directory is your code located? ./
# - Want to override the settings? No
```

### 添加环境变量

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add OPENAI_API_KEY
vercel env add NEXT_PUBLIC_APP_URL
```

### 重新部署（应用环境变量）

```bash
vercel --prod
```

---

## 环境变量配置

### 获取 Supabase 凭证

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 点击 Settings → API
4. 复制：
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 获取 OpenAI API 密钥

1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 点击 "Create new secret key"
3. 复制密钥 → `OPENAI_API_KEY`

### 设置应用 URL

部署后，Vercel 会提供一个 URL，例如：
```
https://schedule-ai-xxx.vercel.app
```

将此 URL 设置为 `NEXT_PUBLIC_APP_URL`

---

## 部署后检查清单

- [ ] 访问部署的 URL
- [ ] 检查首页是否正常显示
- [ ] 测试登录页面
- [ ] 测试注册页面
- [ ] 检查仪表盘（需要先配置 Supabase）
- [ ] 测试 AI 图像上传功能
- [ ] 查看 Vercel 部署日志（如有错误）

---

## 常见问题

### 1. 构建失败
**解决方案**：
- 检查环境变量是否正确配置
- 查看 Vercel 构建日志
- 确认所有依赖已安装

### 2. API 路由 404
**解决方案**：
- 确认 Next.js 版本正确
- 检查 API 路由文件路径
- 重新部署项目

### 3. Supabase 连接失败
**解决方案**：
- 验证 Supabase URL 和密钥
- 检查 Supabase 项目是否激活
- 确认数据库表已创建

### 4. OpenAI API 错误
**解决方案**：
- 验证 API 密钥有效
- 检查 OpenAI 账户余额
- 确认使用的是 gpt-4o 模型

---

## 自动部署

配置完成后，每次推送到 GitHub 的 main 分支，Vercel 会自动部署：

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel 会自动检测更改并重新部署。

---

## 域名配置（可选）

### 添加自定义域名

1. 在 Vercel 项目设置中
2. 点击 "Domains"
3. 添加你的域名
4. 按照提示配置 DNS 记录

---

## 监控和日志

### 查看部署日志
1. 访问 Vercel Dashboard
2. 选择你的项目
3. 点击 "Deployments"
4. 查看每次部署的详细日志

### 查看运行时日志
1. 在项目页面点击 "Logs"
2. 实时查看应用运行日志
3. 调试 API 错误

---

## 下一步

部署成功后：
1. 配置 Supabase 数据库
2. 测试所有功能
3. 邀请用户测试
4. 收集反馈并改进

祝部署顺利！🚀
