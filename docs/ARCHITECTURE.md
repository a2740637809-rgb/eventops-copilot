# 技术架构

Next.js App Router 提供页面和交互；TypeScript 领域模块以纯函数实现准备度、冲突、审批和评测；版本化合成 fixture 保证公开 Demo 可复现。

生产扩展边界：

```text
文档 → 解析适配器 → 结构化事实 → 规则校验
                         ↓
                    RAG 检索与引用
                         ↓
                   受控生成工作流
                         ↓
                 人工审批 → 工具适配器
```

生产数据建议使用 PostgreSQL + pgvector；MVP 不使用多 Agent或独立向量数据库。
