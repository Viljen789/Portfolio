import { binaryTree } from "../lib/algorithms/maze/binaryTree";
import { MAX_COLS, MAX_ROWS, SPEEDS } from "./constants";
import { constructBorder } from "./constructBorder";
import type {
  AlgorithmType,
  GridType,
  MazeType,
  SpeedType,
  TileType,
} from "./types.ts";
import { recursiveDivision } from "../lib/algorithms/maze/recursiveDivision.ts";
import { getRandInt } from "./helpers.ts";

export const runMazeAlgorithm = async ({
  maze,
  grid,
  startTile,
  endTile,
  setIsDisabled,
  speed,
  algorithm,
}: {
  maze: MazeType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  setIsDisabled: (isDisabled: boolean) => void;
  speed: SpeedType;
  algorithm: AlgorithmType;
}) => {
  if (maze == "BINARY_TREE") {
    await binaryTree({ grid, startTile, endTile, setIsDisabled, speed });
  } else if (maze === "RECURSIVE_DIVISION") {
    const currentSpeed = SPEEDS.find((s) => s.value === speed)!.value ?? 2;
    await constructBorder(grid, startTile, endTile);
    await recursiveDivision({
      grid,
      startTile,
      endTile,
      row: 1,
      col: 1,
      height: Math.floor((MAX_ROWS - 1) / 2),
      width: Math.floor((MAX_COLS - 1) / 2),
      setIsDisabled,
      speed,
    });
    setTimeout(() => {
      setIsDisabled(false);
    }, 800 * currentSpeed);
  }

  if (algorithm === "DJIKSTRA" || algorithm === "A_STAR") {
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        if (Math.random() < 0.2 && !grid[row][col].isWall) {
          grid[row][col].weight = getRandInt(1, 10);
        }
      }
    }
  }
};
