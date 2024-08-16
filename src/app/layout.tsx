import '~/css/global.scss'

import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { isDev, siteURL } from '~/lib/constants'

import { AppHooks } from './app-hooks'
import { bitter, open } from './fonts'
import { Providers } from './providers'
const GridDebugger = dynamic(() => import('~/lib/debug/grid-debugger'), {
  ssr: false
})

export const metadata: Metadata = {
  title: {
    default: 'I 🖤 my computer job — A digital journal by Emiliano Lucero',
    template: '%s | Emiliano Lucero'
  },
  metadataBase: siteURL,
  description: `Writings, music, technology, explorations and stuff.`,
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    }
  ],
  manifest: '/manifest.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'I 🖤 my computer job',
    creator: '@emilianoglucero',
    siteId: '@emilianoglucero'
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${bitter.variable} ${open.variable}`}>
      <body>
        <Providers>
          {/* <Header /> */}
          {children}
          {isDev && <GridDebugger />}
          <AppHooks />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
