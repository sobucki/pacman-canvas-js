import { Direction, Position, World } from "../../../common/types";
import { Wall } from "../wall";

type PlayerProps = {
  position: Position;
  context: CanvasRenderingContext2D;
};

export class Player {
  static radiusSize = 10;
  static speed = 4;
  position: Position;
  radius: number;
  context: CanvasRenderingContext2D;

  activeDirections: Set<Direction>;
  directionStack: Array<Direction>;

  constructor({ position, context }: PlayerProps) {
    if (!context || !(context instanceof CanvasRenderingContext2D)) {
      throw new Error("Invalid or null 2D context provided");
    }

    this.position = position;
    this.radius = Player.radiusSize;
    this.activeDirections = new Set();
    this.directionStack = [];
    this.context = context as CanvasRenderingContext2D;

    this.initializePlayerController();
  }

  private initializePlayerController() {
    addEventListener("keydown", ({ key }) => this.selectMove(key, true));
    addEventListener("keyup", ({ key }) => this.selectMove(key, false));
  }

  private addToStack(direction: Direction) {
    if (!this.directionStack.includes(direction)) {
      this.directionStack.push(direction);
    }
  }

  private removeFromStack(direction: Direction) {
    this.directionStack = this.directionStack.filter((d) => d !== direction);
  }

  private selectMove(key: string, active: boolean) {
    const direction = this.keyToDirection(key);

    if (!direction) return;

    if (active) {
      this.activeDirections.add(direction);
      this.addToStack(direction);
    } else {
      this.activeDirections.delete(direction);
      this.removeFromStack(direction);
    }
  }

  private keyToDirection(key: string): Direction | null {
    switch (key.toLowerCase()) {
      case "w":
        return Direction.UP;
      case "a":
        return Direction.LEFT;
      case "s":
        return Direction.DOWN;
      case "d":
        return Direction.RIGHT;
      default:
        return null;
    }
  }

  private draw() {
    this.context.beginPath();
    this.context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
    this.context.fillStyle = "yellow";
    this.context.fill();
    this.context.closePath();
  }

  update(world: World) {
    this.moveToDirection(world);
    this.draw();
  }

  willCollide(walls: Wall[], nextPosition: Position): boolean {
    return walls.some((wall) => this.isCollisionWithWall(wall, nextPosition));
  }

  isCollisionWithWall(wall: Wall, circlePosition: Position): boolean {
    const circleLeft = circlePosition.x - this.radius + 4;
    const circleRight = circlePosition.x + this.radius - 4;
    const circleTop = circlePosition.y - this.radius + 4;
    const circleBottom = circlePosition.y + this.radius - 4;

    const wallLeft = wall.position.x;
    const wallRight = wall.position.x + wall.width;
    const wallTop = wall.position.y;
    const wallBottom = wall.position.y + wall.height;

    const isCollidingHorizontally =
      circleRight >= wallLeft && circleLeft <= wallRight;
    const isCollidingVertically =
      circleBottom >= wallTop && circleTop <= wallBottom;

    return isCollidingHorizontally && isCollidingVertically;
  }

  calculeNextPosition(direction: Direction): Position {
    switch (direction) {
      case Direction.UP:
        return {
          x: this.position.x,
          y: this.position.y - Player.speed,
        };
      case Direction.LEFT:
        return {
          x: this.position.x - Player.speed,
          y: this.position.y,
        };
      case Direction.DOWN:
        return {
          x: this.position.x,
          y: this.position.y + Player.speed,
        };
      case Direction.RIGHT:
        return {
          x: this.position.x + Player.speed,
          y: this.position.y,
        };
        break;
    }
  }

  moveToDirection(world: World) {
    if (this.directionStack.length === 0) return;

    let lastDirection = this.directionStack[this.directionStack.length - 1];
    let nextPosition = this.calculeNextPosition(lastDirection);

    if (
      this.willCollide(world.walls, nextPosition) &&
      this.directionStack.length > 1
    ) {
      lastDirection = this.directionStack[this.directionStack.length - 2];
      nextPosition = this.calculeNextPosition(lastDirection);
    }

    console.log(lastDirection);

    if (
      this.activeDirections.has(lastDirection) &&
      !this.willCollide(world.walls, nextPosition)
    ) {
      switch (lastDirection) {
        case Direction.UP:
          console.log(
            "Colliding UP",
            this.willCollide(world.walls, {
              x: this.position.x,
              y: this.position.y - Player.speed,
            })
          );
          this.position.y -= Player.speed;
          break;
        case Direction.LEFT:
          this.position.x -= Player.speed;
          break;
        case Direction.DOWN:
          this.position.y += Player.speed;
          break;
        case Direction.RIGHT:
          this.position.x += Player.speed;
          break;
      }
    }
  }
}
