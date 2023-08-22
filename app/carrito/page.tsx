"use client"
import CartContext from '@/context/cart/CartContext'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { ProductList, ShippingCart } from '../../components/products'
import { Spinner } from '../../components/ui'
import { useProducts } from '../../hooks'
import { ICartProduct, IProduct, IQuantityOffer } from '../../interfaces'
import { NumberFormat, offer } from '../../utils'
import Image from 'next/image'
import DesignContext from '@/context/design/DesignContext'
import { useSession } from 'next-auth/react'
import axios from 'axios'

const CartPage = () => {

  const {setCart} = useContext(CartContext)
  const { design } = useContext(DesignContext)

  const [cartProducts, setCartProducts] = useState<ICartProduct[]>()
  const [shippingCost, setShippingCost] = useState(0)
  const [productsFiltered, setProductsFiltered] = useState<IProduct[]>([])
  const { data: session, status } = useSession()

  const user = session?.user as { firstName: string, lastName: string, email: string, _id: string, cart: [] }

  const getCart = () => {
    if (status === 'authenticated') {
      setCartProducts(user.cart)
    } else {
      setCartProducts(JSON.parse(localStorage.getItem('cart')!))
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  const { products, isLoadingProducts } = useProducts('/products')

  const filterProducts = () => {
    if (products.length) {
      if (design.home.products.sectionProducts === 'Productos en oferta') {
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

  return (
    <>
      <Head>
        <title>Carrito</title>
      </Head>
      <div className='p-4 flex'>
        <div className='m-auto w-1280'>
          <h1 className='text-[20px] tracking-widest text-main font-semibold mb-4 md:text-[25px] dark:text-white'>CARRITO</h1>
          <div className='block gap-8 1010:flex'>
            <div className='w-full 1010:w-7/12'>
              {
                cartProducts?.length
                  ? cartProducts?.map((product) => (
                    <div className='flex gap-4 mb-2 justify-between' key={product._id}>
                      <div className='flex gap-2'>
                        <Link href={`/productos/${product.slug}`}>
                          <Image className='w-28 h-auto rounded-md 450:w-32' src={product.image} alt={product.name} width={128} height={128} />
                        </Link>
                        <div className='mt-auto mb-auto'>
                          <Link href={`/productos/${product.slug}`}>
                            <p className='text-main dark:text-white'>{product.name}</p>
                          </Link>
                          <div className='flex gap-2'>
                            {
                              product.quantityOffers && product.quantity > 1
                                ? <span className='font-medium'>${NumberFormat(offer(product))}</span>
                                : <span className='font-medium'>${NumberFormat(product.price * product.quantity)}</span>
                            }
                            {
                              product.beforePrice
                                ? <span className='text-sm line-through text-[#444444] dark:text-neutral-400'>${NumberFormat(product.beforePrice * product.quantity)}</span>
                                : ''
                            }
                          </div>
                          {
                            product.variation
                              ? <span className='text-[#444444] dark:text-neutral-400'>{product.variation.variation}{product.variation.subVariation ? ` / ${product.variation.subVariation}` : ''}</span>
                              : ''
                          }
                        </div>
                      </div>
                      <div className='flex gap-4'>
                        <div className='flex border border-main w-fit h-fit mt-auto mb-auto rounded-md dark:border-neutral-500'>
                          {
                            product.quantity > 1
                            ? <button className='pt-1 pb-1 pl-3 pr-2 text-main text-sm dark:border-neutral-500' onClick={async () => {
                              const index = cartProducts.findIndex((item: ICartProduct) => item === product)
                              const productEdit: ICartProduct = cartProducts[index]
                              const updateProduct: ICartProduct = { ...productEdit, quantity: productEdit.quantity - 1 }
                              cartProducts[index] = updateProduct
                              const updateCart = JSON.stringify(cartProducts)
                              localStorage.setItem('cart', updateCart)
                              setCart(JSON.parse(localStorage.getItem('cart')!))
                              setCartProducts(JSON.parse(localStorage.getItem('cart')!))
                              if (status === 'authenticated') {
                                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/account/${user._id}`, { cart: JSON.parse(localStorage.getItem('cart')!) })
                              }
                            }}>-</button>
                            : <button className='pt-1 pb-1 pl-3 pr-2 text-main/50 cursor-not-allowed text-sm dark:text-neutral-500'>-</button>
                          }
                          <span className='text-main m-auto w-4 text-center text-sm dark:text-neutral-500'>{product.quantity}</span>
                          {
                            product.quantity < product.stock!
                            ? <button className='pt-1 pb-1 pl-2 pr-3 text-main text-sm dark:text-neutral-500' onClick={async () => {
                              const index = cartProducts.findIndex((item: ICartProduct) => item === product)
                              const productEdit: ICartProduct = cartProducts[index]
                              const updateProduct: ICartProduct = { ...productEdit, quantity: productEdit.quantity + 1 }
                              cartProducts[index] = updateProduct
                              const updateCart = JSON.stringify(cartProducts)
                              localStorage.setItem('cart', updateCart)
                              setCart(JSON.parse(localStorage.getItem('cart')!))
                              setCartProducts(JSON.parse(localStorage.getItem('cart')!))
                              if (status === 'authenticated') {
                                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/account/${user._id}`, { cart: JSON.parse(localStorage.getItem('cart')!) })
                              }
                            }}>+</button>
                            : <button className='pt-1 pb-1 pl-2 pr-3 text-main/50 cursor-not-allowed dark:text-neutral-500'>+</button>
                          }
                        </div>
                        <button onClick={async () => {
                          const cartProduct = JSON.parse(localStorage.getItem('cart')!)
                          const productSelect = cartProduct.filter((item: ICartProduct) => item.name === product.name)
                          if (productSelect.length >= 2) {
                            const products = cartProduct.filter((item: ICartProduct) => item.variation?.variation !== product.variation?.variation)
                            localStorage.setItem('cart', JSON.stringify(products))
                            setCart(products)
                            setCartProducts(products)
                            if (status === 'authenticated') {
                              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/account/${user._id}`, { cart: JSON.parse(localStorage.getItem('cart')!) })
                            }
                          } else {
                            const products = cartProduct.filter((item: ICartProduct) => item.name !== product.name)
                            localStorage.setItem('cart', JSON.stringify(products))
                            setCart(products)
                            setCartProducts(products)
                            if (status === 'authenticated') {
                              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/account/${user._id}`, { cart: JSON.parse(localStorage.getItem('cart')!) })
                            }
                          }
                        }}>
                          <svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14">
                            <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                  : (
                    <div>
                      <p className='mb-4'>No tienes productos agregados al carrito</p>
                      <Link href='/tienda' className='pt-1.5 pb-1.5 pl-4 pr-4 rounded-md bg-main text-white'>Ir a la tienda</Link>
                    </div>
                  )
              }
            </div>
            {
              cartProducts?.length
                ? (
                  <div className='w-full 1010:w-5/12'>
                    <div className='bg-[#F5F5F5] p-4 border border-[#F5F5F5] 450:p-6 dark:bg-neutral-800 dark:border-neutral-700'>
                      <div className='mb-2 pb-2 border-b dark:border-neutral-700'>
                        <div className='mb-4 border-b pb-4 dark:border-neutral-700'>
                          <ShippingCart setShippingCost={setShippingCost} />
                        </div>
                        <div className='flex gap-2 justify-between mb-1'>
                          <span className='text-[14px] text-[#444444] dark:text-neutral-400'>Subtotal</span>
                          {
                            cartProducts?.length
                              ? <span className='text-[14px]'>${NumberFormat(cartProducts.reduce((bef, curr) => curr.quantityOffers ? offer(curr) : bef + curr.price * curr.quantity, 0))}</span>
                              : ''
                          }
                        </div>
                        <div className='flex gap-2 justify-between'>
                          <span className='text-[14px] text-[#444444] dark:text-neutral-400'>Envío</span>
                          <span className='text-[14px]'>${NumberFormat(shippingCost)}</span>
                        </div>
                      </div>
                      <div className='flex gap-2 justify-between'>
                        <span className='font-medium'>Total</span>
                        {
                          cartProducts?.length
                            ? <span className='font-medium'>${NumberFormat(cartProducts.reduce((bef, curr) => curr.quantityOffers ? offer(curr) : bef + curr.price * curr.quantity, 0) + Number(shippingCost))}</span>
                            : ''
                        }
                      </div>
                      <div className='mt-3 ml-auto w-full flex'>
                        <Link className='pt-1.5 w-full pb-1.5 rounded-md transition-colors duration-200 bg-button text-white hover:bg-white hover:text-main' href='/finalizar-compra'><button className='w-full'>Finalizar compra</button></Link>
                      </div>
                    </div>
                  </div>
                )
                : ''
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
          : productsFiltered.length
            ? <ProductList products={ productsFiltered } title={design.cart?.title && design.cart?.title !== '' ? design.cart.title : 'PRODUCTOS RECOMENDADOS'} />
            : ''
      }
    </>
  )
}

export default CartPage