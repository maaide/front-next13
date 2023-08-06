import React, { PropsWithChildren } from 'react'

export const Button: React.FC<PropsWithChildren> = ({ children }) => {

  return (
    <button className='pt-2.5 transition-colors duration-200 pb-2.5 pl-7 pr-7 tracking-widest font-semibold bg-[#1c1b1b] text-white hover:bg-white hover:text-[#1c1b1b]'>
      { children }
    </button>
  )
}
