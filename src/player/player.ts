import { Direction, Position } from "../common/types";

type PlayerProps = {
  position: Position;
  velocity: Position;
  context: CanvasRenderingContext2D;
};

type ActiveDirections = {
  [Property in Direction]: boolean;
} & {
  stackKeys: Array<Direction>;
};

export class Player {
  static radiusSize = 15;
  position: Position;
  velocity: Position;
  radius: number;
  context: CanvasRenderingContext2D;

  currentDirection: ActiveDirections;

  constructor({ position, velocity, context }: PlayerProps) {
    this.position = position;
    this.velocity = velocity;
    this.radius = Player.radiusSize;
    this.currentDirection = {
      DOWN: false,
      LEFT: false,
      RIGHT: false,
      UP: false,
      stackKeys: [],
    };

    if (context === null) throw new Error("Context 2D not found");

    this.context = context as CanvasRenderingContext2D;

    this.initializePlayerController();
  }

  private initializePlayerController() {
    addEventListener("keydown", ({ key }) => this.selectMove(key, true));
    addEventListener("keyup", ({ key }) => this.selectMove(key, false));
  }

  private addToStack(direction: Direction) {
    if (!this.currentDirection.stackKeys?.includes(direction))
      this.currentDirection.stackKeys?.push(direction);
  }

  private removeOfStack(direction: Direction) {
    if (this.currentDirection.stackKeys?.includes(direction))
      this.currentDirection.stackKeys = this.currentDirection.stackKeys.filter(
        (value) => value !== direction
      );
  }

  private selectMove(key: string, active: boolean) {
    switch (key.toLocaleLowerCase()) {
      case "w":
        this.currentDirection[Direction.UP] = active;
        active
          ? this.addToStack(Direction.UP)
          : this.removeOfStack(Direction.UP);
        break;
      case "a":
        this.currentDirection[Direction.LEFT] = active;
        active
          ? this.addToStack(Direction.LEFT)
          : this.removeOfStack(Direction.LEFT);
        break;
      case "s":
        this.currentDirection[Direction.DOWN] = active;
        active
          ? this.addToStack(Direction.DOWN)
          : this.removeOfStack(Direction.DOWN);
        break;
      case "d":
        this.currentDirection[Direction.RIGHT] = active;
        active
          ? this.addToStack(Direction.RIGHT)
          : this.removeOfStack(Direction.RIGHT);
        break;

      default:
        break;
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
    const lastDirection =
      this.currentDirection.stackKeys[
        this.currentDirection.stackKeys.length - 1
      ] || undefined;
    if (this.currentDirection.UP && lastDirection === Direction.UP)
      this.position.y += -5;
    if (this.currentDirection.LEFT && lastDirection === Direction.LEFT)
      this.position.x += -5;
    if (this.currentDirection.DOWN && lastDirection === Direction.DOWN)
      this.position.y += 5;
    if (this.currentDirection.RIGHT && lastDirection === Direction.RIGHT)
      this.position.x += 5;
  }
}
