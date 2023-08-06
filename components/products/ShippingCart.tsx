import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { City, Region, IShipping } from '../../interfaces'
import { FreeShipping, NumberFormat } from '../../utils'

interface Props {
  setShippingCost: any
}

export const ShippingCart: React.FC<Props> = ({ setShippingCost }) => {

  const [regions, setRegions] = useState<Region[]>()
  const [citys, setCitys] = useState<City[]>()
  const [shipping, setShipping] = useState<IShipping[]>()
  const [city, setCity] = useState('')

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
    
  const regionChange = async (e: any) => {
    const region = regions?.find(region => region.regionName === e.target.value.toUpperCase())
    const request = await axios.get(`https://testservices.wschilexpress.com/georeference/api/v1.0/coverage-areas?RegionCode=${region?.regionId}&type=0`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
      }
    })
    setCitys(request.data.coverageAreas)
  }
    
  const cityChange = async (e: any) => {
    const city = citys?.find(city => city.countyName === e.target.value)
    const request = await axios.post('https://testservices.wschilexpress.com/rating/api/v1.0/rates/courier', {
      "originCountyCode": "QNOR",
      "destinationCountyCode": city?.countyCode,
      "package": {
        "weight": "1",
        "height": "10",
        "width": "10",
        "length": "2"
      },
      "productType": 3,
      "contentType": 1,
      "declaredWorth": "2333",
      "deliveryTime": 0
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '512b6b0ff709426d82968a33be83b4a1'
      }
    })
    setShipping(request.data.data.courierServiceOptions)
    setCity(e.target.value)
  }

  const inputChange = (e: any) => {
    setShippingCost(e.target.value)
  }

  return (
    <div>
      <h2 className='text-[15px] tracking-widest text-main font-semibold mb-2 md:text-[18px] dark:text-white'>CALCULA LOS COSTOS DE ENVÍO</h2>
      <select className='text-sm text-main border p-1 rounded-md focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-500 dark:text-white' onChange={regionChange}>
        <option>Seleccionar Región</option>
        {
        regions !== undefined
          ? regions.map(region => <option key={region.regionId}>{region.regionName.toLocaleLowerCase()}</option>)
          : ''
        }
      </select>
      {
        citys !== undefined
        ? <select className='text-sm text-main block border p-1 rounded-md mt-2 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-500 dark:text-white' onChange={cityChange}>
          <option>Seleccionar Ciudad</option>
          {citys.map(city => <option key={city.countyCode}>{city.countyName}</option>)}
        </select>
        : ''
      }
      {
        shipping !== undefined
        ? <div className='flex flex-col gap-1 mt-2 '>
          <span className='mt-1 text-main dark:text-white'>Envíos express:</span>
          {FreeShipping.map(cityFree => {
            if (cityFree === city) {
              return <div className='flex justify-between p-2 border rounded-md dark:border-neutral-500' key={cityFree}>
                <div className='flex gap-2'>
                  <input type='radio' name='shipping' className='envio express' value={0} onChange={inputChange} />
                  <span className='text-sm text-[#444444] dark:text-neutral-400'>Envío gratis en 24 a 48 horas</span>
                </div>
                <span className='text-sm text-[#444444] dark:text-neutral-400'>$0</span>
              </div>
            }
            return null
          })}
          <span className='mt-1 text-main dark:text-white'>Chilexpress:</span>
          {shipping.map(service => (
            <div key={service.serviceDescription} className='flex justify-between p-2 border rounded-md dark:border-neutral-500'>
              <div className='flex gap-2'>
                <input type='radio' name='shipping' className={service.serviceDescription} value={service.serviceValue} onChange={inputChange} />
                <span className='text-sm text-[#444444] dark:text-neutral-400'>{service.serviceDescription}</span>
              </div>
              <span className='text-sm text-[#444444] dark:text-neutral-400'>${NumberFormat(Number(service.serviceValue))}</span>
            </div>
          ))}
        </div>
        : ''
      }
    </div>
  )
}
