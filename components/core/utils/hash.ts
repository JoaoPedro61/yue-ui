export function hash(): string {
  return '_' + Math.random().toString(36).substr(2);
}
