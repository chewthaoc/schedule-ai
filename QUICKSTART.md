# 快速启动指南

## 🚀 5 分钟快速部署

### 步骤 1: 克隆项目
```bash
cd schedule-ai
npm install
```

### 步骤 2: 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 点击 "New Project"
3. 填写项目信息：
   - Name: `schedule-ai`
   - Database Password: 设置强密码
   - Region: 选择最近的区域

4. 等待项目创建完成（约 2 分钟）

### 步骤 3: 设置数据库

1. 在 Supabase 控制台，点击左侧 "SQL Editor"
2. 点击 "New Query"
3. 复制 `database.sql` 的全部内容
4. 粘贴到编辑器并点击 "Run"
5. 确认所有表创建成功

### 步骤 4: 获取 Supabase 凭证

1. 在 Supabase 控制台，点击左侧 "Settings" → "API"
2. 复制以下信息：
   - Project URL (例如: `https://xxxxx.supabase.co`)
   - anon public key (以 `eyJ` 开头的长字符串)

### 步骤 5: 获取 OpenAI API 密钥

1. 访问 [platform.openai.com](https://platform.openai.com)
2. 登录或注册账号
3. 点击右上角头像 → "View API keys"
4. 点击 "Create new secret key"
5. 复制密钥（以 `sk-` 开头）

### 步骤 6: 配置环境变量

1. 复制环境变量模板：
```bash
cp .env.example .env.local
```

2. 编辑 `.env.local` 文件：
```env
NEXT_PUBLIC_SUPABASE_URL=https://你的项目.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ开头的密钥
OPENAI_API_KEY=sk-开头的密钥
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 步骤 7: 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## ✅ 验证安装

### 测试清单
- [ ] 首页正常显示
- [ ] 可以访问登录页面
- [ ] 可以访问注册页面
- [ ] 仪表盘页面加载正常
- [ ] 日程列表页面显示
- [ ] 创建日程页面可访问

## 🎨 测试 AI 功能

1. 访问 `/schedules/new`
2. 填写日程信息
3. 上传课程表图片（可以使用参考的 `sunway-timetable-coffee.html` 截图）
4. 点击 "Create Schedule"
5. AI 将自动提取事件信息

## 📱 测试响应式设计

1. 打开浏览器开发者工具（F12）
2. 切换到移动设备视图
3. 测试不同屏幕尺寸：
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

## 🐛 常见问题

### 问题 1: Supabase 连接失败
**解决方案**:
- 检查 `.env.local` 中的 URL 是否正确
- 确认 anon key 完整复制（很长的字符串）
- 重启开发服务器

### 问题 2: OpenAI API 错误
**解决方案**:
- 确认 API 密钥有效
- 检查 OpenAI 账户余额
- 确认使用的是 `gpt-4o` 模型

### 问题 3: 数据库表不存在
**解决方案**:
- 重新运行 `database.sql` 脚本
- 检查 SQL Editor 是否有错误提示
- 确认所有表都创建成功

### 问题 4: 构建失败
**解决方案**:
```bash
# 清理缓存
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

## 🚀 部署到生产环境

### Vercel 部署（推荐）

1. 推送代码到 GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/schedule-ai.git
git push -u origin main
```

2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. 添加环境变量（与 `.env.local` 相同）
6. 点击 "Deploy"

### 环境变量配置
在 Vercel 项目设置中添加：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_APP_URL` (改为你的域名)

## 📊 监控和维护

### Supabase 监控
1. 访问 Supabase 控制台
2. 查看 "Database" → "Tables" 确认数据
3. 查看 "Auth" → "Users" 管理用户

### OpenAI 使用监控
1. 访问 OpenAI 控制台
2. 查看 "Usage" 了解 API 调用情况
3. 设置使用限额避免超支

## 🎯 下一步

1. **自定义品牌**
   - 修改 `app/layout.tsx` 中的网站标题
   - 更新 `public/` 目录中的图标
   - 调整 `globals.css` 中的颜色主题

2. **添加示例数据**
   - 创建测试账号
   - 添加示例日程
   - 测试所有功能

3. **配置域名**
   - 在 Vercel 添加自定义域名
   - 更新 `NEXT_PUBLIC_APP_URL`
   - 配置 DNS 记录

4. **启用分析**
   - 添加 Google Analytics
   - 配置 Vercel Analytics
   - 监控用户行为

## 📞 获取帮助

- 查看 `README.md` 了解详细文档
- 查看 `PROJECT_SUMMARY.md` 了解项目概览
- 检查 GitHub Issues 寻找解决方案

---

**预计完成时间**: 5-10 分钟
**难度等级**: ⭐⭐ (简单)

祝你使用愉快！☕
