import type { AlgorithmType, GridType, TileType } from "./types.ts";
import { bfs } from "../lib/algorithms/pathfinding/bfs.ts";

export const runPathfindingAlgorithm = ({
  algorithm,
  grid,
  startTile,
  endTile,
}: {
  algorithm: AlgorithmType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
}) => {
  switch (algorithm) {
    case "BFS":
      return bfs(grid, startTile, endTile);
    default:
      return bfs(grid, startTile, endTile);
  }
};
