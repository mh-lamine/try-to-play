import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PlayersContext } from '@/contexts_providers/players'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
    const players = useContext(PlayersContext).players
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <Card className="px-5 py-10 w-2/3 flex flex-col items-center gap-y-5">
            <h1 className='text-4xl'>Roland Gamos</h1>
            <p className='text-center'>Bienvenue sur le site du jeu Roland Gamos ! Actuellement, {players.length} joueurs sont enregistrés. Pour commencer à jouer, ajouter au moins 2 joueurs. </p>
            <div className='flex gap-x-3 w-full'>
                <Button className="w-full" disabled={players.length < 4 ? false : true}><NavLink to='/add_player' className='w-full'>Ajouter {2 - parseInt(players.length)} Joueurs</NavLink></Button>
                <Button className="w-full" disabled={players.length > 0 ? false : true}><NavLink to='/game' className='w-full'>Jouer</NavLink></Button>
            </div>
        </Card>
    </div>
  )
}
