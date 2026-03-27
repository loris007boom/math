import { assertEquals } from "@std/assert";
import { gcdBruteForce, gcdEuclid } from "./gcd.ts";

const gcdTests = [
  { a: 1, b: 1, gcd: 1 },
  { a: 1, b: 2, gcd: 1 },
  { a: 2, b: 2, gcd: 2 },
  { a: 3, b: 4, gcd: 1 },
  { a: 6, b: 9, gcd: 3 },
  { a: 81, b: 36, gcd: 9 },
];

Deno.test("gcdBruteForce returns correct gcd", () => {
  for (const { a, b, gcd } of gcdTests) {
    const actual = gcdBruteForce(a, b);
    assertEquals(actual, gcd);
  }
});

Deno.test("gcdEuclid returns correct gcd", () => {
  for (const { a, b, gcd } of gcdTests) {
    const actual = gcdEuclid(a, b);
    assertEquals(actual, gcd);
  }
});
