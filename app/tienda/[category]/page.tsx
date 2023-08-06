import PageCategory from "@/components/categories/PageCategory"
import { ICategory, IProduct } from "@/interfaces"

async function fetchCategory (category: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${category}`, {
    next: {
      revalidate: 60
    }
  })
  return res.json()
}

async function fetchProducts (category: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products-category/${category}`, {
    next: {
      revalidate: 60
    }
  })
  return res.json()
}

export default async function Page ({ params }: { params: { category: string } }) {
  const category: ICategory = await fetchCategory(params.category)

  const products: IProduct[] = await fetchProducts(category.category)

  return (
    <PageCategory category={category} products={products} />
  )
}