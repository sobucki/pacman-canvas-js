import { Player } from "../game/objects/player";
import { Wall } from "../game/objects/wall";

export type Position = {
  x: number;
  y: number;
};

export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export type World = {
  player: Player;
  walls: Array<Wall>;
};

export const wallsTypesMap = {
  cornerTopLeft: "╔",
  cornerTopRight: "╗",
  cornerBottomLeft: "╚",
  cornerBottomRight: "╝",
  horizontalLineTop: "▁",
  horizontalLineBottom: "▔",
  verticalLineRight: "▕",
  verticalLineLeft: "▏",
  verticalLine: "║",
  horizontalLine: "═",
  topTrunk: "╤",
  bottomTrunk: "╧",
  leftTrunk: "╟",
  rightTrunk: "╢",
  square: "□",
} as const;

export type WallsTypes = (typeof wallsTypesMap)[keyof typeof wallsTypesMap];

// export type WallsTypes = "╔" | "╗" | "╚" | "╝" | "▁" | "▔" | "▕" | "▏" | "║";
export type SpaceType = " ";

export type AvailableTypes = WallsTypes | SpaceType;
export type MapType = AvailableTypes[][];
