import PageShop from "@/components/shop/PageShop"
import { IDesign } from "@/interfaces"
import { Metadata } from "next"

export const revalidate = 60

async function fetchCategories () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
  return res.json()
}

async function fetchProducts () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  return res.json()
}

export async function generateMetadata(): Promise<Metadata> {
  const design: IDesign = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`).then(res => res.json())

  return {
    title: design.shop.metaTitle !== '' ? design.shop.metaTitle : 'Tienda',
    description: design.shop.metaDescription !== '' ? design.shop.metaDescription : 'Aquí encontraras los productos de la tienda',
    openGraph: {
      title: design.shop.metaTitle !== '' ? design.shop.metaTitle : 'Tienda',
      description: design.shop.metaDescription !== '' ? design.shop.metaDescription : 'Aquí encontraras los productos de la tienda',
      images: [design.shop.banner?.url ? design.shop.banner.url : '']
    }
  }
}

export default async function Page () {
  const categories = await fetchCategories()

  const products = await fetchProducts()

  return (
    <PageShop categories={categories} products={products} />
  )
}