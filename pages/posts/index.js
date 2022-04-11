import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../../api'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchPosts()
    const mySubscription = supabase
      .from('posts')
      .on('*', () => {
        console.log('something happened....')
        fetchPosts()
      })
      .subscribe()
    return () => supabase.removeSubscription(mySubscription)
  }, [])
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select()
    setPosts(data)
    setLoading(false)
  }
  if (loading) return <p className="text-2xl">Loading ...</p>
  if (!posts.length) return <p className="text-2xl">No posts.</p>

  return (
    <div style={{
        padding: '20vmin',
        background: 'black'
    }}>
      <Head>
        <title>Rajan | Posts</title>
      </Head>

      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 font-mono text-white">Posts</h1>
      {
        posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a className="block border-b border-gray-300 mt-8 pb-4">
              <h2 className="text-xl font-medium font-mono text-white">{post.title}</h2>
              <p className="text-gray-500 mt-2 context text-white text-lg">{post.subtitle}</p>
              <p className="text-gray-500 mt-2 context text-white">Posted: {post.inserted_at}</p>
            </a>
          </Link>)
        )
      }
    </div>
  )
}