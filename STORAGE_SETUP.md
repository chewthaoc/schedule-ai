# Supabase Storage 设置指南

## 创建 Storage Buckets

### 1. Schedule Images Bucket

1. 登录 Supabase Dashboard
2. 进入你的项目
3. 点击左侧菜单的 "Storage"
4. 点击 "Create a new bucket"
5. 设置：
   - Name: `schedule-images`
   - Public bucket: ✅ 勾选（允许公开访问）
   - File size limit: 10MB
   - Allowed MIME types: `image/*`

### 2. Avatars Bucket

1. 点击 "Create a new bucket"
2. 设置：
   - Name: `avatars`
   - Public bucket: ✅ 勾选（允许公开访问）
   - File size limit: 2MB
   - Allowed MIME types: `image/*`

## 设置 Storage 策略

在 SQL Editor 中运行以下 SQL：

### Schedule Images 策略

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

### Avatars 策略

```sql
-- 允许认证用户上传头像
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 允许认证用户更新自己的头像
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 允许所有人查看头像（公开显示）
CREATE POLICY "Avatars are publicly viewable"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- 允许认证用户删除自己的头像
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 文件夹结构

### Schedule Images
```
schedule-images/
  ├── {user_id}/
  │   ├── {timestamp}_{filename}.jpg
  │   ├── {timestamp}_{filename}.png
  │   └── ...
```

### Avatars
```
avatars/
  ├── {user_id}/
  │   └── avatar.{ext}  (每个用户一个头像，自动覆盖)
```

## 完成后

运行此设置后，应用将能够：
- ✅ 上传日程图像到 Supabase Storage
- ✅ 获取公开 URL 用于 AI 识别
- ✅ 上传和更新用户头像
- ✅ 自动清理用户删除的日程图像
- ✅ 头像自动覆盖（每个用户只保留最新头像）
