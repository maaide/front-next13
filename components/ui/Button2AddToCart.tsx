"use client"
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useState } from 'react'
import CartContext from '../../context/cart/CartContext'
import { ICartProduct } from '../../interfaces'
import { useSession } from 'next-auth/react'

interface Props {
  tempCartProduct: ICartProduct
}

export const Button2AddToCart: React.FC<Props> = ({ tempCartProduct }) => {

  const {setCart} = useContext(CartContext)
  const [text, setText] = useState('Añadir al carrito')
  const { data: session, status } = useSession()

  const user = session?.user as { firstName: string, lastName: string, email: string, _id: string }

  const addToCart = async () => {
    setText('Producto añadido')
    if (localStorage.getItem('cart')) {
      const cart: ICartProduct[] = JSON.parse(localStorage.getItem('cart')!)
      if (cart.find((product: ICartProduct) => product.name === tempCartProduct.name)) {
        const productSelect = cart.find((product: ICartProduct) => product.name === tempCartProduct.name)
        if (productSelect?.variation?.variation === tempCartProduct.variation?.variation) {
          const productIndex = cart.findIndex((product: ICartProduct) => product.name === tempCartProduct.name)
          cart[productIndex].quantity = tempCartProduct.quantity + cart[productIndex].quantity
          localStorage.setItem('cart', JSON.stringify(cart))
          setCart(JSON.parse(localStorage.getItem('cart')!))
        } else {
          const cartFinal = cart.concat(tempCartProduct)
          localStorage.setItem('cart', JSON.stringify(cartFinal))
          setCart(JSON.parse(localStorage.getItem('cart')!))
        }
      } else {
        const cartFinal = cart.concat(tempCartProduct)
        localStorage.setItem('cart', JSON.stringify(cartFinal))
        setCart(JSON.parse(localStorage.getItem('cart')!))
      }
    } else {
      localStorage.setItem('cart', `[${JSON.stringify(tempCartProduct)}]`)
      setCart(JSON.parse(localStorage.getItem('cart')!))
    }
    let offerPrice
    if (tempCartProduct.quantityOffers && tempCartProduct.quantity > 1) {
      const filter = tempCartProduct.quantityOffers.filter(offer => offer.quantity <= tempCartProduct.quantity)
      if (filter.length > 1) {
        offerPrice = filter.reduce((prev, current) => (prev.quantity > current.quantity) ? prev : current)
      } else {
        offerPrice = filter[0]
      }
    }
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/add-cart`, { name: tempCartProduct.name, price: offerPrice !== undefined ? Math.floor((tempCartProduct.price * tempCartProduct.quantity) / 100) * (100 - offerPrice.descount) : tempCartProduct.price * tempCartProduct.quantity, quantity: tempCartProduct.quantity, category: tempCartProduct.category, fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc') })
    if (status === 'authenticated') {
      const cartLocal = JSON.parse(localStorage.getItem('cart')!)
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/account/${user._id}`, { cart: cartLocal })
    }
    setTimeout(() => {
      setText('Añadir al carrito')
    }, 3000)
  }

  return (
    <button onClick={addToCart} className='pt-1.5 pb-1.5 rounded-md bg-button text-white text-sm pl-3 pr-3 450:pr-6 450:pl-6 580:pr-8 580:pl-8'>
      {text}
    </button>
  )
}
