-- ============================================
-- 清理旧的测试数据
-- ============================================

-- 方法 1: 删除特定用户的所有日程和事件
-- 替换 'your-user-id' 为你的实际用户 ID

-- 查看你的用户 ID
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- 删除特定用户的所有日程（会自动级联删除 events）
DELETE FROM schedules WHERE user_id = 'your-user-id';

-- ============================================

-- 方法 2: 删除所有测试日程（根据标题）
DELETE FROM schedules WHERE title LIKE '%测试%' OR title LIKE '%test%';

-- ============================================

-- 方法 3: 删除最近创建的日程（最近 1 小时）
DELETE FROM schedules WHERE created_at > NOW() - INTERVAL '1 hour';

-- ============================================

-- 方法 4: 查看所有日程，然后手动选择删除
SELECT id, title, created_at, user_id FROM schedules ORDER BY created_at DESC;

-- 删除特定 ID 的日程
DELETE FROM schedules WHERE id = 'schedule-id-here';

-- ============================================

-- 清理 Storage 中的旧图片
-- 查看所有上传的图片
SELECT name, created_at FROM storage.objects
WHERE bucket_id = 'schedule-images'
ORDER BY created_at DESC;

-- 删除特定用户的所有图片
DELETE FROM storage.objects
WHERE bucket_id = 'schedule-images'
AND (storage.foldername(name))[1] = 'your-user-id';

-- 删除所有图片（慎用！）
-- DELETE FROM storage.objects WHERE bucket_id = 'schedule-images';

-- ============================================

-- 验证删除结果
SELECT COUNT(*) as schedule_count FROM schedules;
SELECT COUNT(*) as event_count FROM events;
SELECT COUNT(*) as image_count FROM storage.objects WHERE bucket_id = 'schedule-images';
