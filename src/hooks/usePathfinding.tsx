import {useContext} from "react";
import {PathfindingContext} from "../context/PathfindingContext.tsx";

export const usePathfinding = () => {
    const context = useContext(PathfindingContext);
    if(!context){
        throw new Error("usePathfindingContext must be used within a PathfindingProvider")
    }
    return context;
};
