import Link from 'next/link'
import React, { useContext } from 'react'
import { ICartProduct, IQuantityOffer } from '../../interfaces'
import { NumberFormat, offer } from '../../utils'
import CartContext from '../../context/cart/CartContext'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import axios from 'axios'

interface Props {
  setCartView: any
  setCartPc?: any
  cartOpacity: any
  setCartOpacity: any
}

export const NavbarCart: React.FC<Props> = ({ setCartView, setCartPc, cartOpacity, setCartOpacity }) => {

  const {cart, setCart} = useContext(CartContext)

  const { data: session, status } = useSession()

  const user = session?.user as { firstName: string, lastName: string, email: string, _id: string, cart: ICartProduct[] }

  return (
    <div onMouseEnter={() => setCartPc(false)} onMouseLeave={() => setCartPc(true)} className={`ml-auto ${cartOpacity} transition-opacity duration-200 p-4 rounded-md shadow-md bg-white z-40 w-full dark:bg-neutral-900 dark:border dark:border-neutral-800 400:w-96`}>
      <h4 className='text-center tracking-widest text-[#1c1b1b] mb-3 font-semibold pb-2 border-b w-full dark:border-neutral-800 text-[16px] dark:text-white'>CARRITO</h4>
      {
        cart?.length
          ? <>
            {
              cart.map((product: ICartProduct) => (
                <div key={product.slug} className='flex gap-1 justify-between mb-2'>
                  <div className='flex gap-2'>
                    <Link href={`/productos/${product.slug}`} onClick={() => {
                      setCartOpacity('opacity-0')
                      setTimeout(() => {
                        setCartView('hidden')
                      }, 200)
                    }}>
                      <Image src={product.image} alt={product.name} width={96} height={96} className='w-24 h-24 mt-auto mb-auto' />
                    </Link>
                    <div className='mt-auto mb-auto'>
                      <Link href={`/productos/${product.slug}`} onClick={() => {
                        setCartOpacity('opacity-0')
                        setTimeout(() => {
                          setCartView('hidden')
                        }, 200)
                      }}><h3 className='text-[16px] text-[#1B1B1B] dark:text-neutral-100'>{product.name}</h3></Link>
                      <div className='flex gap-1 mb-1'>
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
                      <div className='flex border border-[#444444] w-fit rounded-md dark:border-neutral-500'>
                        {
                          product.quantity > 1
                            ? <button className='pt-1 pb-1 pl-3 pr-2 text-[#444444] text-sm dark:text-neutral-500' onClick={async () => {
                              const index = cart.findIndex((item: ICartProduct) => item === product)
                              const productEdit: ICartProduct = cart[index]
                              const updateProduct: ICartProduct = { ...productEdit, quantity: productEdit.quantity - 1 }
                              cart[index] = updateProduct
                              const updateCart = JSON.stringify(cart)
                              localStorage.setItem('cart', updateCart)
                              setCart(JSON.parse(localStorage.getItem('cart')!))
                              if (status === 'authenticated') {
                                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/account/${user._id}`, { cart: JSON.parse(localStorage.getItem('cart')!) })
                              }
                            }}>-</button>
                            : <button className='pt-1 pb-1 pl-3 pr-2 text-[#444444]/50 cursor-not-allowed text-sm  dark:text-neutral-500/50'>-</button>
                        }
                        <span className='text-[#444444] m-auto w-4 text-center text-sm dark:text-neutral-500'>{product.quantity}</span>
                        {
                          product.quantity < product.stock!
                            ? <button className='pt-1 pb-1 pl-2 pr-3 text-[#444444] text-sm dark:text-neutral-500' onClick={async () => {
                              const index = cart.findIndex((item: ICartProduct) => item === product)
                              const productEdit: ICartProduct = cart[index]
                              const updateProduct: ICartProduct = { ...productEdit, quantity: productEdit.quantity + 1 }
                              cart[index] = updateProduct
                              const updateCart = JSON.stringify(cart)
                              localStorage.setItem('cart', updateCart)
                              setCart(JSON.parse(localStorage.getItem('cart')!))
                              if (status === 'authenticated') {
                                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/account/${user._id}`, { cart: JSON.parse(localStorage.getItem('cart')!) })
                              }
                            }}>+</button>
                            : <button className='pt-1 pb-1 pl-2 pr-3 text-[#444444]/50 cursor-not-allowed text-sm dark:text-neutral-400/50'>+</button>
                        }
                      </div>
                    </div>
                  </div>
                  <button onClick={async () => {
                    const cartProduct = JSON.parse(localStorage.getItem('cart')!)
                    const productSelect = cartProduct.filter((item: ICartProduct) => item.name === product.name)
                    if (productSelect.length >= 2) {
                      const products = cartProduct.filter((item: ICartProduct) => item.variation?.variation !== product.variation?.variation)
                      localStorage.setItem('cart', JSON.stringify(products))
                      setCart(products)
                      if (status === 'authenticated') {
                        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/account/${user._id}`, { cart: JSON.parse(localStorage.getItem('cart')!) })
                      }
                    } else {
                      const products = cartProduct.filter((item: ICartProduct) => item.name !== product.name)
                      localStorage.setItem('cart', JSON.stringify(products))
                      setCart(products)
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
              ))
            }
            <div className='mt-4'>
              <Link className='pt-1.5 pb-1.5 rounded-md transition-colors duration-200 bg-button text-white hover:bg-white hover:text-main' onClick={() => {
                setCartOpacity('opacity-0')
                setTimeout(() => {
                  setCartView('hidden')
                }, 200)
              }} href='/finalizar-compra'><button className='w-full'>Finalizar compra</button></Link>
              <Link href='/carrito' onClick={() => {
                setCartOpacity('opacity-0')
                setTimeout(() => {
                  setCartView('hidden')
                }, 200)
              }}><button className='w-full mt-4 underline text-[#444444] dark:text-neutral-400'>Ir al carrito</button></Link>
            </div>
          </>
          : <>
            <p className='mb-4 text-[#444444] dark:text-neutral-400'>No tienes productos añadidos al carrito</p>
            <Link className='pt-1.5 pb-1.5 rounded-md transition-colors duration-200 bg-main text-white hover:bg-white hover:text-main dark:bg-[#22262c] dark:hover:text-main dark:hover:bg-white' href='/tienda' onClick={() => {
              setCartOpacity('opacity-0')
              setTimeout(() => {
                setCartView('hidden')
              }, 200)
            }}><button className='w-full'>Ir a la tienda</button></Link>
          </>
      }
    </div>
  )
}
