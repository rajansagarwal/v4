import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../api'

const callouts = [
  {
    name: 'Abstract Generative Art',
    description: 'Poem Synthesis & Visualization',
    imageSrc: 'https://cloud-r2onbrszd-hack-club-bot.vercel.app/0image.png',
    imageAlt: 'etheralism.',
    href: 'https://instagram.com/towards.etherealism',
  },
  {
    name: 'Open Letter',
    description: 'Equitable Food Security',
    imageSrc: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
    imageAlt: 'food bank.',
    href: 'https://equity.towards.live',
  },
  {
    name: 'Data Aggregation',
    description: 'Decentralized Medical Network',
    imageSrc: 'https://cloud-cssrzjtwc-hack-club-bot.vercel.app/0screen_shot_2022-03-11_at_8.53.59_pm.png',
    imageAlt: 'bloom network.',
    href: 'https://github.com/rajanwastaken/bloom',
  },
  {
    name: 'Digital Communities',
    description: 'Indigenous Pipeline Infrastructure',
    imageSrc: 'https://cloud-ra5alevdj-hack-club-bot.vercel.app/0screen_shot_2022-03-11_at_8.56.49_pm.png',
    imageAlt: 'project hestia',
    href: 'https://youtu.be/inOwByW_ufs',
  },
  {
    name: 'Encryption Algorithms',
    description: 'Custom Blockchain in 100 Lines',
    imageSrc: 'https://file.heyrajan.com/workshop.png',
    imageAlt: 'project hestia',
    href: 'https://www.youtube.com/watch?v=3HZJ7ZoQIUE&ab_channel=RajanAgarwal',
  },
  /*{
    name: 'Flow Fields',
    description: 'Generative Art',
    imageSrc: 'https://file.heyrajan.com/art.png',
    imageAlt: 'project hestia',
    href: 'https://youtu.be/inOwByW_ufs',
  },*/
  {
    name: "Children's Novel",
    description: 'Autism Awareness',
    imageSrc: 'https://cloud-16c6pal7a-hack-club-bot.vercel.app/0bookpost.png',
    imageAlt: 'breaking barriers.',
    href: 'https://book.heyrajan.com',
  },
  {
    name: 'Gamifying Political Awareness',
    description: 'Policy Chat Rooms',
    imageSrc: 'https://user-images.githubusercontent.com/64426829/133933404-ff1e8f03-f689-4fba-a43a-bb1a4766540d.png',
    imageAlt: 'project hestia',
    href: 'https://github.com/diplomatica-htn',
  },
  {
    name: 'Reconciliation',
    description: '160km Run For Hope',
    imageSrc: 'https://cloud-e9m8zg3xl-hack-club-bot.vercel.app/0image.png',
    imageAlt: 'run for hope.',
    href: 'https://run.heyrajan.com',
  },
]



const product = {
  name: "Hey, I'm Rajan",
  price: '$192',
  href: '#',
  images: [
    {
      src: 'https://file.heyrajan.com/i-profile.jpg',
      alt: 'Stay Woke Image 2',
    },
    {
      src: 'https://file.heyrajan.com/staywoke2.jpg',
      alt: 'Stay Woke Image 1',
    },
    {
      src: 'https://file.heyrajan.com/ori3.png',
      alt: 'Ori, the Aussiedoodle',
    },
    {
      src: 'https://file.heyrajan.com/clock-horizontal.png',
      alt: 'Clock in Paris',
    },
    {
      src: 'https://file.heyrajan.com/monument.png',
      alt: 'Church in Florence, Italy'
    }
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  description:
    "i'm a 16 year old developer, author and researcher based in toronto. i'm rebuilding patient data aggregation & poetic expression through generative art. in my free time, i explore evolutionary game theory, actuarial science and political science.",
    follow:
    "rajan.",
  details:
    'rajan',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

const [posts, setPosts] = useState([])
const [papers, setPapers] = useState([])
const [notes, setNotes] = useState([])
const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchPapers()
    const mySubscription = supabase
      .from('posts')
      .on('*', () => {
        console.log('something happened....')
        fetchPapers()
      })
      .subscribe()
    return () => supabase.removeSubscription(mySubscription)
  }, [])
  useEffect(() => {
    fetchNotes()
    const mySubscription = supabase
      .from('posts')
      .on('*', () => {
        console.log('something happened....')
        fetchNotes()
      })
      .subscribe()
    return () => supabase.removeSubscription(mySubscription)
  }, [])
  useEffect(() => {
    fetchBlogs()
    const mySubscription = supabase
      .from('posts')
      .on('*', () => {
        console.log('something happened....')
        fetchBlogs()
      })
      .subscribe()
    return () => supabase.removeSubscription(mySubscription)
  }, [])
  async function fetchPapers() {
    const { data, error } = await supabase
      .from('posts')
      .select()
      .filter('type', 'in', '("Paper")')
    setPapers(data)
    setLoading(false)
  }
  async function fetchNotes() {
    const { data, error } = await supabase
      .from('posts')
      .select()
      .filter('type', 'in', '("Notes", "Papers")')
    setNotes(data)
    setLoading(false)
  }
  async function fetchBlogs() {
    const { data, error } = await supabase
      .from('posts')
      .select()
      .filter('type', 'in', '("Blog")')
    setPosts(data)
    setLoading(false)
  }


  return (
    <div className="bg-black">
      <Head><title>rajan.</title></Head>
      <div className="lg:pt-6">

        <div className="lg:mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8 sm:hidden">
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={product.images[1].src}
                alt={product.images[1].alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 sm:overflow-hidden rounded-lg">
              <img
                src={product.images[4].src}
                alt={product.images[4].alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
          <div className="aspect-w-3 aspect-h-4 lg:rounded-lg overflow-hidden lg:block">
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="w-full h-full object-center object-cover"
            />
          </div>
    
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={product.images[3].src}
                alt={product.images[3].alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 sm:overflow-hidden rounded-lg">
              <img
                src={product.images[2].src}
                alt={product.images[2].alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-800 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-100 sm:text-3xl pb-6">Hey, I&#39;m <b>Rajan</b></h1>
          </div>

          <div className="mt-4 lg:mt-0 lg:row-span-4">
            <p className="text-2xl text-gray-100 font-bold  hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block pb-6">latest <u><Link href="posts">thoughts</Link></u></p>

            <div className="mt-6 text-gray-200" style={{
              display: 'flex',
              flexDirection: 'column-reverse'
            }}>
            {
        posts.slice(0, 10).map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a className="block border-black mb-6 pb-4">
            <p className="text-2xl text-gray-200 pb-2 context">{post.title}</p>
            <p className="text-md text-gray-400 context">{post.type} - {post.subtitle}</p>
            </a>
          </Link>)
        )
      }

            </div>

            <p className="text-2xl text-gray-100 font-bold  hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block pb-3 pt-3"><u><Link href="/notes">notes, papers & work</Link></u></p>

            <div className="mt-6 text-gray-200" style={{
              display: 'flex',
              flexDirection: 'column-reverse'
            }}>
            {
        notes.slice(0, 7).map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a className="block border-black mb-6 pb-4">
            <p className="text-2xl text-gray-200 pb-2 context">{post.title}</p>
            <p className="text-md text-gray-400 context">{post.type} - {post.subtitle}</p>
            </a>
          </Link>)
        )
      }

            </div>

       {/*     <p className="text-2xl text-gray-100 font-bold  hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block pb-3 pt-3"><u><Link href="/notes">notes</Link></u></p>

            <div className="mt-6 text-gray-200" style={{
              display: 'flex',
              flexDirection: 'column-reverse'
            }}>
            {
        notes.slice(0, 4).map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a className="block border-black mb-6 pb-4">
            <p className="text-2xl text-gray-200 pb-2 context">{post.title}</p>
            <p className="text-md text-gray-400 context">{post.type} - {post.subtitle}</p>
            </a>
          </Link>)
        )
      }

    </div> */}

          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-800 lg:pr-8">
            <div>

              <div className="space-y-6">
                <p className="text-xl text-gray-200 context">{product.description}<br/><br/>
                currently, i&#39;m working on a <u>path <a href="https://towards.live">towards</a> atruistic tech</u>. i envision a future of actionable software & reciprocal automation, through a transparent technical revolution. here, i have created public policy petitions, a new form of poetic expression and idyllic biotech.
                <br/><br/>
                within organizations, i write curriculum infrastructure, design mental health resource access, inspire youth to code and work on the international public health crisis. in my community, i wrote a childrens novel for autism awareness and running 160km for indigenous reconciliation.
                </p>
              </div>

              <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto pt-[40px] py-4 sm:py-6 lg:py-9 lg:pt-[70px] lg:max-w-none">
            <h2 className="text-3xl font-bold text-gray-200"><b>towards</b> altruistic tech</h2><br/><br/>
  
            <div className="mt-3 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-6">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-400">
                    <a href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-200">{callout.description}</p>
                  <br/><br/>
                </div>
              ))}
            </div>
          </div>
        </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
