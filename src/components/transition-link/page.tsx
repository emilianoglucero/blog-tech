'use client'

import { usePathname, useRouter } from 'next/navigation'

import { animateHomePageOut, animatePostPageOut } from '~/utils/animations'

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const TransitionLink = ({ href, children }: TransitionLinkProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    console.log('handleClick', href, pathname)
    if (pathname !== href) {
      if (href === '/') {
        animatePostPageOut(href, router)
      } else {
        animateHomePageOut(href, router)
      }
    }
  }

  return <button onClick={handleClick}>{children}</button>
}

export default TransitionLink
