import { Agent } from './agent.ts'
import { type AgentTool } from './tool.ts'

export class TodoAgent extends Agent {
  protected todoApi: string

  constructor(todoApi: string = 'http://localhost:3000') {
    super(`
      You are a TodoAgent that helps the user manage their Todo list.

      You are only able to help the user by using the tools you have been given.

      Do not offer to help with things you do not have a tool for.
    `)
    this.todoApi = todoApi
    this.tools = [this.listTodosTool]
  }

  // Tools

  listTodosTool: AgentTool = {
    name: 'list_todos',
    description: "You list the user's todos",
    input_schema: {
      type: 'object',
    },
    fn: async () => {
      const res = await fetch(`${this.todoApi}/api/todos`)
      const body = await res.text()
      return body
    },
  }
}
