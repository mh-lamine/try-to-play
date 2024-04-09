import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React from 'react'
import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Card className='px-5 py-10 flex flex-col items-center gap-y-3'>
        <h1 className='text-4xl'>Erreur 404</h1>
        <p className='w-[80%] text-center'>La page que vous souhaitez atteindre est introuvable. Vérifiez l'URL et réessayez.</p>
        <Button><NavLink to="/home">Aller à la page d'accueil</NavLink></Button>
      </Card>
    </div>
  )
}
