import { PathfindingProvider } from "./context/PathfindingContext.tsx";
import { TileProvider } from "./context/TileContext.tsx";
import { SpeedProvider } from "./context/SpeedContext.tsx";
import Grid from "./components/Grid.tsx";
import { useRef } from "react";
import Nav from "./components/Nav.tsx";

const App = () => {
  const isVisualizationRunningRef = useRef(false);

  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-screen w-screen flex flex-col">
            <Nav />
            <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  );
};
export default App;
