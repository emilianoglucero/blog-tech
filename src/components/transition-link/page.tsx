'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { animateHomePageOut, animatePostPageOut } from '~/utils/animations'

import s from './transition-link.module.css'

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  onMouseEnter,
  onMouseLeave
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname !== href) {
      if (href === '/') {
        animatePostPageOut(href, router)
      } else {
        animateHomePageOut(href, router)
      }
    }
  }

  return (
    <Link
      href={href}
      className={s.transition__link}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  )
}

export default TransitionLink
