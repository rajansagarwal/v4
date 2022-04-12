import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <div style={{
        padding: '20vmin',
        background: 'black'
    }}>
      <Head>
        <title>Rajan | Posts</title>
      </Head>

      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 font-mono text-white">404: Page Not Found</h1>
      <h1 className="text-lg font-semibold tracking-wide mt-6 mb-2 font-mono text-white pb-[100vh]"><Link href='/'>Take Me Home</Link></h1>
    </div>
  )
}