import { useContext } from "react"
import { UserContext } from "../context"
import { Navigate } from "react-router-dom"

export default function Log() {
  const { user } = useContext(UserContext)
  if (!user) return <Navigate to='/login'/>
  return (
    <div>log</div>
  )
}
