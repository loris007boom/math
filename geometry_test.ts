import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Circle, Point2D, Rectangle } from "./geometry.ts";

Deno.test("circumference of a circle with radius 5 is roughtly 31.416", () => {
  // Given
  const circle = new Circle(new Point2D(3, 4), 5);

  // When
  const actual = circle.circumference();

  // Then
  assertAlmostEquals(actual, 31.416, 0.01);
});

Deno.test("north east south west points are computed correctly", () => {
  const circle = new Circle(new Point2D(5, 5), 5);

  assertEquals(circle.north(), new Point2D(5, 10));
  assertEquals(circle.east(), new Point2D(10, 5));
  assertEquals(circle.south(), new Point2D(5, 0));
  assertEquals(circle.west(), new Point2D(0, 5));
});

Deno.test("point is between west and east on x-axis", () => {
  const m = new Point2D(5, 5);
  const w = new Point2D(0, 5);
  const e = new Point2D(10, 5);

  assertEquals(m.isBetweenX(w, e), true);
});

Deno.test("point is between south and north on y-axis", () => {
  const m = new Point2D(5, 5);
  const s = new Point2D(5, 0);
  const n = new Point2D(5, 10);

  assertEquals(m.isBetweenY(s, n), true);
});

Deno.test("point is not between west and east on y-axis", () => {
  const m = new Point2D(5, 5);
  const w = new Point2D(0, 5);
  const e = new Point2D(10, 5);

  assertEquals(m.isBetweenY(w, e), false);
});

Deno.test("rectangle encompasses circle", () => {
  const rectangle = new Rectangle(new Point2D(0, 0), new Point2D(10, 10));
  const circle = new Circle(new Point2D(5, 5), 4);

  assertEquals(rectangle.encompasses(circle), true);
});

Deno.test("rectangle does not encompass circle when radius is too large", () => {
  const rectangle = new Rectangle(new Point2D(0, 0), new Point2D(10, 10));
  const circle = new Circle(new Point2D(5, 5), 5);

  assertEquals(rectangle.encompasses(circle), false);
});

Deno.test("circle encompasses rectangle", () => {
  const circle = new Circle(new Point2D(5, 5), 8);
  const rectangle = new Rectangle(new Point2D(2, 2), new Point2D(8, 8));

  assertEquals(circle.encompasses(rectangle), true);
});

Deno.test("circle does not encompass rectangle", () => {
  const circle = new Circle(new Point2D(5, 5), 3);
  const rectangle = new Rectangle(new Point2D(2, 2), new Point2D(8, 8));

  assertEquals(circle.encompasses(rectangle), false);
});
