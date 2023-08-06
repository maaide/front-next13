"use client"
import { Categories, HomeSlider, Spinner } from "@/components/ui"
import { useCategories } from "@/hooks"

export default function Home() {

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
