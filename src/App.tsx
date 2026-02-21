import React from 'react'
import {PathfindingProvider} from "./context/PathfindingContext.tsx";
import {TileProvider} from "./context/TileContext.tsx";
import {SpeedProvider} from "./context/SpeedContext.tsx";
import Grid from "./components/Grid.tsx";

const App = () => {
    return (
        <PathfindingProvider>
            <TileProvider>
                <SpeedProvider>
                    <div className="h-screen w-screen flex flex-col">
                        <Grid/>
                    </div>
                </SpeedProvider>
            </TileProvider>
        </PathfindingProvider>
    )
}
export default App
