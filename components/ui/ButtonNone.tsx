import React, { PropsWithChildren } from 'react'

export const ButtonNone: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <button className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-button/70 text-white cursor-not-allowed'>
      { children }
    </button>
  )
}
