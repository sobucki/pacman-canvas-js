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

export type PositionAround =
  | "above"
  | "below"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

export type Offset = {
  name: PositionAround;
  dx: number;
  dy: number;
};

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
  point: "*",
} as const;

export type WallsTypes = (typeof wallsTypesMap)[keyof typeof wallsTypesMap];

export type SpaceType = " ";

export type AvailableTypes = WallsTypes | SpaceType;
export type MapType = AvailableTypes[][];

export type DynamicPositionBooleanMap = {
  [key in PositionAround]?: boolean;
};
