<script setup lang="ts">
import { ref, computed } from 'vue'
import { useConversationStore } from '../stores/conversationStore'
import type { SearchResult } from '../types'

const store = useConversationStore()

const searchQuery = ref('')
const selectedResultId = ref('')

const hasSearched = ref(false)

const results = computed(() => store.searchResults)

function handleSearch() {
  hasSearched.value = true
  store.search(searchQuery.value)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleSearch()
  }
}

function selectResult(result: SearchResult) {
  selectedResultId.value = result.id
  store.setActiveAnchor(result.anchorId)
  // Emit event to parent to scroll to anchor
  emit('resultClick', result)
}

const emit = defineEmits<{
  (e: 'resultClick', result: SearchResult): void
}>()

function highlightText(text: string, query: string): string {
  if (!query.trim()) return text
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
</script>

<template>
  <div class="search-tab">
    <div class="search-input-wrapper">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search messages..."
        class="search-input"
        @keydown="handleKeydown"
      />
      <button class="search-button" @click="handleSearch">
        🔍
      </button>
    </div>
    
    <div class="search-hint">
      Press Enter to search
    </div>
    
    <!-- Search results -->
    <div v-if="hasSearched" class="search-results">
      <div v-if="results.length === 0" class="no-results">
        No results found for "{{ searchQuery }}"
      </div>
      
      <div v-else class="results-list">
        <div class="results-count">
          {{ results.length }} result(s) found
        </div>
        
        <div
          v-for="result in results"
          :key="result.id"
          :class="['result-item', { selected: selectedResultId === result.id }]"
          @click="selectResult(result)"
        >
          <div class="result-header">
            <span class="result-turn">Turn {{ result.turnIndex + 1 }}</span>
            <span class="result-matches">{{ result.positions.length }} match(es)</span>
          </div>          
          <div 
            class="result-preview" 
            v-html="highlightText(result.preview, searchQuery)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-tab {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-input-wrapper {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #1890ff;
}

.search-button {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.search-button:hover {
  border-color: #1890ff;
  background: #e3f2fd;
}

.search-hint {
  font-size: 11px;
  color: #999;
  margin-bottom: 16px;
}

.search-results {
  flex: 1;
  overflow-y: auto;
}

.no-results {
  text-align: center;
  color: #999;
  padding: 32px 16px;
  font-size: 13px;
}

.results-count {
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
  padding: 0 4px;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-item {
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.result-item:hover {
  border-color: #1890ff;
  background: #f5f5f5;
}

.result-item.selected {
  border-color: #1890ff;
  background: #e3f2fd;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.result-turn {
  font-size: 12px;
  font-weight: 600;
  color: #1890ff;
}

.result-matches {
  font-size: 11px;
  color: #999;
}

.result-preview {
  font-size: 12px;
  color: #333;
  line-height: 1.5;
  word-break: break-word;
}

.result-preview :deep(mark) {
  background: #ffeb3b;
  color: #333;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
