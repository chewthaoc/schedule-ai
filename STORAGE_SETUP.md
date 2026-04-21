# Supabase Storage 设置指南

## 创建 Storage Bucket

1. 登录 Supabase Dashboard
2. 进入你的项目
3. 点击左侧菜单的 "Storage"
4. 点击 "Create a new bucket"
5. 设置：
   - Name: `schedule-images`
   - Public bucket: ✅ 勾选（允许公开访问）
   - File size limit: 10MB
   - Allowed MIME types: `image/*`

## 设置 Storage 策略

在 SQL Editor 中运行以下 SQL：

```sql
-- 允许认证用户上传图像
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'schedule-images');

-- 允许认证用户查看自己的图像
CREATE POLICY "Users can view their own images"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'schedule-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 允许认证用户删除自己的图像
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'schedule-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 允许所有人查看公开图像（用于 AI 处理）
CREATE POLICY "Public images are viewable by everyone"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'schedule-images');
```

## 文件夹结构

图像将按用户 ID 组织：
```
schedule-images/
  ├── {user_id}/
  │   ├── {timestamp}_{filename}.jpg
  │   ├── {timestamp}_{filename}.png
  │   └── ...
```

## 完成后

运行此设置后，应用将能够：
- 上传图像到 Supabase Storage
- 获取公开 URL 用于 AI 识别
- 自动清理用户删除的日程图像
