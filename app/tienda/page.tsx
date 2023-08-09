import PageShop from "@/components/shop/PageShop"
import { IDesign } from "@/interfaces"

async function fetchCategories () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    next: {
      revalidate: 60
    }
  })
  return res.json()
}

async function fetchProducts () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: {
      revalidate: 60
    }
  })
  return res.json()
}

export async function generateMetadata() {
  const design: IDesign = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
    next: {
      revalidate: 43200
    }
  }).then(res => res.json())

  return {
    title: design.home.seo.metaTitle
  }
}

export default async function Page () {
  const categories = await fetchCategories()

  const products = await fetchProducts()

  return (
    <PageShop categories={categories} products={products} />
  )
}