# ✅ 最终部署检查清单

## 已完成 ✅

- [x] 项目开发完成（28 个文件，4600+ 行代码）
- [x] GitHub 仓库创建：https://github.com/chewthaoc/schedule-ai
- [x] Vercel 部署成功：https://schedule-ai-teal.vercel.app
- [x] 环境变量配置完成（5 个变量）
- [x] GitHub Models API 配置（免费 GPT-4o）
- [x] 自动部署配置（推送即部署）

## 待完成 ⚠️

- [ ] **设置 Supabase 数据库**（最后一步！）

---

## 🚀 立即完成数据库设置

### 方式 1: 复制粘贴（最快，推荐）

1. **打开 Supabase SQL Editor**
   ```
   https://supabase.com/dashboard/project/ooklzlzidfixethdjwqq/editor
   ```

2. **点击 "New Query"**

3. **复制下面的 SQL 脚本**（全选复制）

4. **粘贴到编辑器并点击 Run**

5. **等待完成**（约 5 秒）

### SQL 脚本（复制这个）

```sql
-- 1. 启用 UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. 创建表
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  notification_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.schedules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('school', 'work', 'event', 'personal')),
  color TEXT DEFAULT '#8D6E63',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  schedule_id UUID REFERENCES public.schedules(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
  recurrence TEXT CHECK (recurrence IN ('none', 'daily', 'weekly', 'monthly')),
  color TEXT DEFAULT '#8D6E63',
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 启用安全
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 4. 创建策略
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own schedules" ON public.schedules FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own schedules" ON public.schedules FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own schedules" ON public.schedules FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own schedules" ON public.schedules FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own events" ON public.events FOR SELECT USING (EXISTS (SELECT 1 FROM public.schedules WHERE schedules.id = events.schedule_id AND schedules.user_id = auth.uid()));
CREATE POLICY "Users can create own events" ON public.events FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.schedules WHERE schedules.id = events.schedule_id AND schedules.user_id = auth.uid()));
CREATE POLICY "Users can update own events" ON public.events FOR UPDATE USING (EXISTS (SELECT 1 FROM public.schedules WHERE schedules.id = events.schedule_id AND schedules.user_id = auth.uid()));
CREATE POLICY "Users can delete own events" ON public.events FOR DELETE USING (EXISTS (SELECT 1 FROM public.schedules WHERE schedules.id = events.schedule_id AND schedules.user_id = auth.uid()));

-- 5. 创建索引
CREATE INDEX IF NOT EXISTS idx_schedules_user_id ON public.schedules(user_id);
CREATE INDEX IF NOT EXISTS idx_events_schedule_id ON public.events(schedule_id);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON public.events(start_time);

-- 6. 创建触发器
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_schedules_updated_at ON public.schedules;
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON public.schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON public.events;
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## ✅ 验证成功

运行后，在 **Table Editor** 中应该看到：
- ✅ users 表
- ✅ schedules 表  
- ✅ events 表

---

## 🎉 完成后立即测试

1. **访问应用**：https://schedule-ai-teal.vercel.app

2. **注册账户**：点击 "Get Started"

3. **测试功能**：
   - 创建日程
   - 上传图片（AI 识别）
   - 查看分析

---

## 📞 需要帮助？

如果遇到任何问题，告诉我：
- 错误信息
- 哪一步出错
- 截图（如果有）

我会立即帮你解决！
