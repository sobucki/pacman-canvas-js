import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  vitest,
} from "vitest";
import { InputHandler } from "../input-handler";
import { Direction } from "../../../../common/types";

/**
 * @vitest-environment jsdom
 */
describe("InputHandler", () => {
  let inputHandler: InputHandler;

  beforeEach(() => {
    inputHandler = new InputHandler();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with empty activeDirections and directionStack", () => {
    expect(inputHandler.activeDirections.size).toBe(0);
    expect(inputHandler.directionStack).toEqual([]);
  });

  it.only("should add direction on keydown", async () => {
    const keydownEvent = new KeyboardEvent("keydown", { key: "w" });
    dispatchEvent(keydownEvent);

    expect(inputHandler.activeDirections.has(Direction.UP)).toBe(true);
    expect(inputHandler.directionStack).toContain(Direction.UP);
  });

  it("should remove direction on keyup", () => {
    const keydownEvent = new KeyboardEvent("keydown", { key: "w" });
    const keyupEvent = new KeyboardEvent("keyup", { key: "w" });
    document.dispatchEvent(keydownEvent);
    document.dispatchEvent(keyupEvent);
    expect(inputHandler.activeDirections.has(Direction.UP)).toBe(false);
    expect(inputHandler.directionStack).not.toContain(Direction.UP);
  });

  it("should map keys to correct directions", () => {
    expect(inputHandler["keyToDirection"]("w")).toBe(Direction.UP);
    expect(inputHandler["keyToDirection"]("a")).toBe(Direction.LEFT);
    expect(inputHandler["keyToDirection"]("s")).toBe(Direction.DOWN);
    expect(inputHandler["keyToDirection"]("d")).toBe(Direction.RIGHT);
    expect(inputHandler["keyToDirection"]("x")).toBeNull();
  });
});
