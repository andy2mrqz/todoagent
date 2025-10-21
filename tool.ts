import Anthropic from '@anthropic-ai/sdk'

export interface AgentTool {
  name: string
  description: string
  input_schema: Anthropic.Tool.InputSchema
  fn: (input: unknown) => Promise<string>
}
