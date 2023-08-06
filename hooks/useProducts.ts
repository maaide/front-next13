"use client"
import useSWR, { SWRConfiguration } from 'swr'
import { IProduct } from '../interfaces'

export const useProducts = ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR<IProduct[]>(`${process.env.NEXT_PUBLIC_API_URL}${ url }`, config )

  return {
    products: data || [],
    isLoadingProducts: !error && !data,
    isError: error
  }
}