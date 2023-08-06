"use client"
import { useCategories } from "@/hooks"
import { ICategory, IProduct } from "@/interfaces"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { CategoriesShop, Spinner } from "../ui"
import ProductCard3 from "../products/ProductCard3"

export default function PageCategory ({category, products}: { category: ICategory, products: IProduct[] }) {
    
  const [filterProducts, setFilterProducts] = useState<IProduct[]>(products)
  const { categories } = useCategories('/categories')

  const [bgOpacity, setBgOpacity] = useState('opacity-0')
  const [bgOpacityImage, setBgOpacityImage] = useState('opacity-0')

  useEffect(() => {
    setBgOpacity('opacity-1')
  }, [])

  const applyFilter = (e: any) => {
    if (products.length) {
      const filter = products.filter(product => product.category.category === category.category)
      if (e.target.value === 'Más recientes') {
        setFilterProducts(filter.reverse())
      } else if (e.target.value === 'Mayor precio') {
        setFilterProducts([...filter].sort((prev, curr) => curr.price - prev.price))
      } else if (e.target.value === 'Menor precio') {
        setFilterProducts([...filter].sort((prev, curr) => prev.price - curr.price))
      }
    }
  }

  return (
    <>
      {
        category.banner
          ? (
            <div className={`${bgOpacityImage} transition-opacity duration-200 bg-gradient-to-r from-sky-500 to-indigo-500 flex h-96`}>
              <div className='w-1280 m-auto pl-4 pr-4 z-10'>
                <h1 className='text-[25px] font-semibold tracking-widest text-white mb-4 text-center md:text-[32px]'>{category.category.toUpperCase()}</h1>
                <p className='text-lg text-white w-full text-center'>{category.description}</p>
              </div>
              <Image onLoadingComplete={() => setBgOpacityImage('opacity-1')} className='absolute z-0 h-96 w-full object-cover' src={category.banner.url} alt='Banner categoria' width={1920} height={1080} />
            </div>
          )
          : (
            <div className={`${bgOpacity} transition-opacity duration-200 bg-gradient-to-r from-sky-500 to-indigo-500 flex h-96`}>
              <div className='w-1280 m-auto pl-4 pr-4 z-10'>
                <h1 className='text-[25px] font-semibold tracking-widest text-white mb-4 text-center md:text-[32px]'>{category.category.toUpperCase()}</h1>
                <p className='text-lg text-white w-full text-center'>{category.description}</p>
              </div>
            </div>
          )
      }
      <CategoriesShop categories={categories} />
      <div className='flex px-4'>
        <div className='w-1280 m-auto flex gap-4 pt-4 pb-4 flex-wrap'>
          <select onChange={applyFilter} className='text-sm p-1.5 border rounded-md w-48'>
            <option>Más recientes</option>
            <option>Mayor precio</option>
            <option>Menor precio</option>
          </select>
        </div>
      </div>
      {
        filterProducts
          ? filterProducts.length === 0
            ? (
              <div className='flex'>
                <div className='w-1280 m-auto flex gap-2 pt-4 pb-4 flex-wrap'>
                  <p className='text-lg'>No hay productos en esta categoria</p>
                </div>
              </div>
            )
            : (
              <div className='flex'>
                <div className='w-1280 m-auto flex gap-2 pt-4 pb-4 flex-wrap'>
                  {
                    filterProducts.map(product => (
                      <ProductCard3 key={product._id} product={product} category={category} />
                    ))
                  }
                </div>
              </div>
            )
          : (
            <div className="flex w-full">
              <div className="m-auto mt-16 mb-16">
                <Spinner />
              </div>
            </div>
          )
      }
    </>
  )
}