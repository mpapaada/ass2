import { createContext } from "react";
// import { Turn } from "../types";
import { TURN } from "../Constants";

type TurnContextType = {
    turn?: TURN
    changeTurn: (turn: TURN) => void
    setPlayerTurn: (turn: TURN) => void
}

const TurnContext = createContext<TurnContextType>({} as TurnContextType)
export default TurnContext