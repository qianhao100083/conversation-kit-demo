<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Message, TreeNode, SidePosition } from './types'
import MessageStream from './MessageStream/index.vue'
import SidePanel from './SidePanel/index.vue'
import UserInput from './UserInput/index.vue'
import { useStreamRender } from './MessageStream/composables/useStreamRender'

// State
const messages = ref<Message[]>([])
const inputText = ref('')
const isStreaming = ref(false)
const activeAnchor = ref('')
const sideWidth = ref(280)
const sidePosition = ref<SidePosition>('right')

const messageStreamRef = ref<InstanceType<typeof MessageStream> | null>(null)

const { extractHeadings, generateSummary } = useStreamRender()

// Computed
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
function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

function handleSend() {
  if (!inputText.value.trim() || isStreaming.value) return
  
  // Add user message
  const userMsg: Message = {
    id: generateId(),
    role: 'user',
    content: inputText.value.trim(),
    timestamp: Date.now()
  }
  messages.value.push(userMsg)
  
  const userContent = inputText.value
  inputText.value = ''
  
  // Start streaming response
  startStream(userContent)
}

async function startStream(userQuery: string) {
  isStreaming.value = true
  
  // Simulate AI response with markdown headings
  const responses = [
    `# Analysis\n\nLet me analyze your question about "${userQuery}".\n\n## Key Points\n\n- First point to consider\n- Second important aspect\n- Third relevant detail\n\n## Detailed Explanation\n\nHere's a comprehensive explanation with **bold text** and *italic emphasis*.\n\n\`code snippet\` example:\n\n\`\`\`javascript\nconst result = processQuery("${userQuery}");\nconsole.log(result);\n\`\`\`\n\n## Conclusion\n\nIn summary, this covers the main aspects of your question.`,
    
    `# Response\n\nThanks for your message!\n\n## Overview\n\nThis is a simulated response to demonstrate the streaming functionality.\n\n## Features\n\n- Real-time typing effect\n- Markdown rendering\n- Heading extraction\n- Anchor navigation`,
    
    `# Processing\n\nReceived: "${userQuery}"\n\n## Steps\n\n1. Parse the input\n2. Generate response\n3. Stream to client\n\n## Result\n\nOperation completed successfully!`
  ]
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)] ?? responses[0]!
  
  const assistantMsg: Message = {
    id: generateId(),
    role: 'assistant',
    content: '',
    timestamp: Date.now()
  }
  messages.value.push(assistantMsg)
  
  let charIndex = 0
  const interval = setInterval(() => {
    if (charIndex < randomResponse.length && isStreaming.value) {
      assistantMsg.content += randomResponse[charIndex]
      charIndex++
      
      // Update headings periodically
      if (charIndex % 10 === 0 || charIndex === randomResponse.length) {
        assistantMsg.headings = extractHeadings(assistantMsg.content)
      }
      
      // Generate summary after 20 chars
      if (charIndex === 20) {
        assistantMsg.summary = generateSummary(assistantMsg.content)
      }
      
      // Trigger reactivity
      const idx = messages.value.findIndex(m => m.id === assistantMsg.id)
      if (idx !== -1) {
        messages.value[idx] = { ...assistantMsg }
      }
    } else {
      clearInterval(interval)
      assistantMsg.headings = extractHeadings(assistantMsg.content)
      assistantMsg.summary = generateSummary(assistantMsg.content)
      isStreaming.value = false
      
      const idx = messages.value.findIndex(m => m.id === assistantMsg.id)
      if (idx !== -1) {
        messages.value[idx] = { ...assistantMsg }
      }
    }
  }, 30)
}

function handleStop() {
  isStreaming.value = false
}

function handleNodeClick(node: TreeNode) {
  activeAnchor.value = node.anchorId
  const streamRef = messageStreamRef.value as unknown as { scrollToAnchor?: (id: string) => void }
  streamRef?.scrollToAnchor?.(node.anchorId)
}

function handleAnchorVisible(anchorId: string) {
  activeAnchor.value = anchorId
}

function handleSearch(query: string) {
  console.log('Search query:', query)
  // Search implementation would go here
}
</script>

<template>
  <div :class="['conversation-kit', { 'side-left': sidePosition === 'left' }]">
    <SidePanel
      v-model="sideWidth"
      v-model:position="sidePosition"
      :tree-data="treeData"
      :active-anchor="activeAnchor"
      @node-click="handleNodeClick"
      @search="handleSearch"
    />
    
    <div class="main-area">
      <MessageStream
        ref="messageStreamRef"
        :messages="messages"
        :active-anchor="activeAnchor"
        @anchor-visible="handleAnchorVisible"
      />
      
      <UserInput
        v-model="inputText"
        :loading="isStreaming"
        @send="handleSend"
        @stop="handleStop"
      />
    </div>
  </div>
</template>

<style scoped>
.conversation-kit {
  display: grid;
  grid-template-areas: "main side" "input input";
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  height: 100vh;
  overflow: hidden;
}

.conversation-kit.side-left {
  grid-template-areas: "side main" "input input";
}

.main-area {
  grid-area: main;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* SidePanel is in grid area 'side' */
:deep(.side-panel) {
  grid-area: side;
}

/* UserInput spans full width */
:deep(.user-input) {
  grid-column: 1 / -1;
}
</style>
