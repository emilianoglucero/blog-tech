import { clsx } from 'clsx'
import * as React from 'react'

import s from '../../css/grid.module.scss'

export const Row = React.forwardRef<
  HTMLDivElement,
  JSX.IntrinsicElements['div']
>(({ className, children, ...props }, ref) => {
  return (
    <div {...props} className={clsx(s.row, className)} ref={ref}>
      {children}
    </div>
  )
})
