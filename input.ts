import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export async function getUserMessage(prompt: string) {
  return new Promise<string>((r) => rl.question(prompt, (ans) => r(ans)))
}
