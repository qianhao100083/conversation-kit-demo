<script setup lang="ts">
import { ref, computed } from 'vue'
import type { InputProps } from './types'

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  loading: false,
  placeholder: 'Type a message...'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'send'): void
  (e: 'stop'): void
}>()

const isComposing = ref(false)

const canSend = computed(() => props.modelValue.trim().length > 0 && !props.loading)

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  autoResize(target)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey && !isComposing.value) {
    e.preventDefault()
    if (canSend.value) {
      handleSend()
    }
  }
}

function handleCompositionStart() {
  isComposing.value = true
}

function handleCompositionEnd(e: Event) {
  isComposing.value = false
  handleInput(e)
}

function handleSend() {
  if (canSend.value) {
    emit('send')
  }
}

function handleStop() {
  emit('stop')
}

function autoResize(textarea: HTMLTextAreaElement) {
  textarea.style.height = 'auto'
  textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
}
</script>

<template>
  <div class="user-input">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="loading"
      rows="1"
      class="input-textarea"
      @input="handleInput"
      @keydown="handleKeydown"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    />
    
    <div class="input-actions">
      <span class="hint">Enter to send, Shift+Enter for new line</span>
      
      
      <button
        v-if="loading"
        class="btn btn-stop"
        @click="handleStop"
      >
        ⏹ Stop
      </button>
      
      <button
        v-else
        class="btn btn-send"
        :disabled="!canSend"
        @click="handleSend"
      >
        ➤ Send
      </button>
    </div>
  </div>
</template>

<style scoped>
.user-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.input-textarea {
  width: 100%;
  min-height: 44px;
  max-height: 200px;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.input-textarea:focus {
  border-color: #1890ff;
}

.input-textarea:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.input-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hint {
  font-size: 12px;
  color: #999;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.btn-send {
  background: #1890ff;
  color: white;
}

.btn-send:hover:not(:disabled) {
  background: #40a9ff;
}

.btn-send:disabled {
  background: #d9d9d9;
  cursor: not-allowed;
}

.btn-stop {
  background: #ff4d4f;
  color: white;
}

.btn-stop:hover {
  background: #ff7875;
}
</style>
