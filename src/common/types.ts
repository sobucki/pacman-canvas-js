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
