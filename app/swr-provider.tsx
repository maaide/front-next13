'use client'
import { PropsWithChildren } from 'react'
import { SWRConfig } from 'swr'

export const SWRProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <SWRConfig value={{
    fetcher: (resource: any, init: any) => fetch(resource, init).then(res => res.json())
  }}>{children}</SWRConfig>
};