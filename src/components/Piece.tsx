import { TurnContext, SizeContext, SessionContext } from '../context'
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
    const {session, setSession} = useContext(SessionContext)
    const {turn, changeTurn} = useContext(TurnContext)
    const {size} = useContext(SizeContext)
    const [status, setStatus] = useState(PIECE_STATUS.EMPTY)
    const [selectPiece, saveSelectPiece] = useLocalStorage<number[][]>(`game-${session?.id}`, [[],[]])
    const [gameLog, setGameLog] = useLocalStorage<Object[]>('games', [])

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
        if(!(selectPiece[0].includes(id) || selectPiece[1].includes(id))){
            if(turn===TURN.WHITE) {
                if(selectPiece != null){
                    saveSelectPiece([selectPiece[0],[...selectPiece[1],id]])
                }
            }
            if(turn===TURN.BLACK) {
                if(selectPiece != null){
                    saveSelectPiece([[...selectPiece[0],id],selectPiece[1]])
                }
            }
            const currentTurn = turn === TURN.BLACK?TURN.WHITE: TURN.BLACK
            console.log(...selectPiece)
            changeTurn(currentTurn)
            checkWin()
        } 
    }

    const checkUpDown= (turnIndex:number, row:number) => {
        let score = 1;
        down(id);
        function down(piece:number) {
            const pieceDown = piece-row
            if (selectPiece[turnIndex].includes(pieceDown)) {
                score++
                // console.log(score)
                down(pieceDown)
            } else {
                up(id)
            }  
        }
        function up(piece:number) {
            const pieceUp = piece+row
            if (selectPiece[turnIndex].includes(pieceUp)) {
                score++
                // console.log(score)

                up(pieceUp)
            } 
        }
        return score
    }

    const checkLeftRight= (turnIndex:number,row:number) => {
        let score = 1;
        const rowIndex = Math.floor(id/row)
        left(id);

        function left(piece:number) {
            const pieceLeft = piece - 1
            // console.log( selectPiece[turnIndex], pieceLeft)
            if (selectPiece[turnIndex].includes(pieceLeft) && Math.floor(pieceLeft/row) === rowIndex) {
                score++
                console.log('you got here')
                left(pieceLeft)
            } else {
                right(id)
            }  
        }

        function right(piece:number) {
            const pieceRight = piece + 1
            console.log( selectPiece[turnIndex], pieceRight)

            if (selectPiece[turnIndex].includes(pieceRight) && Math.floor(pieceRight/row) === rowIndex) {
                score++
                console.log(score)
                right(pieceRight)
            } 
        }
        return score
    }

    const checkDiagonalRight= (turnIndex:number,row:number) => {
        let score = 1;
        upRight(id);
        function upRight(piece:number) {
            const pieceUpRight = piece + row - 1
            if (selectPiece[turnIndex].includes(pieceUpRight)) {
                score++
                // console.log(score)
                upRight(pieceUpRight)
            } else {
                downLeft(id)
            }  
        }
        function downLeft(piece:number) {
            const pieceDownLeft = piece - row  + 1
            if (selectPiece[turnIndex].includes(pieceDownLeft)) {
                score++
                // console.log(score)
                downLeft(pieceDownLeft)
            } 
        }
        return score
    }

    const checkDiagonalLeft= (turnIndex:number, row:number) => {
        let score = 1;
        left(id);
        function left(piece:number) {
            const pieceLeft = piece - row - 1
            if (selectPiece[turnIndex].includes(pieceLeft)) {
                score++
                // console.log(score)
                left(pieceLeft)
            } else {
                right(id)
            }  
        }
        function right(piece:number) {
            const pieceRight = piece + row + 1
            if (selectPiece[turnIndex].includes(pieceRight)) {
                score++
                // console.log(score)

                right(pieceRight)
            } 
        }
        return score
    }

    const checkWin = () => {
        const turnIndex = turn === TURN.BLACK? 0:1
        const row = size?.size ?? 15
        console.log("total moves: ",selectPiece[0].length + selectPiece[1].length + 1,", Max moves: ",row*row)
        if(checkUpDown(turnIndex, row) >= 5 || checkLeftRight(turnIndex,row) >= 5 || checkDiagonalRight(turnIndex, row) >= 5 || checkDiagonalLeft(turnIndex, row) >= 5){
            console.log(`${turn} Wins`)
            setGameLog([...gameLog,{"game":{
                "black": selectPiece[0],
                "white": selectPiece[1],
                "winner": turn

            }}])
            setSession(gameLog.length)
        }else if(selectPiece[0].length + selectPiece[1].length + 1 === row*row){
            setGameLog([...gameLog,{"game":{
                "black": selectPiece[0],
                "white": selectPiece[1],
                "winner": "DRAW"

            }}])
        }
    }


  return <div className={getClassName()}  onClick={handleClick} />
}
