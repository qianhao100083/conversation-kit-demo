# Conversation Kit Demo

A Vue 3 + TypeScript + Vite conversation UI component library demo.

## Features

- **Streaming Message Rendering**: Typewriter effect for AI responses
- **Smart Heading Detection**: Auto-extract Markdown headings for navigation
- **Anchor Navigation**: Click tree items to scroll to messages
- **Resizable Sidebar**: Draggable width adjustment (200px - 400px)
- **Dual Tab Sidebar**: "Structure" and "Search" tabs

## Tech Stack

- Vue 3.5+ with Composition API
- TypeScript 5.9+ (strict mode)
- Vite 7.3+
- Pinia 3.0

## Project Structure

```
src/
├── main.ts
├── App.vue
├── style.css
├── components/
│   └── ConversationKit/
│       ├── index.vue
│       ├── types.ts
│       ├── stores/
│       │   └── conversationStore.ts
│       ├── MessageStream/
│       │   ├── index.vue
│       │   ├── types.ts
│       │   ├── MessageItem.vue
│       │   ├── MarkdownRenderer.vue
│       │   └── composables/
│       │       ├── useAnchorInject.ts
│       │       ├── useStreamRender.ts
│       │       └── useVirtualScroll.ts
│       ├── SidePanel/
│       │   ├── index.vue
│       │   ├── types.ts
│       │   ├── TreeTab.vue
│       │   ├── SearchTab.vue
│       │   └── composables/
│       │       ├── useActiveTab.ts
│       │       ├── useAnchorSync.ts
│       │       ├── useDragResize.ts
│       │       └── useTreeState.ts
│       └── UserInput/
│           ├── index.vue
│           └── types.ts
```

## Build Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```
