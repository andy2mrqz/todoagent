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
    this.tools = [this.listTodosTool, this.createTodoTool]
  }

  // Tools

  // C in CRUD
  createTodoTool: AgentTool = {
    name: 'create_todo',
    description: "You can add a todo the user's list",
    input_schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'the title of the todo',
        },
        dueDate: {
          type: 'string',
          format: 'date',
          description:
            'the due date for the todo in ISO 8601 format (YYYY-MM-DD)',
        },
      },
    },
    fn: async (input: unknown) => {
      const res = await fetch(`${this.todoApi}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      const body = await res.text()
      console.log('body', body)
      return body
    },
  }

  // R in CRUD
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
