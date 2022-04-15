import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { supabase } from '../api'
import Head from 'next/head'

export default function Post({ post }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
    <Head>
    <title>{post.title}</title>
    <meta name='description' content={post.subtitle} />
  </Head>
<div className="two-pane">
<div id="main-content">
  <div className="md:pl-[8vmin] md:pr-[5vmin] pl-[3vmin] pr-[1vmin]" id='main'>
    <h1 className="text-4xl text-black mt-4 font-bold font-mono tracking-wide">{post.title}</h1>
    <h1 className="text-xl text-black mt-4 font-bold font-mono tracking-wide">{post.type} | {post.subtitle}</h1>
    <p className="text-md text-black font-mono font-light my-4">{post.date}</p><hr/>
    <div className="mt-8">
      <ReactMarkdown className='font-serif prose max-w-[100vw] prose-zinc prose-img:rounded-xl text-lg tracking-wide'>
      {post.content}
      </ReactMarkdown>
  </div>
    <br/><hr/><br/><br/><br/>
  </div>
</div>
<div id="context-pane">
  <div id="contexts">
  <h1 className="text-xl text-black mt-4 font-bold font-mono tracking-wide">{post.context}</h1>
  <div className='my-8'>
      <ReactMarkdown className='font-serif prose text-md'>
      {post.sidebar}
      </ReactMarkdown></div>
      <hr/>
      
</div>
</div>
</div>
</div>
  )
}

export async function getStaticPaths() {
  const { data, error } = await supabase
    .from('posts')
    .select('slug')
  const paths = data.map(post => ({ params: { id: post.slug }}))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const { id } = params
  const { data } = await supabase
    .from('posts')
    .select()
    .filter('slug', 'eq', id)
    .single()
  return {
    props: {
      post: data,
    },
    revalidate: 60,
  }
}