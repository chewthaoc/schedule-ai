# 获取 GitHub Token 用于 GitHub Models

## 方式 1: 使用 GitHub CLI（最快）

```bash
# 创建一个有 models 权限的 token
gh auth token
```

复制输出的 token（以 `ghp_` 或 `github_pat_` 开头）

## 方式 2: 通过网页创建

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 填写信息：
   - Note: `ScheduleAI GitHub Models`
   - Expiration: 选择过期时间（建议 90 days）
   - 勾选权限：
     - ✅ `repo` (如果是私有仓库)
     - ✅ `read:org` (可选)
4. 点击 "Generate token"
5. **立即复制 token**（只显示一次！）

## 方式 3: 使用 GitHub Models 免费额度

GitHub Models 提供免费的 AI 模型访问：
- GPT-4o: 每分钟 15 次请求
- GPT-4o-mini: 每分钟 15 次请求
- 完全免费，无需信用卡

## 获取 Token 后

将 token 提供给我，我会：
1. 配置到 Vercel 环境变量
2. 重新部署应用
3. 测试 AI 功能

---

**安全提示**: Token 是敏感信息，请妥善保管。配置到 Vercel 后，它会被安全加密存储。
