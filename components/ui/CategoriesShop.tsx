import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ICategory } from '../../interfaces'
import Image from 'next/image'

interface Props {
  categories: ICategory[]
}

export const CategoriesShop: React.FC<Props> = ({ categories }) => {

  const pathname = usePathname()

  return (
    <div className='flex pt-4 pl-4 pr-4'>
      <div className='w-1280 m-auto flex gap-2 overflow-x-scroll scroll whitespace-nowrap scroll-smooth' style={{ overflow: 'overlay' }}>
        {
          `/tienda` === pathname
            ? (
              <Link href={'/tienda'} className='border border-main text-main pt-0.5 pb-0.5 pl-2 pr-2 rounded-full dark:border-neutral-600 dark:text-neutral-600'>
                <span className='text-sm'>Todos</span>
              </Link>
            )
            : (
              <Link href={'/tienda'} className='border pt-0.5 pb-0.5 pl-2 pr-2 rounded-full dark:border-neutral-500 hover:border-main hover:text-main hover:dark:border-neutral-600 hover:dark:text-neutral-600'>
                <span className='text-sm'>Todos</span>
              </Link>
            )
        }
        {
          categories?.length
            ? categories.map(category => {
              if (`/tienda/${category.slug}` === pathname) {
                return (
                  <Link href={`/tienda/${category.slug}`} className='border border-main text-main pt-0.5 pb-0.5 pl-2 pr-2 rounded-full dark:border-neutral-600 dark:text-neutral-600' key={category._id}>
                    <Image src={category.image?.url!} alt={`Imagen categoria ${category.category}`} width={376} height={376} />
                    <span className='text-sm'>{category.category}</span>
                  </Link>
                )
              } else {
                return (
                    <Link href={`/tienda/${category.slug}`} className='border rounded-lg h-24 overflow-hidden flex dark:border-neutral-400 hover:border-main hover:text-main  hover:dark:border-neutral-600 hover:dark:text-neutral-600' key={category._id}>
                      <Image src={category.image?.url!} alt={`Imagen categoria ${category.category}`} width={376} height={376} className='w-52 h-24 ' />
                      <span className='text-sm absolute w-52 h-24 text-center text-white'>{category.category}</span>
                    </Link>
                  )
                }
            })
            : ''
        }
      </div>
    </div>
  )
}
