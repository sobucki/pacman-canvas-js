import { Boundary } from "../boundary/boundary";
import { Player } from "../player/player";

export class Game {
  context: CanvasRenderingContext2D | undefined;
  map: string[][] | undefined;
  boundaries: Boundary[];
  player: Player;
  canvas: HTMLCanvasElement;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;

    const context2D = this.canvas && this.canvas.getContext("2d");

    if (context2D === null) throw new Error("Context 2D not found");

    this.context = context2D;

    this.boundaries = [];
    this.player = new Player({
      context: this.context,
      position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
      },
    });
  }

  public addMap(map: string[][]) {
    this.map = map;

    this.map?.forEach((row, rowIndex) =>
      row.forEach((boundary, boundaryIndex) => {
        switch (boundary) {
          case "-":
            this.boundaries.push(
              new Boundary({
                context: this.context as CanvasRenderingContext2D,
                position: {
                  x: Boundary.width * boundaryIndex,
                  y: Boundary.height * rowIndex,
                },
              })
            );
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
    this.boundaries.forEach((boundary) => boundary.draw());
    this.player.update();
  }
}
