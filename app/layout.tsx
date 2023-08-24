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
                      <Script
                        id="fb-pixel"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                        __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', ${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID});
                        fbq('track', 'PageView');
                        `,
                        }}
                      />
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
