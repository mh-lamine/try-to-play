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
import { PlayersContext } from '@/contexts_providers/players';
import usePlayers from '@/hook/usePlayers';

export default function RemovePlayer() {
    const contextPlayer = useContext(PlayersContext)
    const players = contextPlayer.players
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
                                <SelectValue placeholder={(players[0].name).toString()} />
                            </SelectTrigger>
                            <SelectContent>
                                {players.map((player, index) => {
                                    return (
                                        <SelectItem value={(player.key).toString()} key={index}>
                                            <div className="flex items-center gap-2 px-2 py-1">
                                                <div className=" bg-white border rounded-full">
                                                    <img src={player.avatar === 'default' ? defaultAvatar : player.avatar} alt='avatar' className='w-4 h-4 m-1'/>
                                                </div>
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
