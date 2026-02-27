import { ref, watch, type Ref } from 'vue'
import type { TreeNode } from '../../types'

export function useAnchorSync(
  activeAnchor: Ref<string>,
  treeData: Ref<TreeNode[]>,
  onNodeSelect?: (node: TreeNode) => void
) {
  const syncedNodeId = ref('')

  watch(activeAnchor, (anchorId) => {
    if (!anchorId) return
    
    // Find the node corresponding to this anchor
    for (const node of treeData.value) {
      if (node.anchorId === anchorId) {
        syncedNodeId.value = node.id
        onNodeSelect?.(node)
        return
      }
      for (const child of node.children) {
        if (child.anchorId === anchorId) {
          syncedNodeId.value = child.id
          onNodeSelect?.(child)
          return
        }
      }
    }
  })

  return {
    syncedNodeId
  }
}
