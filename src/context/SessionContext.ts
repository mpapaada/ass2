import { createContext } from "react";
import { Session } from "../types";

type SessionContextType = {
    session?: Session
    setSession: (id: number, result?:string) => void
}

const SessionContext = createContext<SessionContextType>({} as SessionContextType)
export default SessionContext