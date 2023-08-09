import PagePost from "@/components/blog/PagePost"
import { IPost } from "@/interfaces"
import { Metadata } from "next"

async function fetchPost (post: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post}`, {
    next: {
      revalidate: 60
    }
  })
  return res.json()
}

async function fetchPosts () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    next: {
      revalidate: 60
    }
  })
  return res.json()
}

export async function generateMetadata({
  params
}: {
  params: { post: string }
}): Promise<Metadata> {

  const id = params.post
  const post: IPost = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
    next: {
      revalidate: 43200
    }
  }).then((res) => res.json())

  return {
    title: post.titleSeo,
    description: post.descriptionSeo,
    openGraph: {
      title: post.titleSeo,
      description: post.descriptionSeo,
      images: [post.image?.url ? post.image?.url : ''],
    },
  }
}

export default async function Page ({ params }: { params: { post: string } }) {
  
  const post: IPost = await fetchPost(params.post)

  const posts: IPost[] = await fetchPosts()

  return (
    <PagePost post={post} posts={posts} />
  )
}