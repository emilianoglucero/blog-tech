'use client'

import Welcome from '~/app/sections/welcome'

import IntroLoader from '../loader/IntroLoader'

const BlogMain = () => {
  return (
    <IntroLoader>
      <Welcome />
    </IntroLoader>
  )
}

export default BlogMain
