"use client"
import DesignContext from "@/context/design/DesignContext"
import { useProducts } from "@/hooks"
import { ICartProduct, IProduct } from "@/interfaces"
import { useContext, useEffect, useRef, useState } from "react"
import { NoReviews, NoReviewsProduct, ProductDetails, ProductOffer, RecomendedProducts, Reviews, ReviewsProduct, ShippingCost } from "."
import { ButtonAddToCart, ButtonNone, ItemCounter, ProductSlider, Spinner } from "../ui"
import Link from "next/link"
import Image from 'next/image'
import { NumberFormat } from "@/utils"
import axios from "axios"
import Cookies from 'js-cookie'

declare const fbq: Function

export default function PageProduct ({ product }: { product: IProduct }) {

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    name: product.name,
    image: product.images[0].url,
    price: product.price,
    beforePrice: product.beforePrice,
    slug: product.slug,
    quantity: 1,
    stock: product.stock,
    category: product.category,
    quantityOffers: product.quantityOffers
  })
  const [descriptionView, setDescriptionView] = useState(0)
  const [descriptionRotate, setDescriptionRotate] = useState('-rotate-90')
  const [returnView, setReturnView] = useState(0)
  const [returnRotate, setReturnRotate] = useState('rotate-90')
  const [shippingView, setShippingView] = useState(0)
  const [shippingRotate, setShippingRotate] = useState('rotate-90')
  const [detailsOpacity, setDetailsOpacity] = useState('opacity-0')
  const [detailsPosition, setDetailsPosition] = useState('-bottom-44')
  const [productsFiltered, setProductsFiltered] = useState<IProduct[]>([])
    
  const { products, isLoadingProducts } = useProducts('/products')
  const { design } = useContext(DesignContext)

  const contentRef = useRef<HTMLDivElement>(null)
  const shippingRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  const viewContent = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/view-content`, { product: product, fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc') })
    fbq('track', 'ViewContent', {content_name: product.name, content_category: product.category.category, currency: "clp", value: product.price, content_ids: [product._id], contents: { id: product._id, category: product.category.category, item_price: product.price, title: product.name }, event_id: res.data._id})
  }

  useEffect(() => {
    viewContent()
  }, [])
    
  const filterProducts = () => {
    if (products.length) {
      if (design.product.sectionProducts === 'Productos en oferta') {
        const filterProducts = products.filter(product => product.beforePrice)
        setProductsFiltered(filterProducts)
      } else {
        setProductsFiltered(products)
      }
    }
  }
    
  useEffect(() => {
    filterProducts()
  }, [products])
    
  const handleScroll = () => {
    const position = window.scrollY
    if (position > 350) {
      setDetailsOpacity('opacity-1')
      setDetailsPosition('-bottom-1')
    } else {
      setDetailsOpacity('opacity-0')
      setDetailsPosition('-bottom-44')
    }
  }
    
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (contentRef.current) {
      setDescriptionView(descriptionRotate === '-rotate-90' ? contentRef.current.scrollHeight : 0)
    }
  }, [descriptionRotate])

  useEffect(() => {
    if (shippingRef.current) {
      setShippingView(shippingRotate === '-rotate-90' ? shippingRef.current.scrollHeight : 0)
    }
  }, [shippingRotate])

  useEffect(() => {
    if (infoRef.current) {
      setReturnView(returnRotate === '-rotate-90' ? infoRef.current.scrollHeight : 0)
    }
  }, [returnRotate])
    
  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  let stars = 0
  let quantity = 0

  return (
    <>
      {
        product?.stock > 0
          ? (
            <div className={`${detailsOpacity} ${detailsPosition} flex transition-all duration-200 decoration-slate-200 fixed w-full z-40 p-4`}>
              <ProductDetails product={product} setTempCartProduct={setTempCartProduct} tempCartProduct={tempCartProduct} />
            </div>
          )
          : ''
      }
      <div className='flex p-4'>
        <div className='block m-auto w-full gap-4 lg:flex xl2:w-1280 xl2:gap-8'>
          <div className='w-full lg:w-7/12'>
            <div className='mb-2'>
              <span className='text-15'><Link href='/tienda'>Tienda</Link> / <Link href={`/tienda/${ product.category.slug }`}>{ product?.category.category }</Link> / <Link href={`/tienda/${product.category.slug}/${ product?.slug }`}>{ product?.name }</Link></span>
            </div>
            <div className='relative top-0 mb-0 1010:mb-5 1010:sticky 1010:top-32'>
              <ProductSlider images={ product?.images } />
            </div>
          </div>
          <div className='w-full mt-2 lg:w-5/12 lg:mt-11'>
            <h1 className='text-[18px] tracking-widest text-main font-semibold mb-2 md:text-[25px] dark:text-white'>{ product?.name.toUpperCase() }</h1>
            {
              product?.reviews?.length
                ? product.reviews.map(review => {
                  stars = stars + review.calification
                  quantity = quantity + 1
                  return null
                })
                : <NoReviews />
            }
            {
              product?.reviews?.length
                ? <Reviews reviews={product.reviews} quantity={quantity} stars={stars} />
                : ''
            }
            <div className='flex gap-2 mb-2'>
              <span className='text-[16px] text-main font-medium dark:text-white'>${ product?.price ? NumberFormat(product.price) : '' }</span>
              {
                product?.beforePrice
                  ? <span className='text-sm line-through text-[#444444] dark:text-neutral-400'>${ NumberFormat(product?.beforePrice) }</span>
                  : ''
              }
            </div>
            {
              product?.variations?.variations.length && product.variations?.variations[0].variation !== '' && product.variations?.nameVariation !== ''
                ? (
                    <div className='mb-2'>
                      <div className='flex mb-2 gap-2'>
                        <span className='text-sm font-medium'>{product.variations.nameVariation}:</span>
                        <span className='text-sm text-[#444444] dark:text-neutral-400'>{tempCartProduct.variation?.variation}</span>
                      </div>
                      {
                        product?.variations.nameSubVariation
                          ? (
                            <div className='flex gap-2 mb-2'>
                              <span className='text-sm font-medium'>{product.variations.nameSubVariation}:</span>
                              <span className='text-sm text-[#444444] dark:text-neutral-400'>{tempCartProduct.variation?.subVariation}</span>
                            </div>
                          )
                          : ''
                      }
                      <div className='flex gap-2 mt-1'>
                        {product?.variations.variations.map(variation => {
                          if (variation.stock > 0) {
                            return (
                              <div key={variation.variation}>
                                <Image src={variation.image!.url} alt='Imagen variación' width={80} height={80} onClick={() => {
                                  if (variation.subVariation) {
                                    setTempCartProduct({...tempCartProduct, variation: variation, subVariation: variation.subVariation, image: variation.image!.url})
                                  } else {
                                    setTempCartProduct({...tempCartProduct, variation: variation, image: variation.image!.url})
                                  }
                                }} className={`w-20 h-20 border rounded-lg p-1 cursor-pointer hover:border-main ${!tempCartProduct.variation?.subVariation ? tempCartProduct.variation?.variation === variation.variation ? 'border-main' : 'dark:border-neutral-700 hover:dark:border-main' : tempCartProduct.variation?.variation === variation.variation && tempCartProduct.variation?.subVariation === variation.subVariation ? 'border-main' : 'dark:border-neutral-700 hover:dark:border-main'}`} />
                              </div>
                              )
                          } else {
                            return (
                              <div key={variation.variation}>
                                <Image src={variation.image!.url} alt='Imagen variación' width={80} height={80} className={`w-20 h-20 border rounded-lg p-1 cursor-not-allowed bg-white`} />
                              </div>
                              )
                          }
                        })}
                      </div>
                    </div>
                  )
                : ''
            }
            <span className='mb-2 text-[14px] text-[#444444] block dark:text-neutral-400'><span className='font-medium text-main dark:text-white'>Stock:</span> { product?.stock } { product?.stock === 1 ? 'unidad' : 'unidades' }</span>
            {
              product?.quantityOffers?.length && product?.quantityOffers[0].descount
                ? (
                  <div className='mb-2'>
                    <p className='text-sm mb-2'>Descuentos por cantidad</p>
                    <div className='flex gap-2'>
                      {
                        product.quantityOffers.map(offer => (
                          <div key={offer._id} className='p-2 border rounded w-20 flex flex-col dark:border-neutral-700'>
                            <p className='text-sm m-auto'>{offer.quantity}+</p>
                            <p className='text-sm m-auto'>${NumberFormat(Math.round((product.price / 100) * (100 - offer.descount)))}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
                : ''
            }
            {
              product?.stock === 0
                ? (
                  <div>
                    <p className='mb-2 text-sm'>Deja tu correo para avisarte cuando tengamos este producto nuevamente en stock</p>
                    <div className='flex gap-2'>
                      <input type='text' placeholder='Correo' className='p-2 text-sm w-56 rounded border focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      <button className='pt-1.5 pb-1.5 h-fit mt-auto mb-auto pl-7 pr-7 rounded-md bg-button text-white'>Enviar</button>
                    </div>
                  </div>
                )
                : (
                  <div className='flex gap-2 pb-4 border-b dark:border-neutral-800'>
                    <ItemCounter
                      currentValue={ tempCartProduct.quantity }
                      updatedQuantity={ onUpdateQuantity }
                      maxValue={ product?.stock }
                    />
                    {
                      product?.variations?.variations.length
                        ? product.variations.variations[0].variation !== ''
                          ? tempCartProduct.variation
                            ? <ButtonAddToCart tempCartProduct={tempCartProduct} />
                            : <ButtonNone>AÑADIR AL CARRITO</ButtonNone>
                          : <ButtonAddToCart tempCartProduct={tempCartProduct} />
                        : <ButtonAddToCart tempCartProduct={tempCartProduct} />
                    }
                  </div>
                )
            }
            {
              product?.productsOffer?.length
              ? product.productsOffer[0].productsSale.length
                ? <div className='mt-4 border-b pb-4 dark:border-neutral-800'>
                  <h5 className='text-[14px] tracking-widest text-main font-semibold mb-2 md:text-[16px] dark:text-white'>OFERTAS POR LA COMPRA DE ESTE PRODUCTO</h5>
                  {
                    product.productsOffer.map(offer => <ProductOffer key={offer.productsSale[0].slug} offer={offer} />)
                  }
                </div>
                : ''
              : ''
            }
            <div className='mt-4 border-b pb-4 dark:border-neutral-800'>
              <button onClick={(e: any) => {
                e.preventDefault()
                if (descriptionRotate === '-rotate-90') {
                  setDescriptionRotate('rotate-90')
                } else {
                  setDescriptionRotate('-rotate-90')
                }
              }} className='flex gap-2 w-full justify-between'>
                <h5 className='text-[14px] tracking-widest text-main font-semibold md:text-[16px] dark:text-white'>DESCRIPCIÓN</h5>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className={`${descriptionRotate} transition-all duration-150 ml-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
              </button>
              <div ref={contentRef} style={{ maxHeight: `${descriptionView}px`, overflow: 'hidden', transition: 'max-height 0.2s' }} className={`${descriptionView} transition-all duration-200 flex flex-col gap-2 mt-2`}>
                {product?.description.split('/').map(des => {
                  return <p className='text-[#444444] mb-1 text-sm dark:text-neutral-400 md:text-[16px]' key={des}>{des}</p>
                })}
              </div>
            </div>
            <div className='border-b pb-4 mt-4 dark:border-neutral-800'>
              <button onClick={(e: any) => {
                e.preventDefault()
                if (shippingRotate === '-rotate-90') {
                  setShippingRotate('rotate-90')
                } else {
                  setShippingRotate('-rotate-90')
                }
              }} className='flex gap-2 justify-between w-full'>
                <h5 className='text-[14px] tracking-widest text-main font-semibold md:text-[16px] dark:text-white'>CALCULA LOS COSTOS DE ENVIO</h5>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className={`${shippingRotate} transition-all duration-150 ml-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
              </button>
              <div ref={shippingRef} style={{ maxHeight: `${shippingView}px`, overflow: 'hidden', transition: 'max-height 0.2s' }} className='mt-2'>
                <ShippingCost />
              </div>
            </div>
            {
              design.product.titleInfo && design.product.titleInfo !== '' && design.product.textInfo && design.product.textInfo !== ''
                ? (
                  <div className='mt-4 pb-4 border-b dark:border-neutral-800'>
                    <button onClick={(e: any) => {
                      e.preventDefault()
                      if (returnRotate === '-rotate-90') {
                        setReturnRotate('rotate-90')
                      } else {
                        setReturnRotate('-rotate-90')
                      }
                    }} className='flex gap-2 w-full justify-between'>
                      <h5 className='text-[14px] tracking-widest text-main font-semibold md:text-[16px] dark:text-white'>{design.product.titleInfo.toUpperCase()}</h5>
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className={`${returnRotate} transition-all duration-150 ml-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
                    </button>
                    <div ref={infoRef} style={{ maxHeight: `${returnView}px`, overflow: 'hidden', transition: 'max-height 0.2s' }} className='mt-2'>
                      <p className='text-sm mb-2 text-[#444444] dark:text-neutral-400 md:text-[16px]'>{design.product.textInfo}</p>
                    </div>
                  </div>
                )
                : ''
            }
          </div>
        </div>
      </div>
      <div className='flex p-4'>
        <div className='w-1280 m-auto'>
          <h2 className='text-[16px] tracking-widest text-main mb-2 font-semibold md:text-[20px] dark:text-white'>EVALUACIONES DE CLIENTES</h2>
          <span className='text-[#444444] text-[14px] md:text-[16px] dark:text-neutral-400'>Valoracion media</span>
          <div className='mt-2'>
            {
              product?.reviews?.length
                ? <ReviewsProduct quantity={quantity} stars={stars} reviews={product.reviews} />
                : <NoReviewsProduct />
            }
          </div>
        </div>
      </div>
      {
        isLoadingProducts
          ? (
            <div className="flex w-full">
              <div className="m-auto mt-16 mb-16">
                <Spinner />
              </div>
            </div>
          )
          : productsFiltered.length > 1
            ? <RecomendedProducts products={ productsFiltered } title={design.product.title !== '' ? design.product.title : 'PRODUCTOS RECOMENDADOS'} productSelect={product} />
            : ''
      }
    </>
  )
}