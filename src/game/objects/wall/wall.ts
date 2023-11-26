import { Position, WallsTypes } from "../../../common/types";

type BoundaryProps = {
  position: Position;
  width?: number;
  height?: number;
  context: CanvasRenderingContext2D;
  type: WallsTypes;
};

export class Wall {
  position: Position;
  width: number;
  height: number;
  currentContext: CanvasRenderingContext2D;
  image: HTMLImageElement;
  type: WallsTypes;

  static width = 30;
  static height = 30;

  constructor({ position, context, type }: BoundaryProps) {
    this.position = position;
    this.width = Wall.width;
    this.height = Wall.height;
    this.currentContext = context;
    this.type = type;
    const selectedImage = this.selectImage(type);
    const image = new Image();
    image.src = `img/${selectedImage}`;
    this.image = image;
  }

  selectImage(type: WallsTypes): string {
    switch (type) {
      case "╔":
        return "pipeCorner1.png";

      case "╗":
        return "pipeCorner2.png";

      case "╝":
        return "pipeCorner3.png";

      case "╚":
        return "pipeCorner4.png";

      case "▏":
        return "pipeConnectorRight.png";

      case "▕":
        return "pipeConnectorLeft.png";
      case "▔":
        return "pipeConnectorDownwards.png";
      case "▁":
        return "pipeConnectorTop.png";
      case "║":
        return "pipeVertical.png";
      case "═":
        return "pipeHorizontal.png";
      case "╤":
        return "capTop.png";
      case "╧":
        return "capBottom.png";
      case "╟":
        return "capLeft.png";
      case "╢":
        return "capRight.png";
      case "□":
        return "block.png";
    }
    return "pipeCross.png";
  }

  draw() {
    this.currentContext.fillStyle = "blue";
    this.currentContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.currentContext.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height, // source rectangle
      this.position.x,
      this.position.y,
      this.width,
      this.height
    ); // destination rectangle
    // this.currentContext.drawImage(this.image, this.position.x, this.position.y);
  }
}

// export const createWall = (
//   { x, y }: Position,
//   context: CanvasRenderingContext2D
// ) => {
//   new Wall({
//     context,
//     position: {
//       x,
//       y,
//     },
//   });
// };
