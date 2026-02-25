export type AlgorithmType =
  | "DJIKSTRA"
  | "A_STAR"
  | "BFS"
  | "DFS"
  | "GREEDY_BFS"
  | "BIDIRECTIONAL_BFS";
export interface AlgorithmSelectType {
  name: string;
  value: AlgorithmType;
}

export type MazeType = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION";
export interface MazeSelectType {
  name: string;
  value: MazeType;
}

export type GridType = TileType[][];
export type TileType = {
  row: number;
  col: number;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  distance: number;
  isStart: boolean;
  isTraversed: boolean;
  parent: TileType | null;
  weight: number;
};

export type SpeedType = 2 | 1 | 0.5;

export interface SpeedSelectType {
  name: string;
  value: SpeedType;
}

export type TerrainType =
  | "NONE"
  | "RANDOM_PATCHES"
  | "GRADIENT"
  | "OBSTACLES"
  | "RIVERS";

export interface TerrainSelectType {
  name: string;
  value: TerrainType;
}
