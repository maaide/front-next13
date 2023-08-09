"use client"
import DesignContext from "@/context/design/DesignContext"
import { ICategory, IProduct } from "@/interfaces"
import { useContext, useEffect, useState } from "react"
import Image from 'next/image'
import { CategoriesShop, Spinner } from "../ui"
import ProductCard from "../products/ProductCard"

export default function PageShop ({ categories, products }: { categories: ICategory[], products: IProduct[] }) {

  const { design } = useContext(DesignContext)

  const [bgOpacity, setBgOpacity] = useState('opacity-0')
  const [bgOpacityImage, setBgOpacityImage] = useState('opacity-0')
  const [productsUpdate, setProductsUpdate] = useState<IProduct[]>()

  useEffect(() => {
    setBgOpacity('opacity-1')
  }, [])

  const applyFilter = (e: any) => {
    if (products.length) {
      if (e.target.value === 'Más recientes') {
        setProductsUpdate(products.reverse())
      } else if (e.target.value === 'Mayor precio') {
        setProductsUpdate([...products].sort((prev, curr) => curr.price - prev.price))
      } else if (e.target.value === 'Menor precio') {
        setProductsUpdate([...products].sort((prev, curr) => prev.price - curr.price))
      }
    }
  }

  useEffect(() => {
    setProductsUpdate(products.reverse())
  }, [products])

  return (
    <>
      {
        design.shop.banner?.url !== '' && design.shop.banner
          ? (
            <div className={`${bgOpacityImage} transition-opacity duration-200 bg-gradient-to-r from-sky-500 to-indigo-500 flex h-96`}>
              <div className='w-1280 m-auto pl-4 pr-4 z-10 pt-20 pb-20'>
                <h1 className='text-[25px] text-white font-semibold tracking-widest mb-4 text-center md:text-[32px]'>{design.shop.title !== '' ? design.shop.title : 'TIENDA'}</h1>
                <p className='text-lg text-white w-full text-center'>{design.shop.description !== '' ? design.shop.description : 'Encuentra los productos de la más alta calidad y siempre con increíbles precios.'}</p>
              </div>
              {
                design.shop.banner.url !== '' && design.shop.banner
                  ? <Image onLoadingComplete={() => setBgOpacityImage('opacity-1')} className='absolute z-0 h-96 w-full object-cover' src={design.shop.banner.url!} alt='Banner Tienda' width={1920} height={1080} />
                  : ''
              }
            </div>
          )
          : (
            <div className={`${bgOpacity} transition-opacity duration-200 bg-gradient-to-r from-sky-500 to-indigo-500 flex h-96`}>
              <div className='w-1280 m-auto pl-4 pr-4 z-10 pt-20 pb-20'>
                <h1 className='text-[25px] text-white font-semibold tracking-widest mb-4 text-center md:text-[32px]'>{design.shop.title !== '' ? design.shop.title : 'TIENDA'}</h1>
                <p className='text-lg text-white w-full text-center'>{design.shop.description !== '' ? design.shop.description : 'Encuentra los productos de la más alta calidad y siempre con increíbles precios.'}</p>
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
        products.length === 0
          ? <div className='flex px-4 mb-4 w-full'><div className="w-[1280px] m-auto"><p>No hay productos</p></div></div>
          : (
            <div className='flex'>
              <div className='w-1280 m-auto flex gap-2 pt-4 pb-4 flex-wrap'>
                {
                  productsUpdate?.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))
                }
              </div>
            </div>
          )
      }
    </>
  )
}