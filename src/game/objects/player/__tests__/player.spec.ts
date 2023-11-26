import { beforeEach, describe, expect, it, vi } from "vitest";
import { Player } from "..";
import { Position, World } from "../../../../common/types";
import { Canvas, CanvasRenderingContext2D, createCanvas } from "canvas";

/**
 * @vitest-environment jsdom
 */

describe("Player tests", () => {
  let player: Player;
  let mockCanvas: Canvas;
  let mockContext: CanvasRenderingContext2D;
  let position: Position;
  let world: World;

  beforeEach(() => {
    position = { x: 50, y: 50 };
    mockCanvas = createCanvas(200, 200);
    mockContext = mockCanvas.getContext("2d");
    world = { walls: [], player }; // Mock the world with empty walls
    player = new Player({ position, context: mockContext as any });
  });

  it("should instantiate correctly", () => {
    expect(player).toBeInstanceOf(Player);
    expect(player.position).toEqual(position);
    expect(player.context).toBe(mockContext);
  });
});
