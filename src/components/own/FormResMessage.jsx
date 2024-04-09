import React from 'react'
import { Card } from '../ui/card'
import { MdError } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';

export default function FormResMessage({resMessage : {message, type}}) {
    if (!message | !type) return null
    if (message === '' | type === '') {
        return null
    }



  return (
      <div className={`flex gap-x-2 items-center p-3 rounded shadow-sm ${type === "error" ? 'bg-red-600/15' : 'bg-green-600/15'}`}>
        <div>
          {type === 'error' ? <MdError className='h-5 w-5 fill-red-500'/> : <FaCheckCircle className='h-5 w-5 fill-green-500' />}
        </div>
        <p className={type === 'error' ? 'text-red-500' : 'text-green-500'}>{message}</p>
      </div>
  )
}




