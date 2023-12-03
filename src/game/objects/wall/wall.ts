import { Position, WallsTypes } from "../../../common/types";
import { PositionDetails } from "../../game";

type BoundaryProps = {
  position: Position;
  width?: number;
  height?: number;
  context: CanvasRenderingContext2D;
  type: WallsTypes;
  positionDetail: PositionDetails;
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

  constructor({ position, context, type, positionDetail }: BoundaryProps) {
    this.position = position;
    this.width = Wall.width;
    this.height = Wall.height;
    this.currentContext = context;
    this.type = type;
    const selectedImage = this.selectImageByPosition(positionDetail);
    const image = new Image();
    image.src = `img/${selectedImage}`;
    this.image = image;
  }

  selectImageByPosition(positionDetail: PositionDetails): string {
    const above = positionDetail["above"];
    const below = positionDetail["below"];
    const left = positionDetail["left"];
    const right = positionDetail["right"];

    if (!above && !below && !left && !right) return "block.png";

    if (!above && below && !left && right) return "pipeCorner1.png";
    if (!above && !below && left && !right) return "capRight.png";
    if (!above && !below && left && right) return "pipeHorizontal.png";
    if (!above && below && left && !right) return "pipeCorner2.png";
    if (above && !below && !left && right) return "pipeCorner4.png";
    if (above && !below && !left && !right) return "capBottom.png";
    if (!above && below && !left && !right) return "capTop.png";
    if (!above && !below && !left && right) return "capLeft.png";
    if (above && below && !left && !right) return "pipeVertical.png";
    if (above && below && !left && right) return "pipeConnectorRight.png";
    if (above && !below && left && !right) return "pipeCorner3.png";
    if (!above && below && left && right) return "pipeConnectorBottom.png";
    if (above && below && left && !right) return "pipeConnectorLeft.png";
    if (above && !below && left && right) return "pipeConnectorTop.png";

    return "pipeCross.png";
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
      this.image.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
