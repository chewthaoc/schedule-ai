# 🔧 忘记密码功能排查指南

## 问题诊断步骤

### 第 1 步：检查浏览器控制台

1. 打开 https://schedule-ai-teal.vercel.app/forgot-password
2. 按 F12 打开开发者工具
3. 切换到 **Console** 标签
4. 输入邮箱，点击 "Send Reset Link"
5. 查看是否有红色错误信息

**常见错误：**
- `Invalid redirect URL` - Redirect URL 配置错误
- `Email rate limit exceeded` - 超过发送限制
- `User not found` - 邮箱未注册

### 第 2 步：检查 Supabase 配置

#### 2.1 检查 Redirect URLs

1. 登录 Supabase Dashboard
2. 进入 **Authentication** → **URL Configuration**
3. 确认 **Redirect URLs** 包含：
   ```
   https://schedule-ai-teal.vercel.app/reset-password
   http://localhost:3000/reset-password
   ```
4. 注意：URL 必须完全匹配，包括 `https://` 和路径

#### 2.2 检查 Site URL

在同一页面，确认 **Site URL** 设置为：
```
https://schedule-ai-teal.vercel.app
```

#### 2.3 检查邮件确认设置

1. 进入 **Authentication** → **Settings**
2. 找到 **Email Auth** 部分
3. 确认以下设置：

**关键设置：**
- ✅ **Enable email confirmations**: 可以开启或关闭
- ✅ **Secure email change**: 建议开启
- ⚠️ **Double confirm email changes**: 建议关闭（避免复杂化）

### 第 3 步：检查 Supabase 日志

1. 在 Supabase Dashboard 中，进入 **Authentication** → **Logs**
2. 查找最近的日志记录
3. 寻找与你的邮箱相关的条目
4. 检查是否有错误信息

**日志示例：**
```
✅ 成功: "Password recovery email sent to user@example.com"
❌ 失败: "Rate limit exceeded for user@example.com"
❌ 失败: "Invalid redirect URL: https://..."
```

### 第 4 步：测试邮箱地址

确认测试的邮箱地址：
- ✅ 已经在系统中注册
- ✅ 如果开启了邮箱确认，该邮箱已验证
- ✅ 不在黑名单中

**验证方法：**
1. 进入 Supabase Dashboard → **Authentication** → **Users**
2. 搜索你的邮箱
3. 检查用户状态

### 第 5 步：检查邮件发送限制

#### Supabase 默认 SMTP 限制
- 每小时最多 4 封邮件
- 如果超过限制，需要等待或配置自定义 SMTP

**检查方法：**
1. 在 Supabase Logs 中查看是否有 "rate limit" 错误
2. 等待 1 小时后重试
3. 或配置自定义 SMTP（见下文）

### 第 6 步：检查邮件接收

1. **检查收件箱** - 等待 1-2 分钟
2. **检查垃圾邮件** - 很重要！
3. **检查促销/社交标签** - Gmail 可能分类到这里
4. **搜索发件人** - 搜索 "noreply" 或 "supabase"

### 第 7 步：测试完整流程

使用以下步骤完整测试：

```bash
# 1. 打开浏览器控制台
# 2. 访问忘记密码页面
https://schedule-ai-teal.vercel.app/forgot-password

# 3. 输入已注册的邮箱
# 4. 点击 "Send Reset Link"
# 5. 观察控制台输出
# 6. 检查 Supabase Logs
# 7. 等待 1-2 分钟
# 8. 检查邮箱（包括垃圾邮件）
```

## 常见问题和解决方案

### 问题 1: 显示 "Invalid redirect URL"

**原因：** Redirect URL 未在 Supabase 中配置

**解决方案：**
1. 进入 Supabase → Authentication → URL Configuration
2. 在 **Redirect URLs** 中添加：
   ```
   https://schedule-ai-teal.vercel.app/reset-password
   ```
3. 点击 **Save**
4. 等待 1-2 分钟让配置生效
5. 重试

### 问题 2: 页面显示成功，但收不到邮件

**可能原因：**
- 邮件在垃圾邮件文件夹
- 超过发送限制（4封/小时）
- SMTP 配置问题
- 邮箱地址未注册

**解决方案：**
1. 彻底检查垃圾邮件文件夹
2. 检查 Supabase Logs 确认邮件是否发送
3. 等待 1 小时后重试
4. 确认邮箱已注册：Supabase → Authentication → Users

### 问题 3: 显示 "User not found"

**原因：** 输入的邮箱未注册

**解决方案：**
1. 确认邮箱拼写正确
2. 在 Supabase → Authentication → Users 中搜索该邮箱
3. 如果不存在，先注册账户
4. 如果存在但显示错误，检查用户状态

### 问题 4: 超过发送限制

**错误信息：** "Email rate limit exceeded"

**解决方案：**

**临时方案：**
- 等待 1 小时后重试

**永久方案：** 配置自定义 SMTP
1. 进入 Supabase → Project Settings → Auth
2. 滚动到 **SMTP Settings**
3. 启用 **Enable Custom SMTP**
4. 配置 SMTP（推荐使用 Resend 或 SendGrid）

**Resend 配置示例：**
```
Host: smtp.resend.com
Port: 587
Username: resend
Password: re_xxxxxxxxxxxx (你的 API key)
Sender email: noreply@yourdomain.com
Sender name: ScheduleAI
```

### 问题 5: 点击邮件链接后显示 "Invalid or expired link"

**可能原因：**
- 链接已过期（1小时有效期）
- 链接已被使用
- Redirect URL 配置不匹配

**解决方案：**
1. 请求新的重置链接
2. 确保在 1 小时内使用
3. 不要多次点击同一个链接
4. 检查 Redirect URL 配置

### 问题 6: 邮件发送成功，但点击链接后跳转错误

**原因：** Site URL 或 Redirect URL 配置错误

**解决方案：**
1. 检查 Supabase → Authentication → URL Configuration
2. **Site URL** 应该是：`https://schedule-ai-teal.vercel.app`
3. **Redirect URLs** 应该包含：`https://schedule-ai-teal.vercel.app/reset-password`
4. 保存后重新发送邮件

## 高级排查

### 使用 Supabase CLI 测试

```bash
# 安装 Supabase CLI
npm install -g supabase

# 测试邮件发送
supabase functions invoke auth --data '{"email":"test@example.com"}'
```

### 检查网络请求

1. 打开浏览器开发者工具
2. 切换到 **Network** 标签
3. 点击 "Send Reset Link"
4. 查找 `resetPasswordForEmail` 请求
5. 检查响应状态码和内容

**正常响应：**
```json
{
  "data": {},
  "error": null
}
```

**错误响应示例：**
```json
{
  "error": {
    "message": "Invalid redirect URL",
    "status": 400
  }
}
```

### 检查环境变量

确认 `.env.local` 配置正确：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**验证方法：**
```bash
# 在项目根目录运行
cat .env.local
```

## 完整配置检查清单

使用此清单确保所有配置正确：

### Supabase 配置
- [ ] Site URL 设置为 `https://schedule-ai-teal.vercel.app`
- [ ] Redirect URLs 包含 `https://schedule-ai-teal.vercel.app/reset-password`
- [ ] Redirect URLs 包含 `http://localhost:3000/reset-password`（本地测试）
- [ ] Email Auth 已启用
- [ ] 邮件模板已配置（可选）

### 本地配置
- [ ] `.env.local` 文件存在
- [ ] `NEXT_PUBLIC_SUPABASE_URL` 正确
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 正确

### 测试账户
- [ ] 测试邮箱已注册
- [ ] 测试邮箱已验证（如果需要）
- [ ] 测试邮箱可以正常接收邮件

### 邮件发送
- [ ] 未超过发送限制（4封/小时）
- [ ] 检查了垃圾邮件文件夹
- [ ] Supabase Logs 显示邮件已发送

## 仍然无法解决？

如果按照以上步骤仍然无法解决，请提供以下信息：

1. **浏览器控制台的完整错误信息**（截图）
2. **Supabase Logs 的相关记录**（截图）
3. **Network 标签中的请求响应**（截图）
4. **你的 Supabase URL Configuration 截图**
5. **测试的邮箱地址**（确认已注册）

## 快速测试脚本

创建一个测试文件来验证配置：

```typescript
// test-email.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testPasswordReset() {
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    'test@example.com',
    {
      redirectTo: 'https://schedule-ai-teal.vercel.app/reset-password',
    }
  )
  
  if (error) {
    console.error('❌ Error:', error.message)
  } else {
    console.log('✅ Success! Check your email.')
  }
}

testPasswordReset()
```

运行测试：
```bash
npx tsx test-email.ts
```

---

**需要更多帮助？** 在 GitHub Issues 中提问，并附上上述诊断信息。
