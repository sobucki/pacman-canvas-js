import { MapType, Position } from "../../../common/types";
import { isWallsType } from "../../../utils/util";
import { PositionDetails } from "../../game";
import { SelectorImageController } from "./selector-image-controller";

type BoundaryProps = {
  width?: number;
  height?: number;
  context: CanvasRenderingContext2D;
  index: Position;
  map: MapType;
};

export class Wall {
  position: Position;
  currentContext: CanvasRenderingContext2D;
  image?: HTMLImageElement;

  static WIDTH = 30;
  static HEIGHT = 30;

  offsets = [
    { name: "above", dx: -1, dy: 0 },
    { name: "below", dx: 1, dy: 0 },
    { name: "left", dx: 0, dy: -1 },
    { name: "right", dx: 0, dy: 1 },
    { name: "topLeft", dx: -1, dy: -1 },
    { name: "topRight", dx: -1, dy: 1 },
    { name: "bottomLeft", dx: 1, dy: -1 },
    { name: "bottomRight", dx: 1, dy: 1 },
  ];

  constructor({ context, index, map }: BoundaryProps) {
    this.position = {
      x: Wall.WIDTH * index.y,
      y: Wall.HEIGHT * index.x,
    };
    this.currentContext = context;
    const positionDetails = this.getNeighboringWalls(index.x, index.y, map);

    this.image =
      SelectorImageController.createImageByWallPosition(positionDetails);
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

  private isPositionValid(x: number, y: number, map: MapType): boolean {
    return x >= 0 && x < map.length && y >= 0 && y < map[x].length;
  }

  private getNeighboringWalls(
    x: number,
    y: number,
    map: MapType
  ): PositionDetails {
    let details: PositionDetails = { current: map[x][y] };

    this.offsets.forEach(({ name, dx, dy }) => {
      const newX = x + dx;
      const newY = y + dy;

      if (
        this.isPositionValid(newX, newY, map) &&
        isWallsType(map[newX][newY])
      ) {
        details[name] = map[newX][newY];
      }
    });

    return details;
  }

  draw() {
    this.currentContext.fillStyle = "blue";
    this.currentContext.fillRect(
      this.position.x,
      this.position.y,
      Wall.WIDTH,
      Wall.HEIGHT
    );
    if (this.image)
      this.currentContext.drawImage(
        this.image,
        0,
        0,
        this.image.width,
        this.image.height,
        this.position.x,
        this.position.y,
        Wall.WIDTH,
        Wall.HEIGHT
      );
  }
}
