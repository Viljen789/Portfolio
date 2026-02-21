import { ALGORITHM_OPTIONS, MAZE_OPTIONS } from "../utils/constants.ts";
import { usePathfinding } from "../hooks/usePathfinding.tsx";
import Select from "./Select.tsx";
import type { AlgorithmType, MazeType } from "../utils/types.ts";
import resetGrid from "../utils/resetGrid.tsx";
import { useTile } from "../hooks/useTile.tsx";
import { useState } from "react";
import { useSpeed } from "../hooks/useSpeed.tsx";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm.ts";
import PlayButton from "./PlayButton.tsx";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm.ts";

const Nav = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    maze,
    setMaze,
    grid,
    setGrid,
    setIsGraphVisualized,
    algorithm,
    setAlgorithm,
    isGraphVisualized,
  } = usePathfinding();
  const { startTile, endTile } = useTile();
  const { speed } = useSpeed();

  const handleGenerateMaze = (maze: MazeType) => {
    if (maze == "NONE") {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
      return;
    }
    setMaze(maze);
    setIsDisabled(true);
    runMazeAlgorithm({ maze, grid, startTile, endTile, setIsDisabled, speed });
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
  };

  const handleRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid({ grid: grid.slice(), startTile, endTile });
      return;
    }
    const { traversedTiles, path } = runPathfindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile,
    });
    console.log("traversedTiles: ", traversedTiles);
    console.log("path: ", path);
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
            onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
            options={ALGORITHM_OPTIONS}
            isDisabled={isDisabled}
          />
          <PlayButton
            handleRunVisualizer={handleRunVisualizer}
            isDisabled={isDisabled}
            isGraphVisualized={isGraphVisualized}
          />
        </div>
      </div>
    </div>
  );
};
export default Nav;
