import { AvailableTypes, WallsTypes, wallsTypesMap } from "../common/types";

export function isWallsType(value: AvailableTypes): value is WallsTypes {
  return Object.values(wallsTypesMap).includes(value as WallsTypes);
}
