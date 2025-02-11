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

  useIsomorphicLayoutEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
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

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`${s.cursor} ${isPointer ? s.cursor__pointer : ''}`}
      style={{
        backgroundImage: `url(${isPointer ? cursorPointer.src : cursorDefault.src})`,
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    />
  )
}
