import type { GridType, TileType } from "./types.ts";
import { MAX_COLS, MAX_ROWS } from "./constants.ts";

const createRow = (row: number, startTile: TileType, endTile: TileType) => {
  const currentRow = [];
  for (let col = 0; col < MAX_COLS; col++) {
    currentRow.push({
      row,
      col,
      isEnd: row === endTile.row && col === endTile.col,
      isWall: false,
      isPath: false,
      distance: Infinity,
      isStart: row === startTile.row && col === startTile.col,
      isTraversed: false,
      parent: null,
      weight: 1,
    });
  }
  return currentRow;
};

export const createGrid = (startTile: TileType, endTile: TileType) => {
  const grid: GridType = [];
  for (let row = 0; row < MAX_ROWS; row++) {
    grid.push(createRow(row, startTile, endTile));
  }
  return grid;
};
export const checkIfStartOrEnd = (row: number, col: number) => {
  return (
    (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2)
  );
};
export const createNewGrid = (grid: GridType, row: number, col: number) => {
  const newGrid = grid.slice();
  newGrid[row][col] = {
    ...newGrid[row][col],
    isWall: !newGrid[row][col].isWall,
    weight: 1,
  };
  return newGrid;
};

export const createNewGridWithWeight = (
  grid: GridType,
  row: number,
  col: number,
  weight: number,
) => {
  const newGrid = grid.slice();
  newGrid[row][col] = {
    ...newGrid[row][col],
    weight: newGrid[row][col].weight === weight ? 1 : weight,
    isWall: false,
  };
  return newGrid;
};

export const isEqual = (a: TileType, b: TileType) => {
  return a.row === b.row && a.col === b.col;
};
export const isRowColEqual = (row: number, col: number, tile: TileType) => {
  return row === tile.row && col === tile.col;
};
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getRandInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const dropFromQueue = (tile: TileType, queue: TileType[]) => {
  for (let i = 0; i < queue.length; i++) {
    if (isEqual(tile, queue[i])) {
      queue.splice(i, 1);
      break;
    }
  }
};
export const getPath = (grid: GridType, endTile: TileType) => {
  const path = [];
  let current = grid[endTile.row][endTile.col];
  while (current) {
    current.isPath = true;
    path.unshift(current);
    current = current.parent!;
  }
  return path;
};

export const cloneGrid = (grid: GridType) => {
  const newGrid: GridType = [];
  for (let row = 0; row < grid.length; row++) {
    const currentRow = [];
    for (let col = 0; col < grid[row].length; col++) {
      currentRow.push({ ...grid[row][col] });
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};
