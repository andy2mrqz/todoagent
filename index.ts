import { Agent } from './agent.ts'

async function main() {
  const agent = new Agent()
  await agent.run()
}

// Entrypoint
await main()
