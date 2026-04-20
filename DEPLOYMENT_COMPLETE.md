# 🚀 部署完成 - 下一步配置

## ✅ 已完成

- [x] GitHub 仓库创建：https://github.com/chewthaoc/schedule-ai
- [x] Vercel 部署成功：https://schedule-ai-teal.vercel.app
- [x] 构建通过（48 秒）
- [x] 所有路由生成成功

## ⚠️ 需要配置（重要！）

### 步骤 1: 配置 Supabase

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 点击 "New Project"
3. 填写项目信息：
   - Name: `schedule-ai`
   - Database Password: 设置强密码
   - Region: 选择最近的区域
4. 等待项目创建（约 2 分钟）

### 步骤 2: 运行数据库脚本

1. 在 Supabase 控制台，点击 "SQL Editor"
2. 点击 "New Query"
3. 复制项目中的 `database.sql` 全部内容
4. 粘贴并点击 "Run"
5. 确认所有表创建成功

### 步骤 3: 获取 Supabase 凭证

1. 在 Supabase 控制台，点击 Settings → API
2. 复制以下信息：
   - **Project URL** (例如: https://xxxxx.supabase.co)
   - **anon public key** (以 eyJ 开头的长字符串)

### 步骤 4: 获取 OpenAI API 密钥

1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 登录或注册账号
3. 点击 "Create new secret key"
4. 复制密钥（以 sk- 开头）

### 步骤 5: 在 Vercel 配置环境变量

#### 方式 A: 通过网页配置（推荐）

1. 访问 [Vercel 项目设置](https://vercel.com/chewthaocs-projects/schedule-ai/settings/environment-variables)
2. 添加以下环境变量：

   ```
   NEXT_PUBLIC_SUPABASE_URL = https://你的项目.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ开头的密钥
   OPENAI_API_KEY = sk-开头的密钥
   NEXT_PUBLIC_APP_URL = https://schedule-ai-teal.vercel.app
   ```

3. 每个变量选择 "Production, Preview, and Development"
4. 点击 "Save"

#### 方式 B: 通过 CLI 配置

```bash
# 在项目目录运行
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# 输入值: https://你的项目.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# 输入值: eyJ开头的密钥

vercel env add OPENAI_API_KEY production
# 输入值: sk-开头的密钥

vercel env add NEXT_PUBLIC_APP_URL production
# 输入值: https://schedule-ai-teal.vercel.app
```

### 步骤 6: 重新部署

配置环境变量后，需要重新部署以应用更改：

#### 方式 A: 通过网页
1. 访问 [Vercel 部署页面](https://vercel.com/chewthaocs-projects/schedule-ai)
2. 点击右上角的 "Redeploy"
3. 确认重新部署

#### 方式 B: 通过 CLI
```bash
vercel --prod
```

## ✅ 验证部署

重新部署后，访问 https://schedule-ai-teal.vercel.app 并测试：

- [ ] 首页正常显示
- [ ] 可以访问登录页面
- [ ] 可以访问注册页面
- [ ] 仪表盘页面加载（需要登录）
- [ ] 上传图片测试 AI 识别
- [ ] 创建日程功能
- [ ] 数据分析图表显示

## 🎯 快速测试命令

```bash
# 测试首页
curl -I https://schedule-ai-teal.vercel.app

# 测试 API 健康状态
curl https://schedule-ai-teal.vercel.app/api/schedules
```

## 📊 监控和日志

### 查看部署日志
https://vercel.com/chewthaocs-projects/schedule-ai/deployments

### 查看运行时日志
https://vercel.com/chewthaocs-projects/schedule-ai/logs

### 查看分析数据
https://vercel.com/chewthaocs-projects/schedule-ai/analytics

## 🔄 自动部署

现在每次推送到 GitHub，Vercel 会自动部署：

```bash
# 修改代码后
git add .
git commit -m "Update feature"
git push origin master

# Vercel 会自动检测并部署
```

## 🌐 自定义域名（可选）

如果你有自己的域名：

1. 访问 [域名设置](https://vercel.com/chewthaocs-projects/schedule-ai/settings/domains)
2. 点击 "Add Domain"
3. 输入你的域名
4. 按照提示配置 DNS 记录

## 📞 获取帮助

- Vercel 文档: https://vercel.com/docs
- Supabase 文档: https://supabase.com/docs
- OpenAI 文档: https://platform.openai.com/docs

## 🎉 完成！

配置完环境变量并重新部署后，你的应用就完全可用了！

---

**当前状态**: ⚠️ 需要配置环境变量
**下一步**: 按照上述步骤配置 Supabase 和 OpenAI
