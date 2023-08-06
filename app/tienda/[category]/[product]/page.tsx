import PageProduct from "@/components/products/PageProduct"
import { ICategory, IProduct } from "@/interfaces"
import Cookies from 'js-cookie'

async function fetchProduct (product: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product}`)
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

export default async function ({ params }: { params: { product: string } }) {
  const product: IProduct = await fetchProduct(params.product)

  await viewContent(product)

  return (
    <PageProduct product={product} />
  )
}