"use client"
import { Spinner2, Spinner } from '@/components/ui'
import { ISell } from '@/interfaces'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function AccountPage () {

  const [closeLoading, setCloseLoading] = useState(false)
  const [buys, setBuys] = useState<ISell[]>([])
  const [loadingSells, setLoadingSells] = useState(false)

  const { data: session } = useSession()

  const user = session?.user as { firstName: string, lastName: string, email: string, _id: string, cart: [] }

  const getBuys = async () => {
    setLoadingSells(true)
    if (user?.email) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sells-client/${user.email}`)
      if (response.data.length) {
        setBuys(response.data)
      }
      setLoadingSells(false)
    }
  }

  useEffect(() => {
    getBuys()
  }, [user])

  const handleLogout = async () => {
    setCloseLoading(true)
    await signOut({ callbackUrl: '/' })
    setCloseLoading(false)
  }

  return (
    <div className='w-full px-2'>
      <div className='w-full max-w-[1280px] m-auto flex flex-col gap-4 py-14'>
        <h1 className='text-3xl font-medium'>HOLA{user?.firstName ? ` ${user.firstName.toUpperCase()}!` : '!'}</h1>
        <div className='w-full block gap-8 lg:flex'>
          <div className='w-full flex flex-col gap-2 sm:w-1/2 lg:w-1/4'>
            <h2 className='text-xl font-medium'>CUENTA</h2>
            <Link className='p-1.5 rounded-md hover:bg-neutral-100 transition-colors duration-100 dark:hover:bg-neutral-800' href='/cuenta/editar-datos'>Editar datos</Link>
            <button onClick={handleLogout} className='bg-main font-medium tracking-widest text-white h-10 dark:bg-neutral-800'>{closeLoading ? <Spinner2/> : 'CERRAR SESIÓN'}</button>
          </div>
          <div className='w-full mt-4 flex flex-col gap-4 lg:mt-0 lg:w-3/4'>
            <h2 className='text-xl font-medium'>TUS COMPRAS</h2>
            {
              loadingSells
                ? (
                  <div className='w-full flex mt-4'>
                    <div className='m-auto'>
                      <Spinner />
                    </div>
                  </div>
                )
                : buys.length
                  ? (
                    <table>
                      <thead>
                        <th>Numero de compra</th>
                        <th>Estado</th>
                        <th>Total</th>
                      </thead>
                      {
                        buys.map(buy => (
                          <tbody>
                            <td>{buy.buyOrder}</td>
                            <td>{buy.state} / {buy.shippingState}</td>
                            <td>${NumberFormat(buy.total)}</td>
                          </tbody>
                        ))
                      }
                    </table>
                  )
                  : <p>No hay compras</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}