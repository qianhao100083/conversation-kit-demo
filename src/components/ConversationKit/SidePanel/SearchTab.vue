<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const searchQuery = ref('')

function handleSearch() {
  emit('search', searchQuery.value)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleSearch()
  }
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
    
    <!-- Search results placeholder -->
    <div class="search-results">
      <div class="placeholder">
        Search functionality placeholder
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

.placeholder {
  text-align: center;
  color: #999;
  padding: 32px 16px;
  font-size: 13px;
}
</style>
