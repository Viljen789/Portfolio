import type { GridType, TileType, TerrainType } from "./types.ts";
import { MAX_COLS, MAX_ROWS } from "./constants.ts";
import { getRandInt } from "./helpers.ts";
import { generateRandomPatches } from "../lib/algorithms/terrain/randomPatches.ts";
import { generateGradient } from "../lib/algorithms/terrain/gradient.ts";
import { generateObstacles } from "../lib/algorithms/terrain/obstacles.ts";
import { generateRivers } from "../lib/algorithms/terrain/rivers.ts";

/**
 * Generates a weighted terrain map to showcase how Dijkstra's algorithm
 * finds the optimal path through varying terrain costs.
 */
export const generateWeightedTerrain = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  terrainType: TerrainType = "RANDOM_PATCHES",
): GridType => {
  const newGrid = grid.map((row) => row.map((tile) => ({ ...tile })));

  switch (terrainType) {
    case "NONE":
      resetToUniformWeights(newGrid);
      break;
    case "RANDOM_PATCHES":
      generateRandomPatches(newGrid, startTile, endTile);
      break;
    case "GRADIENT":
      generateGradient(newGrid, startTile, endTile);
      break;
    case "OBSTACLES":
      generateObstacles(newGrid, startTile, endTile);
      break;
    case "RIVERS":
      generateRivers(newGrid, startTile, endTile);
      break;
    default:
      generateRandomPatches(newGrid, startTile, endTile);
  }

  return newGrid;
};

/**
 * Resets the grid to uniform weights (all weight = 1)
 */
const resetToUniformWeights = (grid: GridType) => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      grid[row][col].weight = 1;
      grid[row][col].isWall = false;
    }
  }
};

/**
 * Gets a random terrain type for variety (excludes NONE)
 */
export const getRandomTerrainType = (): TerrainType => {
  const types: TerrainType[] = [
    "RANDOM_PATCHES",
    "GRADIENT",
    "OBSTACLES",
    "RIVERS",
  ];
  return types[getRandInt(0, types.length)];
};
