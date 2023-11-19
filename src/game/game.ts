import { Boundary, drawBoundary } from "../boundary/boundary";
import { Player } from "../player/player";

export class Game {
  context: CanvasRenderingContext2D | undefined;
  map: string[][] | undefined;
  boundaries: Boundary[];
  player: Player;

  constructor() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const context2D = canvas && canvas.getContext("2d");

    if (context2D === null) throw new Error("Context 2D not found");

    this.context = context2D;

    this.boundaries = [];
    this.player = new Player({
      context: this.context,
      position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
      },
      velocity: 0,
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

  draw() {
    this.boundaries.forEach((boundary) => boundary.draw());
    this.player.draw();
  }
}
