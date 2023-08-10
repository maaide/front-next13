import PageCategory from "@/components/categories/PageCategory"
import { ICategory, IProduct } from "@/interfaces"
import { Metadata } from "next"

export const revalidate = 60

async function fetchCategory (category: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${category}`)
  return res.json()
}

async function fetchProducts (category: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products-category/${category}`)
  return res.json()
}

export async function generateMetadata({
  params
}: {
  params: { category: string }
}): Promise<Metadata> {

  const id = params.category
  const category: ICategory = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`).then((res) => res.json())

  return {
    title: category.titleSeo,
    description: category.descriptionSeo,
    openGraph: {
      title: category.titleSeo,
      description: category.descriptionSeo,
      images: [category.image?.url ? category.image?.url : ''],
    },
  }
}

export default async function Page ({ params }: { params: { category: string } }) {
  const category: ICategory = await fetchCategory(params.category)

  const products: IProduct[] = await fetchProducts(category.category)

  return (
    <PageCategory category={category} products={products} />
  )
}