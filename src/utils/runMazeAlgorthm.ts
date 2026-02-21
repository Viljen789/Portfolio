import type { GridType, MazeType, SpeedType, TileType } from "./types.ts";
import { binaryTree } from "../lib/algorithms/maze/binaryTree.ts";
import { constructBorder } from "./constructBorder.ts";

export const runMazeAlgorthm = async ({
  maze,
  grid,
  startTile,
  endTile,
  setIsDisabled,
  speed,
}: {
  maze: MazeType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  setIsDisabled: (isDisabled: boolean) => void;
  speed: SpeedType;
}) => {
  if (maze == "BINARY_TREE") {
    await binaryTree({ grid, startTile, endTile, setIsDisabled, speed });
  } else if (maze == "RECURSIVE_DIVISION") {
    await constructBorder(grid, startTile, endTile);
  }
};
