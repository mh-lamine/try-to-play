import React, { useContext } from 'react'
import { Card } from '../ui/card'
import { Label } from '@/components/ui/label';
import defaultAvatar from '@/assets/default_avatar.svg';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '../ui/button';
import usePlayers from '@/hook/usePlayers';
import { GameContext } from '@/contexts_providers/game';

export default function RemovePlayer() {
    const { game } = useContext(GameContext)
    const players = Object.values(game.players).filter(player => player.playing)


    const { handlePlayerSelect, handleRemovePlayer } = usePlayers()

    if (!players || players.length === 0) return (
        <div className='fixed h-full w-full flex justify-center items-center'>
            <Card className='w-1/2 p-10'>
                <h2 className='text-3xl capitalize text-center'>Remove a Player</h2>
                <div className='flex flex-col gap-y-5 mt-5'>
                    <p className='text-center'>No players to remove</p>
                </div>
            </Card>
        </div>
    )
    return (
        <div className='fixed h-full w-full flex justify-center items-center'>
            <Card className='w-1/2 p-10'>
                <h2 className='text-3xl capitalize text-center'>Remove a Player</h2>
                <form onSubmit={handleRemovePlayer}>
                    <div className='flex flex-col gap-y-5 mt-5'>
                        <Label htmlFor="player">Player to Remove</Label>
                        <Select id="player" onValueChange={handlePlayerSelect}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder='Choose Player to Remove...' />
                            </SelectTrigger>
                            <SelectContent>
                                <div className='bg-black bg-blue-600 bg-red-600 bg-green-600 bg-yellow-600 bg-purple-600 bg-pink-600 hidden'></div>
                                {players.map((player, index) => {
                                    return (
                                        <SelectItem value={player.name} key={index}>
                                            <div className="flex items-center gap-2 px-2 py-1">
                                                <div className={`w-4 h-4 ${player.color === 'black' ? 'bg-black' : `bg-${player.color}-600`} rounded-full`}></div>
                                                <span>{player.name}</span>
                                            </div>
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                        <Button className='w-full'>Remove</Button>
                    </div>
                </form>
                
            </Card>
        </div>
    )
}
