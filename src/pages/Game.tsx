import { useContext, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UserContext, SizeContext, TurnContext } from "../context"
import {Piece, Button} from "../components"
import { PIECE_STATUS, TURN } from "../Constants"

import style from './Game.module.css'

export default function Game() {
  const { size } = useContext(SizeContext)
  const { user } = useContext(UserContext)
  const { turn, setPlayerTurn } = useContext(TurnContext)
  // const navigate = useNavigate()


  useEffect(() => {setPlayerTurn(TURN.BLACK)}, [] )
  if (!user) return <Navigate to='/login' replace/>

  const row = size?.size ?? 15
  

  return (
    <div>
      <div>{`Current Turn: ${turn}`}</div>
      <div className={style.board} style={{gridTemplateColumns: `repeat(${row}, 1fr)`}}>
        {[...Array(row*row)].map((_, index) => (
          <Piece key={`piece-${index}`} id={index} state={PIECE_STATUS.EMPTY}/>
        ))}
      </div>
      <div className={style.buttons}>
        <Button className={style.button}>Reset</Button>
        <button className={style.button}>Leave</button>
      </div>
    </div>
  )
}
