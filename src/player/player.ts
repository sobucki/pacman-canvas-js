import { Direction, Position } from "../common/types";

type PlayerProps = {
  position: Position;
  context: CanvasRenderingContext2D;
};

export class Player {
  static radiusSize = 15;
  static speed = 5;
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

  update() {
    this.draw();
    this.moveToDirection();
  }

  moveToDirection() {
    if (this.directionStack.length === 0) return;

    const lastDirection = this.directionStack[this.directionStack.length - 1];

    if (this.activeDirections.has(lastDirection)) {
      switch (lastDirection) {
        case Direction.UP:
          this.position.y -= 5;
          break;
        case Direction.LEFT:
          this.position.x -= 5;
          break;
        case Direction.DOWN:
          this.position.y += 5;
          break;
        case Direction.RIGHT:
          this.position.x += 5;
          break;
      }
    }
  }
}
