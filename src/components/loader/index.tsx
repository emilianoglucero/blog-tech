'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import { useAppStore } from '~/context/use-app-store'
import { gsap } from '~/lib/gsap'

import s from './loader.module.css'

export const Loader = () => {
  const symbolRef = useRef<HTMLSpanElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { introSeen, setIntroSeen } = useAppStore()

  useGSAP(() => {
    if (!symbolRef.current && !introSeen) return

    const tl = gsap.timeline()

    tl.to(symbolRef.current, {
      yPercent: 130,
      duration: 1.8,
      delay: 0.1
    }).to(containerRef.current, {
      yPercent: 100,
      duration: 1.8,
      ease: 'power4.inOut',
      onComplete: () => {
        setIntroSeen(true)
      }
    })
  }, [introSeen, setIntroSeen])

  return (
    <>
      <div className={s.container} ref={containerRef}>
        <div className={s.symbols_container}>
          <span className={s.symbol_character} ref={symbolRef}>
            ✦
          </span>
        </div>
      </div>
      <div className={s.loader_container}></div>
    </>
  )
}
