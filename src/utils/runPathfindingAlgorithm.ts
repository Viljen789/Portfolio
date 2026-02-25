import type { AlgorithmType, GridType, TileType } from "./types.ts";
import { bfs } from "../lib/algorithms/pathfinding/bfs.ts";
import { dfs } from "../lib/algorithms/pathfinding/dfs.ts";
import { djikstra } from "../lib/algorithms/pathfinding/djikstra.ts";
import { aStar } from "../lib/algorithms/pathfinding/aStar.ts";
import { greedyBfs } from "../lib/algorithms/pathfinding/greedyBfs.ts";

import { bidirectionalBfs } from "../lib/algorithms/pathfinding/bidirectionalBfs.ts";

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
    case "DFS":
      return dfs(grid, startTile, endTile);
    case "DJIKSTRA":
      return djikstra(grid, startTile, endTile);
    case "A_STAR":
      return aStar(grid, startTile, endTile);
    case "GREEDY_BFS":
      return greedyBfs(grid, startTile, endTile);
    case "BIDIRECTIONAL_BFS":
      return bidirectionalBfs(grid, startTile, endTile);
    default:
      return bfs(grid, startTile, endTile);
  }
};
