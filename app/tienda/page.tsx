import PageShop from "@/components/shop/PageShop"
import { Metadata } from "next"

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

export default async function Page () {
  const categories = await fetchCategories()

  const products = await fetchProducts()

  return (
    <PageShop categories={categories} products={products} />
  )
}