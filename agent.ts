import Anthropic from '@anthropic-ai/sdk'
import { blue, yellow } from './format.ts'
import { getUserMessage } from './input.ts'

export class Agent {
  private client: Anthropic
  private model: Anthropic.Model

  constructor(model: Anthropic.Model = 'claude-haiku-4-5-20251001') {
    this.client = new Anthropic() // Requires ANTHROPIC_API_KEY to be set
    this.model = model
  }

  async run(): Promise<void | Error> {
    const conversation: Anthropic.MessageParam[] = []

    console.log("Chat with Claude (use 'ctrl-c' to quit)\n")

    while (true) {
      // user input
      const userInput = await getUserMessage(`${blue('You')}: `)
      conversation.push({ role: 'user', content: userInput })

      // agent response
      const response = await this.chat(conversation)
      const message = { role: response.role, content: response.content }
      conversation.push(message)

      // render agent response
      for (const content of response.content) {
        if (content.type === 'text') {
          console.log(`\n${yellow('Claude')}: ${content.text}\n`)
        }
      }
    }
  }

  async chat(conversation: Anthropic.MessageParam[]) {
    const newMessage = this.client.messages.create({
      model: this.model,
      max_tokens: 1024,
      messages: conversation,
    })
    return newMessage
  }
}
