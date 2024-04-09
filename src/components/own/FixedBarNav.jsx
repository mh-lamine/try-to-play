import React from 'react'
import { HiUserRemove } from "react-icons/hi";
import { HiUserAdd } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { FaGamepad } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { NavLink } from 'react-router-dom';

export default function FixedBarNav() {
  return (
    <div className="fixed bottom-5 px-10 rounded py-5 w-full flex justify-center">
        <div className="flex gap-x-4 justify-center items-center bg-slate-300 px-7 py-3 rounded-xl shadow-lg ">
            <div className='pr-2 border-r border-black cursor-pointer'>
                <NavLink to='/home'>
                    <TooltipText text='Accueil'>
                        <FaHome  className='w-8 h-9 hover:translate-y-[-5px] hover:scale-125 hover:mx-5'/>
                    </TooltipText>
                </NavLink>
            </div>
            <div className='pr-2 border-r border-black cursor-pointer'>
                <NavLink to='/game'>
                    <TooltipText text='Jouer'>
                        <FaGamepad  className='w-8 h-9 hover:translate-y-[-5px] hover:scale-125 hover:mx-5'/>
                    </TooltipText>
                </NavLink>
            </div>
            <div className='pr-2 border-r border-black cursor-pointer'>
                <NavLink to='/add_player'>
                    <TooltipText text='Ajouter un Joueur'>
                        <HiUserAdd  className='w-8 h-9 hover:translate-y-[-5px] hover:scale-125 hover:mx-5'/>
                    </TooltipText>
                </NavLink>                
            </div>
            <div className='pr-2 border-r border-black cursor-pointer'>
                <NavLink to='/remove_player'>
                    <TooltipText text='Retirer un Joueur'>
                        <HiUserRemove  className='w-8 h-9 hover:translate-y-[-5px] hover:scale-125 hover:mx-5'/>
                    </TooltipText>
                </NavLink>
            </div>
            <div className='pr-2 cursor-pointer'>
                <NavLink to='/settings'>
                    <TooltipText text='Paramètres'>
                        <IoIosSettings  className='w-8 h-9 hover:translate-y-[-5px] hover:scale-125 hover:mx-5'/>
                    </TooltipText>
                </NavLink>
            </div>
        </div>
    </div>
  )
}



const TooltipText = ({children, text}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}