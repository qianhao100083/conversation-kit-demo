import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Message, TreeNode, SearchResult } from '../types'

export const useConversationStore = defineStore('conversation', () => {
  // State
  const messages = ref<Message[]>([])
  const isStreaming = ref(false)
  const activeAnchor = ref<string>('')
  const searchQuery = ref('')
  const searchResults = ref<SearchResult[]>([])

  // Getters
  const messageCount = computed(() => messages.value.length)
  const hasMessages = computed(() => messages.value.length > 0)
  
  const treeData = computed((): TreeNode[] => {
    return messages.value.map((msg, index) => {
      const node: TreeNode = {
        id: `turn-${msg.id}`,
        type: 'turn',
        summary: msg.summary || `Message ${index + 1}`,
        level: 0,
        anchorId: msg.id,
        collapsed: false,
        children: [],
        meta: { createdAt: msg.timestamp }
      }
      
      if (msg.headings && msg.headings.length > 0) {
        node.children = msg.headings.map((h, hIndex) => ({
          id: `chunk-${msg.id}-${hIndex}`,
          type: 'chunk',
          summary: h.title,
          level: h.level,
          anchorId: `${msg.id}-heading-${h.index}`,
          collapsed: false,
          children: [],
          meta: { createdAt: msg.timestamp }
        }))
      }
      
      return node
    })
  })

  // Actions
  function addMessage(message: { role: 'user' | 'assistant'; content: string; summary?: string; headings?: import('../types').Heading[] }): Message {
    const newMessage: Message = {
      id: generateId(),
      role: message.role,
      content: message.content,
      summary: message.summary,
      headings: message.headings,
      timestamp: Date.now()
    }
    messages.value.push(newMessage)
    return newMessage
  }

  function updateMessage(id: string, updates: Partial<Message>) {
    const index = messages.value.findIndex(m => m.id === id)
    if (index !== -1) {
      const existing = messages.value[index]
      if (existing) {
        messages.value[index] = { ...existing, ...updates }
      }
    }
  }

  function setActiveAnchor(anchorId: string) {
    activeAnchor.value = anchorId
  }

  function search(query: string) {
    searchQuery.value = query
    if (!query.trim()) {
      searchResults.value = []
      return
    }
    
    const results: SearchResult[] = []
    const lowerQuery = query.toLowerCase()
    
    messages.value.forEach((msg, turnIndex) => {
      const content = msg.content.toLowerCase()
      const positions: number[] = []
      let pos = content.indexOf(lowerQuery)
      
      while (pos !== -1) {
        positions.push(pos)
        pos = content.indexOf(lowerQuery, pos + 1)
      }
      
      if (positions.length > 0 && positions[0] !== undefined) {
        results.push({
          id: `search-${msg.id}`,
          anchorId: msg.id,
          turnIndex,
          preview: extractPreview(msg.content, positions[0], query.length),
          positions
        })
      }
    })
    
    searchResults.value = results
  }

  function clearMessages() {
    messages.value = []
    activeAnchor.value = ''
    searchQuery.value = ''
    searchResults.value = []
  }

  return {
    messages,
    isStreaming,
    activeAnchor,
    searchQuery,
    searchResults,
    messageCount,
    hasMessages,
    treeData,
    addMessage,
    updateMessage,
    setActiveAnchor,
    search,
    clearMessages
  }
})

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

function extractPreview(content: string, position: number, queryLen: number): string {
  const start = Math.max(0, position - 30)
  const end = Math.min(content.length, position + queryLen + 30)
  let preview = content.substring(start, end)
  if (start > 0) preview = '...' + preview
  if (end < content.length) preview = preview + '...'
  return preview
}
