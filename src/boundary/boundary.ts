import { Position } from "../common/types";

type BoundaryProps = {
  position: Position;
  width?: number;
  height?: number;
  context: CanvasRenderingContext2D;
};

export class Boundary {
  position: Position;
  width: number;
  height: number;
  currentContext: CanvasRenderingContext2D;

  static width = 40;
  static height = 40;

  constructor({ position, context }: BoundaryProps) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.currentContext = context;
  }

  draw() {
    this.currentContext.fillStyle = "blue";
    this.currentContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export const drawBoundary = (
  { x, y }: Position,
  context: CanvasRenderingContext2D
) => {
  new Boundary({
    context,
    position: {
      x,
      y,
    },
  }).draw();
};
