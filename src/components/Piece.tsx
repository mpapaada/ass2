import { TurnContext, SizeContext, SessionContext } from '../context'
import { TURN } from '../Constants'
import { useContext } from 'react';
import { useLocalStorage } from '../hooks';
import { GameType } from '../types';

import style from './Piece.module.css'

type PieceProps = {
    id:number
    printID?:number
    color?:TURN
    readOnly?:boolean
}



export default function Piece(props:PieceProps ) {
    const {id, printID, color,readOnly} = props
    const {session} = useContext(SessionContext)
    const {turn, changeTurn} = useContext(TurnContext)
    const {size} = useContext(SizeContext)
    const [selectPiece, saveSelectPiece] = useLocalStorage<GameType>(`game`, {
        size:size?.size!,
        black:[],
        white:[],
        result:''
    })

    const getClassName = () => {
        const className = style.piece


        switch(true) {
            case selectPiece.black.includes(id) || color === TURN.BLACK:
                return `${className} ${style.black} ${id}`
            case selectPiece.white.includes(id) || color === TURN.WHITE:
                return `${className} ${style.white} ${id}`
            default:
                return `${className} ${style.empty} ${id}`
        }
    }

    

    const handleClick = () => {
        console.log(size?.size, selectPiece.size)
        if(!(readOnly || selectPiece.black.includes(id) || selectPiece.white.includes(id) || selectPiece.result)){
             if(turn===TURN.WHITE) {
                if(selectPiece != null){
                    saveSelectPiece({
                        size:size?.size!,
                        black:selectPiece.black,
                        white:[...selectPiece.white,id],
                        result:checkWin()
                    })
                }
            }
            if(turn===TURN.BLACK) {
                if(selectPiece != null){
                    saveSelectPiece({
                        size:size?.size!,
                        black:[...selectPiece.black,id],
                        white:selectPiece.white,
                        result:checkWin()
                    })
                }
            }
            const currentTurn = turn === TURN.BLACK?TURN.WHITE: TURN.BLACK
            changeTurn(currentTurn)
            checkWin()
        } 
    }

    const checkUpDown= (pieceArray:number[], row:number) => {
        let score = 1;
        down(id);
        function down(piece:number) {
            const pieceDown = piece-row
            if (pieceArray.includes(pieceDown)) {
                score++
                down(pieceDown)
            } else {
                up(id)
            }  
        }
        function up(piece:number) {
            const pieceUp = piece+row
            if (pieceArray.includes(pieceUp)) {
                score++

                up(pieceUp)
            } 
        }
        return score
    }

    const checkLeftRight= (pieceArray:number[],row:number) => {
        let score = 1;
        const rowIndex = Math.floor(id/row)
        left(id);

        function left(piece:number) {
            const pieceLeft = piece - 1
            if (pieceArray.includes(pieceLeft) && Math.floor(pieceLeft/row) === rowIndex) {
                score++
                left(pieceLeft)
            } else {
                right(id)
            }  
        }

        function right(piece:number) {
            const pieceRight = piece + 1

            if (pieceArray.includes(pieceRight) && Math.floor(pieceRight/row) === rowIndex) {
                score++
                right(pieceRight)
            } 
        }
        return score
    }

    const checkDiagonalRight= (pieceArray:number[],row:number) => {
        let score = 1;
        upRight(id);
        function upRight(piece:number) {
            const pieceUpRight = piece + row - 1
            if (pieceArray.includes(pieceUpRight)) {
                score++
                upRight(pieceUpRight)
            } else {
                downLeft(id)
            }  
        }
        function downLeft(piece:number) {
            const pieceDownLeft = piece - row  + 1
            if (pieceArray.includes(pieceDownLeft)) {
                score++
                downLeft(pieceDownLeft)
            } 
        }
        return score
    }

    const checkDiagonalLeft= (pieceArray:number[], row:number) => {
        let score = 1;
        left(id);
        function left(piece:number) {
            const pieceLeft = piece - row - 1
            if (pieceArray.includes(pieceLeft)) {
                score++
                left(pieceLeft)
            } else {
                right(id)
            }  
        }
        function right(piece:number) {
            const pieceRight = piece + row + 1
            if (pieceArray.includes(pieceRight)) {
                score++

                right(pieceRight)
            } 
        }
        return score
    }

    const checkWin = () => {
        const pieceArray = turn === TURN.BLACK? selectPiece.black:selectPiece.white
        const row = size?.size ?? 15
        if(checkUpDown(pieceArray, row) >= 5 || checkLeftRight(pieceArray,row) >= 5 || checkDiagonalRight(pieceArray, row) >= 5 || checkDiagonalLeft(pieceArray, row) >= 5){
            console.log(`${turn} Wins`)
            return `${turn}`
        }else if(selectPiece.black.length + selectPiece.white.length + 1 === row*row){
            return'DRAW'
        }else{
            return ''
        }
    }


  return <div className={getClassName()}  onClick={handleClick} > {printID?printID:""} </div>
}
