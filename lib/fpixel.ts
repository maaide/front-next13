declare global {
  interface Window {
    fbq?: (action: string, name: string, options?: any) => void
  }
}

export const FB_PIXEL_ID: string | undefined = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

export const pageview = (): void => {
  if (typeof window !== 'undefined' && FB_PIXEL_ID) {
    window.fbq?.('track', 'PageView')
  }
}

export const event = (name: string, options: any = {}): void => {
  if (typeof window !== 'undefined' && FB_PIXEL_ID) {
    window.fbq?.('track', name, options)
  }
}