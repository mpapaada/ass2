import { useState } from "react";
// import { Turn } from "../types";
import { TurnContext } from "../context";
import { TURN } from "../Constants";

type TurnProviderProps = {
    children: React.ReactNode
}
export default function TurnProvider({ children}: TurnProviderProps) {

    const [turn, setTurn] = useState<TURN>(TURN.BLACK)
    
    const changeTurn = () => {
        if (turn === TURN.WHITE){
            setTurn(TURN.BLACK)
        }else{
            setTurn(TURN.WHITE) 
        }
    }

    const setPlayerTurn = (turn:TURN) => {
        setTurn(turn)
    }
    return (
    <TurnContext.Provider value={{turn, changeTurn, setPlayerTurn}}>
        {children}
    </TurnContext.Provider>
  )
}
