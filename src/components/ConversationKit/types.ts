// Core type definitions for ConversationKit
// ConversationKit 核心类型定义

// Markdown heading structure
// Markdown 标题结构
export interface Heading {
  level: 1 | 2 | 3;      // Heading level / 标题级别
  title: string;         // Heading text / 标题文本
  index: number;         // Position in content / 在内容中的位置
}

// Chat message structure
// 聊天消息结构
export interface Message {
  id: string;            // Unique message ID / 唯一消息标识
  role: 'user' | 'assistant';  // Message sender / 消息发送者
  content: string;       // Message content / 消息内容
  summary?: string;      // Auto-generated summary / 自动生成的摘要
  headings?: Heading[];  // Extracted headings / 提取的标题列表
  timestamp: number;     // Creation time / 创建时间戳
}

// Tree node for sidebar navigation
// 侧边栏导航的树节点
export interface TreeNode {
  id: string;            // Node ID / 节点标识
  type: 'turn' | 'chunk'; // Node type: turn=message, chunk=heading / 节点类型
  summary: string;       // Display text / 显示文本
  level: number;         // Nesting level / 嵌套级别
  anchorId: string;      // Anchor for scrolling / 滚动定位锚点
  collapsed: boolean;    // Expand/collapse state / 展开/折叠状态
  children: TreeNode[];  // Child nodes / 子节点
  meta: { createdAt: number; wordCount?: number };  // Metadata / 元数据
}

// Search result structure
// 搜索结果结构
export interface SearchResult {
  id: string;            // Result ID / 结果标识
  anchorId: string;      // Link to message / 关联消息锚点
  turnIndex: number;     // Which conversation turn / 第几轮对话
  chunkIndex?: number;   // Which heading chunk / 哪个标题块
  preview: string;       // Text preview / 文本预览
  positions: number[];   // Match positions / 匹配位置
}

// Sidebar position type
// 侧边栏位置类型
export type SidePosition = 'left' | 'right';

// Sidebar tab type
// 侧边栏标签类型
export type TabType = 'structure' | 'search';
