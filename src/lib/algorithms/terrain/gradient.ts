import type { GridType, TileType } from "../../../utils/types.ts";
import { MAX_COLS, MAX_ROWS } from "../../../utils/constants.ts";
import { isStartOrEnd } from "./helpers.ts";

export const generateGradient = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) => {
  const centerRow = Math.floor(MAX_ROWS / 2);

  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      if (isStartOrEnd(row, col, startTile, endTile)) continue;

      const distanceFromCenter = Math.abs(row - centerRow);

      grid[row][col].weight = Math.min(
        9,
        1 + Math.floor(distanceFromCenter / 3),
      );
      grid[row][col].isWall = false;
    }
  }
};
