# 🔍 AI 提取错误完整排查

## 当前错误分析

错误信息：`Cannot convert argument to a ByteString because the character at index 7 has a value of 26159`

**这个错误的含义：**
- 字符值 26159 是一个中文字符
- 出现在字符串的第 7 个位置
- 说明某个 URL 或路径中包含中文字符

## 最可能的原因

**你正在测试旧的日程！**

即使代码已经修复，如果你：
- 点击之前创建的日程
- 尝试查看之前上传失败的图片
- 编辑旧的日程

这些旧日程的数据库记录中，`image_url` 字段仍然包含中文字符的文件名。

## 必须执行的测试步骤

### ⚠️ 重要：必须创建全新日程

**不要：**
- ❌ 点击任何已存在的日程
- ❌ 尝试重新处理旧图片
- ❌ 编辑之前的日程

**必须：**
1. ✅ 打开新的浏览器标签页
2. ✅ 访问 https://schedule-ai-teal.vercel.app/schedules/new
3. ✅ 填写全新的日程信息
4. ✅ 上传一张新图片（即使是同一张图片也要重新上传）
5. ✅ 点击 "Create Schedule"

### 详细测试步骤

```
第 1 步：确认部署完成
- 访问 https://vercel.com/dashboard
- 点击 schedule-ai 项目
- 点击 Deployments 标签
- 确认最新部署显示绿色 ✓
- 确认部署时间是最近 5 分钟内

第 2 步：清除浏览器缓存（重要！）
- 按 Ctrl + Shift + Delete（Windows）或 Cmd + Shift + Delete（Mac）
- 选择"缓存的图片和文件"
- 点击清除
- 或者使用无痕模式/隐私浏览模式

第 3 步：创建全新日程
- 访问 https://schedule-ai-teal.vercel.app/schedules/new
- Title: 测试AI识别
- Description: 新测试
- Type: School
- Color: 任意
- 上传图片：选择一张课程表图片
- 点击 "Create Schedule"

第 4 步：观察结果
- 打开浏览器控制台（F12 → Console）
- 查看是否有错误
- 如果成功，会跳转到日程详情页
```

## 如何验证是否使用了新代码

在浏览器控制台运行：

```javascript
// 检查当前页面的构建 ID
console.log(document.querySelector('script[src*="_next/static"]')?.src);
```

如果看到最新的构建 ID，说明新代码已部署。

## 如果仍然失败

请提供以下信息：

1. **Vercel 部署状态截图**
   - 显示最新部署的时间和状态

2. **完整的浏览器控制台日志**
   - F12 → Console
   - 复制所有红色错误信息

3. **Network 标签信息**
   - F12 → Network
   - 找到 `/api/ai/extract` 请求
   - 点击查看 Request Payload
   - 复制 `imageUrl` 的值

4. **确认操作**
   - 你是创建新日程还是查看旧日程？
   - 图片是新上传的还是之前的？

## 清理旧数据（可选）

如果想彻底清理旧的测试数据：

```sql
-- 在 Supabase SQL Editor 中运行
-- 删除所有测试日程
DELETE FROM schedules WHERE title LIKE '%测试%';

-- 或删除特定用户的所有日程
DELETE FROM schedules WHERE user_id = 'your-user-id';
```

然后在 Storage 中删除旧图片：
1. Supabase Dashboard → Storage
2. 点击 schedule-images bucket
3. 删除你的用户文件夹中的所有文件

---

**关键点：必须创建全新日程，不能使用旧的！**
