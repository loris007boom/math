export interface Shape {
  circumference(): number;
  area(): number;
}

export class Point2D {
  constructor(
    public x: number,
    public y: number,
  ) {}

  distanceTo(other: Point2D): number {
    return Math.sqrt(
      Math.abs(this.x - other.x) ** 2 + Math.abs(this.y - other.y) ** 2,
    );
  }

  isBetweenX(p: Point2D, q: Point2D): boolean {
    return (p.x < this.x && this.x < q.x) || (q.x < this.x && this.x < p.x);
  }

  isBetweenY(p: Point2D, q: Point2D): boolean {
    return (p.y < this.y && this.y < q.y) || (q.y < this.y && this.y < p.y);
  }
}

export class Circle implements Shape {
  constructor(
    private center: Point2D,
    private radius: number,
  ) {}

  circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  diameter(): number {
    return 2 * this.radius;
  }

  middle(): Point2D {
    return this.center;
  }

  north(): Point2D {
    return new Point2D(this.center.x, this.center.y + this.radius);
  }

  east(): Point2D {
    return new Point2D(this.center.x + this.radius, this.center.y);
  }

  south(): Point2D {
    return new Point2D(this.center.x, this.center.y - this.radius);
  }

  west(): Point2D {
    return new Point2D(this.center.x - this.radius, this.center.y);
  }

  encompasses(other: Shape): boolean {
    if (other instanceof Rectangle) {
      return [
        other.a(),
        other.b(),
        other.c(),
        other.d(),
      ].every((point) => this.center.distanceTo(point) < this.radius);
    }
    return false;
  }
}

export class Rectangle implements Shape {
  constructor(
    private bottomLeft: Point2D,
    private topRight: Point2D,
  ) {}

  circumference(): number {
    return 2 * (this.width() + 2 * this.height());
  }

  area(): number {
    return this.width() * this.height();
  }

  diagonal(): number {
    return this.bottomLeft.distanceTo(this.topRight);
  }

  a(): Point2D {
    return this.bottomLeft;
  }

  b(): Point2D {
    return new Point2D(this.topRight.x, this.bottomLeft.y);
  }

  c(): Point2D {
    return this.topRight;
  }

  d(): Point2D {
    return new Point2D(this.bottomLeft.x, this.topRight.y);
  }

  encompasses(other: Shape): boolean {
    if (other instanceof Circle) {
      return [
        other.middle(),
        other.north(),
        other.east(),
        other.south(),
        other.west(),
      ].every((point: Point2D) =>
        point.isBetweenX(this.a(), this.b()) &&
        point.isBetweenY(this.a(), this.d())
      );
    }
    return false;
  }

  private width(): number {
    return this.topRight.x - this.bottomLeft.x;
  }

  private height(): number {
    return this.topRight.y - this.bottomLeft.y;
  }
}
