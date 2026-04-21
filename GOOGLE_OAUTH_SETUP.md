# Google OAuth 配置指南

## 步骤 1: 创建 Google Cloud 项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 项目名称：`ScheduleAI` 或任意名称

## 步骤 2: 启用 Google+ API

1. 在左侧菜单中，点击 **APIs & Services** → **Library**
2. 搜索 "Google+ API"
3. 点击 **Enable**

## 步骤 3: 创建 OAuth 凭据

1. 点击 **APIs & Services** → **Credentials**
2. 点击 **Create Credentials** → **OAuth client ID**
3. 如果提示配置同意屏幕，先配置：
   - User Type: **External**
   - App name: `ScheduleAI`
   - User support email: 你的邮箱
   - Developer contact: 你的邮箱
   - 点击 **Save and Continue**
   - Scopes: 跳过，点击 **Save and Continue**
   - Test users: 可以添加测试用户或跳过
   - 点击 **Save and Continue**

4. 返回创建 OAuth client ID：
   - Application type: **Web application**
   - Name: `ScheduleAI Web Client`
   
5. **Authorized JavaScript origins** 添加：
   ```
   https://schedule-ai-teal.vercel.app
   http://localhost:3000
   ```

6. **Authorized redirect URIs** 添加（重要！）：
   ```
   https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
   http://localhost:54321/auth/v1/callback
   ```
   
   **注意：** 将 `[YOUR-PROJECT-REF]` 替换为你的 Supabase 项目 URL 中的部分
   
   例如，如果你的 Supabase URL 是 `https://abcdefgh.supabase.co`，则填写：
   ```
   https://abcdefgh.supabase.co/auth/v1/callback
   ```

7. 点击 **Create**

8. 复制 **Client ID** 和 **Client Secret**（稍后需要）

## 步骤 4: 在 Supabase 中配置 Google Provider

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 进入 **Authentication** → **Providers**
4. 找到 **Google** 并点击
5. 启用 **Enable Sign in with Google**
6. 填写：
   - **Client ID**: 从 Google Cloud Console 复制的 Client ID
   - **Client Secret**: 从 Google Cloud Console 复制的 Client Secret
7. 复制显示的 **Callback URL**（格式：`https://[project-ref].supabase.co/auth/v1/callback`）
8. 点击 **Save**

## 步骤 5: 更新 Google Cloud Console 的 Redirect URI

1. 返回 Google Cloud Console
2. 进入 **APIs & Services** → **Credentials**
3. 点击你刚创建的 OAuth 2.0 Client ID
4. 在 **Authorized redirect URIs** 中，确保包含 Supabase 的 Callback URL
5. 点击 **Save**

## 步骤 6: 测试 Google 登录

1. 访问 https://schedule-ai-teal.vercel.app/login
2. 点击 "Continue with Google"
3. 选择 Google 账户
4. 授权应用
5. 应该会自动登录并跳转到 Dashboard

## 常见问题

### 问题 1: "redirect_uri_mismatch" 错误

**原因：** Google Cloud Console 中的 Redirect URI 与 Supabase 的不匹配

**解决方案：**
1. 检查 Supabase 显示的 Callback URL
2. 确保在 Google Cloud Console 的 Authorized redirect URIs 中完全匹配
3. 注意 `https://` 和末尾的 `/callback`

### 问题 2: "Access blocked: This app's request is invalid"

**原因：** OAuth 同意屏幕未配置或配置不完整

**解决方案：**
1. 在 Google Cloud Console 中完成 OAuth consent screen 配置
2. 确保填写了必需的字段（App name, User support email, Developer contact）

### 问题 3: "Unsupported provider: provider is not enabled"

**原因：** Supabase 中 Google Provider 未启用

**解决方案：**
1. 在 Supabase Dashboard → Authentication → Providers
2. 启用 Google Provider
3. 填写 Client ID 和 Client Secret

### 问题 4: 登录后没有跳转

**原因：** Redirect URL 配置问题

**解决方案：**
1. 检查 Supabase → Authentication → URL Configuration
2. 确保 Site URL 设置正确
3. 检查代码中的 redirectTo 参数

## 安全建议

1. **不要泄露 Client Secret**
   - 不要提交到 Git
   - 不要在前端代码中暴露

2. **限制 OAuth 范围**
   - 只请求必要的权限
   - 当前配置只需要基本的 profile 和 email

3. **生产环境**
   - 将 OAuth consent screen 发布为 Production
   - 移除测试用户限制
   - 添加隐私政策和服务条款链接

## 快速检查清单

- [ ] Google Cloud 项目已创建
- [ ] OAuth consent screen 已配置
- [ ] OAuth Client ID 已创建
- [ ] Authorized redirect URIs 包含 Supabase callback URL
- [ ] Supabase Google Provider 已启用
- [ ] Client ID 和 Client Secret 已填写
- [ ] 测试登录成功

---

**配置完成后，Google 登录功能将正常工作！**
