# 清理 Supabase Storage 中的旧图片

## 通过 Supabase Dashboard 清理

1. 登录 Supabase Dashboard
2. 点击左侧 **Storage**
3. 点击 `schedule-images` bucket
4. 找到你的用户文件夹（以 UUID 命名）
5. 删除里面包含中文字符的旧图片
6. 重新上传新图片

## 通过 SQL 清理（可选）

如果想删除所有旧的上传记录：

```sql
-- 查看所有上传的文件
SELECT * FROM storage.objects WHERE bucket_id = 'schedule-images';

-- 删除特定用户的所有文件
DELETE FROM storage.objects 
WHERE bucket_id = 'schedule-images' 
AND (storage.foldername(name))[1] = 'your-user-id';
```

## 验证新的文件名格式

新上传的文件名应该是这样的格式：
```
1234567890_abc123.jpg
```

而不是：
```
1234567890_课程表.jpg  ❌ 旧格式（包含中文）
```

---

**重新上传新图片后，AI 识别应该就能正常工作了！**
