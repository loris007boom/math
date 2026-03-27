export function gcdBruteForce(a: number, b: number): number {
  const min = Math.min(Math.abs(a), Math.abs(b));
  for (let i = min; i >= 1; i--) {
    if (a % i === 0 && b % i === 0) {
      return i;
    }
  }
  return 1;
}

export function gcdEuclid(a: number, b: number): number {
  if (a === b) {
    return a;
  }

  const c = Math.max(a, b) - Math.min(a, b);
  return gcdEuclid(Math.min(a, b), c);
}
