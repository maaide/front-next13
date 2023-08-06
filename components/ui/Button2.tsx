import React, { PropsWithChildren } from 'react'

export const Button2: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <button className='pt-1.5 pb-1.5 pl-6 pr-6 rounded-md bg-main text-white text-sm'>
      { children }
    </button>
  )
}