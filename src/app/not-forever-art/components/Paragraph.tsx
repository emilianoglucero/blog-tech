import React, { forwardRef, ReactNode } from 'react'

import s from '../page.module.css'

interface ParagraphProps {
  number?: string
  children: ReactNode
  className?: string
}

const Paragraph = forwardRef<HTMLDivElement, ParagraphProps>(
  ({ number, children, className = '' }, ref) => (
    <div ref={ref} className={`${s.paragraph} ${className}`}>
      {number && <h2 className={s.paragraph__title}>{number}</h2>}
      {children}
    </div>
  )
)

export default Paragraph
