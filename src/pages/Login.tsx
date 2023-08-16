import { useState } from "react"
import users from '../data/users.json'
import { Button, Input, Message } from "../components"

import style from './Login.module.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isCredentialValid, setIsCredentialValid] = useState(false)

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    )
    if (!user) {
      setIsCredentialValid(true)
    } else {
      console.log('logged in')
    }
  }

  return (
    <form className={style.container} onSubmit={(e) => {
      e.preventDefault()
      handleLogin()
      }}
    >
      {isCredentialValid && <Message variant="error" message="Invalid username or password"/>}
      <Input 
          name="username" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => {
            setUsername(e.target.value)
            setIsCredentialValid(false)
          }}
      />
      <Input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => {
            setPassword(e.target.value)
            setIsCredentialValid(false)
          }}
      />
      <Button>Login</Button>
    </form>
  )
}
