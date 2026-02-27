import { ref, type Ref } from 'vue'
import type { TreeNode } from '../../types'

export function useTreeState(
  treeData: Ref<TreeNode[]>,
  onNodeClick?: (node: TreeNode) => void
) {
  const expandedKeys = ref<Set<string>>(new Set())
  const selectedKey = ref<string>('')

  function toggleNode(node: TreeNode) {
    if (expandedKeys.value.has(node.id)) {
      expandedKeys.value.delete(node.id)
    } else {
      expandedKeys.value.add(node.id)
    }
  }

  function selectNode(node: TreeNode) {
    selectedKey.value = node.id
    onNodeClick?.(node)
  }

  function expandAll() {
    treeData.value.forEach((node) => {
      expandedKeys.value.add(node.id)
      node.children.forEach((child) => {
        expandedKeys.value.add(child.id)
      })
    })
  }

  function collapseAll() {
    expandedKeys.value.clear()
  }

  function isExpanded(nodeId: string): boolean {
    return expandedKeys.value.has(nodeId)
  }

  function isSelected(nodeId: string): boolean {
    return selectedKey.value === nodeId
  }

  return {
    expandedKeys,
    selectedKey,
    toggleNode,
    selectNode,
    expandAll,
    collapseAll,
    isExpanded,
    isSelected
  }
}
