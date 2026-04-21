# ☕ ScheduleAI

一个功能完整的 AI 驱动日程管理系统，支持图像识别、智能分析和完整的日程管理功能。

[![部署状态](https://img.shields.io/badge/部署-Vercel-black)](https://schedule-ai-teal.vercel.app)
[![技术栈](https://img.shields.io/badge/技术栈-Next.js%2014-blue)](https://nextjs.org)
[![数据库](https://img.shields.io/badge/数据库-Supabase-green)](https://supabase.com)
[![完成度](https://img.shields.io/badge/完成度-100%25-brightgreen)](./PROJECT_STATUS.md)

**在线演示**: https://schedule-ai-teal.vercel.app

---

## ✨ 功能特性

### 🔐 完整的认证系统
- ✅ 邮箱注册和登录
- ✅ Google OAuth 一键登录
- ✅ 忘记密码和重置功能
- ✅ 安全的会话管理

### 📅 智能日程管理
- ✅ 创建多种类型的日程（学校、工作、活动、个人）
- ✅ 上传图像，AI 自动识别并提取事件
- ✅ 编辑和删除日程
- ✅ 自定义颜色主题

### 🎯 完整的事件管理
- ✅ 添加、编辑、删除事件
- ✅ 网格视图和列表视图切换
- ✅ 按星期显示
- ✅ 详细的时间和地点信息

### 🤖 AI 图像识别
- ✅ 支持上传日程表图像
- ✅ GPT-4o 自动识别事件信息
- ✅ 智能提取标题、时间、地点、类别
- ✅ 一键导入所有事件

### 📊 数据分析
- ✅ 实时统计总事件数和日程数
- ✅ 每周时间分布图表
- ✅ 按类型分布饼图
- ✅ 智能洞察和建议

### ⚙️ 个性化设置
- ✅ 更新个人信息
- ✅ 上传和更换头像
- ✅ 更改密码
- ✅ 自定义通知偏好

---

## 🚀 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn
- Supabase 账户
- GitHub 账户（用于 AI 功能）

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/chewthaoc/schedule-ai.git
cd schedule-ai
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**

创建 `.env.local` 文件：
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GITHUB_TOKEN=your_github_token
AI_MODEL=gpt-4o
```

4. **设置数据库**

在 Supabase SQL Editor 中运行：
- `database.sql` - 创建表结构
- `fix-user-sync.sql` - 设置用户同步

详细步骤见 [STORAGE_SETUP.md](./STORAGE_SETUP.md)

5. **配置邮件发送**

配置忘记密码和邮箱验证功能：
- 在 Supabase 中设置 Redirect URLs
- 配置邮件模板
- （推荐）配置自定义 SMTP

详细步骤见 [EMAIL_SETUP.md](./EMAIL_SETUP.md)

6. **运行开发服务器**
```bash
npm run dev
```

访问 http://localhost:3000

---

## 📖 使用指南

### 1. 注册账户
- 使用邮箱注册或 Google 一键登录
- 验证邮箱（如果使用邮箱注册）

### 2. 创建日程
- 点击 "New Schedule"
- 填写日程信息
- 可选：上传日程表图像，AI 自动识别

### 3. 管理事件
- 进入日程详情页
- 点击 "Add Event" 添加事件
- 点击事件可编辑，悬停显示删除按钮
- 切换网格/列表视图

### 4. 查看分析
- 访问 Analytics 页面
- 查看时间分布和统计数据
- 获取智能建议

### 5. 个性化设置
- 更新个人信息和头像
- 更改密码
- 自定义通知偏好

---

## 🏗️ 技术架构

### 前端
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图表**: Recharts
- **图标**: Lucide React

### 后端
- **API**: Next.js API Routes
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **存储**: Supabase Storage
- **AI**: GitHub Models (GPT-4o)

### 部署
- **托管**: Vercel
- **CI/CD**: GitHub + Vercel 自动部署

---

## 📁 项目结构

```
schedule-ai/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard 布局
│   ├── api/               # API 路由
│   ├── login/             # 登录页面
│   └── register/          # 注册页面
├── components/            # React 组件
│   ├── ui/               # UI 组件
│   ├── layout/           # 布局组件
│   └── modals/           # 模态框
├── lib/                   # 工具函数
│   ├── supabase/         # Supabase 客户端
│   └── openai/           # AI 客户端
├── middleware.ts          # 路由保护
└── database.sql          # 数据库架构
```

---

## 🔒 安全特性

- **Row Level Security (RLS)** - 数据库级别的用户隔离
- **API 认证** - 所有 API 都需要认证
- **环境变量保护** - 敏感信息不暴露
- **HTTPS 加密** - 所有通信加密
- **SQL 注入防护** - 使用参数化查询

---

## 📊 项目统计

- **代码行数**: 6500+
- **组件数**: 27+
- **API 路由**: 7
- **页面数**: 17
- **功能完成度**: 100%
- **开发时间**: 1 天

---

## 🎨 设计特色

### 咖啡主题配色
- 主色: `#8D6E63` (咖啡棕)
- 深色: `#2C1810` (深咖啡)
- 浅色: `#D7CCC8` (奶咖)
- 背景: `#FAF7F2` (奶泡白)

### UI/UX 亮点
- ☕ 咖啡图标品牌标识
- 温暖舒适的配色
- 流畅的动画过渡
- 响应式设计
- 直观的导航

---

## 📚 文档

- [项目状态](./PROJECT_STATUS.md) - 完成度和功能清单
- [完成总结](./COMPLETION_SUMMARY.md) - 详细的项目总结
- [审查报告](./AUDIT_REPORT.md) - 代码审查和问题修复
- [存储设置](./STORAGE_SETUP.md) - Supabase Storage 配置
- [邮件设置](./EMAIL_SETUP.md) - 邮件发送和密码重置配置
- [Bug 修复](./BUG_FIXES.md) - 已修复的问题列表

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📝 许可证

本项目采用 MIT 许可证。

---

## 🙏 致谢

- [Next.js](https://nextjs.org) - React 框架
- [Supabase](https://supabase.com) - 后端服务
- [Vercel](https://vercel.com) - 部署平台
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [GitHub Models](https://github.com/marketplace/models) - AI API

---

## 📞 联系方式

- **项目地址**: https://github.com/chewthaoc/schedule-ai
- **在线演示**: https://schedule-ai-teal.vercel.app
- **问题反馈**: [GitHub Issues](https://github.com/chewthaoc/schedule-ai/issues)

---

## 🎯 路线图

### 已完成 ✅
- [x] 完整的认证系统
- [x] 日程 CRUD
- [x] 事件 CRUD
- [x] AI 图像识别
- [x] 数据分析
- [x] 个人设置

### 未来计划 🚀
- [ ] 移动应用
- [ ] 日历视图
- [ ] 事件提醒
- [ ] 导出功能 (PDF/iCal)
- [ ] 团队协作
- [ ] 第三方日历集成

---

**由 Claude Sonnet 4 协助开发** | **2026-04-21** | **功能完成度: 100%**
