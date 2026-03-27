import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Fraction } from "./fraction.ts";

Deno.test("fraction of 1/1 is 1.0", () => {
  // Arrange
  const fraction = new Fraction(1, 1);

  // Act
  const float = fraction.toFloat(0.1);

  // Assert
  assertEquals(float, 1.0);
});

Deno.test("fraction of 2/3 is roughly 0.67", () => {
  // Arrange
  const fraction = new Fraction(2, 3);

  // Act
  const float = fraction.toFloat(0.01);

  // Assert
  assertAlmostEquals(float, 0.67);
});

Deno.test("1/3 + 2/6 = 2/3 is roughly 0.67", () => {
  // Arrange
  const left = new Fraction(1, 3);
  const right = new Fraction(2, 6);

  // Act
  left.add(right);

  // Assert
  assertAlmostEquals(left.toFloat(0.01), 0.67);
});

Deno.test("cancel reduces 18/27 to 2/3", () => {
  const fraction = new Fraction(18, 27);
  assertEquals(fraction.toString(), "2/3");
});

Deno.test("parse reduces 6/9 to 2/3", () => {
  const fraction = Fraction.parse("6 / 9");
  assertEquals(fraction.toString(), "2/3");
});

Deno.test("multiply auto-reduces result", () => {
  const left = new Fraction(2, 3);
  const right = new Fraction(3, 4);
  left.multiply(right);
  assertEquals(left.toString(), "1/2");
});
