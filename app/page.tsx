"use client"
import { Categories, HomeSlider, Spinner } from "@/components/ui"
import { useCategories } from "@/hooks"
import { IDesign } from "@/interfaces"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const design: IDesign = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
    next: {
      revalidate: 60
    }
  }).then((res) => res.json())

  return {
    title: design.home.seo.metaTitle,
    description: design.home.seo.metaDescription,
    openGraph: {
      title: design.home.seo.metaTitle,
      description: design.home.seo.metaDescription,
      images: [design.home.banner.length && design.home.banner[0].image.url !== '' ? design.home.banner[0].image.url : ''],
    },
  }
}

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
