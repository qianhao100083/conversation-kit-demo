<script setup lang="ts">
import { watch, type PropType, computed } from 'vue'
import type { TreeNode } from '../types'
import { useTreeState } from './composables/useTreeState'

const props = defineProps({
  treeData: {
    type: Array as PropType<TreeNode[]>,
    required: true
  },
  activeAnchor: {
    type: String,
    default: ''
  }
})

const emit = defineEmits<{
  (e: 'nodeClick', node: TreeNode): void
}>()

const treeDataRef = computed(() => props.treeData)

const { expandedKeys, selectedKey, toggleNode, selectNode, isExpanded, isSelected } = useTreeState(
  treeDataRef,
  (node) => emit('nodeClick', node)
)

// Sync with active anchor
watch(() => props.activeAnchor, (anchorId) => {
  if (!anchorId) return
  
  for (const node of props.treeData) {
    if (node.anchorId === anchorId) {
      selectedKey.value = node.id
      return
    }
    for (const child of node.children) {
      if (child.anchorId === anchorId) {
        selectedKey.value = child.id
        expandedKeys.value.add(node.id)
        return
      }
    }
  }
})

function getNodeLevelClass(level: number): string {
  return `level-${level}`
}
</script>

<template>
  <div class="tree-tab">
    <div v-if="treeData.length === 0" class="empty-state">
      No messages yet
    </div>
    
    <div v-else class="tree-list">
      <div
        v-for="node in treeData"
        :key="node.id"
        :class="['tree-node', getNodeLevelClass(node.level), { selected: isSelected(node.id) }]"
      >
        <div
          class="node-content"
          @click="selectNode(node)"
        >
          <span
            v-if="node.children.length > 0"
            class="expand-icon"
            :class="{ expanded: isExpanded(node.id) }"
            @click.stop="toggleNode(node)"
          >
            ▶
          </span>
          <span v-else class="expand-icon-placeholder"></span>
          
          <span class="node-icon">{{ node.type === 'turn' ? '💬' : '📄' }}</span>
          <span class="node-label">{{ node.summary }}</span>
        </div>
        
        <!-- Children -->
        <div
          v-if="node.children.length > 0 && isExpanded(node.id)"
          class="children"
        >
          <div
            v-for="child in node.children"
            :key="child.id"
            :class="['tree-node', getNodeLevelClass(child.level), { selected: isSelected(child.id) }]"
          >
            <div class="node-content" @click="selectNode(child)">
              <span class="expand-icon-placeholder"></span>
              <span class="node-icon">#{{ child.level }}</span>
              <span class="node-label">{{ child.summary }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tree-tab {
  height: 100%;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 32px 16px;
  font-size: 13px;
}

.tree-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tree-node {
  border-radius: 4px;
}

.node-content {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}

.node-content:hover {
  background: #f0f0f0;
}

.tree-node.selected > .node-content {
  background: #e3f2fd;
}

.expand-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #999;
  cursor: pointer;
  transition: transform 0.2s;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.expand-icon-placeholder {
  width: 16px;
}

.node-icon {
  font-size: 12px;
  color: #1890ff;
}

.node-label {
  font-size: 13px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.children {
  margin-left: 16px;
  border-left: 1px solid #e0e0e0;
  padding-left: 4px;
}

.children .node-label {
  font-size: 12px;
  color: #666;
}
</style>
