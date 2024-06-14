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

    const isSameName = Object.values(players).some(player => player.name === playerToAdd.name)
    if (isSameName) {
      return {
        type: 'error',
        message: 'Player with the same name already exists'
      }
    }
    actions.addPlayer(playerToAdd)
    return {
      type: 'success',
      message: 'Player added successfully'
    }
  }

  const handleRemoveFormSubmit = (e) => {
    e.preventDefault()
    if (!selectedPlayer) return { type: 'error', message: 'Please select a player to remove' }
    actions.removePlayer(selectedPlayer.id)
    return { type: 'success', message: 'Player removed successfully' }
  }


  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player)
  }

  const handleColorChange = (color) => {
    setColor(color)
  }




  return {
    playersCount,
    handleColorChange,
    handleAddFormSubmit,
    handlePlayerSelect,
    handleRemoveFormSubmit
  }

}