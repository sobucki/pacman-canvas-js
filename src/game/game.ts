import { MapType, World, WallsTypes } from "../common/types";
import { isWallsType } from "../utils/util";
import { Player } from "./objects/player";
import { Wall } from "./objects/wall";

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

    this.map?.forEach((row, rowIndex) =>
      row.forEach((cell, cellIndex) => {
        if (isWallsType(cell)) {
          this.world.walls.push(
            new Wall({
              context: this.context as CanvasRenderingContext2D,
              position: {
                x: Wall.width * cellIndex,
                y: Wall.height * rowIndex,
              },
              type: cell,
            })
          );
        }
        // console.log(Object.values(WallsTypes));
        switch (cell) {
          case "╔":
            break;

          default:
            break;
        }
      })
    );
  }

  public animate() {
    requestAnimationFrame(() => this.animate());
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.world.player.update(this.world);
    this.world.walls.forEach((boundary) => boundary.draw());
  }
}
