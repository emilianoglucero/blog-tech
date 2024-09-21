import Image, { StaticImageData } from 'next/image' // Import StaticImageData
import React, { forwardRef } from 'react'

import s from '../page.module.css'

// Define the props interface
interface PhotoSectionProps {
  src: string | StaticImageData
  alt: string
  caption: string
  className?: string
  wrapperClassName?: string
}

const PhotoSection = forwardRef<HTMLDivElement, PhotoSectionProps>(
  ({ src, alt, caption, className = '', wrapperClassName = '' }, ref) => (
    <section className={`${s.main__photography} ${className}`}>
      <div
        className={`${s.main__photography__wrapper} ${wrapperClassName}`}
        ref={ref}
      >
        <Image src={src} alt={alt} fill loading="eager" />
      </div>
      <figcaption>{caption}</figcaption>
    </section>
  )
)

export default PhotoSection
