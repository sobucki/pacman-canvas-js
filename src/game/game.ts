import { MapType, World, WallsTypes } from "../common/types";
import { isWallsType } from "../utils/util";
import { Player } from "./objects/player";
import { Wall } from "./objects/wall";

export interface PositionDetails {
  current: string;
  [key: string]: string | undefined;
}

// Deslocamentos para verificar cada direção e diagonal
const offsets = [
  { name: "above", dx: -1, dy: 0 },
  { name: "below", dx: 1, dy: 0 },
  { name: "left", dx: 0, dy: -1 },
  { name: "right", dx: 0, dy: 1 },
  { name: "topLeft", dx: -1, dy: -1 },
  { name: "topRight", dx: -1, dy: 1 },
  { name: "bottomLeft", dx: 1, dy: -1 },
  { name: "bottomRight", dx: 1, dy: 1 },
];

export class Game {
  context: CanvasRenderingContext2D | undefined;
  map: MapType | undefined;
  canvas: HTMLCanvasElement;
  world: World;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;

    const context2D = this.canvas && this.canvas.getContext("2d");

    if (context2D === null) throw new Error("Context 2D not found");

    this.context = context2D;

    this.world = {
      walls: [],
      player: new Player({
        context: this.context,
        position: {
          x: Wall.width + Wall.width / 2,
          y: Wall.height + Wall.height / 2,
        },
      }),
    };
  }

  public addMap(map: MapType) {
    this.map = map;

    map.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (isWallsType(cell)) {
          const positionDetails = this.getNeighboringWalls(
            rowIndex,
            colIndex,
            map
          );

          this.world.walls.push(
            new Wall({
              context: this.context as CanvasRenderingContext2D,
              position: {
                x: Wall.width * colIndex,
                y: Wall.height * rowIndex,
              },
              type: cell,
              positionDetail: positionDetails,
            })
          );
        }
      });
    });
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

    offsets.forEach(({ name, dx, dy }) => {
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

  public animate() {
    requestAnimationFrame(() => this.animate());
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.world.player.update(this.world);
    this.world.walls.forEach((boundary) => boundary.draw());
  }
}
