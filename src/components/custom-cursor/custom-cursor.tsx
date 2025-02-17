'use client'
import { useEffect, useRef, useState } from 'react'

import { useDeviceDetect } from '~/hooks/use-device-detect'
import useIsomorphicLayoutEffect from '~/hooks/use-isomorphic-layout'

import cursorDefault from '../../app/images/cursor/cursor-default.png'
import cursorPointer from '../../app/images/cursor/cursor-pointer.png'
import s from './custom-cursor.module.css'

export const CustomCursor = () => {
  const { isSafari } = useDeviceDetect()
  const [shouldRender, setShouldRender] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Only show cursor if not Safari
    if (!isSafari) {
      setShouldRender(true)
    }
  }, [isSafari])

  useIsomorphicLayoutEffect(() => {
    if (!shouldRender) return

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
  }, [shouldRender])

  if (!shouldRender) return null

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
