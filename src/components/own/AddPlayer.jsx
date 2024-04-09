import React from 'react'
import { Card } from '../ui/card'
import usePlayers from '@/hook/usePlayers'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import defaultAvatar from '@/assets/default_avatar.svg';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import FormResMessage from './FormResMessage'
import { NavLink } from 'react-router-dom'

export default function AddPlayer() {
    const [resMessage, setResMessage] = React.useState({
        type: '',
        message: ''
    })

    const { playersCount, handleAvatarChange, handleUsernameChange, handleColorChange, handleAddFormSubmit } = usePlayers()
    const refDivAvatar = React.useRef(null)
    
    
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const resMessageResponse = handleAddFormSubmit(e)
        setResMessage(resMessageResponse)
    }

    const handleChangeAvatarClick = () => {
        refDivAvatar.current.classList.toggle('hidden')
    }
    return (
        <div className='fixed h-full w-full flex justify-center items-center'>
            <Card className='w-1/2 p-10'>
                <h2 className='text-3xl capitalize text-center'>Ajouter un Joueur</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className='flex flex-col gap-y-5 mt-5'>
                        <img src={defaultAvatar} alt='avatar' className='w-20 h-20 rounded-full mx-auto' />
                        <span className='underline text-center text-sm cursor-pointer' onClick={handleChangeAvatarClick}>Modifier l'avatar</span>
                        <div className='hidden' ref={refDivAvatar}>
                            <Label htmlFor='avatar'>Avatar</Label>
                            <Input type='file' id='avatar' onChange={handleAvatarChange}/>
                        </div>

                        <Label htmlFor='username'>Nom d'utilisateur</Label>
                        <Input type='text' id='username' onChange={handleUsernameChange}/>

                        <Label htmlFor='color'>Couleur</Label>
                        <Select id="color" onValueChange={handleColorChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Noir" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="black">
                                    <div className="flex items-center gap-2 px-2 py-1">
                                        <div className="w-4 h-4 bg-black rounded-full"></div>
                                        <span>Noir</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="white">
                                    <div className="flex items-center gap-2 px-2 py-1">
                                        <div className="w-4 h-4 bg-white border rounded-full"></div>
                                        <span>Blanc</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="red">
                                    <div className="flex items-center gap-2 px-2 py-1">
                                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                        <span>Rouge</span>
                                    </div>    
                                </SelectItem>
                                <SelectItem value="blue">
                                    <div className="flex items-center gap-2 px-2 py-1">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                        <span>Bleu</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="green">
                                    <div className="flex items-center gap-2 px-2 py-1">
                                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                        <span>Vert</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="yellow">
                                    <div className="flex items-center gap-2 px-2 py-1">
                                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                        <span>Jaune</span>
                                    </div>
                                </SelectItem>
                                
                            </SelectContent>
                        </Select>

                        {resMessage && <FormResMessage resMessage={resMessage}/>}
                        <Button type='submit'>Ajouter le joueur</Button>
                    </div>
                        {(playersCount >= 2 && resMessage.type === "success") && <div className='my-2'> 
                            <Button className='w-full'><NavLink to='/game'>Jouer</NavLink></Button>
                        </div>}
                </form>
                
            </Card>
        </div>
    )
}
