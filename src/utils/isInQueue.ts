import type { TileType } from "./types.ts";
import { isEqual } from "./helpers.ts";

export const isInQueue = (tile: TileType, queue: TileType[]) => {
  for (const qTile of queue) {
    if (isEqual(qTile, tile)) return true;
  }
  return false;
};
