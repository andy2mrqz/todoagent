import { Agent } from './agent.ts'
import { type AgentTool } from './tool.ts'

export class TodoAgent extends Agent {
  constructor() {
    super(`
      You are a TodoAgent that helps the user manage their Todo list.

      You are only able to help the user by using the tools you have been given.

      Do not offer to help with things you do not have a tool for.
    `)
    this.tools = [listTodosTool]
  }
}

// Tools
const listTodosTool: AgentTool = {
  name: 'list_todos',
  description: "You list the user's todos",
  input_schema: {
    type: 'object',
  },
  fn: async () => {
    return '\n1. Take out the trash\n2. Get some milk'
  },
}
