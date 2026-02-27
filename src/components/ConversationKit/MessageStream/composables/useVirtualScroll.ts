import { ref, computed, type Ref } from 'vue'
import type { Message } from '../../types'

export function useVirtualScroll(
  messages: Ref<Message[]>,
  options: {
    itemHeight?: number
    overscan?: number
  } = {}
) {
  const { itemHeight = 80, overscan = 5 } = options
  
  const containerHeight = ref(0)
  const scrollTop = ref(0)

  const totalHeight = computed(() => messages.value.length * itemHeight)
  
  const visibleRange = computed(() => {
    const start = Math.floor(scrollTop.value / itemHeight)
    const visibleCount = Math.ceil(containerHeight.value / itemHeight)
    
    return {
      start: Math.max(0, start - overscan),
      end: Math.min(messages.value.length, start + visibleCount + overscan)
    }
  })

  const visibleMessages = computed(() => {
    const { start, end } = visibleRange.value
    return messages.value.slice(start, end).map((msg, index) => ({
      ...msg,
      index: start + index,
      offset: (start + index) * itemHeight
    }))
  })

  function onScroll(e: Event) {
    const target = e.target as HTMLElement
    scrollTop.value = target.scrollTop
    containerHeight.value = target.clientHeight
  }

  function setContainerHeight(height: number) {
    containerHeight.value = height
  }

  return {
    totalHeight,
    visibleMessages,
    visibleRange,
    onScroll,
    setContainerHeight
  }
}
