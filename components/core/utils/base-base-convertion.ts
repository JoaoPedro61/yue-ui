function convertion(n: number, b: number, p: number = 1, q: number = b * p): number[] {
  return [...n < q ? [] : convertion(n, b, q), n % q - n % p];
}

export function convertToBase(n: number, base: number = 10): number[] {
  return convertion(n, base);
}
