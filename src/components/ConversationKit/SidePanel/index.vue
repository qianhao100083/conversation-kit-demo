<script setup lang="ts">
import { computed } from 'vue'
import type { SidePosition, TreeNode } from '../types'
import { useActiveTab } from './composables/useActiveTab'
import { useDragResize } from './composables/useDragResize'
import TreeTab from './TreeTab.vue'
import SearchTab from './SearchTab.vue'

interface Props {
  modelValue?: number
  position?: SidePosition
  treeData?: TreeNode[]
  activeAnchor?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 280,
  position: 'right',
  treeData: () => [],
  activeAnchor: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', width: number): void
  (e: 'update:position', position: SidePosition): void
  (e: 'nodeClick', node: TreeNode): void
  (e: 'search', query: string): void
}>()

const { isActive, setTab } = useActiveTab('structure')

const { isDragging, currentWidth, startDrag } = useDragResize({
  minWidth: 200,
  maxWidth: 400,
  onResize: (width) => emit('update:modelValue', width),
  onResizeEnd: (width) => emit('update:modelValue', width)
})

const sideStyle = computed(() => ({
  width: `${currentWidth.value}px`,
  minWidth: `${currentWidth.value}px`
}))

function togglePosition() {
  const newPosition = props.position === 'right' ? 'left' : 'right'
  emit('update:position', newPosition)
}

function onNodeClick(node: TreeNode) {
  emit('nodeClick', node)
}

function onSearch(query: string) {
  emit('search', query)
}
</script>

<template>
  <div
    :class="['side-panel', position, { dragging: isDragging }]"
    :style="sideStyle"
  >
    <div
      class="resize-handle"
      :class="position"
      @mousedown="startDrag"
    />
    
    <div class="side-header">
      <div class="tabs">
        <button
          :class="['tab', { active: isActive('structure') }]"
          @click="setTab('structure')"
        >
          Structure
        </button>
        <button
          :class="['tab', { active: isActive('search') }]"
          @click="setTab('search')"
        >
          Search
        </button>
      </div>
      
      <button class="position-toggle" @click="togglePosition" title="Toggle position">
        {{ position === 'right' ? '◀' : '▶' }}
      </button>
    </div>
    
    <div class="side-content">
      <TreeTab
        v-if="isActive('structure')"
        :tree-data="treeData"
        :active-anchor="activeAnchor"
        @node-click="onNodeClick"
      />
      
      <SearchTab
        v-else
        @search="onSearch"
      />
    </div>
  </div>
</template>

<style scoped>
.side-panel {
  display: flex;
  flex-direction: column;
  background: #fafafa;
  border-left: 1px solid #e0e0e0;
  position: relative;
  user-select: none;
}

.side-panel.left {
  border-left: none;
  border-right: 1px solid #e0e0e0;
}

.side-panel.dragging {
  transition: none;
}

.resize-handle {
  position: absolute;
  top: 0;
  width: 4px;
  height: 100%;
  cursor: col-resize;
  background: transparent;
  transition: background 0.2s;
  z-index: 10;
}

.resize-handle:hover,
.resize-handle.dragging {
  background: #1890ff;
}

.resize-handle.right {
  left: -2px;
}

.resize-handle.left {
  right: -2px;
}

.side-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  background: white;
}

.tabs {
  display: flex;
  gap: 8px;
}

.tab {
  padding: 6px 12px;
  border: none;
  background: transparent;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.tab:hover {
  background: #f0f0f0;
  color: #333;
}

.tab.active {
  background: #e3f2fd;
  color: #1890ff;
  font-weight: 500;
}

.position-toggle {
  width: 28px;
  height: 28px;
  border: 1px solid #e0e0e0;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #666;
  transition: all 0.2s;
}

.position-toggle:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.side-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}
</style>
