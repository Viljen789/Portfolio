import {
  ALGORITHM_OPTIONS,
  EXTENDED_SLEEP_TIME,
  MAZE_OPTIONS,
  SLEEP_TIME,
  SPEEDS,
  TERRAIN_OPTIONS,
} from "../utils/constants.ts";
import { usePathfinding } from "../hooks/usePathfinding.tsx";
import Select from "./Select.tsx";
import type {
  AlgorithmType,
  MazeType,
  SpeedType,
  TerrainType,
} from "../utils/types.ts";
import resetGrid from "../utils/resetGrid.tsx";
import { useTile } from "../hooks/useTile.tsx";
import { type RefObject, useRef, useState } from "react";
import { useSpeed } from "../hooks/useSpeed.tsx";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm.ts";
import PlayButton from "./PlayButton.tsx";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm.ts";
import { animatePath, clearAllTimeouts } from "../utils/animatePath.ts";
import { cloneGrid } from "../utils/helpers.ts";
import {
  generateWeightedTerrain,
  getRandomTerrainType,
} from "../utils/generateWeightedTerrain.ts";

const Nav = ({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: RefObject<boolean>;
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [terrain, setTerrain] = useState<TerrainType>("NONE");
  const completionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const {
    maze,
    setMaze,
    grid,
    setGrid,
    setIsGraphVisualized,
    algorithm,
    setAlgorithm,
    isGraphVisualized,
    weightBrush,
    setWeightBrush,
  } = usePathfinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();

  const isWeightedAlgorithm =
    algorithm === "DJIKSTRA" || algorithm === "A_STAR";

  const handleGenerateMaze = (maze: MazeType) => {
    if (maze == "NONE") {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
      return;
    }
    setMaze(maze);
    setIsDisabled(true);
    runMazeAlgorithm({
      maze,
      grid,
      startTile,
      endTile,
      setIsDisabled,
      speed,
      algorithm,
    });
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
  };

  const handleAlgorithmChange = (newAlgorithm: AlgorithmType) => {
    setAlgorithm(newAlgorithm);

    const isNewAlgorithmWeighted =
      newAlgorithm === "DJIKSTRA" || newAlgorithm === "A_STAR";

    if (isNewAlgorithmWeighted) {
      const terrainType = getRandomTerrainType();
      setTerrain(terrainType);
      const weightedGrid = generateWeightedTerrain(
        grid,
        startTile,
        endTile,
        terrainType,
      );
      setGrid(weightedGrid);
      setIsGraphVisualized(false);
    } else {
      setTerrain("NONE");
      resetGrid({ grid, startTile, endTile });
      setIsGraphVisualized(false);
    }
  };

  const handleTerrainChange = (newTerrain: TerrainType) => {
    setTerrain(newTerrain);

    resetGrid({ grid, startTile, endTile });

    if (newTerrain === "NONE") {
      setIsGraphVisualized(false);
      return;
    }

    const weightedGrid = generateWeightedTerrain(
      grid,
      startTile,
      endTile,
      newTerrain,
    );
    setGrid(weightedGrid);
    setIsGraphVisualized(false);
  };

  const handleRunVisualizer = () => {
    if (isGraphVisualized || isVisualizationRunningRef.current) {
      setIsGraphVisualized(false);
      setIsDisabled(false);
      isVisualizationRunningRef.current = false;
      clearAllTimeouts();
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
        completionTimeoutRef.current = null;
      }
      resetGrid({ grid: grid.slice(), startTile, endTile });
      return;
    }

    const gridClone = cloneGrid(grid);
    const { traversedTiles, path } = runPathfindingAlgorithm({
      algorithm,
      grid: gridClone,
      startTile,
      endTile,
    });

    animatePath(traversedTiles, path, startTile, endTile, speed);
    setIsDisabled(true);
    setIsGraphVisualized(true);
    isVisualizationRunningRef.current = true;
    completionTimeoutRef.current = setTimeout(
      () => {
        setGrid(gridClone);
        setIsDisabled(false);
        isVisualizationRunningRef.current = false;
        completionTimeoutRef.current = null;
      },
      SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) +
        EXTENDED_SLEEP_TIME *
          (path.length + 60) *
          SPEEDS.find((s) => s.value === speed)!.value,
    );
  };

  return (
    <div className="flex items-center justify-center min-h-[4.5rem] border-b  shadow-gray-600 sm:px-5 px-0">
      <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
          Pathfinding Visualizer
        </h1>
        <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
          <Select
            label="Maze"
            value={maze}
            options={MAZE_OPTIONS}
            isDisabled={isDisabled}
            onChange={(e) => {
              handleGenerateMaze(e.target.value as MazeType);
            }}
          />
          <Select
            value={algorithm}
            label={"Graph"}
            onChange={(e) =>
              handleAlgorithmChange(e.target.value as AlgorithmType)
            }
            options={ALGORITHM_OPTIONS}
            isDisabled={isDisabled}
          />
          {isWeightedAlgorithm && (
            <Select
              value={terrain}
              label={"Terrain"}
              onChange={(e) =>
                handleTerrainChange(e.target.value as TerrainType)
              }
              options={TERRAIN_OPTIONS}
              isDisabled={isDisabled}
            />
          )}
          <Select
            value={speed}
            label={"Speed"}
            onChange={(e) => setSpeed(parseInt(e.target.value) as SpeedType)}
            options={SPEEDS}
            isDisabled={isDisabled}
          />
          <Select
            value={weightBrush}
            label={"Weight"}
            onChange={(e) => setWeightBrush(parseInt(e.target.value))}
            options={Array.from({ length: 10 }, (_, i) => ({
              name: (i + 1).toString(),
              value: i + 1,
            }))}
            isDisabled={isDisabled}
          />
          <PlayButton
            handleRunVisualizer={handleRunVisualizer}
            isDisabled={isDisabled && !isVisualizationRunningRef.current}
            isGraphVisualized={
              isGraphVisualized || isVisualizationRunningRef.current
            }
          />
        </div>
      </div>
    </div>
  );
};
export default Nav;
