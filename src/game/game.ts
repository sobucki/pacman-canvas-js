import { MapType, World } from "../common/types";
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
          x: Wall.WIDTH + Wall.WIDTH / 2,
          y: Wall.HEIGHT + Wall.HEIGHT / 2,
        },
      }),
    };
  }

  public addMap(map: MapType) {
    this.map = map;

    map.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (isWallsType(cell)) {
          this.world.walls.push(
            new Wall({
              context: this.context as CanvasRenderingContext2D,
              index: {
                y: colIndex,
                x: rowIndex,
              },
              map,
            })
          );
        }
      });
    });
  }

  public animate() {
    requestAnimationFrame(() => this.animate());
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.world.player.update(this.world);
    this.world.walls.forEach((boundary) => boundary.draw());
  }
}
