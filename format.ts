export function blue(s: string): string {
  return '\u001b[94m' + s + '\u001b[0m'
}

export function yellow(s: string): string {
  return '\u001b[93m' + s + '\u001b[0m'
}

export function green(s: string): string {
  return '\u001b[92m' + s + '\u001b[0m'
}
