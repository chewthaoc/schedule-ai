# ScheduleAI - 开发指南

## 🛠️ 开发环境设置

### 必需工具
- Node.js 18+ 
- npm 9+
- Git
- 代码编辑器（推荐 VS Code）

### VS Code 推荐扩展
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## 📁 项目结构详解

```
schedule-ai/
├── app/                          # Next.js 14 App Router
│   ├── (dashboard)/              # 路由组 - 共享布局
│   │   ├── layout.tsx            # 仪表盘布局（侧边栏）
│   │   ├── dashboard/page.tsx    # 仪表盘主页
│   │   ├── schedules/            # 日程管理
│   │   │   ├── page.tsx          # 日程列表
│   │   │   ├── new/page.tsx      # 创建日程
│   │   │   └── [id]/page.tsx     # 日程详情
│   │   ├── analytics/page.tsx    # 数据分析
│   │   └── settings/page.tsx     # 设置页面
│   ├── api/                      # API 路由
│   │   ├── ai/extract/route.ts   # AI 图像识别
│   │   ├── schedules/route.ts    # 日程 CRUD
│   │   ├── schedules/[id]/route.ts
│   │   └── events/route.ts       # 事件 CRUD
│   ├── login/page.tsx            # 登录页
│   ├── register/page.tsx         # 注册页
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页（营销页）
│   └── globals.css               # 全局样式
├── components/                   # React 组件
│   ├── ui/                       # UI 组件库
│   │   ├── Button.tsx            # 按钮组件
│   │   ├── Card.tsx              # 卡片组件
│   │   ├── Input.tsx             # 输入组件
│   │   ├── Toaster.tsx           # Toast 通知
│   │   ├── Loading.tsx           # 加载状态
│   │   └── ErrorMessage.tsx      # 错误提示
│   └── layout/                   # 布局组件
│       └── Sidebar.tsx           # 侧边栏导航
├── lib/                          # 工具库
│   ├── supabase/                 # Supabase 集成
│   │   └── client.ts             # Supabase 客户端
│   ├── openai/                   # OpenAI 集成
│   │   └── client.ts             # OpenAI 客户端
│   └── utils.ts                  # 工具函数
├── types/                        # TypeScript 类型
│   └── index.ts                  # 类型定义
├── public/                       # 静态资源
├── database.sql                  # 数据库架构
├── .env.example                  # 环境变量模板
├── .env.local                    # 本地环境变量（不提交）
├── next.config.ts                # Next.js 配置
├── tailwind.config.ts            # Tailwind 配置
├── tsconfig.json                 # TypeScript 配置
├── package.json                  # 项目依赖
├── README.md                     # 项目文档
├── PROJECT_SUMMARY.md            # 项目总结
└── QUICKSTART.md                 # 快速启动指南
```

## 🎨 设计系统

### 颜色变量
在 `app/globals.css` 中定义：
```css
--coffee-dark: #2C1810
--coffee-medium: #5D4037
--coffee-light: #8D6E63
--cream: #FAF7F2
--cream-dark: #E8DFD5
--latte: #D7CCC8
--espresso: #1A0F0A
```

### 组件使用示例

#### Button
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg">
  点击我
</Button>
```

#### Card
```tsx
import { Card, CardBody } from '@/components/ui/Card';

<Card hover>
  <CardBody>
    内容
  </CardBody>
</Card>
```

#### Input
```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="邮箱"
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

## 🔌 API 使用

### Supabase 查询示例
```typescript
import { supabase } from '@/lib/supabase/client';

// 获取日程列表
const { data, error } = await supabase
  .from('schedules')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });

// 创建新日程
const { data, error } = await supabase
  .from('schedules')
  .insert([{ title, description, type, user_id: userId }])
  .select()
  .single();
```

### OpenAI API 使用
```typescript
import { openai } from '@/lib/openai/client';

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: '分析这个课程表...' },
        { type: 'image_url', image_url: { url: imageUrl } }
      ]
    }
  ]
});
```

## 🧪 测试

### 手动测试清单
- [ ] 首页加载正常
- [ ] 登录功能正常
- [ ] 注册功能正常
- [ ] 创建日程成功
- [ ] 上传图片并提取事件
- [ ] 查看日程详情
- [ ] 编辑日程信息
- [ ] 删除日程
- [ ] 数据分析图表显示
- [ ] 设置页面功能
- [ ] 响应式设计（移动端）

### 性能测试
```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 使用 Lighthouse 测试性能
```

## 🐛 调试技巧

### 查看 Supabase 日志
1. 打开浏览器开发者工具
2. 查看 Network 标签
3. 筛选 supabase.co 请求
4. 检查请求和响应

### 查看 OpenAI API 调用
```typescript
console.log('OpenAI Request:', {
  model: 'gpt-4o',
  imageUrl: imageUrl.substring(0, 50) + '...'
});

const response = await openai.chat.completions.create(...);

console.log('OpenAI Response:', response.choices[0]?.message?.content);
```

### 常用调试命令
```bash
# 清理缓存
rm -rf .next

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 类型检查
npm run type-check

# 代码检查
npm run lint
```

## 📦 添加新功能

### 添加新页面
1. 在 `app/` 目录创建新文件夹
2. 创建 `page.tsx` 文件
3. 导出默认组件

### 添加新 API 路由
1. 在 `app/api/` 创建文件夹
2. 创建 `route.ts` 文件
3. 导出 GET/POST/PUT/DELETE 函数

### 添加新组件
1. 在 `components/ui/` 创建组件文件
2. 使用 TypeScript 定义 props
3. 应用咖啡主题样式

## 🚀 部署检查清单

- [ ] 环境变量已配置
- [ ] 数据库迁移已运行
- [ ] 构建成功（`npm run build`）
- [ ] 所有功能测试通过
- [ ] 性能优化完成
- [ ] SEO 元数据设置
- [ ] 错误处理完善
- [ ] 日志记录配置

## 📚 学习资源

### Next.js
- [Next.js 文档](https://nextjs.org/docs)
- [App Router 指南](https://nextjs.org/docs/app)

### Supabase
- [Supabase 文档](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

### OpenAI
- [OpenAI API 文档](https://platform.openai.com/docs)
- [Vision API 指南](https://platform.openai.com/docs/guides/vision)

### Tailwind CSS
- [Tailwind 文档](https://tailwindcss.com/docs)
- [Tailwind v4 更新](https://tailwindcss.com/blog/tailwindcss-v4)

## 🤝 贡献指南

### 代码风格
- 使用 TypeScript
- 遵循 ESLint 规则
- 组件使用函数式写法
- 使用有意义的变量名

### 提交规范
```
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建/工具变动
```

## 💡 最佳实践

1. **组件设计**
   - 保持组件小而专注
   - 使用 TypeScript 类型
   - 提取可复用逻辑

2. **状态管理**
   - 使用 React hooks
   - 避免过度状态提升
   - 考虑使用 Context

3. **性能优化**
   - 使用 Next.js Image 组件
   - 实现代码分割
   - 优化数据库查询

4. **安全性**
   - 验证所有用户输入
   - 使用 RLS 保护数据
   - 不暴露敏感信息

---

Happy Coding! ☕
