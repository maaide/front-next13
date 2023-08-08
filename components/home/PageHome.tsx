import React from 'react'
import { Categories, HomeSlider, Spinner } from '../ui'
import { useCategories } from '@/hooks'

const PageHome = () => {

  const { categories, isLoadingCategories } = useCategories('/categories')

  return (
    <div className="z-0">
      <HomeSlider />
      {
        isLoadingCategories
          ? (
            <div className="flex w-full">
              <div className="m-auto mt-16 mb-16">
                <Spinner />
              </div>
            </div>
          )
          : categories.length
            ? (
              <>
                <Categories categories={categories} />
              </>
            )
            : ''
        }
    </div>
  )
}

export default PageHome