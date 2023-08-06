"use client"
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Montserrat } from 'next/font/google'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import LogoProvider from '@/context/logo/LogoProvider'
import DesignProvider from '@/context/design/DesignProvider'
import CartProvider from '@/context/cart/CartProvider'
import { MainLayout } from '@/components/layouts'
import { SWRProvider } from './swr-provider'

const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  preload: false,
  subsets: ['latin']
})

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  preload: false,
  subsets: ['latin']
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <SWRProvider>
          <SessionProvider>
            <ThemeProvider attribute='class'>
              <DesignProvider>
                <LogoProvider>
                  <CartProvider>
                    <MainLayout>
                      <style jsx global>{`
                        p, span, button, a, input, textarea, select {
                          font-family: ${poppins.style.fontFamily};
                        }
                        h1, h2, h3, h4, h5 {
                          font-family: ${montserrat.style.fontFamily};
                        }
                      `}</style>
                      {children}
                    </MainLayout>
                  </CartProvider>
                </LogoProvider>
              </DesignProvider>
            </ThemeProvider>
          </SessionProvider>
        </SWRProvider>
      </body>
    </html>
  )
}
