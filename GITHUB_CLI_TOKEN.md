# 使用 GitHub CLI 获取 Token

## 方法 1: 使用现有的 gh CLI token（最快）

如果你已经安装并登录了 GitHub CLI：

```bash
# 获取当前 gh CLI 使用的 token
gh auth token
```

这会直接输出 token，复制它即可！

## 方法 2: 通过 gh CLI 创建新 token

```bash
# 创建一个新的 token（无需任何权限）
gh auth login --scopes ""

# 或者刷新现有认证
gh auth refresh

# 然后获取 token
gh auth token
```

## 方法 3: 使用 gh API 创建 token

```bash
# 创建一个经典 token（无权限）
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /user/tokens \
  -f note='ScheduleAI GitHub Models' \
  -f scopes='[]'
```

## 完整流程

### 步骤 1: 检查 gh CLI 是否已安装

```bash
gh --version
```

如果未安装，访问：https://cli.github.com/

### 步骤 2: 登录（如果还没登录）

```bash
gh auth login
```

选择：
- What account do you want to log into? **GitHub.com**
- What is your preferred protocol? **HTTPS**
- Authenticate Git with your GitHub credentials? **Yes**
- How would you like to authenticate? **Login with a web browser**

### 步骤 3: 获取 token

```bash
gh auth token
```

输出类似：
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 步骤 4: 复制 token

```bash
# 直接复制到剪贴板（Windows）
gh auth token | clip

# 或者（Mac）
gh auth token | pbcopy

# 或者（Linux）
gh auth token | xclip -selection clipboard
```

### 步骤 5: 添加到 Vercel

现在你有了 token，按照之前的步骤添加到 Vercel：

1. 访问 https://vercel.com/dashboard
2. 选择 `schedule-ai` 项目
3. Settings → Environment Variables
4. 添加：
   - Key: `GITHUB_TOKEN`
   - Value: 粘贴 token
   - Environments: 全选
5. Save
6. Redeploy

## 验证 token 是否有效

```bash
# 测试 token 是否能访问 GitHub Models
curl -H "Authorization: Bearer $(gh auth token)" \
  https://models.inference.ai.azure.com/models
```

如果返回模型列表，说明 token 有效！

## 快速一键脚本

创建一个脚本自动完成所有步骤：

```bash
#!/bin/bash
# setup-github-token.sh

echo "🔑 获取 GitHub Token..."
TOKEN=$(gh auth token)

if [ -z "$TOKEN" ]; then
  echo "❌ 未找到 token，请先运行: gh auth login"
  exit 1
fi

echo "✅ Token 获取成功！"
echo ""
echo "📋 Token (已复制到剪贴板):"
echo "$TOKEN"

# 复制到剪贴板
if command -v clip &> /dev/null; then
  echo "$TOKEN" | clip
elif command -v pbcopy &> /dev/null; then
  echo "$TOKEN" | pbcopy
elif command -v xclip &> /dev/null; then
  echo "$TOKEN" | xclip -selection clipboard
fi

echo ""
echo "📝 下一步："
echo "1. 访问 https://vercel.com/dashboard"
echo "2. 选择 schedule-ai 项目"
echo "3. Settings → Environment Variables"
echo "4. 添加 GITHUB_TOKEN = $TOKEN"
echo "5. Redeploy"
```

使用方法：
```bash
chmod +x setup-github-token.sh
./setup-github-token.sh
```

## 故障排除

### 问题 1: gh: command not found

**解决方案：** 安装 GitHub CLI
```bash
# Windows (使用 winget)
winget install --id GitHub.cli

# Mac (使用 Homebrew)
brew install gh

# Linux (Debian/Ubuntu)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

### 问题 2: gh auth token 返回空

**解决方案：** 先登录
```bash
gh auth login
```

### 问题 3: token 权限不足

**解决方案：** GitHub Models 不需要任何权限，任何 token 都可以用

---

**这样更快！** 直接运行 `gh auth token` 就能获取 token，然后添加到 Vercel 即可。
