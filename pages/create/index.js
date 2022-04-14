import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import { supabase } from '../../api'
import Head from 'next/head'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
const initialState = { title: '', content: '', subtitle: '', date: '', type: '' }

function CreatePost() {
  const [post, setPost] = useState(initialState)
  const [authorized, setAuthorized] = useState(false)
  const { title, content, subtitle, date, type, slug } = post
  const router = useRouter()
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }

  const user = supabase.auth.user()

  useEffect(() => {
      if (user.email === 'rajan.ag005@gmail.com') {
          setAuthorized(true)
      }
  })

  async function createNewPost() {
    if (!title || !content) return  
    const id = uuid()
    post.id = id
    const { data } = await supabase
      .from('posts')
      .insert([
          { title, content, type, date, subtitle, user_id: user.id, user_email: user.email, slug }
      ])
      .single()
    router.push(`/posts/${post.slug}`)
  }
  return (
    <div className="p-[15vmin]">
      <Head>
        <title>Rajan Agarwal -- {post.title}</title>
        <meta name='description' content={post.subtitle} />
      </Head>
    { authorized ? (
        <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6">Create new post</h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
      <input
        onChange={onChange}
        name="subtitle"
        placeholder="Subtitle / Subject"
        value={post.subtitle}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
      <input
        onChange={onChange}
        name="type"
        placeholder="Type"
        value={post.type}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <input
        onChange={onChange}
        name="date"
        placeholder="Date"
        value={post.date}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
      <input
        onChange={onChange}
        name="slug"
        placeholder="Slug"
        value={post.slug}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
      <SimpleMDE
        value={post.content}
        onChange={value => setPost({ ...post, content: value })}
      />
      <button
        type="button"
        className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={createNewPost}
      >Create Post</button>
      </div>
      ) : (
        <div>
            you don&#39;t have access to this page!
        </div>
      )}
    </div>
  )
}

export default CreatePost