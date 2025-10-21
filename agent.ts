import Anthropic from '@anthropic-ai/sdk'
import { blue, green, yellow } from './format.ts'
import { getUserMessage } from './input.ts'
import { type AgentTool } from './tool.ts'

export class Agent {
  protected systemPrompt: string
  protected client: Anthropic
  protected model: Anthropic.Model
  protected tools: AgentTool[]

  constructor(
    systemPrompt: string = 'You are a helpful agent.',
    model: Anthropic.Model = 'claude-haiku-4-5-20251001',
    tools: AgentTool[] = []
  ) {
    this.systemPrompt = systemPrompt
    this.client = new Anthropic() // Requires ANTHROPIC_API_KEY to be set
    this.model = model
    this.tools = tools
  }

  async run(): Promise<void | Error> {
    const conversation: Anthropic.MessageParam[] = []

    console.log("Chat with Claude (use 'ctrl-c' to quit)\n")

    let readUserInput = true
    while (true) {
      if (readUserInput) {
        const userInput = await getUserMessage(`${blue('You')}: `)
        conversation.push({ role: 'user', content: userInput })
      }
      // agent response
      const { role, content } = await this.chat(conversation)
      conversation.push({ role, content })
      // render agent response
      const toolResults: Anthropic.ToolResultBlockParam[] = []
      for (const block of content) {
        if (block.type === 'text') {
          console.log(`\n${yellow('Claude')}: ${block.text}\n`)
        } else if (block.type === 'tool_use') {
          toolResults.push(await this.executeTool(block))
        }
      }
      // provide tool results if present
      readUserInput = toolResults.length === 0
      if (readUserInput) continue
      conversation.push({ role: 'user', content: toolResults })
    }
  }

  protected async chat(conversation: Anthropic.MessageParam[]) {
    const newMessage = this.client.messages.create({
      system: this.systemPrompt,
      model: this.model,
      max_tokens: 1024,
      messages: conversation,
      tools: this.tools,
    })
    return newMessage
  }

  protected async executeTool({
    id,
    name,
    input,
  }: Anthropic.ToolUseBlock): Promise<Anthropic.ToolResultBlockParam> {
    const tool = this.tools.find((t) => t.name === name)
    if (!tool) return { tool_use_id: id, is_error: true, type: 'tool_result' }

    console.log(`${green('Tool')}: ${name}(${JSON.stringify(input)})\n`)
    const response = await tool.fn(input)
    return {
      tool_use_id: id,
      content: response,
      type: 'tool_result',
    }
  }
}
