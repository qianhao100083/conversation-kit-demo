# Conversation Kit Demo / 对话套件演示

A Vue 3 + TypeScript + Vite conversation UI component library for AI chat interfaces with multi-turn conversation management, tree-view navigation, and full-text search capabilities.
/ 基于 Vue 3 + TypeScript + Vite 的 AI 聊天界面对话组件库，支持多轮对话管理、树形视图导航和全文搜索功能。

---

## Features / 功能特性

### Implemented / 已实现

- **Streaming Message Rendering**: Typewriter effect for AI responses
- **流式消息渲染**: AI 回复的打字机效果
- **Smart Heading Detection**: Auto-extract Markdown headings (H1, H2, H3) for navigation
- **智能标题检测**: 自动提取 Markdown 标题（H1、H2、H3）用于导航
- **Tree View Navigation**: Hierarchical sidebar showing conversation structure
- **树形视图导航**: 显示对话结构的层级侧边栏
- **Message-Level Anchor Navigation**: Click message nodes to scroll to message
- **消息级别锚点导航**: 点击消息节点滚动到消息位置
- **Resizable Sidebar**: Draggable width adjustment (200px - 400px)
- **可调整侧边栏**: 拖拽调整宽度 (200px - 400px)
- **Sidebar Position Toggle**: Switch between left and right positions
- **侧边栏位置切换**: 在左侧和右侧位置之间切换
- **Dual Tab Sidebar**: "Structure" and "Search" tabs
- **双标签侧边栏**: "结构" 和 "搜索" 标签页
- **Markdown Rendering**: Support for headings, lists, bold, italic, code blocks
- **Markdown 渲染**: 支持标题、列表、粗体、斜体、代码块

### Partially Implemented / 部分实现

- **Heading-Level Anchor Navigation**: Tree shows subheadings but scroll doesn't work
- **标题级别锚点导航**: 树显示子标题但滚动不工作
- **Full-Text Search**: UI complete but search logic has issues (returns no results)
- **全文搜索**: UI 完成但搜索逻辑存在问题（返回无结果）

---

## Tech Stack / 技术栈

| Technology / 技术 | Purpose / 用途 |
|------------------|---------------|
| Vue 3.5+ | Frontend framework with Composition API / 前端框架，组合式 API |
| TypeScript 5.9+ | Type-safe development (strict mode) / 类型安全开发（严格模式） |
| Vite 7.3+ | Build tool and dev server / 构建工具和开发服务器 |
| Pinia 3.0 | State management for search results / 搜索结果的状态管理 |

---

## Project Structure / 项目结构

```
conversation-kit-demo/
├── docs/                                    # Documentation / 文档目录
│   ├── 需求规约说明书.md                    # Software Requirements Specification / 软件需求规约
│   ├── 概要设计说明书.md                    # High-Level Design / 概要设计
│   ├── 详细设计说明书.md                    # Detailed Design / 详细设计
│   ├── 路线图.md                            # Roadmap / 路线图
│   └── 测试报告.md                          # Test Report / 测试报告
│
├── screenshots/                             # Test screenshots / 测试截图
│   ├── 01-initial-state.png                 # Initial page load / 初始页面加载
│   ├── 02-streaming-in-progress.png         # Streaming output / 流式输出中
│   ├── 03-message-complete.png              # Complete message / 完整消息
│   ├── 04-anchor-navigation.png             # Anchor navigation / 锚点导航
│   ├── 05-search-tab.png                    # Search tab UI / 搜索标签页 UI
│   ├── 06-sidebar-left.png                  # Sidebar on left / 侧边栏在左侧
│   ├── 07-multi-turn-round1.png             # Multi-turn test round 1 / 多轮测试第1轮
│   ├── 08-multi-turn-round2.png             # Multi-turn test round 2 / 多轮测试第2轮
│   ├── 09-multi-turn-round3.png             # Multi-turn test round 3 / 多轮测试第3轮
│   ├── 10-search-vue3.png                   # Search test / 搜索测试
│   ├── 11-navigate-to-round3.png            # Navigation test / 导航测试
│   ├── 12-tree-expanded.png                 # Tree expanded / 树展开
│   ├── 13-search-no-results.png             # Search bug - no results / 搜索缺陷 - 无结果
│   ├── 14-search-chinese.png                # Search bug - Chinese / 搜索缺陷 - 中文
│   ├── 15-tree-expanded-subheadings.png     # Tree with subheadings / 带子标题的树
│   ├── 16-subheading-selected-no-scroll.png # Navigation bug / 导航缺陷
│   └── README.md                            # Screenshots description / 截图说明
│
├── src/                                     # Source code / 源代码
│   ├── main.ts                              # Entry point - app initialization / 入口点 - 应用初始化
│   ├── App.vue                              # Root component - renders ConversationKit / 根组件 - 渲染 ConversationKit
│   ├── style.css                            # Global styles - CSS variables, scrollbar / 全局样式 - CSS 变量、滚动条
│   │
│   ├── components/                          # Vue components / Vue 组件
│   │   └── ConversationKit/                 # Main conversation component / 主对话组件
│   │       ├── index.vue                    # Main container - coordinates all sub-components / 主容器 - 协调所有子组件
│   │       ├── types.ts                     # TypeScript interfaces - Message, TreeNode, SearchResult / TypeScript 接口定义
│   │       │
│   │       ├── stores/                      # Pinia state management / Pinia 状态管理
│   │       │   └── conversationStore.ts     # Global store - messages, search results, active anchor / 全局存储
│   │       │
│   │       ├── MessageStream/               # Message list display / 消息列表显示
│   │       │   ├── index.vue                # Message list container - anchor injection / 消息列表容器 - 锚点注入
│   │       │   ├── types.ts                 # MessageStream types / MessageStream 类型
│   │       │   ├── MessageItem.vue          # Single message display - role, timestamp / 单条消息显示
│   │       │   ├── MarkdownRenderer.vue     # Markdown parser with anchor IDs / Markdown 解析器（带锚点 ID）
│   │       │   └── composables/             # Reusable logic / 可复用逻辑
│   │       │       ├── useAnchorInject.ts   # Anchor detection and scrolling / 锚点检测和滚动
│   │       │       ├── useStreamRender.ts   # Streaming simulation - typewriter effect / 流式模拟 - 打字机效果
│   │       │       └── useVirtualScroll.ts  # Virtual scroll (placeholder) / 虚拟滚动（占位）
│   │       │
│   │       ├── SidePanel/                   # Sidebar with tabs / 带标签页的侧边栏
│   │       │   ├── index.vue                # Sidebar container - resize, tab switch / 侧边栏容器
│   │       │   ├── types.ts                 # SidePanel types / SidePanel 类型
│   │       │   ├── TreeTab.vue              # Tree view - conversation structure / 树形视图 - 对话结构
│   │       │   ├── SearchTab.vue            # Search interface - input and results / 搜索界面
│   │       │   └── composables/             # Sidebar composables / 侧边栏组合式函数
│   │       │       ├── useActiveTab.ts      # Tab state management / 标签状态管理
│   │       │       ├── useAnchorSync.ts     # Anchor sync with tree (placeholder) / 锚点同步
│   │       │       ├── useDragResize.ts     # Mouse drag resize logic / 鼠标拖拽调整大小逻辑
│   │       │       └── useTreeState.ts      # Tree expand/collapse state / 树展开/折叠状态
│   │       │
│   │       └── UserInput/                   # User input area / 用户输入区域
│   │           ├── index.vue                # Textarea with send/stop buttons / 带发送/停止按钮的文本域
│   │           └── types.ts                 # UserInput types / UserInput 类型
│   │
│   └── components/HelloWorld.vue            # Vite template component (unused) / Vite 模板组件（未使用）
│
├── index.html                               # HTML entry - loads Vite app / HTML 入口
├── package.json                             # NPM dependencies and scripts / NPM 依赖和脚本
├── vite.config.ts                           # Vite configuration - Vue plugin / Vite 配置
├── tsconfig.json                            # TypeScript base config / TypeScript 基础配置
├── tsconfig.app.json                        # TypeScript app config (strict) / TypeScript 应用配置（严格）
├── tsconfig.node.json                       # TypeScript Node config / TypeScript Node 配置
├── .gitignore                               # Git ignore patterns / Git 忽略模式
└── README.md                                # This file / 本文件
```

---

## Documentation / 文档

All documentation is bilingual (Chinese-English) with cross-references.
/ 所有文档均为中英双语，含交叉引用。

| Document / 文档 | Description / 描述 |
|----------------|-------------------|
| [需求规约说明书.md](./docs/需求规约说明书.md) | Software Requirements Specification - functional/non-functional requirements, traceability matrix / 软件需求规约 - 功能/非功能需求、追溯矩阵 |
| [概要设计说明书.md](./docs/概要设计说明书.md) | High-Level Design - system architecture, component decomposition, design patterns / 概要设计 - 系统架构、组件分解、设计模式 |
| [详细设计说明书.md](./docs/详细设计说明书.md) | Detailed Design - component specs, data structures, algorithms / 详细设计 - 组件规范、数据结构、算法 |
| [路线图.md](./docs/路线图.md) | Roadmap - bug fixes, feature enhancements, milestones / 路线图 - 缺陷修复、功能增强、里程碑 |
| [测试报告.md](./docs/测试报告.md) | Test Report - 12 test cases, defects, coverage analysis / 测试报告 - 12 个测试用例、缺陷、覆盖分析 |

---

## Known Issues / 已知问题

| Issue / 问题 | Severity / 严重程度 | Reference / 引用 |
|-------------|-------------------|-----------------|
| Search returns no results / 搜索返回无结果 | High / 高 | [DEF-001](./docs/测试报告.md#def-001-search-returns-no-results--搜索返回无结果) |
| Subheading navigation doesn't scroll / 子标题导航不滚动 | Medium / 中 | [DEF-002](./docs/测试报告.md#def-002-subheading-navigation-doesnt-scroll--子标题导航不滚动) |

See [Roadmap Phase 1](./docs/路线图.md#2-phase-1-bug-fixes--第一阶段缺陷修复) for fix plans.
/ 修复计划参见路线图第 1 阶段。

---

## Build Commands / 构建命令

```bash
# Install dependencies / 安装依赖
npm install

# Start development server / 启动开发服务器
npm run dev

# Build for production / 生产构建
npm run build

# Preview production build / 预览生产构建
npm run preview
```

---

## Test Results / 测试结果

- ✅ **Passed / 通过**: 9/12 test cases / 测试用例
- ⚠️ **Partial / 部分**: 2/12 test cases / 测试用例
- ❌ **Failed / 失败**: 1/12 test cases / 测试用例

See [Test Report](./docs/测试报告.md) for detailed results.
/ 详细结果参见测试报告。

---

## License / 许可证

MIT License / MIT 许可证

---

## Author / 作者

Development Team / 开发团队

**Last Updated / 最后更新:** 2026-02-28
