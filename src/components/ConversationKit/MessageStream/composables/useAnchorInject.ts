import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useAnchorInject(
  containerRef: Ref<HTMLElement | null>,
  onAnchorVisible?: (anchorId: string) => void
) {
  const activeAnchor = ref('')
  const observer = ref<IntersectionObserver | null>(null)

  onMounted(() => {
    if (!containerRef.value) return
    
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const anchorId = entry.target.getAttribute('data-anchor-id')
            if (anchorId) {
              activeAnchor.value = anchorId
              onAnchorVisible?.(anchorId)
            }
          }
        })
      },
      {
        root: containerRef.value,
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px'
      }
    )
    
    // Observe all elements with data-anchor-id
    const elements = containerRef.value.querySelectorAll('[data-anchor-id]')
    elements.forEach((el) => observer.value?.observe(el))
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  function registerAnchor(element: Element) {
    if (observer.value && element.hasAttribute('data-anchor-id')) {
      observer.value.observe(element)
    }
  }

  function unregisterAnchor(element: Element) {
    if (observer.value) {
      observer.value.unobserve(element)
    }
  }

  function scrollToAnchor(anchorId: string, behavior: ScrollBehavior = 'smooth') {
    if (!containerRef.value) return
    
    const element = containerRef.value.querySelector(`[data-anchor-id="${anchorId}"]`)
    if (element) {
      element.scrollIntoView({ behavior, block: 'center' })
      activeAnchor.value = anchorId
    }
  }

  return {
    activeAnchor,
    registerAnchor,
    unregisterAnchor,
    scrollToAnchor
  }
}
