"use client"
import { Spinner, Spinner2 } from '@/components/ui'
import { City, IAccount, IClient, Region } from '@/interfaces'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditAccountPage = () => {

  const [accountData, setAccountData] = useState<IAccount>({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [clientData, setClientData] = useState<IClient>({
    email: ''
  })
  const [regions, setRegions] = useState<Region[]>()
  const [citys, setCitys] = useState<City[]>()
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  
  const router = useRouter()
  const { data: session } = useSession()

  const user = session?.user as { firstName: string, lastName: string, email: string, _id: string, cart: [] }

  const getAccountData = async () => {
    setLoadingData(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/account/${user._id}`)
    if (response.data) {
      setAccountData(response.data)
    }
    setLoadingData(false)
  }

  useEffect(() => {
    getAccountData()
  }, [])

  const getClientData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-email/${user.email}`)
    if (response.data) {
      setClientData(response.data)
    }
  }

  useEffect(() => {
    getClientData()
  }, [])

  const requestRegions = async () => {
    const request = await axios.get('https://testservices.wschilexpress.com/georeference/api/v1.0/regions', {
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
      }
    })
    setRegions(request.data.regions)
  }

  useEffect(() => {
    requestRegions()
  }, [])

  const inputChange = (e: any) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value })
  }

  const addressChange = (e: any) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value })
  }

  const regionChange = async (e: any) => {
    const region = regions?.find(region => region.regionName === e.target.value)
    const request = await axios.get(`https://testservices.wschilexpress.com/georeference/api/v1.0/coverage-areas?RegionCode=${region?.regionId}&type=0`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
      }
    })
    setCitys(request.data.coverageAreas)
    setClientData({ ...clientData, region: region?.regionName })
  }

  const cityChange = async (e: any) => {
    const city = citys?.find(city => city.countyName === e.target.value)
    setClientData({ ...clientData, city: city?.countyName })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/account/${accountData._id}`, accountData)
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData._id}`, clientData)
    router.push('/cuenta')
    setLoading(false)
  }

  return (
    <div className='w-full px-2'>
      <div className='w-[1000px] m-auto flex flex-col gap-4 py-14'>
        <h1 className='text-3xl font-medium'>EDITAR DATOS</h1>
        {
          loadingData
            ? (
              <div className='w-full flex mt-4'>
                <div className='m-auto'>
                  <Spinner />
                </div>
              </div>
            )
            : (
              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <h2 className='text-xl font-medium'>DATOS DE CONTACTO</h2>
                <div className='flex gap-4'>
                  <div className='flex flex-col w-1/2 gap-2'>
                    <p>Nombre</p>
                    <input type='text' placeholder='Nombre' name='firstName' onChange={inputChange} value={accountData.firstName} className='border p-1 rounded text-[14px] w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                  <div className='flex flex-col w-1/2 gap-2'>
                    <p>Apellido</p>
                    <input type='text' placeholder='Apellido' name='lastName' onChange={inputChange} value={accountData.lastName} className='border p-1 rounded text-[14px] w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                </div>
                <div className='flex flex-col w-full gap-2'>
                  <p>Email</p>
                  <input type='text' placeholder='Email' name='email' onChange={inputChange} value={accountData.email} className='border p-1 rounded text-[14px] w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex flex-col w-full gap-2'>
                  <p>Teléfono</p>
                  <input type='text' placeholder='Telefono' name='phone' onChange={inputChange} value={accountData.phone} className='border p-1 rounded text-[14px] w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <h2 className='text-xl font-medium'>DIRECCIÓN DE ENVÍO</h2>
                <div className='flex flex-col w-full gap-2'>
                  <p>Dirección</p>
                  <input type='text' placeholder='Dirección' name='address' onChange={addressChange} value={clientData.address} className='border p-1 rounded text-[14px] w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex flex-col w-full gap-2'>
                  <p>Detalle (Opcional)</p>
                  <input type='text' placeholder='Detalle' name='details' onChange={addressChange} value={clientData.departament} className='border p-1 rounded text-[14px] w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex gap-4'>
                  <select value={clientData.region} className='border text-sm p-1 rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600 w-1/2' onChange={regionChange}>
                    <option>Seleccionar Región</option>
                    {
                      regions !== undefined
                        ? regions.map(region => <option key={region.regionId}>{region.regionName}</option>)
                        : ''
                    }
                  </select>
                  {
                    citys !== undefined
                      ? <select value={clientData.city} className='block border text-sm p-1 rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600 w-1/2' onChange={cityChange}>
                        <option>Seleccionar Ciudad</option>
                        {citys.map(city => <option key={city.countyCode}>{city.countyName}</option>)}
                      </select>
                      : ''
                  }
                </div>
                <button type='submit' className='h-10 w-52 bg-main text-white font-medium tracking-widest'>{loading ? <Spinner2 /> : 'GUARDAR'}</button>
              </form>
            )
        }
        
      </div>
    </div>
  )
}

export default EditAccountPage