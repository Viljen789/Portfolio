import type {TileType} from "../utils/types.ts";
import {createContext, type ReactNode, useState} from "react";
import {START_TILE_CONFIGURATION} from "../utils/constants.ts";

interface TileContextinterface {
    startTile: TileType;
    setStartTile: (startTile: TileType) => void;
    endTile: TileType;
    setEndTile: (endTile: TileType) => void;
}

export const TileContext = createContext<TileContextinterface | undefined>(undefined);

export const TileProvider = ({children}: { children: ReactNode }) => {
    const [startTile, setStartTile] = useState<TileType>(START_TILE_CONFIGURATION);
    const [endTile, setEndTile] = useState<TileType>(START_TILE_CONFIGURATION);

    return (
        <TileContext.Provider value={{startTile, setStartTile, endTile, setEndTile}}>
            {children}
        </TileContext.Provider>
    )


}