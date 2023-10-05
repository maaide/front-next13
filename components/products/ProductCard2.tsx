import React, { useEffect, useState } from 'react'
import { ICartProduct, IProduct } from '../../interfaces'
import { NumberFormat } from '../../utils'
import { ReviewsProductCard } from '.'
import { Button2AddToCart } from '../ui'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard2 ({ product }: { product: IProduct }) {

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    name: product.name,
    image: product.images[0].url,
    price: product.price,
    beforePrice: product.beforePrice,
    slug: product.slug,
    quantity: 1,
    stock: product.stock,
    category: product.category
  })
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [image, setImage] = useState('')
  const [opacity, setOpacity] = useState('opacity-1')

  const router = useRouter()

  const changeImage = () => {
    if (product.images[1]) {
      if (isHovered) {
        setOpacity('opacity-0')
        setTimeout(() => {
          setImage(product.images[1].url)
          setOpacity('opacity-1')
        }, 100)
      } else {
        setOpacity('opacity-0')
        setTimeout(() => {
          setImage(product.images[0].url)
          setOpacity('opacity-1')
        }, 100)
      }
    } else {
      setImage(product.images[0].url)
    }
  }

  useEffect(() => {
    changeImage()
  }, [isHovered, product.images])

  let stars = 0
  let quantity = 0

  return (
    <div className='inline-block p-2 m-auto w-40 450:w-52 580:w-64'>
      <Image
        src={ image } alt={ image }
        onLoad={ () => setIsImageLoaded(true) }
        onMouseEnter={ () => setIsHovered(true) }
        onMouseLeave={ () => setIsHovered(false) }
        className={`m-auto ${opacity} transition-opacity duration-200 cursor-pointer w-40 h-auto 450:w-44 580:w-52`}
        style={{ borderRadius: '8px' }}
        onClick={() => router.push(`/tienda/${product.category.slug}/${product.slug}`)}
        width={250}
        height={250}
      />
      <div style={{ display: isImageLoaded ? 'block' : 'none' }}>
        {
          product.reviews?.length
            ? product.reviews.map(review => {
              stars = stars + review.calification
              quantity = quantity + 1
              return null
            })
            : ''
        }
        {
          product.reviews?.length
            ? <ReviewsProductCard product={product} quantity={quantity} stars={stars} />
            : <div className='w-1 h-2' />
        }
        <Link href={`/tienda/${product.category.slug}/${product.slug}`} className='cursor-pointer text-main dark:text-white'>{ product.name }</Link>
        <div className='flex gap-2 mt-1 mb-1'>
          <span className='font-medium text-main dark:text-white'>${ NumberFormat(product.price) }</span>
          {
            product.beforePrice
              ? <span className='text-sm line-through text-main dark:text-white'>${ NumberFormat(product.beforePrice) }</span>
              : ''
          }
        </div>
        {
          product.variations?.variations.length
            ? product.variations.variations[0].variation !== ''
              ? <Link href={`/tienda/${product.category.slug}/${product.slug}`} className='py-1.5 text-xs font-medium transition-all duration-200 border border-button bg-button text-white hover:bg-transparent hover:text-button'><button className='w-40 tracking-widest 450:w-48'>VER VARIANTES</button></Link>
              : <Button2AddToCart tempCartProduct={tempCartProduct} />
            : <Button2AddToCart tempCartProduct={tempCartProduct} />
        }
      </div>
    </div>
  )
}