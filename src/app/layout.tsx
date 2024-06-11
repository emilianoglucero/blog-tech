import '~/css/global.scss'

import type { Metadata } from 'next'

// import localFont from 'next/font/local'
// import { Header } from '~/components/header'
import { isDev, siteURL } from '~/lib/constants'

const GridDebugger = dynamic(() => import('~/lib/debug/grid-debugger'), {
  ssr: false
})

import dynamic from 'next/dynamic'

import { AppHooks } from './app-hooks'
import { bitter, open } from './fonts'
import { Providers } from './providers'

// const panama = localFont({
//   src: '/fonts/panama/Panama-Monospace-Regular.woff2',
//   variable: '--font-panama',
//   display: 'swap'
// })

export const metadata: Metadata = {
  title: {
    default: 'next-typescript | basement.studio',
    template: '%s | basement.studio'
  },
  metadataBase: siteURL,
  description: `A minimalist's boilerplate — Next.js with TypeScript.`,
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    }
  ],
  manifest: '/manifest.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'digital digital',
    creator: '@emilianoglucero',
    siteId: '@emilianoglucero'
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${open.variable} ${bitter.variable}`}>
      <body>
        <Providers>
          {/* <Header /> */}
          {children}
          {isDev && <GridDebugger />}
          <AppHooks />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
