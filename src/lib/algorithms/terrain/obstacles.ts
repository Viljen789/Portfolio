import type { GridType, TileType } from "../../../utils/types.ts";
import { MAX_COLS, MAX_ROWS } from "../../../utils/constants.ts";
import { getRandInt } from "../../../utils/helpers.ts";
import { isStartOrEnd } from "./helpers.ts";

export const generateObstacles = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) => {
  const middleCol = Math.floor(MAX_COLS / 2);

  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      if (isStartOrEnd(row, col, startTile, endTile)) continue;

      if (col >= middleCol - 5 && col <= middleCol + 5) {
        if (row < MAX_ROWS / 3 || row > (2 * MAX_ROWS) / 3) {
          grid[row][col].weight = getRandInt(6, 9);
        } else {
          grid[row][col].weight = 1;
        }
      } else {
        grid[row][col].weight = getRandInt(1, 3);
      }
      grid[row][col].isWall = false;
    }
  }
};
