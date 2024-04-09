import { createContext, useState } from "react"

export const PlayersContext = createContext([])


export function PlayersProvider({children}) {
    const [players, setPlayers] = useState([
        
    ])

    return (
        <PlayersContext.Provider value={{
            players,
            setPlayers
        }}>
            {children}
        </PlayersContext.Provider>
    )
}
