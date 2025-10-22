import { TodoAgent } from './todo_agent.ts'

async function main() {
  const agent = new TodoAgent()
  await agent.run()
}

// Entrypoint
main()
