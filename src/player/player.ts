import { Position } from "../common/types";

type PlayerProps = {
  position: Position;
  velocity: number;
  context: CanvasRenderingContext2D;
};

export class Player {
  position: Position;
  velocity: number;
  radius: number;
  context: CanvasRenderingContext2D;
  static radiusSize = 15;
  constructor({ position, velocity, context }: PlayerProps) {
    this.position = position;
    this.velocity = velocity;
    this.radius = Player.radiusSize;

    if (context === null) throw new Error("Context 2D not found");

    this.context = context as CanvasRenderingContext2D;
  }

  draw() {
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
}
