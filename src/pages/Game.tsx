import { useContext, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UserContext, SizeContext, TurnContext } from "../context"
import {Piece, Button} from "../components"
import { PIECE_STATUS, TURN } from "../Constants"
import { useLocalStorage } from '../hooks';


import style from './Game.module.css'

export default function Game() {
  const [selectPiece, saveSelectPiece] = useLocalStorage<number[][]>('game', [[],[]])

  const { size } = useContext(SizeContext)
  const { user } = useContext(UserContext)
  const { turn, setPlayerTurn } = useContext(TurnContext)
  const navigate = useNavigate()


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
        <form onSubmit={(e) => {
          e.preventDefault()
          saveSelectPiece([[],[]])
        }
          }>
          <Button className={style.button}>Reset</Button>
        </form>
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/')
          }}
        >
          <Button className={style.button}>Leave</Button>
        </form>

      </div>
    </div>
  )
}
