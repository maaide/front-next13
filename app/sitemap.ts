import { ICategory, IPost, IProduct } from '@/interfaces'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  async function getCategories(): Promise<ICategory[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: {
        revalidate: 43200
      }
    })
    return res.json()
  }
  
  const categories = await getCategories()
  const categoriesUrls =
    categories.map(category => {
      return {
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/tienda/${category.slug}`,
        lastModified: new Date()
      }
    }) ?? []

  async function getProducts(): Promise<IProduct[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: {
        revalidate: 43200
      }
    })
    return res.json()
  }

  const products = await getProducts()
  const productsUrls =
    products.map(product => {
      return {
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/tienda/${product.category.slug}/${product.slug}`,
        lastModified: new Date()
      }
    }) ?? []

  async function getPosts(): Promise<IPost[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      next: {
        revalidate: 43200
      }
    })
    return res.json()
  }

  const posts = await getPosts()
  const postsUrls =
    posts.map(post => {
      return {
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/blog/${post._id}`,
        lastModified: new Date()
      }
    }) ?? []
  
  return [
    {
      url: process.env.NEXT_PUBLIC_WEB_URL!,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/tienda`,
      lastModified: new Date ()
    },
    {
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/blog`,
      lastModified: new Date ()
    },
    ...categoriesUrls,
    ...productsUrls,
    ...postsUrls
  ]
}