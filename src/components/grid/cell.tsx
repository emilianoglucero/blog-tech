import { clsx } from 'clsx'
import * as React from 'react'

import s from '../../css/grid.module.scss'

interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  start?: number
  end?: number
  span?: number
  order?: number
  mobileStart?: number
  mobileEnd?: number
  mobileSpan?: number
  mobileOrder?: number
  align?: 'start' | 'center' | 'end'
}

export const Cell = React.forwardRef<HTMLDivElement, CellProps>(
  (
    {
      className,
      start,
      end,
      span,
      order,
      mobileStart,
      mobileEnd,
      mobileSpan,
      mobileOrder,
      align = 'start',
      ...props
    },
    ref
  ) => {
    return (
      <div
        {...props}
        className={clsx(
          start && s[`cell-start-${start}`],
          end && s[`cell-end-${end}`],
          span && s[`cell-span-${span}`],
          order && s[`cell-order-${order}`],
          mobileStart && s[`cell-mobile-start-${mobileStart}`],
          mobileEnd && s[`cell-mobile-end-${mobileEnd}`],
          mobileSpan && s[`cell-mobile-span-${mobileSpan}`],
          mobileOrder && s[`cell-mobile-order-${mobileOrder}`],
          s[`cell-align-${align}`],
          className
        )}
        ref={ref}
      />
    )
  }
)
