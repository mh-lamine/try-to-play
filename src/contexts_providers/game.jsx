import { createContext, useState } from "react"

export const GameContext = createContext({
    game: {
        players: {
            1: {
                id: 1,
                score: 0,
                name: 'Player 1',
                color: 'black',
                playing: false
            },
            2: {
                id: 2,
                score: 0,
                name: 'Player 2',
                color: 'red',
                playing: false
            },
            3: {
                id: 3,
                score: 0,
                name: 'Player 3',
                color: 'green',
                playing: false
            },
            4: {
                id: 4,
                score: 0,
                name: 'Player 4',
                color: 'blue',
                playing: false
            }
        },
        current_player : 1,
        isGameStarted : false,
        winner: null
    },
    actions: {
        nextPlayer: () => {},
        prevPlayer: () => {},
        addPlayer: () => {},
        removePlayer: () => {},
        startGame: () => {},
        updateScore: () => {},
        endGame: () => {},
        resetGame: () => {}
    }
})


export function GameProvider({children}) {
    const [game, setGame] = useState({
        players: {
            player1: {
                id: 1,
                score: 0,
                name: 'Player 1',
                color: 'black',
                playing: false
            },
            player2: {
                id: 2,
                score: 0,
                name: 'Player 2',
                color: 'red',
                playing: false
            },
            player3: {
                id: 3,
                score: 0,
                name: 'Player 3',
                color: 'green',
                playing: false
            },
            player4: {
                id: 4,
                score: 0,
                name: 'Player 4',
                color: 'blue',
                playing: false
            }
        },
        current_player : 1,
        isGameStarted : false,
        winner: null
    })

    const nextPlayer = () => {
        const playersPlaying = Object.values(game.players).filter(player => player.playing)
        setGame({
            ...game,
            current_player: game.current_player === playersPlaying.length ? 1 : game.current_player + 1
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
        const playersPlaying = Object.values(game.players).filter(player => player.playing)
        const winner = playersPlaying.reduce((prev, current) => (prev.score > current.score) ? prev : current)

        setGame({
            ...game,
            isGameStarted: false,
            winner: winner
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
        const players = Object.values(game.players)
        setGame({
            players: {
                1: {
                    id: 1,
                    score: 0,
                    name: players[0].name,
                    color: 'black',
                    playing: false
                },
                2: {
                    id: 2,
                    score: 0,
                    name: 'Player 2',
                    color: 'red',
                    playing: false
                },
                3: {
                    id: 3,
                    score: 0,
                    name: 'Player 3',
                    color: 'green',
                    playing: false
                },
                4: {
                    id: 4,
                    score: 0,
                    name: 'Player 4',
                    color: 'blue',
                    playing: false
                }
            },
            current_player : 1,
            isGameStarted : false,
            winner: null
        })
    }


    const updateScore = (playerId, success) => {
        const playerToEdit = game.players[`player${playerId}`]
        playerToEdit.score = success ? playerToEdit.score + 1 : playerToEdit.score

        if (playerToEdit.score === 10){
            endGame()
        }
        else{
            setGame({
                ...game,
                players: {
                    ...game.players,
                    [`player${playerId}`]: playerToEdit
                }
            })
        }

    }






    const actions = {
        nextPlayer,
        prevPlayer,
        addPlayer,
        removePlayer,
        startGame,
        updateScore,
        endGame,
        resetGame
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
