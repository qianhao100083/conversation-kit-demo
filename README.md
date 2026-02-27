# Conversation Kit Demo / 对话套件演示

A Vue 3 + TypeScript + Vite conversation UI component library demo.
/ 基于 Vue 3 + TypeScript + Vite 的对话界面组件库演示项目。

## Features / 功能特性

- **Streaming Message Rendering**: Typewriter effect for AI responses
- **流式消息渲染**: AI 回复的打字机效果
- **Smart Heading Detection**: Auto-extract Markdown headings for navigation
- **智能标题检测**: 自动提取 Markdown 标题用于导航
- **Anchor Navigation**: Click tree items to scroll to messages
- **锚点导航**: 点击树形项目滚动到对应消息
- **Resizable Sidebar**: Draggable width adjustment (200px - 400px)
- **可调整侧边栏**: 拖拽调整宽度 (200px - 400px)
- **Dual Tab Sidebar**: "Structure" and "Search" tabs
- **双标签侧边栏**: "结构" 和 "搜索" 标签页

## Tech Stack / 技术栈

- Vue 3.5+ with Composition API / Vue 3.5+ 组合式 API
- TypeScript 5.9+ (strict mode) / TypeScript 5.9+ (严格模式)
- Vite 7.3+ / Vite 7.3+
- Pinia 3.0 / Pinia 3.0

## Project Structure / 项目结构

```
src/
├── main.ts                    # Entry point / 入口文件
├── App.vue                    # Root component / 根组件
├── style.css                  # Global styles / 全局样式
├── components/                # Components / 组件
│   └── ConversationKit/       # Main component / 主组件
│       ├── index.vue          # Container / 容器
│       ├── types.ts           # Type definitions / 类型定义
│       ├── stores/            # State management / 状态管理
│       │   └── conversationStore.ts
│       ├── MessageStream/     # Message list / 消息列表
│       │   ├── index.vue
│       │   ├── types.ts
│       │   ├── MessageItem.vue
│       │   ├── MarkdownRenderer.vue
│       │   └── composables/   # Composables / 组合式函数
│       ├── SidePanel/         # Sidebar / 侧边栏
│       │   ├── index.vue
│       │   ├── types.ts
│       │   ├── TreeTab.vue
│       │   ├── SearchTab.vue
│       │   └── composables/
│       └── UserInput/         # Input area / 输入区域
│           ├── index.vue
│           └── types.ts
```

## Build Commands / 构建命令

```bash
# Install dependencies / 安装依赖
npm install

# Development server / 开发服务器
npm run dev

# Production build / 生产构建
npm run build

# Preview build / 预览构建
npm run preview
```
