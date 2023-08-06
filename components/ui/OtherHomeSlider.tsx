"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from './Button'
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from "./css/OtherHomeSlider.module.css"
import { Navigation, Pagination } from "swiper/modules"
import Image from 'next/image'
import DesignContext from '@/context/design/DesignContext'
import LogoContext from '@/context/logo/LogoContext'

export const OtherHomeSlider = () => {

  const { design, load } = useContext(DesignContext)
  const { logoLoad } = useContext(LogoContext)

  const [loadingImage, setLoadingImage] = useState(false)
  const [imageView, setImageView] = useState('opacity-0')
  const [textView, setTextView] = useState('opacity-0')
  const [buttonView, setButtonView] = useState('opacity-0')
  const [textDefaultView, setTextDefaultView] = useState('opacity-0')
  const [buttonDefaultView, setButtonDefaultView] = useState('opacity-0')
  const [bgView, setBgView] = useState('opacity-0')

  useEffect(() => {
    if (loadingImage && logoLoad) {
      setImageView('opacity-1')
      setTimeout(() => {
        setTextView('opacity-1')
        setTimeout(() => {
          setButtonView('opacity-1')
        }, 300)
      }, 300)
    }
  }, [loadingImage, logoLoad])

  useEffect(() => {
    if (logoLoad && load) {
      setBgView('opacity-1')
      setTimeout(() => {
        setTextDefaultView('opacity-1')
        setTimeout(() => {
          setButtonDefaultView('opacity-1')
        }, 300)
      }, 300)
    }
  }, [logoLoad])

  return (
    <Swiper
      className={styles.mySwiper}
      slidesPerView={1}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation]}
    >
      {
        design.home.banner.length && design.home.banner[0].image.url !== ''
          ? design.home.banner.map(banner => (
            <SwiperSlide key={banner.title}>
              <div className={`h-400 flex xl:h-600 2xl:h-700`}>
                <div className='p-4 w-1280 m-auto'>
                  <h1 className={`${textView} transition-opacity duration-200 text-[25px] text-white font-bold mb-2 md:text-[32px]`}>{banner.title}</h1>
                  <p className={`${textView} transition-opacity duration-200 text-white text-lg mb-4`}>{banner.text}</p>
                  <Link className={`${buttonView} transition-opacity duration-200`} href={banner.linkButton}><Button>{banner.textButton}</Button></Link>
                </div>
                <Image onLoadingComplete={() => setLoadingImage(true)} width={1920} height={1080} className={`absolute object-cover h-full w-full -z-10 ${imageView} transition-opacity duration-200`} src={banner.image.url} alt='banner' />
              </div>
            </SwiperSlide>
          ))
          : (
            <SwiperSlide>
              <div className={`h-400 ${bgView} transition-opacity duration-200 bg-gradient-to-r from-sky-500 to-indigo-500 pt-20 pb-20 flex xl:h-600 2xl:h-700`}>
                <div className='p-4 w-1280 m-auto'>
                  <h1 className={`${textDefaultView} transition-opacity duration-200 text-[25px] text-white font-bold mb-2 md:text-[32px]`}>ENCUENTRA NUESTROS ULTIMOS PRODUCTOS</h1>
                  <Link className={`${buttonDefaultView} transition-opacity duration-200`} href='/tienda'><Button>COMPRAR AHORA</Button></Link>
                </div>
              </div>
            </SwiperSlide>
          )
      }
    </Swiper>
  )
}
