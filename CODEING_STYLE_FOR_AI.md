# 🤖 AI Coding Style Guide

AIコード生成規約

## 📁 Project Structure
```
app/
├── components/     # React Components
├── lib/           # Utils
├── routes/        # Remix Routes
└── utils/         # API Client
```

## 🎯 Core Rules
- 型定義は明示的に
- API通信は必ず `hc` を使用
- UI実装は `shadcn/ui` 優先
- Style結合は `cn()` 使用

## 🔍 Code Examples
1. API Client
```typescript
const client = hc<AppType>(baseUrl)
const res = await client.api.resource.$get()
```

2. UI Component
```typescript
import { Button } from "~/components/ui/button"

export function Component() {
  return (
    <Button variant="default">
      {/* content */}
    </Button>
  )
}
```

## 🚨 Error Format
```typescript
try {
  await process()
} catch (e: Error) {
  throw { success: false, error: { message: e.message } }
}
```

## 🔐 Config
- ENV: `wrangler.toml`
- DEV: `.dev.vars`
- Types: `Env` interface

## 📝 Rules
- コメント: 複雑なロジックのみ
- 日本語OK
- TODO禁止
- テスト影響は明記
- モック最小限
