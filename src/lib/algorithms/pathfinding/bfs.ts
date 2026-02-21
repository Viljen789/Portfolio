import type { GridType, TileType } from "../../../utils/types.ts";
import { isEqual } from "../../../utils/helpers.ts";
import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors.ts";
import { isInQueue } from "../../../utils/isInQueue.ts";

export const bfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
  const traversedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  const unTraversed: TileType[] = [base];

  while (unTraversed.length) {
    const tile = unTraversed.shift()!;

    if (tile.isWall) continue;
    if (tile.distance === Infinity) break;
    tile.isTraversed = true;
    traversedTiles.push(tile);
    if (isEqual(tile, endTile)) break;

    const neighbors = getUntraversedNeighbors(grid, tile);
    for (const neighbor of neighbors) {
      if (!isInQueue(neighbor, unTraversed)) {
        neighbor.distance = tile.distance + 1;
        neighbor.parent = tile;
        unTraversed.push(neighbor);
      }
    }
  }
  const path = [];
  let tile = grid[endTile.row][endTile.col];
  while (tile !== null) {
    tile.isPath = true;
    path.unshift(tile);
    tile = tile.parent!;
  }
  return { traversedTiles, path };
};
