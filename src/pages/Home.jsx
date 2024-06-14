import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GameContext } from '@/contexts_providers/game'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
    const { game } = useContext(GameContext)
    const players = Object.keys(game.players)
    const playersPlaying = players.filter(player => game.players[player].playing)
    
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <Card className="px-5 py-10 w-2/3 flex flex-col items-center gap-y-5">
            <h1 className='text-4xl'>Roland Gamos</h1>
            <p className='text-center'>Bienvenue sur le site du jeu Roland Gamos ! Actuellement, {playersPlaying.length} joueurs sont enregistrés. Pour commencer à jouer, ajouter au moins 2 joueurs. </p>
            <div className='flex gap-x-3 w-full'>
                <Button className="w-full" disabled={playersPlaying.length < 4 ? false : true}><NavLink to='/add_player' className='w-full'>Ajouter {2 - parseInt(playersPlaying.length)} Joueurs</NavLink></Button>
                <Button className="w-full" disabled={playersPlaying.length > 0 ? false : true}><NavLink to='/game' className='w-full'>Jouer</NavLink></Button>
            </div>
        </Card>
    </div>
  )
}
