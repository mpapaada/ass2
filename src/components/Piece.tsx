import { TurnContext } from '../context'
import { useState } from 'react'
import { PIECE_STATUS, TURN } from '../Constants'
import { useContext } from 'react';

import style from './Piece.module.css'

type PieceProps = {
    id:number
    state:PIECE_STATUS
}

export default function Piece(props:PieceProps) {
    const {id, state} = props
    const {turn, changeTurn} = useContext(TurnContext)
    const [status, setStatus] = useState(PIECE_STATUS.EMPTY)

    const getClassName = () => {
        const className = style.piece
        switch(status) {
            case PIECE_STATUS.EMPTY:
                return `${className} ${style.empty} ${id}`
            case PIECE_STATUS.BLACK:
                return `${className} ${style.black} ${id}`
            case PIECE_STATUS.WHITE:
                return `${className} ${style.white} ${id}`
            default:
                return className
        }
    }

    const handleClick = () => {
        if(status === PIECE_STATUS.EMPTY){
            if(turn===TURN.WHITE) setStatus(PIECE_STATUS.WHITE)
            if(turn===TURN.BLACK) setStatus(PIECE_STATUS.BLACK)
            const currentTurn = turn === TURN.BLACK?TURN.WHITE: TURN.BLACK
            console.log(turn)
            changeTurn(currentTurn)
        }

        
    }

  return <div className={getClassName()}  onClick={handleClick}/>
}
