import { createContext, useState } from "react"

export const GameContext = createContext({})


export function GameProvider({children}) {
    const [game, setGame] = useState({
        players : [],
        players_score : [],
        current_player : {},
        isGameStarted : false,
        isGameEnded : false,
    })

    return (
        <GameContext.Provider value={{
            game,
            setGame
        }}>
            {children}
        </GameContext.Provider>
    )
}
