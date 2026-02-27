// MessageStream types
export interface StreamMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}
