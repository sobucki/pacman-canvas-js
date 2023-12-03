import {
  DynamicPositionBooleanMap,
  MapType,
  Offset,
  Position,
} from "../../../common/types";
import { isWallsType } from "../../../utils/util";
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

  offsets: Offset[] = [
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
    const wallsAround = this.getNeighboringWalls(index.x, index.y, map);

    this.image = SelectorImageController.createImageByWallPosition(wallsAround);
  }

  private isPositionValid(x: number, y: number, map: MapType): boolean {
    return x >= 0 && x < map.length && y >= 0 && y < map[x].length;
  }

  private getNeighboringWalls(
    x: number,
    y: number,
    map: MapType
  ): DynamicPositionBooleanMap {
    let details: DynamicPositionBooleanMap = {};

    this.offsets.forEach(({ name, dx, dy }) => {
      const newX = x + dx;
      const newY = y + dy;

      if (
        this.isPositionValid(newX, newY, map) &&
        isWallsType(map[newX][newY])
      ) {
        details[name] = true;
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
