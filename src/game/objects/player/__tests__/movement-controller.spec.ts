import { describe, it, expect } from "vitest";
import { MovementController } from "../movement-controller";
import { Direction } from "../../../../common/types";

describe("MovementController", () => {
  it("calculates next position moving up", () => {
    expect(
      MovementController.calculeNextPosition({ x: 5, y: 5 }, Direction.UP, 1)
    ).toEqual({ x: 5, y: 4 });
  });

  it("calculates next position moving left", () => {
    expect(
      MovementController.calculeNextPosition({ x: 5, y: 5 }, Direction.LEFT, 1)
    ).toEqual({ x: 4, y: 5 });
  });

  it("calculates next position moving down", () => {
    expect(
      MovementController.calculeNextPosition({ x: 5, y: 5 }, Direction.DOWN, 1)
    ).toEqual({ x: 5, y: 6 });
  });

  it("calculates next position moving right", () => {
    expect(
      MovementController.calculeNextPosition({ x: 5, y: 5 }, Direction.RIGHT, 1)
    ).toEqual({ x: 6, y: 5 });
  });

  it("handles different speeds", () => {
    expect(
      MovementController.calculeNextPosition({ x: 10, y: 10 }, Direction.UP, 2)
    ).toEqual({ x: 10, y: 8 });
    expect(
      MovementController.calculeNextPosition(
        { x: 10, y: 10 },
        Direction.RIGHT,
        3
      )
    ).toEqual({ x: 13, y: 10 });
  });

  it("handles various initial positions", () => {
    expect(
      MovementController.calculeNextPosition({ x: 0, y: 0 }, Direction.LEFT, 1)
    ).toEqual({ x: -1, y: 0 });
    expect(
      MovementController.calculeNextPosition({ x: 3, y: 3 }, Direction.DOWN, 2)
    ).toEqual({ x: 3, y: 5 });
  });
});
