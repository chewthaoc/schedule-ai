# 邮件配置指南 - Supabase Email Setup

## 📧 忘记密码邮件配置

### 1. 配置重定向 URL (Redirect URLs)

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 进入 **Authentication** → **URL Configuration**
4. 在 **Redirect URLs** 中添加以下 URL：

```
http://localhost:3000/reset-password
https://schedule-ai-teal.vercel.app/reset-password
```

5. 点击 **Save** 保存

### 2. 配置邮件模板 (Email Templates)

1. 在 Supabase Dashboard 中，进入 **Authentication** → **Email Templates**
2. 选择 **Reset Password** 模板
3. 自定义邮件内容（可选）：

```html
<h2>重置密码</h2>
<p>你好，</p>
<p>我们收到了你的密码重置请求。点击下面的按钮重置你的密码：</p>
<p><a href="{{ .ConfirmationURL }}">重置密码</a></p>
<p>如果你没有请求重置密码，请忽略此邮件。</p>
<p>此链接将在 1 小时后过期。</p>
<br>
<p>ScheduleAI 团队</p>
```

4. 确保 **{{ .ConfirmationURL }}** 变量存在（这是重置密码的链接）
5. 点击 **Save** 保存

### 3. 配置邮件发送设置

#### 选项 A: 使用 Supabase 默认 SMTP（开发环境）

Supabase 提供免费的 SMTP 服务，但有限制：
- 每小时最多 4 封邮件
- 适合开发和测试

**无需额外配置**，默认即可使用。

#### 选项 B: 配置自定义 SMTP（生产环境推荐）

1. 在 Supabase Dashboard 中，进入 **Project Settings** → **Auth**
2. 滚动到 **SMTP Settings** 部分
3. 启用 **Enable Custom SMTP**
4. 填写 SMTP 配置：

**推荐的 SMTP 提供商：**

##### SendGrid
```
Host: smtp.sendgrid.net
Port: 587
Username: apikey
Password: <your-sendgrid-api-key>
Sender email: noreply@yourdomain.com
Sender name: ScheduleAI
```

##### Gmail (仅用于测试)
```
Host: smtp.gmail.com
Port: 587
Username: your-email@gmail.com
Password: <app-specific-password>
Sender email: your-email@gmail.com
Sender name: ScheduleAI
```

**注意**: Gmail 需要启用"应用专用密码"，不能使用普通密码。

##### AWS SES
```
Host: email-smtp.us-east-1.amazonaws.com
Port: 587
Username: <your-aws-access-key>
Password: <your-aws-secret-key>
Sender email: noreply@yourdomain.com
Sender name: ScheduleAI
```

##### Resend (推荐)
```
Host: smtp.resend.com
Port: 587
Username: resend
Password: <your-resend-api-key>
Sender email: noreply@yourdomain.com
Sender name: ScheduleAI
```

5. 点击 **Save** 保存配置

### 4. 测试邮件发送

1. 访问 https://schedule-ai-teal.vercel.app/forgot-password
2. 输入一个已注册的邮箱地址
3. 点击 "Send Reset Link"
4. 检查邮箱（包括垃圾邮件文件夹）
5. 点击邮件中的重置链接
6. 应该会跳转到 `/reset-password` 页面

### 5. 验证邮件模板（可选）

如果你想自定义验证邮件（注册时的邮件），也需要配置：

1. 进入 **Authentication** → **Email Templates**
2. 选择 **Confirm Signup** 模板
3. 自定义内容：

```html
<h2>欢迎加入 ScheduleAI</h2>
<p>你好，</p>
<p>感谢注册 ScheduleAI！点击下面的按钮验证你的邮箱：</p>
<p><a href="{{ .ConfirmationURL }}">验证邮箱</a></p>
<p>如果你没有注册账户，请忽略此邮件。</p>
<br>
<p>ScheduleAI 团队</p>
```

4. 在 **URL Configuration** 中添加确认 URL：
```
http://localhost:3000/login
https://schedule-ai-teal.vercel.app/login
```

### 6. 常见问题排查

#### 问题 1: 收不到邮件

**解决方案：**
- 检查垃圾邮件文件夹
- 确认 Redirect URLs 已正确配置
- 检查 Supabase 日志：**Authentication** → **Logs**
- 如果使用默认 SMTP，检查是否超过每小时 4 封的限制
- 验证邮箱地址是否已注册

#### 问题 2: 点击链接后显示 "Invalid or expired link"

**解决方案：**
- 重置链接有效期为 1 小时，检查是否过期
- 确认 Redirect URL 配置正确
- 检查 URL 中的 token 是否完整（不要截断）
- 清除浏览器缓存后重试

#### 问题 3: 重定向到错误的 URL

**解决方案：**
- 检查 `forgot-password/page.tsx` 中的 `redirectTo` 参数
- 确认 Supabase 的 Redirect URLs 包含正确的域名
- 验证环境变量 `NEXT_PUBLIC_SUPABASE_URL` 是否正确

#### 问题 4: 使用自定义 SMTP 后仍然收不到邮件

**解决方案：**
- 验证 SMTP 凭据是否正确
- 检查 SMTP 提供商的发送限制
- 确认发件人邮箱已验证（某些提供商需要）
- 查看 Supabase 日志中的错误信息
- 测试 SMTP 连接（使用 telnet 或在线工具）

### 7. 生产环境最佳实践

1. **使用自定义 SMTP**
   - 不要依赖 Supabase 默认 SMTP
   - 选择可靠的邮件服务提供商

2. **配置 SPF 和 DKIM**
   - 在你的域名 DNS 中添加 SPF 记录
   - 配置 DKIM 签名提高送达率

3. **使用自定义域名**
   - 使用 `noreply@yourdomain.com` 而不是 Gmail
   - 提高邮件的专业性和可信度

4. **监控邮件发送**
   - 定期检查 Supabase 日志
   - 监控邮件送达率
   - 设置告警通知

5. **自定义邮件模板**
   - 添加品牌 logo
   - 使用一致的设计风格
   - 包含联系方式和帮助链接

### 8. 环境变量检查

确保 `.env.local` 包含正确的配置：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 9. 代码验证

当前实现已正确配置：

```typescript
// app/forgot-password/page.tsx
const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${window.location.origin}/reset-password`,
});
```

```typescript
// app/reset-password/page.tsx
const { error } = await supabase.auth.updateUser({
  password: formData.password,
});
```

### 10. 快速配置清单

- [ ] 在 Supabase 中添加 Redirect URLs
- [ ] 配置 Reset Password 邮件模板
- [ ] （可选）配置自定义 SMTP
- [ ] 测试忘记密码流程
- [ ] 检查邮件是否送达
- [ ] 验证重置链接是否有效
- [ ] 测试密码重置功能

---

## 📞 需要帮助？

如果配置过程中遇到问题：
1. 查看 Supabase Dashboard 的 Logs
2. 检查浏览器控制台的错误信息
3. 参考 [Supabase Auth 文档](https://supabase.com/docs/guides/auth)
4. 在项目 Issues 中提问

---

**配置完成后，忘记密码功能将完全可用！**
