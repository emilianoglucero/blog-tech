'use client'
import { useEffect, useRef, useState } from 'react'

import { useDeviceDetect } from '~/hooks/use-device-detect'
import useIsomorphicLayoutEffect from '~/hooks/use-isomorphic-layout'

import cursorDefault from '../../app/images/cursor/cursor-default.png'
import cursorPointer from '../../app/images/cursor/cursor-pointer.png'
import cursorSpread from '../../app/images/cursor/cursor-spread.png'
import s from './custom-cursor.module.css'

type CursorType = 'default' | 'pointer' | 'spread'

export const CustomCursor = () => {
  const { isSafari } = useDeviceDetect()
  const [shouldRender, setShouldRender] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorType, setCursorType] = useState<CursorType>('default')
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
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.hasAttribute('role') ||
        target.hasAttribute('data-clickable')
      ) {
        setCursorType('pointer')
      } else {
        setCursorType('default')
      }
    }

    // Add a custom event listener for cursor type changes
    const onCursorTypeChange = (e: CustomEvent) => {
      setCursorType(e.detail as CursorType)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener(
      'cursorTypeChange',
      onCursorTypeChange as EventListener
    )

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener(
        'cursorTypeChange',
        onCursorTypeChange as EventListener
      )
    }
  }, [shouldRender])

  if (!shouldRender) return null

  return (
    <div
      ref={cursorRef}
      className={`${s.cursor} ${s[`cursor__${cursorType}`]} ${
        !isVisible ? s.cursor__hidden : ''
      }`}
      style={{
        backgroundImage: `url(${
          cursorType === 'spread'
            ? cursorSpread.src
            : cursorType === 'pointer'
              ? cursorPointer.src
              : cursorDefault.src
        })`,
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    />
  )
}
