import type { SpeedType, TileType } from "./types.ts";
import {
  EXTENDED_SLEEP_TIME,
  PATH_TILE_STYLE,
  SLEEP_TIME,
  SPEEDS,
  TRAVERSED_TILE_STYLE,
} from "./constants.ts";
import { isEqual } from "./helpers.ts";

let timeouts: NodeJS.Timeout[] = [];

export const animatePath = (
  traversedTiles: TileType[],
  path: TileType[],
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType,
) => {
  for (let i = 0; i < traversedTiles.length; i++) {
    const timeout = setTimeout(
      () => {
        const tile = traversedTiles[i];
        if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
          const el = document.getElementById(`${tile.row}-${tile.col}`)!;
          el.className = `${TRAVERSED_TILE_STYLE} animate-traversed`;
        }
      },
      SLEEP_TIME * i * SPEEDS.find((s) => s.value === speed)!.value,
    );
    timeouts.push(timeout);
  }
  const timeout = setTimeout(
    () => {
      for (let i = 0; i < path.length; i++) {
        const timeout = setTimeout(
          () => {
            const tile = path[i];
            if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
              const el = document.getElementById(`${tile.row}-${tile.col}`)!;
              el.className = `${PATH_TILE_STYLE} animate-path`;
            }
          },
          EXTENDED_SLEEP_TIME *
            i *
            SPEEDS.find((s) => s.value === speed)!.value,
        );
        timeouts.push(timeout);
      }
    },
    SLEEP_TIME *
      traversedTiles.length *
      SPEEDS.find((s) => s.value === speed)!.value,
  );
  timeouts.push(timeout);
};

export const clearAllTimeouts = () => {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  timeouts = [];
};
