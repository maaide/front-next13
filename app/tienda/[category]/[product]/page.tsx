import PageProduct from "@/components/products/PageProduct"
import { IProduct } from "@/interfaces"
import Cookies from 'js-cookie'
import type { Metadata } from 'next'

async function fetchProduct (product: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product}`, {
    next: {
      revalidate: 60
    }
  })
  return res.json()
}

async function viewContent (product: IProduct) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/view-content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: product.name, price: product.price, category: product.category, url: product.slug, fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc') })
  })
}
 
export async function generateMetadata({
  params
}: {
  params: { product: string }
}): Promise<Metadata> {

  const id = params.product
  const product: IProduct = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    next: {
      revalidate: 43200
    }
  }).then((res) => res.json())
 
  return {
    title: product.titleSeo,
    description: product.descriptionSeo,
    openGraph: {
      title: product.titleSeo,
      description: product.descriptionSeo,
      images: [product.images[0].url],
    },
  }
}

export default async function ({ params }: { params: { product: string } }) {
  const product: IProduct = await fetchProduct(params.product)

  await viewContent(product)

  return (
    <PageProduct product={product} />
  )
}