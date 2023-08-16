
import { useState } from "react";
import {Button, Select, Option} from "../components"

import style from "./Home.module.css"

export default function Home() {
  const [size, setSize] = useState('')
  const minSize = 5
  const maxSize = 20

  const sizes: number[] = []
  for(let i = minSize; i <= maxSize; i++){
    sizes.push(i)
  }

  return (
    <form className={style.container} onSubmit={(e) => {
      e.preventDefault()
      console.log(size)
      }}>
      <Select 
        name="size" 
        placeholder="15" 
        value={size} 
        onChange={(e) => {
            setSize(e.target.value)
          }}
      >
        {sizes.map((i) =>(
          <Option key = {i} value={i}/>
        ))
      }
      </Select>
      
      <Button className={style.button}>Submit</Button>
    </form>
  )
}
