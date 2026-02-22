import type { GridType, TileType } from "../../../utils/types.ts";
import {
  initFunctionCost,
  initHeuristicCost,
} from "../../../utils/heuristics.ts";
import { dropFromQueue, getPath, isEqual } from "../../../utils/helpers.ts";
import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors.ts";

export const aStar = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) => {
  const traversedTiles: TileType[] = [];
  const heuristicCost = initHeuristicCost(grid, endTile);
  const functionCost = initFunctionCost();

  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isTraversed = true;
  functionCost[base.row][base.col] =
    base.distance + heuristicCost[base.row][base.col];
  const unTraversedTiles: TileType[] = [base];

  while (unTraversedTiles.length) {
    unTraversedTiles.sort((a, b) => {
      if (functionCost[a.row][a.col] === functionCost[b.row][b.col]) {
        return b.distance - a.distance;
      }
      return functionCost[a.row][a.col] - functionCost[b.row][b.col];
    });
    const currentTile = unTraversedTiles.shift()!;
    if (currentTile) {
      if (currentTile.isWall) continue;
      if (currentTile.distance === Infinity) break;
      currentTile.isTraversed = true;
      traversedTiles.push(currentTile);
      if (isEqual(currentTile, endTile)) break;
      const neighbors = getUntraversedNeighbors(grid, currentTile);
      for (const neighbor of neighbors) {
        const distanceToNeighbors = currentTile.distance + 1;
        if (distanceToNeighbors < neighbor.distance) {
          dropFromQueue(neighbor, unTraversedTiles);
          neighbor.distance = distanceToNeighbors;
          neighbor.parent = currentTile;
          functionCost[neighbor.row][neighbor.col] =
            neighbor.distance + heuristicCost[neighbor.row][neighbor.col];
          unTraversedTiles.push(neighbor);
        }
      }
    }
  }
  const path = getPath(grid, endTile);
  return { traversedTiles, path };
};
