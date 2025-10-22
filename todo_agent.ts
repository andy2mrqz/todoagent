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
    this.tools = [this.createTodoTool, this.listTodosTool, this.updateTodoTool, this.deleteTodoTool]
  }

  // Tools

  // C in CRUD
  createTodoTool: AgentTool = {
    name: 'create_todo',
    description: "You can add a todo to the user's list",
    input_schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'the title of the todo',
        },
        priority: {
          type: 'string',
          enum: ['Low', 'Medium', 'High'],
          description: 'the priority of the todo',
        },
        dueDate: {
          type: 'string',
          format: 'date',
          description: 'the due date for the todo in ISO 8601 format (YYYY-MM-DD)',
        },
      },
    },
    fn: async (input) => {
      const res = await fetch(`${this.todoApi}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      return res.text()
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
      return res.text()
    },
  }

  // U in CRUD
  updateTodoTool: AgentTool = {
    name: 'update_todo',
    description:
      "You can update a user's todo by id.  Only include the fields the user provides (this actually behaves more like a PATCH on the backend.",
    input_schema: {
      type: 'object',
      properties: {
        todoId: {
          type: 'string',
          description: 'the todo id to update',
        },
        title: {
          type: 'string',
          description: 'the title of the todo',
        },
        complete: {
          type: 'boolean',
          description: 'whether or not the todo is complete',
        },
        priority: {
          type: 'string',
          enum: ['Low', 'Medium', 'High'],
          description: 'the priority of the todo',
        },
        dueDate: {
          type: 'string',
          format: 'date',
          description: 'the due date for the todo in ISO 8601 format (YYYY-MM-DD)',
        },
      },
    },
    fn: async (input) => {
      const { todoId } = input as { todoId: string }
      const res = await fetch(`${this.todoApi}/api/todos/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      return res.text()
    },
  }

  // D in CRUD
  deleteTodoTool: AgentTool = {
    name: 'delete_todo',
    description: "You can delete a user's todo by id",
    input_schema: {
      type: 'object',
      properties: {
        todoId: {
          type: 'string',
          description: 'the todo id to delete',
        },
      },
    },
    fn: async (input) => {
      const { todoId } = input as { todoId: string }
      const res = await fetch(`${this.todoApi}/api/todos/${todoId}`, {
        method: 'DELETE',
      })
      return res.text()
    },
  }
}
