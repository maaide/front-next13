import { ICategory, IPost, IProduct } from '@/interfaces';
import { MetadataRoute } from 'next'

type Route = {
  url: string;
  lastModified: string;
};
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  const routesMap = [''].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_WEB_URL}${route}`,
    lastModified: new Date().toISOString()
  }))

  async function getCategories(): Promise<ICategory[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: {
        revalidate: 60
      }
    })
    return res.json()
  }
  
  const categoriesPromise = getCategories().then((categories) =>
    categories.map(category => ({
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/tienda/${category.slug}`,
      lastModified: new Date().toISOString()
    }))
  )

  async function getProducts(): Promise<IProduct[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: {
        revalidate: 60
      }
    })
    return res.json()
  }

  const productsPromise = getProducts().then((products) =>
    products.map(product => ({
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/tienda/${product.category.slug}/${product.slug}`,
      lastModified: new Date().toISOString()
    }))
  )

  async function getPosts(): Promise<IPost[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/posts`, {
      next: {
        revalidate: 60
      }
    })
    return res.json()
  }

  const postsPromise = getPosts().then((posts) =>
    posts.map(post => ({
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/blog/${post._id}`,
      lastModified: new Date().toISOString()
    }))
  )

  let fetchedRoutes: Route[] = []

  try {
    fetchedRoutes = (await Promise.all([categoriesPromise, productsPromise, postsPromise])).flat()
  } catch (error) {
    throw JSON.stringify(error, null, 2)
  }
  
  return [...routesMap, ...fetchedRoutes]
}