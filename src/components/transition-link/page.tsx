'use client'

import { usePathname, useRouter } from 'next/navigation'

import { animateHomePageOut, animatePostPageOut } from '~/utils/animations'

import s from './transition-link.module.css'

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
    if (pathname !== href) {
      if (href === '/') {
        animatePostPageOut(href, router)
      } else {
        animateHomePageOut(href, router)
      }
    }
  }

  return (
    <a className={s.transition__link} onClick={handleClick}>
      {children}
    </a>
  )
}

export default TransitionLink
