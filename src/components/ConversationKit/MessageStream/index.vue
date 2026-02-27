<script setup lang="ts">
import { ref } from 'vue'
import type { Message } from '../types'
import MessageItem from './MessageItem.vue'
import { useAnchorInject } from './composables/useAnchorInject'

interface Props {
  messages: Message[]
  activeAnchor?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'anchorVisible', anchorId: string): void
  (e: 'scrollToAnchor', anchorId: string): void
}>()

const containerRef = ref<HTMLDivElement | null>(null)

const { scrollToAnchor, registerAnchor } = useAnchorInject(
  containerRef,
  (anchorId) => emit('anchorVisible', anchorId)
)

function handleScrollToAnchor(anchorId: string) {
  scrollToAnchor(anchorId)
  emit('scrollToAnchor', anchorId)
}

function onMessageMounted(el: Element) {
  if (el.hasAttribute('data-anchor-id')) {
    registerAnchor(el)
  }
  // Also register heading anchors
  const headingElements = el.querySelectorAll('[data-anchor-id]')
  headingElements.forEach((headingEl) => registerAnchor(headingEl))
}

defineExpose({
  scrollToAnchor: handleScrollToAnchor
})
</script>

<template>
  <div ref="containerRef" class="message-stream">
    <div v-if="messages.length === 0" class="welcome">
      <div class="welcome-content">
        <h2>Welcome to Conversation Kit</h2>
        <p>Start a conversation by typing a message below.</p>
      </div>
    </div>
    
    <div
      v-for="message in messages"
      :key="message.id"
      :data-anchor-id="message.id"
      :class="['message-wrapper', { active: activeAnchor === message.id }]"
    >
      <MessageItem
        :message="message"
        :is-active="activeAnchor === message.id"
        @mounted="onMessageMounted"
      />
    </div>
  </div>
</template>

<style scoped>
.message-stream {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #f5f5f5;
}

.welcome {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
}

.welcome-content {
  text-align: center;
  color: #666;
}

.welcome-content h2 {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 500;
  color: #333;
}

.welcome-content p {
  margin: 0;
  font-size: 14px;
}

.message-wrapper {
  margin-bottom: 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.message-wrapper.active {
  animation: pulse 1s ease;
}

@keyframes pulse {
  0%, 100% {
    background-color: transparent;
  }
  50% {
    background-color: #fff3e0;
  }
}
</style>
