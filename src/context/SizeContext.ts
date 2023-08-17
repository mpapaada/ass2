import { createContext } from "react";
import { Size } from "../types";

type SizeContextType = {
    size?: Size
    setSize: (value: number) => void
}

const SizeContext = createContext<SizeContextType>({} as SizeContextType)
export default SizeContext