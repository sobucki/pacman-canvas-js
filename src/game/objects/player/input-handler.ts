import { Direction } from "../../../common/types";

export class InputHandler {
  activeDirections: Set<Direction>;
  directionStack: Array<Direction>;

  constructor() {
    this.activeDirections = new Set();
    this.directionStack = [];
    this.initialize();
  }

  private initialize() {
    addEventListener("keydown", ({ key }) => this.selectMove(key, true));
    addEventListener("keyup", ({ key }) => this.selectMove(key, false));
  }

  private selectMove(key: string, active: boolean) {
    const direction = this.keyToDirection(key);
    if (!direction) return;

    if (active) {
      this.activeDirections.add(direction);
      if (!this.directionStack.includes(direction)) {
        this.directionStack.push(direction);
      }
    } else {
      this.activeDirections.delete(direction);
      this.directionStack = this.directionStack.filter((d) => d !== direction);
    }
  }

  private keyToDirection(key: string): Direction | null {
    switch (key.toLowerCase()) {
      case "w":
        return Direction.UP;
      case "a":
        return Direction.LEFT;
      case "s":
        return Direction.DOWN;
      case "d":
        return Direction.RIGHT;
      default:
        return null;
    }
  }
}
