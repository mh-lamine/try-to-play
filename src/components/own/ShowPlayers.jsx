import { PlayersContext } from '@/contexts_providers/players'
import React, { useContext } from 'react'
import defaultAvatar from '@/assets/default_avatar.svg';
import { Popover, PopoverContent } from '../ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';

export default function ShowPlayers() {
    const playersContext = useContext(PlayersContext)
    const players = playersContext.players


    
    if (!players || players.length === 0) return


    return (
        players.map((player, index) => {
            const classNameTopBottom = (player.key === 1) | (player.key === 2) ? 'top-0' : 'bottom-0'
            const classNameLeftRight = index % 2 === 0 ? 'left-0' : 'right-0'
            const classNameBgColor = ((player.color === 'black') | (player.color === 'white')) ? `bg-${player.color}` : `bg-${player.color}-600`
            const classNameTextColor = player.color === 'black' ? 'text-white' : 'text-black'
            return (
                <div className={`flex border rounded items-center gap-x-3 px-10 py-3 fixed ${classNameTopBottom} ${classNameLeftRight} ${classNameBgColor} ${classNameTextColor}`} key={index}>
                    <div className='bg-blue-600 bg-white bg-black bg-red-600 bg-yellow-600 bg-green-600 hidden'>
                    </div>
                    <img src={player.avatar !== 'default' ? player.avatar : defaultAvatar} alt='avatar' className='w-5 h-50 rounded-full'/>
                    <span>{player.name}</span>
                </div>
                
            )
        })
    )
    
}
