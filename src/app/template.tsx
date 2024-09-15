'use client'
import { useGSAP } from '@gsap/react'
import { usePathname } from 'next/navigation'

import { animateHomePageIn, animatePostPageIn } from '~/utils/animations'

import s from './template.module.css'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()

  useGSAP(() => {
    if (pathName === '/') {
      animateHomePageIn()
    } else {
      animatePostPageIn()
    }
  })

  return (
    <div>
      <div className={`${s.banner}`}></div>
      {children}
    </div>
  )
}
