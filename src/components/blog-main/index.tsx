'use client'

import { Suspense } from 'react'

import Welcome from '~/app/sections/welcome'

import IntroLoader from '../loader/IntroLoader'

const BlogMain = () => {
  return (
    <Suspense fallback={null}>
      <IntroLoader>
        <Welcome />
      </IntroLoader>
    </Suspense>
  )
}

export default BlogMain
