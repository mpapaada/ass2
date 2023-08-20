import { TurnContext } from '../context'
import { useState } from 'react'
import { PIECE_STATUS, TURN } from '../Constants'
import { useContext } from 'react';
import { useLocalStorage } from '../hooks';

import style from './Piece.module.css'

type PieceProps = {
    id:number
    state:PIECE_STATUS
}



export default function Piece(props:PieceProps, ) {
    const {id, state} = props
    const {turn, changeTurn} = useContext(TurnContext)
    const [status, setStatus] = useState(PIECE_STATUS.EMPTY)
    const [selectPiece, saveSelectPiece] = useLocalStorage<number[][]>('game', [[],[]])

    const getClassName = () => {
        const className = style.piece
        switch(true) {
            case selectPiece[0].includes(id):
                return `${className} ${style.black} ${id}`
            case selectPiece[1].includes(id):
                return `${className} ${style.white} ${id}`
            default:
                return `${className} ${style.empty} ${id}`
        }
    }

    

    const handleClick = () => {
        if(status === PIECE_STATUS.EMPTY){
            if(turn===TURN.WHITE) {
                // setStatus(PIECE_STATUS.WHITE)
                if(selectPiece != null){
                    saveSelectPiece([selectPiece[0],[...selectPiece[1],id]])
                }
            }
            if(turn===TURN.BLACK) {
                if(selectPiece != null){
                    saveSelectPiece([[...selectPiece[0],id],selectPiece[1]])
                }
                // setStatus(PIECE_STATUS.BLACK)
            }
            const currentTurn = turn === TURN.BLACK?TURN.WHITE: TURN.BLACK
            console.log(...selectPiece)
            changeTurn(currentTurn)
        } 
    }


  return <div className={getClassName()}  onClick={handleClick} />
}
