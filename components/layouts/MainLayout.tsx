"use client"
import React, { PropsWithChildren, useState } from 'react'
import { Footer, Navbar, Subscribe } from '../ui'
import { usePathname } from 'next/navigation'

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {

  const [menu, setMenu] = useState('w-0 pl-0 pr-0 pt-6 pb-6')
  const [index, setIndex] = useState('hidden')
  const pathname = usePathname()

  return (
    <>
      <Navbar menu={menu} setMenu={setMenu} setIndex={setIndex} index={index}>
        { children }
        {
          pathname !== '/finalizar-compra'
            ? <>
              <Subscribe />
              <Footer />
            </>
            : ''
        }
      </Navbar>
    </>
  )
}
