import PageProduct from "@/components/products/PageProduct"
import { IProduct } from "@/interfaces"
import Cookies from 'js-cookie'
import type { Metadata } from 'next'
import Script from "next/script"

export const revalidate = 60

async function fetchProduct (product: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product}`)
  const prod: any = res.json()
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/view-content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: prod.name, price: prod.price, url: prod.slug, fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc') })
  })
  return prod
}
 
export async function generateMetadata({
  params
}: {
  params: { product: string }
}): Promise<Metadata> {

  const id = params.product
  const product: IProduct = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`).then((res) => res.json())
 
  return {
    title: product.titleSeo !== '' ? product.titleSeo : product.name,
    description: product.descriptionSeo !== '' ? product.descriptionSeo : `Esta es la pagina del producto ${product.name}`,
    openGraph: {
      title: product.titleSeo !== '' ? product.titleSeo : product.name,
      description: product.descriptionSeo !== '' ? product.descriptionSeo : `Esta es la pagina del producto ${product.name}`,
      images: [product.images[0].url],
    },
  }
}

export default async function ({ params }: { params: { product: string } }) {
  const product: IProduct = await fetchProduct(params.product)

  return (
    <>
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
        fbq('track', 'ViewContent', {content_name: ${product.name}, content_category: ${product.category}, currency: "CLP", value: ${product.price}});
        `,
        }}
      />
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
        __html: `
        fbq('track', 'ViewContent', { content_name: ${product.name}, content_category: ${product.category.category}, currency: "CLP", value: ${product.price} });
        `,
        }}
      />
      <PageProduct product={product} />
    </>
  )
}