
import { useState, useContext } from "react";
import { SizeContext, UserContext } from "../context";
import { useNavigate } from "react-router-dom";
import {Button, Select, Option} from "../components"

import style from "./Home.module.css"

export default function Home() {
  const {user} = useContext(UserContext)
  const {setSize} = useContext(SizeContext)
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const minSize = 5
  const maxSize = 20
  const selValue = 15

 
  const options: number[] = []
  for(let i = minSize; i <= maxSize; i++){
    options.push(i)
  }

  const onSubmit = () => {
    if(!user){
      navigate('/login')
    } else {
      setSize(parseInt(value))
      if(!value)setSize(selValue)
      navigate('/game')
    }
  }

  

  return (
    <form className={style.container} onSubmit={(e) => {
      
      console.log(value)
      e.preventDefault()
      onSubmit()
      }}>
      <Select 
        name="size" 
        defaultValue={selValue}
        onChange={(e) => {
            setValue(e.target.value)
          }}
      >
        {options.map((i) =>(
          <Option key = {i} value={i}/>
        ))
      }
      </Select>
      
      <Button className={style.button}>Submit</Button>
    </form>
  )
}
