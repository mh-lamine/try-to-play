import React, { useContext } from 'react'
import defaultAvatar from '@/assets/default_avatar.svg'
import { PlayersContext } from '@/contexts_providers/players'

export default function usePlayers() {
  const playersContext = useContext(PlayersContext)
  const setPlayers = playersContext.setPlayers
  const players = playersContext.players
  const playersCount = players.length
  const [avatar, setAvatar] = React.useState(defaultAvatar)
  const [username, setUsername] = React.useState('')
  const [color, setColor] = React.useState('black')
  const [selectedPlayer, setSelectedPlayer] = React.useState({})


  const handleAvatarChange = (event) => {
    console.log('avatar : ', event)
    // setAvatar(e.target.files[0]); 
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleColorChange = (event) => {
    setColor(event)
  }

  const handleAddFormSubmit = () => {
    const formData = new FormData()
    formData.append('avatar', avatar);
    formData.append('username', username);
    formData.append('color', color);

    const newPlayer = {
      name: formData.get('username'),
      key: players.length + 1,
      color: formData.get('color'),
      avatar: formData.get('avatar')
    }

    if (players.length < 4){
      setPlayers([...players, newPlayer])
      return {
        type: 'success',
        message: 'Player added successfully'
      }
    }
    else{
      return {
        type: "error",
        message: 'You can only have 4 players'
      }
    }
  }


  const handlePlayerSelect = (event) => {
    const player = players.find(player => player.key === parseInt(event))
    setSelectedPlayer(player)
  }

  const handleRemovePlayer = (event) => {
    event.preventDefault()
    const newPlayers = players.filter(player => player.name !== selectedPlayer.name)
    setPlayers(newPlayers)
  }


  return {
    playersCount,
    handleAvatarChange,
    handleUsernameChange,
    handleColorChange,
    handleAddFormSubmit,
    handlePlayerSelect,
    handleRemovePlayer
  }

}