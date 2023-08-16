import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context"

import style from './Game.module.css'

export default function Game() {
  const { user } = useContext(UserContext)
  if (!user) return <Navigate to='/login'/>
  return (
    <div>game</div>
  )
}
