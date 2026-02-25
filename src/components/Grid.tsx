import { usePathfinding } from "../hooks/usePathfinding.tsx";
import { twMerge } from "tailwind-merge";
import { MAX_COLS, MAX_ROWS } from "../utils/constants.ts";
import Tile from "./Tile.tsx";
import { type RefObject, useState } from "react";
import {
  checkIfStartOrEnd,
  createNewGrid,
  createNewGridWithWeight,
} from "../utils/helpers.ts";

const Grid = ({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: RefObject<boolean>;
}) => {
  const { grid, setGrid, weightBrush } = usePathfinding();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const handleMouseDown = (
    row: number,
    col: number,
    isShiftPressed: boolean,
  ) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(true);
    const newGrid = isShiftPressed
      ? createNewGridWithWeight(grid, row, col, weightBrush)
      : createNewGrid(grid, row, col);
    setGrid(newGrid);
  };
  const handleMouseUp = (row: number, col: number) => {
    setIsMouseDown(false);
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }
  };
  const handleMouseEnter = (
    row: number,
    col: number,
    isShiftPressed: boolean,
  ) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }
    if (isMouseDown) {
      const newGrid = isShiftPressed
        ? createNewGridWithWeight(grid, row, col, weightBrush)
        : createNewGrid(grid, row, col);
      setGrid(newGrid);
    }
  };

  return (
    <div
      className={twMerge(
        //Base classes
        "flex flex-col  items-center justify-center border-sky-300 mt-10",
        isVisualizationRunningRef.current
          ? "cursor-not-allowed"
          : "cursor-default",
        `
            lg:min-h-[${MAX_ROWS * 17}px] 
             md:min-h-[${MAX_ROWS * 15}px]
             xs:min-h-[${MAX_ROWS * 8}px]
             min-h-[${MAX_ROWS * 7}px]
             `,
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
            const {
              row,
              col,
              isEnd,
              isStart,
              isPath,
              isTraversed,
              isWall,
              weight,
            } = tile;
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
                weight={weight}
                handleMouseDown={(e) => handleMouseDown(row, col, e.shiftKey)}
                handleMouseUp={() => handleMouseUp(row, col)}
                handleMouseEnter={(e) => handleMouseEnter(row, col, e.shiftKey)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
export default Grid;
