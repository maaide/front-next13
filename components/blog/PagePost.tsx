"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IPost } from '@/interfaces'
import Link from 'next/link'

const PagePost = ({ post, posts }: { post: IPost, posts: IPost[] }) => {

  const [postsFiltered, setPostsFiltered] = useState<IPost[]>([])

  const filterPosts = () => {
    const filter = posts.filter(p => p._id !== post._id)
    setPostsFiltered(filter)
  }

  useEffect(() => {
    filterPosts()
  }, [posts])

  return (
    <div className="w-full px-2 py-8 flex">
      <div className="w-[1280px] m-auto flex flex-col gap-8 1280:flex-row">
        <div className={`flex flex-col gap-4 w-full ${postsFiltered.length ? '' : 'm-auto'} 1280:w-2/3`}>
          <Image src={post.image.url} alt={`Imagen principal post ${post.title}`} className="m-auto" width={500} height={500} />
          <h1 className="text-4xl font-medium">{post.title}</h1>
          {post.content.map(content => {
            if (content.type === 'Texto') {
              if (content.html === 'H1') {
                return <h1 className="text-4xl font-medium" key={content.content}>{content.content}</h1>
              } else if (content.html === 'H2') {
                return <h2 className="text-3xl font-medium" key={content.content}>{content.content}</h2>
              } else if (content.html === 'H3') {
                return <h3 className="text-2xl font-medium" key={content.content}>{content.content}</h3>
              } else if (content.html === 'H4') {
                return <h4 className="text-xl font-medium" key={content.content}>{content.content}</h4>
              } else if (content.html === 'H5') {
                return <h5 className="text-lg" key={content.content}>{content.content}</h5>
              } else if (content.html === 'Parrafo') {
                return <p key={content.content}>{content.content}</p>
              }
            } else if (content.type === 'Imagen') {
              return <Image src={content.image.url} key={content.image.url} alt={`Imagen post ${post.title}`} width={1280} height={720} />
            }
          })}
          <div className='flex flex-col gap-2 mt-2'>
            <p className='font-medium'>Compartir</p>
            <div className='flex gap-2'>
              <Link href='https://facebook.com/'>Facebook</Link>
              <Link href='https://twitter.com'>Twitter</Link>
            </div>
          </div>
        </div>
        {
          postsFiltered.length
            ? (
              <div className="w-full flex flex-col gap-4 1280:w-1/3">
                <h5 className="text-lg font-semibold tracking-widest">POST RECOMENDADOS</h5>
                <div className='flex flex-row gap-2 1280:flex-col'>
                  {
                    postsFiltered.map(post => (
                      <div key={post._id} className="w-full">
                        <Link href={`/blog/${post._id}`} className="flex gap-2">
                          <Image src={post.image.url} alt={`Imagen post ${post.title}`} className="h-fit my-auto" width={200} height={200} />
                          <div className="flex flex-col gap-2 my-auto">
                            <p className="text-lg font-medium">{post.title}</p>
                            <p className="text-sm">{post.description}</p>
                          </div>
                        </Link>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
            : ''
        }
      </div>
    </div>
  )
}

export default PagePost