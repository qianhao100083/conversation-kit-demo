import { ref, onUnmounted } from 'vue'

interface DragResizeOptions {
  minWidth?: number
  maxWidth?: number
  onResize?: (width: number) => void
  onResizeEnd?: (width: number) => void
}

export function useDragResize(options: DragResizeOptions = {}) {
  const { minWidth = 200, maxWidth = 400, onResize, onResizeEnd } = options
  
  const isDragging = ref(false)
  const currentWidth = ref(280)
  const startX = ref(0)
  const startWidth = ref(0)

  function startDrag(e: MouseEvent) {
    isDragging.value = true
    startX.value = e.clientX
    startWidth.value = currentWidth.value
    
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', stopDrag)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  function handleDrag(e: MouseEvent) {
    if (!isDragging.value) return
    
    const delta = e.clientX - startX.value
    const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth.value + delta))
    currentWidth.value = newWidth
    onResize?.(newWidth)
  }

  function stopDrag() {
    if (isDragging.value) {
      isDragging.value = false
      onResizeEnd?.(currentWidth.value)
    }
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
  })

  return {
    isDragging,
    currentWidth,
    startDrag
  }
}
