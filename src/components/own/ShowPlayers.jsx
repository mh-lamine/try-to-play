import React, { useContext } from 'react'
import { GameContext } from '@/contexts_providers/game';

export default function ShowPlayers() {
    const { game } = useContext(GameContext)
    const players = game.players


    
    if (!players) return

    const playersList = Object.values(players).filter(player => player.playing)


    return (
        playersList.map((player, index) => {

            const classNameTopBottom = (index === 0) | (index === 1) ? 'top-0 rounded-b-lg' : 'bottom-0 rounded-t-lg'
            const classNameLeftRight = index % 2 === 0 ? 'left-0 bg-gradient-to-r justify-end' : 'right-0 bg-gradient-to-l justify-start'
            const classNameBgColor = ((player.color === 'black')) ? `from-white to-${player.color}` : `from-${player.color}-50 to-${player.color}-600`
            const classNameTextColor = player.color === 'black' ? 'text-white' : 'text-black'
            const classNameScorePosition = `${(player.id === 1) | (player.id === 3) ? 'right-5' : 'left-5'} bottom-1`
            return (
                <div className={`from-0% to-45%  w-1/3 border fixed ${classNameTopBottom} ${classNameLeftRight} ${classNameBgColor} ${classNameTextColor}`} key={index}>
                    <div className='bg-gradient-to-r bg-gradient-to-l from-white to-black  from-blue-50 to-blue-600 from-red-50 to-red-600 from-green-50 to-green-600 from-yellow-50 to-yellow-600 from-purple-50 to-purple-600 from-pink-50 to-pink-600 hidden'></div>
                    <div className={`w-full px-10 py-3 relative ${index % 2 === 0 ? 'text-end' : 'text-start'}`}>
                        <p className={`absolute ${classNameScorePosition} text-2xl `}>{player.score}<span className='text-lg'>pts</span></p>
                        <div className={`${index % 2 ? 'px-[80px]' : 'px-24'}`}>
                            <span className='font-bold'>{player.name}</span>
                        </div>
                    </div>
                </div>
                
            )
        })
    )
    
}
