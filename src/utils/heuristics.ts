import type { GridType, TileType } from "./types.ts";
import { MAX_COLS, MAX_ROWS } from "./constants.ts";

const retrieveHeuristicCost = (currentTile: TileType, endTile: TileType) => {
  const manhattanDistance = 1;
  const row = Math.abs(currentTile.row - endTile.row);
  const col = Math.abs(currentTile.col - endTile.col);
  return manhattanDistance * (row + col);
};

export const initHeuristicCost = (grid: GridType, endTile: TileType) => {
  const heuristicCost = [];
  for (let row = 0; row < MAX_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < MAX_COLS; col++) {
      currentRow.push(retrieveHeuristicCost(grid[row][col], endTile));
    }
    heuristicCost.push(currentRow);
  }
  return heuristicCost;
};

export const initFunctionCost = () => {
  const functionCost = [];
  for (let row = 0; row < MAX_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < MAX_COLS; col++) {
      currentRow.push(Infinity);
    }
    functionCost.push(currentRow);
  }
  return functionCost;
};
