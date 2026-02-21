import type { GridType, SpeedType } from "./types.ts";
import { SPEEDS, TILE_STYLE } from "./constants.ts";
import { sleep } from "./helpers.ts";

const updateWalls = async (
  grid: GridType,
  row: number,
  col: number,
  speed: SpeedType,
) => {
  grid[row][col].isWall = false;
  document.getElementById(`${row}-${col}`)!.className = TILE_STYLE;
  await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5);
};

export const destroyWall = async (
  grid: GridType,
  row: number,
  col: number,
  isRight: number,
  speed: SpeedType,
) => {
  if (isRight && grid[row][col + 1]) {
    await updateWalls(grid, row, col + 1, speed);
  } else if (grid[row + 1][col]) {
    await updateWalls(grid, row + 1, col, speed);
  } else {
    await updateWalls(grid, row, col, speed);
  }
};
