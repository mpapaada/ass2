import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext, SizeContext } from "../context"

// import style from './Game.module.css'

export default function Game() {
  const { size } = useContext(SizeContext)
  const { user } = useContext(UserContext)
  
  if (!user) return <Navigate to='/login'/>
  return (
    <div>you selected size {`${size?.size}`}</div>
  )
}
