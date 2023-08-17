import { useState } from "react";
import { Size } from "../types";
import { SizeContext } from "../context";

type SizeProviderProps = {
    children: React.ReactNode
}
export default function SizeProvider({ children}: SizeProviderProps) {
    const [size, sizeSet] = useState<Size | undefined>(undefined)

    const setSize = (size: number) => sizeSet({size})

  return (
    <SizeContext.Provider value={{ size, setSize}}>
        {children}
    </SizeContext.Provider>
  )
}
