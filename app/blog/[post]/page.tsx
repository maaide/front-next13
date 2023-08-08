import PagePost from "@/components/blog/PagePost"
import { IPost } from "@/interfaces"
import Image from 'next/image'
import Link from "next/link"

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

export default async function Page ({ params }: { params: { post: string } }) {
  
  const post: IPost = await fetchPost(params.post)

  const posts: IPost[] = await fetchPosts()

  return (
    <PagePost post={post} posts={posts} />
  )
}