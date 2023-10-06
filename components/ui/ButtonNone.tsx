import React, { PropsWithChildren } from 'react'

export const ButtonNone: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <button className='py-2 w-52 text-sm border border-button tracking-widest transition-all duration-200 h-fit bg-button font-medium text-white cursor-not-allowed 450:w-64'>
      { children }
    </button>
  )
}
