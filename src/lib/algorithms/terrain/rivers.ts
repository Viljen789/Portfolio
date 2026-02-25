import type { GridType, TileType } from "../../../utils/types.ts";
import { MAX_COLS, MAX_ROWS } from "../../../utils/constants.ts";
import { getRandInt } from "../../../utils/helpers.ts";
import { isStartOrEnd } from "./helpers.ts";

/**
 * Creates "rivers" of high-cost terrain that Dijkstra needs to navigate around
 * or find the cheapest crossing point.
 */
export const generateRivers = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      grid[row][col].weight = 1;
      grid[row][col].isWall = false;
    }
  }

  const numRivers = getRandInt(2, 4);

  for (let r = 0; r < numRivers; r++) {
    const riverCol = Math.floor((MAX_COLS / (numRivers + 1)) * (r + 1));
    const amplitude = getRandInt(3, 6);
    const frequency = getRandInt(8, 15) / 100;
    const riverWidth = getRandInt(2, 4);
    const riverWeight = getRandInt(5, 9);

    const bridgePositions = [
      getRandInt(5, MAX_ROWS / 3),
      getRandInt(MAX_ROWS / 3, (2 * MAX_ROWS) / 3),
      getRandInt((2 * MAX_ROWS) / 3, MAX_ROWS - 5),
    ];

    for (let row = 0; row < MAX_ROWS; row++) {
      const offset = Math.floor(Math.sin(row * frequency) * amplitude);

      const isBridge = bridgePositions.some(
        (bridgeRow) => Math.abs(row - bridgeRow) <= 1,
      );

      for (let w = -riverWidth; w <= riverWidth; w++) {
        const col = riverCol + offset + w;
        if (col >= 0 && col < MAX_COLS) {
          if (isStartOrEnd(row, col, startTile, endTile)) continue;

          if (isBridge) {
            grid[row][col].weight = 1;
          } else {
            const distFromCenter = Math.abs(w);
            grid[row][col].weight = Math.max(
              grid[row][col].weight,
              riverWeight - distFromCenter,
            );
          }
        }
      }
    }
  }
};
