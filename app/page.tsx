import PageHome from "@/components/home/PageHome"
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
  return (
    <PageHome />
  )
}
