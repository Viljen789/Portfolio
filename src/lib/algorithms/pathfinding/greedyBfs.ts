import type { GridType, TileType } from "../../../utils/types.ts";
import { initHeuristicCost } from "../../../utils/heuristics.ts";
import { getPath, isEqual } from "../../../utils/helpers.ts";
import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors.ts";

export const greedyBfs = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) => {
  const traversedTiles: TileType[] = [];
  const heuristicCost = initHeuristicCost(grid, endTile);

  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isTraversed = true;
  const unTraversedTiles: TileType[] = [base];

  while (unTraversedTiles.length) {
    unTraversedTiles.sort((a, b) => {
      return heuristicCost[a.row][a.col] - heuristicCost[b.row][b.col];
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
        if (!neighbor.isTraversed && !unTraversedTiles.includes(neighbor)) {
          neighbor.distance = currentTile.distance + 1;
          neighbor.parent = currentTile;
          unTraversedTiles.push(neighbor);
        }
      }
    }
  }
  const path = getPath(grid, endTile);
  return { traversedTiles, path };
};
