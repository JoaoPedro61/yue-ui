export function camelCaseToDash(raw: string): string {
  return raw.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}
