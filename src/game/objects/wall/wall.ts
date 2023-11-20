import { Position } from "../../../common/types";

type BoundaryProps = {
  position: Position;
  width?: number;
  height?: number;
  context: CanvasRenderingContext2D;
};

export class Wall {
  position: Position;
  width: number;
  height: number;
  currentContext: CanvasRenderingContext2D;

  static width = 30;
  static height = 30;

  constructor({ position, context }: BoundaryProps) {
    this.position = position;
    this.width = Wall.width;
    this.height = Wall.height;
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
  new Wall({
    context,
    position: {
      x,
      y,
    },
  }).draw();
};
