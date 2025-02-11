import '~/css/global.scss'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { CustomCursor } from '~/components/custom-cursor/custom-cursor'
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
  description: `Writing, music, technology, photography. And stuff.`,
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
          {children}
          {isDev && <GridDebugger />}
          <AppHooks />
          <CustomCursor />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export default RootLayout
