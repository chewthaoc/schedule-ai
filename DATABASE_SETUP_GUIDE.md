# 🗄️ Supabase 数据库设置指南

## 📋 快速设置步骤（5 分钟）

### 步骤 1: 访问 Supabase SQL Editor

1. 打开浏览器，访问你的 Supabase 项目：
   ```
   https://supabase.com/dashboard/project/ooklzlzidfixethdjwqq
   ```

2. 在左侧菜单中，点击 **SQL Editor** 图标（看起来像 `</>`）

3. 点击右上角的 **New Query** 按钮

### 步骤 2: 复制并运行 SQL 脚本

1. 打开项目中的 `setup-database-quick.sql` 文件

2. 复制**全部内容**（Ctrl+A, Ctrl+C）

3. 粘贴到 Supabase SQL Editor 中（Ctrl+V）

4. 点击右下角的 **Run** 按钮（或按 `Ctrl+Enter`）

5. 等待执行完成（约 5-10 秒）

### 步骤 3: 验证设置成功

执行完成后，你应该看到：

```
status: "Database setup completed successfully!"
```

如果看到这条消息，说明数据库设置成功！

### 步骤 4: 检查创建的表

1. 在左侧菜单点击 **Table Editor**

2. 你应该看到 3 个新表：
   - ✅ `users` - 用户信息表
   - ✅ `schedules` - 日程表
   - ✅ `events` - 事件表

3. 点击每个表，确认列结构正确

## ✅ 数据库结构说明

### users 表
存储用户个人信息：
- `id` - 用户 ID（关联 auth.users）
- `email` - 邮箱
- `full_name` - 全名
- `avatar_url` - 头像 URL
- `subscription_tier` - 订阅等级（free/pro/enterprise）
- `notification_enabled` - 通知开关

### schedules 表
存储日程容器：
- `id` - 日程 ID
- `user_id` - 所属用户
- `title` - 标题
- `description` - 描述
- `type` - 类型（school/work/event/personal）
- `color` - 颜色主题
- `image_url` - 上传的图片 URL
- `is_active` - 是否激活

### events 表
存储具体事件：
- `id` - 事件 ID
- `schedule_id` - 所属日程
- `title` - 标题
- `description` - 描述
- `location` - 地点
- `start_time` - 开始时间
- `end_time` - 结束时间
- `day_of_week` - 星期几（0-6）
- `recurrence` - 重复类型
- `color` - 颜色
- `category` - 分类

## 🔐 安全策略（RLS）

数据库已配置行级安全（Row Level Security）：

- ✅ 用户只能查看自己的数据
- ✅ 用户只能修改自己的数据
- ✅ 用户只能删除自己的数据
- ✅ 自动关联用户身份验证

## 🧪 测试数据库连接

设置完成后，你可以测试连接：

### 方式 1: 通过应用测试

1. 访问 https://schedule-ai-teal.vercel.app
2. 点击 "Sign Up" 注册账户
3. 登录后应该能看到仪表盘
4. 尝试创建一个日程

### 方式 2: 通过 SQL 测试

在 SQL Editor 中运行：

```sql
-- 查看表是否存在
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- 应该看到：users, schedules, events
```

## ⚠️ 常见问题

### 问题 1: 执行 SQL 时出错

**可能原因**：
- 表已经存在
- 权限不足

**解决方案**：
- 脚本使用了 `IF NOT EXISTS` 和 `DROP POLICY IF EXISTS`，可以安全重复运行
- 如果仍有错误，删除现有表后重新运行

### 问题 2: RLS 策略不生效

**解决方案**：
- 确认 RLS 已启用（脚本会自动启用）
- 检查策略是否正确创建
- 在 Table Editor 中查看每个表的 Policies

### 问题 3: 无法插入数据

**可能原因**：
- 用户未认证
- RLS 策略阻止

**解决方案**：
- 确保通过应用的认证系统登录
- 检查 auth.uid() 是否正确

## 📊 监控数据库

### 查看日志
https://supabase.com/dashboard/project/ooklzlzidfixethdjwqq/logs/explorer

### 查看 API 使用情况
https://supabase.com/dashboard/project/ooklzlzidfixethdjwqq/settings/api

### 查看数据库统计
https://supabase.com/dashboard/project/ooklzlzidfixethdjwqq/database/tables

## 🎉 完成！

数据库设置完成后，你的应用就完全可用了！

**下一步**：
1. 访问 https://schedule-ai-teal.vercel.app
2. 注册一个账户
3. 开始使用应用！

---

**需要帮助？** 如果遇到任何问题，告诉我具体的错误信息，我会帮你解决。
