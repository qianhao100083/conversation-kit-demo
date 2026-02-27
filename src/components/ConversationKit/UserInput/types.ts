// UserInput types
export interface InputProps {
  modelValue: string
  loading?: boolean
  placeholder?: string
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'send'): void
  (e: 'stop'): void
}
