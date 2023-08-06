import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from  "./css/SafariProductList.module.css"
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules"
import { IProduct } from '../../interfaces'
import ProductCard2 from './ProductCard2'

interface Props {
  products: IProduct[]
  title: string
}

export const SafariRecomendedProducts: React.FC<Props> = ({ products, title }) => {
  return (
    <div className='flex w-full p-4'>
      <div className='m-auto w-full relative items-center 1300:w-1280'>
        <h2 className='text-[16px] font-semibold text-main tracking-widest mb-2 md:text-[20px] dark:text-white'>{ title }</h2>
        <Swiper
          className={styles.mySwiper}
          slidesPerView={window.innerWidth > 1100 ? 4 : window.innerWidth > 850 ? 3 : 2}
          cssMode={true}
          pagination={{
            clickable: true
          }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        >
          {
            products.map(product => (
              <SwiperSlide className='m-auto' key={product._id}>
                <ProductCard2 product={ product } />
                <div className='h-8' />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}
