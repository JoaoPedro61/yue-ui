export function generateDarkTransparent(): {[index: string]: string} {
  const result: any = {};
  for (let i = 0, l = 100; i <= l; i++) {
    result[`${i}`] = `rgba(0, 0, 0, ${i / 100})`;
  }
  return result;
}

export function generateLightTransparent(): {[index: string]: string} {
  const result: any = {};
  for (let i = 0, l = 100; i <= l; i++) {
    result[`${i}`] = `rgba(255, 255, 255, ${i / 100})`;
  }
  return result;
}
