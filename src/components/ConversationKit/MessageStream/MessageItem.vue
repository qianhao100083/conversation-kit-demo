<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Message } from '../types'
import MarkdownRenderer from './MarkdownRenderer.vue'

interface Props {
  message: Message
  isActive?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'mounted', el: Element): void
}>()

const itemRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (itemRef.value) {
    emit('mounted', itemRef.value)
  }
})

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div
    ref="itemRef"
    :class="['message-item', message.role]"
  >
    <div class="message-header">
      <span class="role-badge">{{ message.role === 'user' ? 'You' : 'Assistant' }}</span>
      <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
    </div>
    
    <div class="message-content">
      <MarkdownRenderer :content="message.content" :message-id="message.id" />
    </div>    
  </div>
</template>

<style scoped>
.message-item {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-item.user {
  margin-left: auto;
  background: #e3f2fd;
  border-bottom-right-radius: 4px;
}

.message-item.assistant {
  margin-right: auto;
  background: white;
  border-bottom-left-radius: 4px;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
}

.role-badge {
  font-weight: 600;
  color: #1890ff;
  text-transform: capitalize;
}

.message-item.user .role-badge {
  color: #096dd9;
}

.timestamp {
  color: #999;
}

.message-content {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}
</style>
