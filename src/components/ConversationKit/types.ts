// Core type definitions for ConversationKit

export interface Heading {
  level: 1 | 2 | 3;
  title: string;
  index: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  summary?: string;
  headings?: Heading[];
  timestamp: number;
}

export interface TreeNode {
  id: string;
  type: 'turn' | 'chunk';
  summary: string;
  level: number;
  anchorId: string;
  collapsed: boolean;
  children: TreeNode[];
  meta: { createdAt: number; wordCount?: number };
}

export interface SearchResult {
  id: string;
  anchorId: string;
  turnIndex: number;
  chunkIndex?: number;
  preview: string;
  positions: number[];
}

export type SidePosition = 'left' | 'right';
export type TabType = 'structure' | 'search';
