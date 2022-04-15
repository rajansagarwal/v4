import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import { supabase } from '../../api'
import Head from 'next/head'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

function EditPost() {
  const [post, setPost] = useState(null)
  const [right, setRight] = useState(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    fetchPost()
    
    async function fetchPost() {
      if (!id) return
      const { data } = await supabase
        .from('posts')
        .select()
        .filter('id', 'eq', id)
        .single()
      setPost(data)
    }
  }, [id])

  useEffect(() => {
    fetchSidebar()

    async function fetchSidebar() {
      if (!id) return
      const { data } = await supabase
        .from('posts')
        .select('sidebar')
        .filter('id', 'eq', id)
        .single()
      setRight(data.sidebar)
      console.log(data.sidebar)
    }
  }, [id])

  useEffect(() => {
      console.log(right)
  }, [right])

  if (!post) return null
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
    setRight(() => ({ ...right, [e.target.name]: e.target.value }))
  }
  const { title, content, context, subtitle, type, date, slug } = post
  const sidebar = right

  async function updateCurrentPost() {
    if (!title || !content) return
    const { data} = await supabase
      .from('posts')
      .update([
          { title, content, context, sidebar, subtitle, type, date, slug }
      ])
      .match({ id })
    console.log(data)
  }
  return (
    <div  className='p-[15vmin]'>
      <Head>
        <title>{post.title} | Rajan Agarwal</title>
        <meta name='description' content={post.subtitle} />
      </Head>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Edit post</h1>
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
        placeholder="Subtitle"
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
        name="slug"
        placeholder="Slug"
        value={post.slug}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
      <SimpleMDE value={post.content} onChange={value => setPost({ ...post, content: value })} />
      <input
        onChange={onChange}
        name="context"
        placeholder="Sidebar Heading"
        value={post.context}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
      <SimpleMDE value={right} onChange={value => setRight(value)} />
      <button
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={updateCurrentPost}>Update Post</button>
    </div>
  )
}

export default EditPost