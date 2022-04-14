import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { supabase } from '../../api'
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
    <div className="mt-20 md:pl-[15vmin] md:pr-[35vmin] pl-[3vmin] pr-[3vmin]">
      <h1 className="text-4xl text-black mt-4 font-bold font-mono tracking-wide">{post.title}</h1>
      <h1 className="text-xl text-black mt-4 font-bold font-mono tracking-wide">{post.type} | {post.subtitle}</h1>
      <p className="text-md text-black font-mono font-light my-4">{post.date}</p><hr/>
      <div className="mt-8">
        <ReactMarkdown className='font-serif lg:prose-lg prose-sm'>
        {post.content}
        </ReactMarkdown>
      </div>
      <br/><hr/><br/>

      <br/><br/>
    </div>
    </div>
  )
}

export async function getStaticPaths() {
  const { data, error } = await supabase
    .from('posts')
    .select('id')
  const paths = data.map(post => ({ params: { id: JSON.stringify(post.id) }}))
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
    .filter('id', 'eq', id)
    .single()
  return {
    props: {
      post: data,
    },
    revalidate: 60,
  }
}