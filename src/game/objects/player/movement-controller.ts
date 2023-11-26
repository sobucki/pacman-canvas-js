import { Direction, Position } from "../../../common/types";

export class MovementController {
  static calculeNextPosition(
    currentPosition: Position,
    direction: Direction,
    speed: number
  ): Position {
    switch (direction) {
      case Direction.UP:
        return { x: currentPosition.x, y: currentPosition.y - speed };
      case Direction.LEFT:
        return { x: currentPosition.x - speed, y: currentPosition.y };
      case Direction.DOWN:
        return { x: currentPosition.x, y: currentPosition.y + speed };
      case Direction.RIGHT:
        return { x: currentPosition.x + speed, y: currentPosition.y };
    }
  }
}
