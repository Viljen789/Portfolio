import { MAZE_OPTIONS } from "../utils/constants.ts";
import { usePathfinding } from "../hooks/usePathfinding.tsx";
import Select from "./Select.tsx";
import type { MazeType } from "../utils/types.ts";
import resetGrid from "../utils/resetGrid.tsx";
import { useTile } from "../hooks/useTile.tsx";
import { useState } from "react";
import { runMazeAlgorthm } from "../utils/runMazeAlgorthm.ts";
import { useSpeed } from "../hooks/useSpeed.tsx";

const Nav = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { maze, setMaze, grid, setGrid, setIsGraphVisualized } =
    usePathfinding();
  const { startTile, endTile } = useTile();
  const { speed } = useSpeed();

  const handleGenerateMaze = (maze: MazeType) => {
    if (maze == "NONE") {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
    }
    setMaze(maze);
    setIsDisabled(true);
    runMazeAlgorthm({ maze, grid, startTile, endTile, setIsDisabled, speed });
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
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
            onChange={(e) => {
              handleGenerateMaze(e.target.value as MazeType);
            }}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};
export default Nav;
