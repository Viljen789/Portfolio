import type { TileType } from "../../../utils/types.ts";

export const isStartOrEnd = (
  row: number,
  col: number,
  startTile: TileType,
  endTile: TileType,
): boolean => {
  return (
    (row === startTile.row && col === startTile.col) ||
    (row === endTile.row && col === endTile.col)
  );
};
