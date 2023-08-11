import PageHome from "@/components/home/PageHome"
import { IDesign } from "@/interfaces"
import { Metadata } from "next"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const design: IDesign = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`).then(res => res.json())

  return {
    title: design.home.seo.metaTitle !== '' ? design.home.seo.metaTitle : 'Mi tienda',
    description: design.home.seo.metaDescription !== '' ? design.home.seo.metaDescription : 'Esta es mi tienda online',
    openGraph: {
      title: design.home.seo.metaTitle !== '' ? design.home.seo.metaTitle : 'Mi tienda',
      description: design.home.seo.metaDescription !== '' ? design.home.seo.metaDescription : 'Esta es mi tienda online',
      images: [design.home.banner.length ? design.home.banner[0].image.url : '']
    }
  }
}

export default function Home() {
  return (
    <PageHome />
  )
}
