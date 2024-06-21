type IToolType = 'file' | 'system-prompt' | 'user-prompt'

interface ITool {
  name: string
  id: string
  type: IToolType
  icon?: React.ReactNode
}