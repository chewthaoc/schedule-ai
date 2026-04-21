# 删除和重建用户账户指南

## 方法 1: 通过 Supabase Dashboard 删除用户（推荐）

### 步骤 1: 删除现有用户

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 进入 **Authentication** → **Users**
4. 找到你要删除的用户（可以搜索邮箱）
5. 点击用户行右侧的 **三个点 (...)** 菜单
6. 选择 **Delete user**
7. 确认删除

### 步骤 2: 重新注册

1. 访问 https://schedule-ai-teal.vercel.app/register
2. 使用相同或不同的邮箱注册
3. 填写信息并提交
4. 如果启用了邮箱验证，检查邮箱并点击验证链接
5. 登录系统

## 方法 2: 通过 SQL 删除用户

如果需要批量删除或 Dashboard 操作失败，可以使用 SQL：

### 在 Supabase SQL Editor 中运行：

```sql
-- 查看所有用户
SELECT id, email, created_at FROM auth.users;

-- 删除特定用户（替换为实际的 user_id）
DELETE FROM auth.users WHERE id = 'user-id-here';

-- 或者通过邮箱删除
DELETE FROM auth.users WHERE email = 'user@example.com';
```

**注意：** 由于设置了级联删除（CASCADE），删除用户会自动删除：
- 该用户的所有 schedules
- 该用户的所有 events
- 该用户在 users 表中的记录

## 方法 3: 清空所有测试数据（慎用）

如果想要完全重置数据库：

```sql
-- 删除所有事件
DELETE FROM events;

-- 删除所有日程
DELETE FROM schedules;

-- 删除所有用户数据
DELETE FROM users;

-- 删除所有认证用户
DELETE FROM auth.users;
```

**警告：** 这会删除所有数据，无法恢复！

## 重新注册后的检查清单

- [ ] 用户已成功创建
- [ ] 可以正常登录
- [ ] Dashboard 显示正常
- [ ] 可以创建日程
- [ ] 可以添加事件

## 常见问题

### 问题 1: 删除用户后无法用相同邮箱注册

**原因：** Supabase 可能有短暂的缓存

**解决方案：**
- 等待 1-2 分钟后重试
- 或者使用不同的邮箱地址

### 问题 2: 删除用户时显示错误

**原因：** 可能有外键约束或权限问题

**解决方案：**
- 使用 SQL 方法删除
- 检查 RLS 策略是否阻止了删除

### 问题 3: 用户数据没有被删除

**原因：** 级联删除可能没有正确配置

**解决方案：**
```sql
-- 手动删除用户相关数据
DELETE FROM events WHERE schedule_id IN (
  SELECT id FROM schedules WHERE user_id = 'user-id-here'
);
DELETE FROM schedules WHERE user_id = 'user-id-here';
DELETE FROM users WHERE id = 'user-id-here';
DELETE FROM auth.users WHERE id = 'user-id-here';
```

## 测试新账户

创建新账户后，测试以下功能：

1. **登录/登出**
   ```
   ✓ 可以登录
   ✓ 可以登出
   ✓ Session 正常工作
   ```

2. **忘记密码**
   ```
   ✓ 可以请求重置密码
   ✓ 收到重置邮件
   ✓ 可以重置密码
   ```

3. **日程管理**
   ```
   ✓ 可以创建日程
   ✓ 可以查看日程
   ✓ 可以编辑日程
   ✓ 可以删除日程
   ```

4. **事件管理**
   ```
   ✓ 可以添加事件
   ✓ 可以编辑事件
   ✓ 可以删除事件
   ```

---

**删除用户后，就可以用干净的状态重新测试所有功能了！**
