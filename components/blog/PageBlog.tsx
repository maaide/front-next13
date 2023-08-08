import { IPost } from '@/interfaces'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const PageBlog = ({ posts }: { posts: IPost[] }) => {
  return (
    <div className="w-full flex p-4">
      <div className="w-full max-w-[1280px] m-auto flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-widest">BLOG</h1>
        <h2 className="text-xl font-semibold tracking-widest">ULTIMOS POSTS</h2>
        <div className='flex flex-wrap gap-4 w-full'>
          {
            posts.map(post => (
              <div key={post._id} className='flex w-[300px]'>
                <Link href={`/blog/${post._id}`} className='flex flex-col gap-2'>
                  <Image src={post.image.url} alt={`Imagen post ${post.title}`} width={300} height={300} />
                  <p className='text-lg font-medium'>{post.title}</p>
                  <p className='text-sm'>{post.description}</p>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
