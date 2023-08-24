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
import Script from 'next/script'
import { Chat } from '@/components/chat'
import { FacebookPixel } from '@/components/facebook'

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
                      <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
                      <Script id="google-analytics">
                        {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                
                          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                        `}
                      </Script>
                      <FacebookPixel />
                      <style jsx global>{`
                        p, span, button, a, input, textarea, select {
                          font-family: ${poppins.style.fontFamily};
                        }
                        h1, h2, h3, h4, h5 {
                          font-family: ${montserrat.style.fontFamily};
                        }
                      `}</style>
                      {children}
                      <Chat />
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
