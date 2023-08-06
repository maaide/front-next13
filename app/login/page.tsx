"use client"
import { Spinner2 } from '@/components/ui'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'

export default function LoginPage () {

  const [page, setPage] = useState('Ingresar')
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })
  const [register, setRegister] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassrword: ''
  })
  const [error, setError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)

  const router = useRouter()

  const loginHandleSubmit = async (e: any) => {
    e.preventDefault()
    setLoginLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email: login.email,
      password: login.password,
      redirect: false
    })
    setLoginLoading(false)
    if (res?.error) return setError(res.error)
    if (res?.ok) return router.push('/cuenta')
  }

  const registerHandleSubmit = async (e: any) => {
    e.preventDefault()
    setRegisterLoading(true)
    setError('')
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, register)
    if (response.data.message) setError(response.data.message)
    const res = await signIn('credentials', {
      email: response.data.email,
      password: register.password,
      redirect: false
    })
    setRegisterLoading(false)
    if (res?.error) return setError(res.error)
    if (res?.ok) return router.push('/cuenta')
  }

  return (
    <div className='w-full flex px-2'>
      <div className='flex flex-col gap-4 w-[500px] m-auto py-32'>
        {
          error !== ''
            ? (
              <div className='bg-red-600 w-full py-2 flex text-white'>
                <p className='m-auto'>{error}</p>
              </div>
            )
            : ''
        }
        <h1 className='text-3xl font-medium'>CUENTA</h1>
        <div className='flex gap-2'>
          <button onClick={() => setPage('Ingresar')} className={`${page === 'Ingresar' ? 'border-neutral-700' : 'border-white dark:border-transparent'} w-1/2 border-b-2 h-10`}>Ingresar</button>
          <button onClick={() => setPage('Registrarse')} className={`${page === 'Registrarse' ? 'border-neutral-700' : 'border-white dark:border-transparent'} w-1/2 border-b-2 h-10`}>Resgistrarse</button>
        </div>
        {
          page === 'Ingresar'
            ? (
              <form onSubmit={loginHandleSubmit} className='flex flex-col gap-4 w-full m-auto py-32'>
                <div className='flex flex-col gap-2'>
                  <p>Email</p>
                  <input type='text' placeholder='Email' onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin({ ...login, email: e.target.value })} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p>Contraseña</p>
                  <input type='password' placeholder='******' onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin({ ...login, password: e.target.value })} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <button type='submit' className='w-full h-10 tracking-widest font-medium bg-main text-white'>{loginLoading ? <Spinner2 /> : 'INGRESAR'}</button>
                <Link href='/'>Olvide mi contraseña</Link>
              </form>
            )
            : (
              <form onSubmit={registerHandleSubmit} className='flex flex-col gap-4 w-full m-auto py-32'>
                <div className='flex flex-col gap-2'>
                  <p>Nombre</p>
                  <input type='text' placeholder='Nombre' onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister({ ...register, firstName: e.target.value })} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p>Apellido</p>
                  <input type='text' placeholder='Apellido' onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister({ ...register, lastName: e.target.value })} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p>Email</p>
                  <input type='text' placeholder='Email' onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister({ ...register, email: e.target.value })} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p>Contraseña</p>
                  <input type='password' placeholder='******' onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister({ ...register, password: e.target.value })} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p>Confirmar contraseña</p>
                  <input type='text' placeholder='******' onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister({ ...register, confirmPassrword: e.target.value })} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <button type='submit' className='w-full h-10 tracking-widest font-medium bg-main text-white'>{registerLoading ? <Spinner2 /> : 'REGISTRARSE'}</button>
              </form>
            )
        }
      </div>
    </div>
  )
}