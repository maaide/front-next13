import React, { PropsWithChildren } from 'react'

export const Button2: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <button className='pt-1.5 pb-1.5 pl-6 pr-6 bg-main text-white text-xs font-medium tracking-widest border border-main transition-all duration-200 hover:bg-transparent hover:text-main dark:bg-neutral-700 dark:border-neutral-700 dark:hover:bg-transparent dark:hover:text-neutral-500'>
      { children }
    </button>
  )
}