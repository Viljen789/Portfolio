import type { GridType, TileType } from "../../../utils/types.ts";
import { isEqual } from "../../../utils/helpers.ts";
import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors.ts";

export const bidirectionalBfs = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) => {
  const traversedTiles: TileType[] = [];
  const startQueue: TileType[] = [grid[startTile.row][startTile.col]];
  const endQueue: TileType[] = [grid[endTile.row][endTile.col]];

  const startVisited: { [key: string]: TileType | null } = {};
  const endVisited: { [key: string]: TileType | null } = {};

  startVisited[`${startTile.row}-${startTile.col}`] = null;
  endVisited[`${endTile.row}-${endTile.col}`] = null;

  let intersectTile: TileType | null = null;

  while (startQueue.length && endQueue.length) {
    // Search from start
    const currentStart = startQueue.shift()!;
    if (currentStart.isWall) continue;
    currentStart.isTraversed = true;
    traversedTiles.push(currentStart);
    if (endVisited[`${currentStart.row}-${currentStart.col}`] !== undefined) {
      intersectTile = currentStart;
      break;
    }

    const startNeighbors = getUntraversedNeighbors(grid, currentStart);
    for (const neighbor of startNeighbors) {
      const id = `${neighbor.row}-${neighbor.col}`;
      if (startVisited[id] === undefined) {
        startVisited[id] = currentStart;
        startQueue.push(neighbor);
      }
    }

    // Search from end
    const currentEnd = endQueue.shift()!;
    if (currentEnd.isWall) continue;
    currentEnd.isTraversed = true;
    traversedTiles.push(currentEnd);
    if (startVisited[`${currentEnd.row}-${currentEnd.col}`] !== undefined) {
      intersectTile = currentEnd;
      break;
    }

    const endNeighbors = getUntraversedNeighbors(grid, currentEnd);
    for (const neighbor of endNeighbors) {
      const id = `${neighbor.row}-${neighbor.col}`;
      if (endVisited[id] === undefined) {
        endVisited[id] = currentEnd;
        endQueue.push(neighbor);
      }
    }
  }

  const path: TileType[] = [];
  if (intersectTile) {
    let curr: TileType | null = intersectTile;
    while (curr) {
      path.unshift(curr);
      curr = startVisited[`${curr.row}-${curr.col}`]!;
    }
    curr = endVisited[`${intersectTile.row}-${intersectTile.col}`]!;
    while (curr) {
      path.push(curr);
      curr = endVisited[`${curr.row}-${curr.col}`]!;
    }
  }

  return { traversedTiles, path };
};
