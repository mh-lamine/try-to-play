import React, { useContext } from 'react'
import defaultAvatar from '@/assets/default_avatar.svg'
import { GameContext } from '@/contexts_providers/game'

export default function usePlayers() {

  const { game, actions } = useContext(GameContext)
  const players = game.players
  const playersCount = Object.keys(players).filter(player => players[player].playing).length
  const [color, setColor] = React.useState('black')
  const [selectedPlayer, setSelectedPlayer] = React.useState({})






  const handleAddFormSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const playerToAdd = {
      name: form.get('username'),
      color: color,
      playing: true
    }
    actions.addPlayer(playerToAdd)
    
  }


  const handlePlayerSelect = (event) => {
    console.log(event)
    // const player = players.find(player => player.key === parseInt(event))
    // setSelectedPlayer(player)
  }

  const handleColorChange = (color) => {
    setColor(color)
  }




  return {
    playersCount,
    handleColorChange,
    handleAddFormSubmit,
    handlePlayerSelect,
  }

}