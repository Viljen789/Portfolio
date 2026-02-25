import type {
  AlgorithmSelectType,
  MazeSelectType,
  SpeedSelectType,
  TerrainSelectType,
} from "./types.ts";

export const MAX_ROWS = 39;
export const MAX_COLS = 49;
export const START_TILE_CONFIGURATION = {
  row: 1,
  col: 1,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: false,
  isTraversed: false,
  parent: null,
  weight: 1,
};
export const END_TILE_CONFIGURATION = {
  row: MAX_ROWS - 2,
  col: MAX_COLS - 2,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: false,
  isTraversed: false,
  parent: null,
  weight: 1,
};

export const TILE_STYLE =
  "lg:w-[17px] lg:h-[17px] md:w-[15px] md:h-[15px] xs:w-[8px] xs:h-[8px] w-[7px] h-[7px] border-t border-r border-sky-200";
export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-cyan-400";
export const START_TILE_STYLE = TILE_STYLE + " bg-green-400";
export const END_TILE_STYLE = TILE_STYLE + " bg-red-400";
export const WALL_TILE_STYLE = TILE_STYLE + " bg-gray-400";
export const PATH_TILE_STYLE = TILE_STYLE + " bg-green-500";
export const WEIGHT_TILE_STYLE = TILE_STYLE + " bg-amber-400";

export const MAZE_OPTIONS: MazeSelectType[] = [
  { name: "No Maze", value: "NONE" },
  { name: "Binary Tree", value: "BINARY_TREE" },
  { name: "Recursive Division", value: "RECURSIVE_DIVISION" },
];

export const ALGORITHM_OPTIONS: AlgorithmSelectType[] = [
  { name: "Dijkstra", value: "DJIKSTRA" },
  { name: "A*", value: "A_STAR" },
  { name: "BFS", value: "BFS" },
  { name: "DFS", value: "DFS" },
  { name: "Greedy BFS", value: "GREEDY_BFS" },
  { name: "Bidirectional BFS", value: "BIDIRECTIONAL_BFS" },
];

export const SPEEDS: SpeedSelectType[] = [
  { name: "Slow", value: 2 },
  { name: "Medium", value: 1 },
  { name: "Fast", value: 0.5 },
];

export const TERRAIN_OPTIONS: TerrainSelectType[] = [
  { name: "No Terrain", value: "NONE" },
  { name: "Random Patches", value: "RANDOM_PATCHES" },
  { name: "Valley", value: "GRADIENT" },
  { name: "Barriers", value: "OBSTACLES" },
  { name: "Rivers", value: "RIVERS" },
];

export const SLEEP_TIME = 8;
export const EXTENDED_SLEEP_TIME = 30;
