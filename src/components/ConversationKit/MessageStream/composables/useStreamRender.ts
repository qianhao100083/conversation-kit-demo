import { ref } from 'vue'
import type { Message, Heading } from '../../types'

export function useStreamRender() {
  const isStreaming = ref(false)
  const currentStreamId = ref<string | null>(null)
  
  function extractHeadings(content: string): Heading[] {
    const headings: Heading[] = []
    const lines = content.split('\n')
    let contentIndex = 0
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (!line) continue
      const match = line.match(/^(#{1,3})\s+(.+)$/)
      if (match && match[1] && match[2]) {
        headings.push({
          level: match[1].length as 1 | 2 | 3,
          title: match[2].trim(),
          index: contentIndex
        })
      }
      contentIndex += line.length + 1
    }
    
    return headings
  }

  function generateSummary(content: string): string {
    if (content.length <= 20) return content
    const firstLine = content.split('\n')[0]
    if (!firstLine || firstLine.length <= 30) return firstLine || content
    return firstLine.substring(0, 30) + '...'
  }

  async function streamMessage(
    messages: Message[],
    fullContent: string,
    onUpdate: (msg: Message) => void,
    onComplete: (msg: Message) => void,
    charDelay = 30
  ): Promise<void> {
    return new Promise((resolve) => {
      isStreaming.value = true
      const id = generateId()
      currentStreamId.value = id
      
      const message: Message = {
        id,
        role: 'assistant',
        content: '',
        timestamp: Date.now()
      }
      
      messages.push(message)
      let charIndex = 0
      let lastHeadingUpdate = 0
      
      const interval = setInterval(() => {
        if (charIndex < fullContent.length) {
          message.content += fullContent[charIndex]
          charIndex++
          
          // Update headings every 10 chars or at the end
          if (charIndex - lastHeadingUpdate >= 10 || charIndex === fullContent.length) {
            message.headings = extractHeadings(message.content)
            lastHeadingUpdate = charIndex
          }
          
          // Generate summary after 20 chars
          if (charIndex === 20 || (charIndex > 20 && charIndex % 20 === 0)) {
            message.summary = generateSummary(message.content)
          }
          
          onUpdate({ ...message })
        } else {
          clearInterval(interval)
          message.headings = extractHeadings(message.content)
          message.summary = generateSummary(message.content)
          isStreaming.value = false
          currentStreamId.value = null
          onComplete({ ...message })
          resolve()
        }
      }, charDelay)
    })
  }

  function stopStream() {
    isStreaming.value = false
    currentStreamId.value = null
  }

  return {
    isStreaming,
    currentStreamId,
    streamMessage,
    stopStream,
    extractHeadings,
    generateSummary
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}
