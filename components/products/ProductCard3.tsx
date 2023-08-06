import React, { useMemo, useState } from 'react'
import { ICartProduct, ICategory, IProduct } from '../../interfaces'
import { NumberFormat } from '../../utils'
import { ReviewsProductCard } from '.'
import { Button2AddToCart } from '../ui'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ProductCard3 ({ product, category }: { product: IProduct, category: ICategory }) {

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
  const router = useRouter()

  const productImage = useMemo(() => {
    if (product.images[1]) {
      return isHovered
      ? product.images[1]
      : product.images[0]
    } else {
      return product.images[0]
    }
  }, [isHovered, product.images])

  let stars = 0
  let quantity = 0

  return (
    <div className='inline-block p-2 m-auto w-40 450:w-52 580:w-64'>
      <Image
        src={ productImage.url } alt={ productImage.url }
        onLoad={ () => setIsImageLoaded(true) }
        onMouseEnter={ () => setIsHovered(true) }
        onMouseLeave={ () => setIsHovered(false) }
        className='m-auto cursor-pointer w-40 h-auto 450:w-44 580:w-52'
        style={{ borderRadius: '8px' }}
        onClick={() => router.push(`/tienda/${category.slug}/${product.slug}`)}
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
        <span className='cursor-pointer text-main dark:text-white' onClick={() => router.push(`/tienda/${category.slug}/${product.slug}`)}>{ product.name }</span>
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
              ? <button className='pt-1.5 pb-1.5 text-sm rounded-md bg-button text-white pl-6 pr-6 450:pl-8 450:pr-8' onClick={() => router.push(`/tienda${category.slug}/${product.slug}`)}>Ver variantes</button>
              : <Button2AddToCart tempCartProduct={tempCartProduct} />
            : <Button2AddToCart tempCartProduct={tempCartProduct} />
        }
      </div>
    </div>
  )
}