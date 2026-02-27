<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Message, TreeNode, SidePosition, SearchResult } from './types'
import MessageStream from './MessageStream/index.vue'
import SidePanel from './SidePanel/index.vue'
import UserInput from './UserInput/index.vue'
import { useStreamRender } from './MessageStream/composables/useStreamRender'

// State / 状态
const messages = ref<Message[]>([])           // Message list / 消息列表
const inputText = ref('')                     // Input text / 输入文本
const isStreaming = ref(false)                // Streaming state / 流式输出状态
const activeAnchor = ref('')                  // Currently active anchor / 当前激活的锚点
const sideWidth = ref(280)                    // Sidebar width / 侧边栏宽度
const sidePosition = ref<SidePosition>('right')  // Sidebar position / 侧边栏位置

const messageStreamRef = ref<InstanceType<typeof MessageStream> | null>(null)

const { extractHeadings, generateSummary } = useStreamRender()

// Computed / 计算属性
// Generate tree data from messages for sidebar navigation
// 从消息生成侧边栏导航用的树形数据
const treeData = computed((): TreeNode[] => {
  return messages.value.map((msg, index) => {
    // Create root node for each message turn
    // 为每轮消息创建根节点
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
    
    // Add child nodes for headings
    // 为标题添加子节点
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

// Actions / 动作
// Generate unique ID
// 生成唯一标识
function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

// Handle send button click
// 处理发送按钮点击
function handleSend() {
  if (!inputText.value.trim() || isStreaming.value) return
  
  // Add user message
  // 添加用户消息
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
  // 开始流式响应
  startStream(userContent)
}

// Simulate AI streaming response
// 模拟 AI 流式响应
async function startStream(userQuery: string) {
  isStreaming.value = true
  
  // Simulated response templates with markdown headings
  // 带 Markdown 标题的模拟响应模板
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
      // 定期更新标题
      if (charIndex % 10 === 0 || charIndex === randomResponse.length) {
        assistantMsg.headings = extractHeadings(assistantMsg.content)
      }
      
      // Generate summary after 20 chars
      // 20个字符后生成摘要
      if (charIndex === 20) {
        assistantMsg.summary = generateSummary(assistantMsg.content)
      }
      
      // Trigger reactivity by replacing object
      // 通过替换对象触发响应式更新
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

// Stop streaming
// 停止流式输出
function handleStop() {
  isStreaming.value = false
}

// Handle tree node click - navigate to message or heading
// 处理树节点点击 - 导航到消息或标题
function handleNodeClick(node: TreeNode) {
  activeAnchor.value = node.anchorId
  const streamRef = messageStreamRef.value as unknown as { scrollToAnchor?: (id: string) => void }
  streamRef?.scrollToAnchor?.(node.anchorId)
}

// Handle anchor visibility change from message stream
// 处理消息流中的锚点可见性变化
function handleAnchorVisible(anchorId: string) {
  activeAnchor.value = anchorId
}

// Handle search result click - navigate to result
// 处理搜索结果点击 - 导航到结果
function handleSearchResultClick(result: SearchResult) {
  activeAnchor.value = result.anchorId
  const streamRef = messageStreamRef.value as unknown as { scrollToAnchor?: (id: string) => void }
  streamRef?.scrollToAnchor?.(result.anchorId)
}
</script>

<template>
  <!-- Main container with dynamic class for sidebar position -->
  <!-- 主容器，根据侧边栏位置动态添加类 -->
  <div :class="['conversation-kit', { 'side-left': sidePosition === 'left' }]">
    <!-- Sidebar with tree and search -->
    <!-- 侧边栏，包含树形结构和搜索 -->
    <SidePanel
      v-model="sideWidth"
      v-model:position="sidePosition"
      :tree-data="treeData"
      :active-anchor="activeAnchor"
      @node-click="handleNodeClick"
      @search-result-click="handleSearchResultClick"
    />
    
    <!-- Main chat area -->
    <!-- 主聊天区域 -->
    <div class="main-area">
      <!-- Message list with anchor support -->
      <!-- 消息列表，支持锚点 -->
      <MessageStream
        ref="messageStreamRef"
        :messages="messages"
        :active-anchor="activeAnchor"
        @anchor-visible="handleAnchorVisible"
      />
      
      <!-- User input area -->
      <!-- 用户输入区域 -->
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
/* CSS Grid layout for main container */
/* 主容器的 CSS Grid 布局 */
.conversation-kit {
  display: grid;
  grid-template-areas: "main side" "input input";
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  height: 100vh;
  overflow: hidden;
}

/* Layout when sidebar is on the left */
/* 侧边栏在左侧时的布局 */
.conversation-kit.side-left {
  grid-template-areas: "side main" "input input";
}

/* Main chat area styling */
/* 主聊天区域样式 */
.main-area {
  grid-area: main;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* SidePanel grid placement */
/* SidePanel 网格放置 */
:deep(.side-panel) {
  grid-area: side;
}

/* UserInput spans full width */
/* UserInput 跨全宽 */
:deep(.user-input) {
  grid-column: 1 / -1;
}
</style>
