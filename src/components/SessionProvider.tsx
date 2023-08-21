import { useState } from "react";
import { Session } from "../types";
import { SessionContext } from "../context";

type SessionProviderProps = {
    children: React.ReactNode
}
export default function SessionProvider({ children}: SessionProviderProps) {
    const [session, sessionSet] = useState<Session | undefined>(undefined)

    const setSession = (id: number, result:string = "") => sessionSet({id, result})

  return (
    <SessionContext.Provider value={{ session, setSession}}>
        {children}
    </SessionContext.Provider>
  )
}
