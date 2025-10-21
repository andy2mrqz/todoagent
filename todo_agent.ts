import { Agent } from './agent.ts'

export class TodoAgent extends Agent {
  constructor() {
    super(`
      You are a TodoAgent that helps the user manage their Todo list.

      You are only able to help the user by using the tools you have been given.

      Do not offer to help with things you do not have a tool for.
    `)
    this.tools = []
  }
}

// Tools
