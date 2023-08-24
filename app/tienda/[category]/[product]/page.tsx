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
      <PageProduct product={product} />
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
        __html: `
        fbq('track', 'ViewContent', { content_name: ${product.name}, content_category: ${product.category.category}, currency: "CLP", value: ${product.price} });
        `,
        }}
      />
    </>
  )
}