import { useContext } from "react"
import { Navigate,useNavigate } from "react-router-dom"
import { UserContext } from "../context"
import { useLocalStorage } from "../hooks"
import { GameType } from "../types"
import { Button } from "../components"

import  style  from "./History.module.css"

export default function History() {
  const { user } = useContext(UserContext)
  const [games] = useLocalStorage<GameType[]>('games', [])
  const navigate = useNavigate()
  if (!user) return <Navigate to='/login'/>


  return (
    <div>
      {games.map((game, index) => (
        <div>
          <div>Game Number #{index}</div>
          <div>Result: {game.result}</div>
          <form onSubmit={(e) =>{ 
            e.preventDefault()
            navigate(`/game-log/${index}`)
          }}
            >
            <Button className={style.button}>View Game Log</Button>
          </form>
        </div>
      ))}
    </div>
  )
}
