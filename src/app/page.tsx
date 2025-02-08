import { Suspense } from 'react'

import BlogMain from '~/components/blog-main'

const HomePage: React.FC = async () => {
  return (
    <Suspense fallback={null}>
      <BlogMain />
    </Suspense>
  )
}

export default HomePage
