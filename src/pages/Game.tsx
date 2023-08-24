import { useContext, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UserContext, SizeContext, TurnContext, SessionContext} from "../context"
import {Piece, Button} from "../components"
import { TURN } from "../Constants"
import { useLocalStorage } from '../hooks';
import { GameType } from "../types"


import style from './Game.module.css'

export default function Game() {
  const {session, setSession} = useContext(SessionContext)
  const { size } = useContext(SizeContext)
  const [selectPiece, saveSelectPiece] = useLocalStorage<GameType>(`game`, {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    size:size?.size!,
    black:[],
    white:[],
    result:''
})
  const [games, setGameLog] = useLocalStorage<GameType[]>('games', [])
  const { user } = useContext(UserContext)
  const { turn, setPlayerTurn } = useContext(TurnContext)
  const navigate = useNavigate()


  useEffect(() => {
    saveSelectPiece({
      size:size?.size!,
      black:[],
      white:[],
      result:''
  })
    setPlayerTurn(TURN.BLACK)
    setSession(games.length)
  }, [] )
  if (!user) return <Navigate to='/login' replace/>

  const row = size?.size ?? 15
  

  const leave = () => {
    if(selectPiece.result){
      setGameLog([...games,selectPiece])
      saveSelectPiece({
        size:size?.size!,
        black:[],
        white:[],
        result:''
    })
    
    navigate('/games')
    }else{
      saveSelectPiece({
        size:size?.size!,
        black:[],
        white:[],
        result:''
    })
    navigate('/')
    }
  }

  return (
    <div>
      <div>{`Current Turn: ${turn}`}</div>
      <div className={style.board} style={{gridTemplateColumns: `repeat(${row}, 1fr)`}}>
        {[...Array(row*row)].map((_, index) => (
          <Piece key={`piece-${index}`} id={index} />
        ))}
      </div>
      <div className={style.buttons}>
        <form onSubmit={(e) => {
          e.preventDefault()
          saveSelectPiece({
            size:size?.size!,
            black:[],
            white:[],
            result:''
        })
          setPlayerTurn(TURN.BLACK)
        }
          }>
          <Button className={style.button}>Reset</Button>
        </form>
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            leave()
          }}
        >
          <Button className={style.button}>Leave</Button>
        </form>

      </div>
    </div>
  )
}
