import type { MouseEventHandler } from "react";
import { Play, RotateCcw } from "lucide-react";

const PlayButton = ({
  handleRunVisualizer,
  isDisabled,
  isGraphVisualized,
}: {
  handleRunVisualizer: MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
  isGraphVisualized: boolean;
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={handleRunVisualizer}
      className="disabled:pointer-events-none disabled:opacity-50 transition ease-in rounded-full p-2.5 shadow-md bg-green-500 hover:bg-green-600 boder-none active:ring-green-300 focus:outline-none focus;ring focus:ring-green-300 focus:ring-opacity-30"
    >
      {isGraphVisualized ? (
        <RotateCcw className="h-5 w-5" />
      ) : (
        <Play className="h-5 w-5" />
      )}
    </button>
  );
};
export default PlayButton;
