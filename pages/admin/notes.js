import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../api'

export default function MyPosts() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const user = supabase.auth.user()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .filter('user_id', 'eq', user.id)
      .filter('type', 'in', '("Notes")')
    setPosts(data)
  }
  async function deletePost(id) {
    await supabase
      .from('posts')
      .delete()
      .match({ id })
    fetchPosts()
  }
  return (
    <div className="p-[15vmin]">
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Notes</h1>
      {
        posts.map((post, index) => (
          <div key={index} className="border-b border-gray-300	mt-8 pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <h2 className="text-md font-semibold">{post.subtitle}</h2>
            <h2 className="text-md font-semibold">{post.date}</h2>
            <p className="text-gray-500 mt-2 mb-2">Admin, Logged In As: {post.user_email}</p>
            <Link href={`/edit/${post.id}`}><a className="text-sm mr-4 text-blue-500">Edit Note</a></Link>
            <Link href={`/posts/${post.id}`}><a className="text-sm mr-4 text-blue-500">View Note</a></Link>
            <button
              className="text-sm mr-4 text-red-500"
              onClick={() => deletePost(post.id)}
            >Delete Post</button>
          </div>
        ))
      }
    </div>
  )
}