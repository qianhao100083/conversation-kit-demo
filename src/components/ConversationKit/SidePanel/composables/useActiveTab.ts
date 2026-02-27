import { ref } from 'vue'
import type { TabType } from '../../types'

export function useActiveTab(defaultTab: TabType = 'structure') {
  const activeTab = ref<TabType>(defaultTab)

  function setTab(tab: TabType) {
    activeTab.value = tab
  }

  function isActive(tab: TabType): boolean {
    return activeTab.value === tab
  }

  return {
    activeTab,
    setTab,
    isActive
  }
}
