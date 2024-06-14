import React from 'react'
import { Card } from '../ui/card'
import { MdError } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';
import { ScaleLoader } from 'react-spinners';


export default function FormResMessage({resMessage : {message, type}}) {
    if (!message | !type) return null
    if (message === '' | type === '') {
        return null
    }



  return (
      <div className={`flex gap-x-2 items-center px-6 py-3 rounded shadow-md ${type === "error" ? 'bg-red-600/15' : type === 'success' ? 'bg-green-600/15' : 'bg-yellow-600/15'}`}>
        <div>
          {type === 'error' ? <MdError className='h-5 w-5 fill-red-500'/> : type === 'success' ? <FaCheckCircle className='h-5 w-5 fill-green-500' /> : <ScaleLoader className='w-max h-auto' color='#C27803' /> }
        </div>
        <p className={type === 'error' ? 'text-red-500' : type === 'success' ? 'text-green-500' : 'text-yellow-600'}>{message}</p>
      </div>
  )
}




