<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  content: string
}

const props = defineProps<Props>()

// Simple markdown parser
const renderedContent = computed(() => {
  let html = escapeHtml(props.content)
  
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 data-anchor-id="heading-$1">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 data-anchor-id="heading-$1">$1</h1>')
  
  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  
  // Code
  html = html.replace(/`(.+?)`/g, '<code>$1</code>')
  
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  
  // Lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.+\n)+/g, '<ul>$&</ul>')
  
  // Paragraphs
  html = html.split('\n\n').map((para) => {
    if (para.startsWith('<')) return para
    return `<p>${para}</p>`
  }).join('\n')
  
  return html
})

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
</script>

<template>
  <div class="markdown-renderer" v-html="renderedContent"></div>
</template>

<style scoped>
.markdown-renderer {
  font-size: 14px;
  line-height: 1.6;
}

.markdown-renderer :deep(h1),
.markdown-renderer :deep(h2),
.markdown-renderer :deep(h3) {
  margin: 16px 0 8px;
  font-weight: 600;
  color: #1a1a1a;
}

.markdown-renderer :deep(h1) {
  font-size: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
}

.markdown-renderer :deep(h2) {
  font-size: 18px;
}

.markdown-renderer :deep(h3) {
  font-size: 16px;
}

.markdown-renderer :deep(p) {
  margin: 8px 0;
}

.markdown-renderer :deep(ul) {
  margin: 8px 0;
  padding-left: 20px;
}

.markdown-renderer :deep(li) {
  margin: 4px 0;
}

.markdown-renderer :deep(code) {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
}

.markdown-renderer :deep(pre) {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
}

.markdown-renderer :deep(pre code) {
  background: none;
  padding: 0;
}

.markdown-renderer :deep(a) {
  color: #1890ff;
  text-decoration: none;
}

.markdown-renderer :deep(a:hover) {
  text-decoration: underline;
}

.markdown-renderer :deep(strong) {
  font-weight: 600;
}

.markdown-renderer :deep(em) {
  font-style: italic;
}
</style>
