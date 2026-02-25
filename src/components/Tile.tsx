import {
  END_TILE_STYLE,
  MAX_ROWS,
  PATH_TILE_STYLE,
  START_TILE_STYLE,
  TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  WALL_TILE_STYLE,
} from "../utils/constants.ts";
import { twMerge } from "tailwind-merge";

interface MouseFunction {
  (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const Tile = ({
  row,
  col,
  isEnd,
  isWall,
  isPath,
  isStart,
  isTraversed,
  weight,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
}: {
  row: number;
  col: number;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  isStart: boolean;
  isTraversed: boolean;
  weight: number;
  handleMouseDown: MouseFunction;
  handleMouseUp: MouseFunction;
  handleMouseEnter: MouseFunction;
}) => {
  let tileTypeStyle;
  if (isStart) {
    tileTypeStyle = START_TILE_STYLE;
  } else if (isEnd) {
    tileTypeStyle = END_TILE_STYLE;
  } else if (isWall) {
    tileTypeStyle = WALL_TILE_STYLE;
  } else if (isPath) {
    tileTypeStyle = PATH_TILE_STYLE;
  } else if (isTraversed) {
    tileTypeStyle = TRAVERSED_TILE_STYLE;
  } else if (weight > 1) {
    tileTypeStyle = TILE_STYLE;
  } else {
    tileTypeStyle = TILE_STYLE;
  }
  const borderStyle =
    row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";
  const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

  const getWeightColor = (weight: number): string => {
    if (weight <= 1) return "";
    const normalizedWeight = (weight - 1) / 8;
    const r = 245;
    const g = Math.floor(180 - normalizedWeight * 100);
    const b = Math.floor(50 - normalizedWeight * 40);
    const opacity = 0.3 + normalizedWeight * 0.6;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const weightBgColor = getWeightColor(weight);

  const shouldShowWeightColor =
    weight > 1 && !isTraversed && !isPath && !isWall && !isStart && !isEnd;

  return (
    <div
      className={twMerge(tileTypeStyle, borderStyle, edgeStyle)}
      id={`${row}-${col}`}
      style={{
        backgroundColor: shouldShowWeightColor ? weightBgColor : undefined,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
    >
      {weight > 1 && !isStart && !isEnd && !isTraversed && !isPath && (
        <div className="flex items-center justify-center h-full w-full">
          <span className="text-[9px] font-bold text-gray-800">{weight}</span>
        </div>
      )}
    </div>
  );
};
export default Tile;
