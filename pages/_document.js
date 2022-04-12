import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
          <meta name="description" content="hey, i'm rajan — a 16 year old developer, author and researcher based in Toronto"/>
          <meta name="keywords" content="rajan, rajan agarwal, agarwal, brampton, toronto, design"/>
          <meta name="robots" content="index, follow"/>
          <link href="https://file.heyrajan.com/i-profile.jpg" rel="icon"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}