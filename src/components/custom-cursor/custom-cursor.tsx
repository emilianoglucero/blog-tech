'use client'
import { useRef, useState } from 'react'

import useIsomorphicLayoutEffect from '~/hooks/use-isomorphic-layout'

import cursorDefault from '../../app/images/cursor/cursor-default.png'
import cursorPointer from '../../app/images/cursor/cursor-pointer.png'
import s from './custom-cursor.module.css'

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)

  useIsomorphicLayoutEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true)
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.hasAttribute('role') ||
        target.hasAttribute('data-clickable')

      setIsPointer(!!isClickable)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`${s.cursor} ${isPointer ? s.cursor__pointer : ''} ${
        !isVisible ? s.cursor__hidden : ''
      }`}
      style={{
        backgroundImage: `url(${isPointer ? cursorPointer.src : cursorDefault.src})`,
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    />
  )
}
