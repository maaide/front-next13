"use client"
import DesignContext from '@/context/design/DesignContext'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Spinner2 } from './Spinner2'

export const Subscribe = () => {

  const { design } = useContext(DesignContext)

  const [subscribeData, setSubscribeData] = useState({ email: '', tags: ['Suscriptores'] })
  const [successSubscribe, setSuccessSubscribe] = useState('hidden')
  const [loading, setLoading] = useState(false)

  const inputChange = (e: any) => {
    setSubscribeData({...subscribeData, email: e.target.value})
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, subscribeData)
      if (response.data.email) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/subscription`, { email: response.data.email })
      }
      setSuccessSubscribe('block')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setSuccessSubscribe('block')
      setLoading(false)
    }
  }

  return (
    <div className='w-full bg-neutral-100 pl-4 pr-4 flex dark:bg-neutral-900'>
      <form className='m-auto w-1280 mt-16 mb-16'>
        <h4 className='mb-4 text-[16px] font-semibold tracking-widest text-main text-center md:text-[20px] dark:text-white'>{design.subscription.title !== '' ? design.subscription.title.toUpperCase() : 'SUSCRIBETE EN NUESTRA LISTA PARA RECIBIR OFERTAS EXCLUSIVAS, SORTEOS Y MUCHO MÁS'}</h4>
        <div className='flex'>
          <input type='email' placeholder='Email' value={subscribeData.email} onChange={inputChange} className='p-2 w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:bg-neutral-800' />
          <button className='transition-colors duration-200 w-32 tracking-widest font-medium bg-[#1c1b1b] text-white hover:bg-white hover:text-[#1c1b1b] dark:bg-neutral-700 dark:hover:bg-white' onClick={handleSubmit}>{loading ? <Spinner2 /> : 'ENVÍAR'}</button>
        </div>
        <div className={successSubscribe}>
          <p className='text-green mt-2'>Suscripción realizada con exito</p>
        </div>
      </form>
    </div>
  )
}
