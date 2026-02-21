import { usePathfinding } from "../hooks/usePathfinding.tsx";
import { twMerge } from "tailwind-merge";
import { MAX_COLS, MAX_ROWS } from "../utils/constants.ts";
import Tile from "./Tile.tsx";
import { type RefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers.ts";

const Grid = ({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: RefObject<boolean>;
}) => {
  const { grid, setGrid } = usePathfinding();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(true);
    const newGrid = createNewGrid(grid, row, col);
    setGrid(newGrid);
  };
  const handleMouseUp = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }
    setIsMouseDown(false);
  };
  const handleMouseEnter = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }
    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col);
      setGrid(newGrid);
    }
  };

  return (
    <div
      className={twMerge(
        //Base classes
        "flex flex-col  items-center justify-center border-sky-300 mt-10",
        //Responive grid height
        `
            lg:min-h-[${MAX_ROWS * 17}px] 
             md:min-h-[${MAX_ROWS * 15}px]
             xs:min-h-[${MAX_ROWS * 8}px]
             min-h-[${MAX_ROWS * 7}px]
             `,
        //Grid Width
        `
            lg:min-w-[${MAX_COLS * 17}px]
            md:min-w-[${MAX_COLS * 15}px]
            xs:min-w-[${MAX_COLS * 8}px]
            min-w-[${MAX_COLS * 7}px]
            `,
      )}
    >
      {grid.map((r, rowIndex) => (
        <div key={rowIndex} className="flex">
          {r.map((tile, tileIndex) => {
            const { row, col, isEnd, isStart, isPath, isTraversed, isWall } =
              tile;
            return (
              <Tile
                key={tileIndex}
                row={tile.row}
                col={tile.col}
                isEnd={isEnd}
                isStart={isStart}
                isPath={isPath}
                isTraversed={isTraversed}
                isWall={isWall}
                handleMouseDown={() => handleMouseDown(row, col)}
                handleMouseUp={() => handleMouseUp(row, col)}
                handleMouseEnter={() => handleMouseEnter(row, col)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
export default Grid;
