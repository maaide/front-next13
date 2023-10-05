"use client"
import axios from 'axios'
import Head from 'next/head'
import React, { useContext, useState } from 'react'
import { IContactData } from '../../interfaces'
import DesignContext from '@/context/design/DesignContext'

const ContactPage = () => {

  const { design } = useContext(DesignContext)

  const [formContact, setFormContact] = useState<IContactData>({
    name: '',
    email: '',
    message: '',
    images: []
  })
  const [sending, setSending] = useState('ENVIAR')

  const inputChange = (e: any) => {
    setFormContact({ ...formContact, [e.target.name]: e.target.value })
  }

  const imageChange = (e: any) => {
    let images: any = formContact.images
    e.target.files.map(async (file: any) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, {image: file}, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': 'multipart/form-data'
        }
      })
      images = images.concat(response.data.image.url)
      setFormContact({...formContact, images: images})
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSending('')
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, formContact, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    })
    setSending('MENSAJE ENVIADO')
    setFormContact({name: '', email: '', message: '', images: []})
    setTimeout(() => {
      setSending('ENVIAR')
    }, 3000)
  }

  return (
    <>
      <Head>
        <title>Contacto</title>
      </Head>
      <div className='flex p-4'>
        <div className='m-auto w-1280 block gap-16 1010:flex'>
          <div className='w-full m-auto mb-10 1010:w-1/2 1010:mb-auto'>
            <h1 className='text-[25px] text-main tracking-widest font-semibold mb-2 mt-6 1010:mt-0 md:text-[32px] dark:text-white'>{design.contact.title !== '' ? design.contact.title : 'CONTACTO'}</h1>
            <p>{design.contact.text !== '' ? design.contact.text : 'Para cualquier pregunta o consulta que tengas, no dudes en ponerte en contacto con nosotros a traves del siguiente formulario, desde el chat del sitio web o desde nuestras redes sociales.'}</p>
          </div>
          <div className='w-full m-auto mt-6 mb-6 650:w-560 1010:w-1/2'>
            <div className='rounded-md border border-white shadow-2xl p-4 420:p-6 650:p-10 dark:shadow-none dark:border dark:border-neutral-700 dark:bg-neutral-800'>
              <h2 className='text-[20px] text-main font-medium tracking-widest mb-4 md:text-[25px] dark:text-white'>{design.contact.titleForm !== '' ? design.contact.titleForm : 'LLENA EL SIGUIENTE FORMULARIO'}</h2>
              <form>
                <input type='text' placeholder='Nombre' name='name' onChange={inputChange} value={formContact.name} className='p-2 text-sm w-full rounded border mb-3 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                <input type='email' placeholder='Email' name='email' onChange={inputChange} value={formContact.email} className='p-2 text-sm w-full rounded border mb-3 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                <textarea placeholder='Mensaje' name='message' onChange={inputChange} value={formContact.message} className='p-2 text-sm w-full rounded border h-20 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                <input type='file' onChange={imageChange} className='text-sm mt-2 mb-4 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20 dark:file:bg-neutral-600 dark:file:text-white' />
                <button onClick={handleSubmit} className='w-full h-9 tracking-widest font-medium text-sm border border-main bg-main transition-colors duration-200 text-white hover:bg-white hover:text-main dark:bg-neutral-700 dark:border-neutral-700 dark:hover:bg-transparent dark:hover:text-neutral-500'>
                  {
                    sending === ''
                      ? (
                        <svg aria-hidden="true" className="w-5 h-5 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                      )
                      : sending
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage