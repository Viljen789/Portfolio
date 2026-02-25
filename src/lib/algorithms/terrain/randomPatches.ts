import type { GridType, TileType } from "../../../utils/types.ts";
import { MAX_COLS, MAX_ROWS } from "../../../utils/constants.ts";
import { getRandInt } from "../../../utils/helpers.ts";
import { isStartOrEnd } from "./helpers.ts";

export const generateRandomPatches = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) => {
  const numPatches = getRandInt(8, 15);
  const patches: {
    row: number;
    col: number;
    weight: number;
    radius: number;
  }[] = [];

  for (let i = 0; i < numPatches; i++) {
    const patchRow = getRandInt(2, MAX_ROWS - 3);
    const patchCol = getRandInt(2, MAX_COLS - 3);
    const patchWeight = getRandInt(3, 9);
    const patchRadius = getRandInt(3, 8);
    patches.push({
      row: patchRow,
      col: patchCol,
      weight: patchWeight,
      radius: patchRadius,
    });
  }

  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      if (isStartOrEnd(row, col, startTile, endTile)) continue;

      let maxWeight = 1;
      for (const patch of patches) {
        const distance = Math.sqrt(
          Math.pow(row - patch.row, 2) + Math.pow(col - patch.col, 2),
        );
        if (distance < patch.radius) {
          const weight = Math.max(
            1,
            Math.floor(patch.weight * (1 - distance / patch.radius)),
          );
          maxWeight = Math.max(maxWeight, weight);
        }
      }
      grid[row][col].weight = maxWeight;
      grid[row][col].isWall = false;
    }
  }
};
