import { createContext, useState } from "react"

export const GameContext = createContext({
    game: {
        players: {
            1: {
                name: 'Player 1',
                score: 0,
                color: 'black',
                playing: false
            },
            2: {
                name: 'Player 2',
                score: 0,
                color: 'red',
                playing: false
            },
            3: {
                name: 'Player 3',
                score: 0,
                color: 'green',
                playing: false
            },
            4: {
                name: 'Player 4',
                score: 0,
                color: 'blue',
                playing: false
            }
        },
        current_player : 1,
        isGameStarted : false,
        isGameEnded : false,
        winner: null
    },
    actions: {
        nextPlayer: () => {},
        prevPlayer: () => {},
        addPlayer: () => {},
        removePlayer: () => {},
        startGame: () => {},
        endGame: () => {},
        resetGame: () => {},
        updatePlayerScore: () => {},
        updatePlayerName: () => {},
        updateWinner: () => {}
    }
})


export function GameProvider({children}) {
    const [game, setGame] = useState({
        players: {
            player1: {
                id: 1,
                name: 'Player 1',
                score: 0,
                color: 'black',
                playing: false
            },
            player2: {
                id: 2,
                name: 'Player 2',
                score: 0,
                color: 'red',
                playing: false
            },
            player3: {
                id: 3,
                name: 'Player 3',
                score: 0,
                color: 'green',
                playing: false
            },
            player4: {
                id: 4,
                name: 'Player 4',
                score: 0,
                color: 'blue',
                playing: false
            }
        },
        current_player : 1,
        isGameStarted : false,
        isGameEnded : false,
        winner: null
    })

    const nextPlayer = () => {
        setGame({
            ...game,
            current_player: game.current_player === 4 ? 1 : game.current_player + 1
        })
    }

    const prevPlayer = () => {
        setGame({
            ...game,
            current_player: game.current_player === 1 ? 4 : game.current_player - 1
        })
    }

    const startGame = () => {
        setGame({
            ...game,
            isGameStarted: true
        })
    }

    const endGame = () => {
        setGame({
            ...game,
            isGameEnded: true
        })
    }

    const changePlayerInfos = (playerId, color, name) => {
        setGame({
            ...game,
            players: {
                ...game.players,
                [`player${playerId}`]: {
                    ...game.players[`player${playerId}`],
                    name,
                    color
                }
            }
        })
    }

    const addPlayer = (playerInfos) => {
        const playerKey = Object.values(game.players).filter(player => player.playing).length + 1

        if (playerKey > 4) return

        let playerToEdit = game.players[`player${playerKey}`]

        playerToEdit.name = playerInfos.name !== '' ? playerInfos.name : `Player ${playerKey}`
        playerToEdit.color = playerInfos.color
        playerToEdit.playing = true

        setGame({
            ...game,
            players: {
                ...game.players,
                [`player${playerKey}`]: playerToEdit
            }
        })
    }

    const removePlayer = (playerId) => {
        const playerToEdit = game.players[`player${playerId}`]
        playerToEdit.playing = false
        playerToEdit.score = 0
        playerToEdit.name = `Player ${playerId}`

        setGame({
            ...game,
            players: {
                ...game.players,
                [`player${playerId}`]: playerToEdit
            }
        })
    }


    const resetGame = () => {
        setGame({
            current_player : 1,
            isGameStarted : false,
            isGameEnded : false,
            winner: null
        })
    }

    const updatePlayerScore = (playerId, point) => {
        const parsedPoint = parseInt(point)
        if (isNaN(parsedPoint)) return

        setGame({
            ...game,
            players: {
                ...game.players,
                [`player${playerId}`]: {
                    ...game.players[`player${playerId}`],
                    score: game.players[`player${playerId}`].score + parsedPoint
                }
            }
        })
    }

    const updatePlayerName = (playerId, name) => {
        setGame({
            ...game,
            players: {
                ...game.players,
                [`player${playerId}`]: {
                    ...game.players[`player${playerId}`],
                    name
                }
            }
        })
    }

    const updateWinner = (playerId) => {
        setGame({
            ...game,
            winner: game.players[`player${playerId}`]
        })
    }

    const actions = {
        nextPlayer,
        prevPlayer,
        addPlayer,
        removePlayer,
        startGame,
        endGame,
        resetGame,
        updatePlayerScore,
        updatePlayerName,
        updateWinner
    }


    return (
        <GameContext.Provider value={{
            game,
            actions
        }}>
            {children}
        </GameContext.Provider>
    )
}
