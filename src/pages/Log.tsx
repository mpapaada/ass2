import { useContext, useEffect,useState } from "react"
import { UserContext } from "../context"
import { Navigate, useLocation } from "react-router-dom"
import { useLocalStorage } from "../hooks"
import { GameType } from "../types"
import {Piece} from '../components';
import { TURN } from "../Constants"

import style from './Game.module.css'

export default function Log() {
  const [games] = useLocalStorage<GameType[]>('games', [])
  const [gameIndex, setGameIndex] = useState<number>()
  const [black, setBlack] = useState<number[]>([])
  const [white, setWhite] = useState<number[]>([])
  const { user } = useContext(UserContext)
  const location = useLocation()

  useEffect(() => {
    
    setGameIndex(parseInt(location.pathname.split('/game-log/').pop()!))
    setWhite(games[gameIndex!].white!)
    setBlack(games[gameIndex!].black!)
  }, [] )

   
  if (!user) return <Navigate to='/login'/>
  
  const row = games[gameIndex!].size

  const board = [...Array(row*row)].map((_, index) => (
    black?.includes(index)!?
    <Piece key={`piece-${index}`} id={index} color={TURN.BLACK} printID={(1 + black.indexOf(index))*2 - 1} readOnly={true}/>:
    white?.includes(index)!?
    <Piece key={`piece-${index}`} id={index} color={TURN.WHITE} printID={(1 + white.indexOf(index))*2} readOnly={true}/>:
    <Piece key={`piece-${index}`} id={index} readOnly={true}
    />
  ))
  // const whitePieces = games[0].white

  return (
    <div>
      <div>
      <div className={style.board} style={{gridTemplateColumns: `repeat(${row}, 1fr)`}}>
        {board}
      </div>
      </div>
    </div>
  )
}
