import {
  ScrollScene,
  styles,
  UseCanvas,
  useScrollRig
} from '@14islands/r3f-scroll-rig'
import { ScrollTrigger } from 'gsap/all'
import Image from 'next/image'
import { Suspense, useRef } from 'react'

import { AspectBox } from '~/components/aspect-box'
import { Cell } from '~/components/grid/cell'
import { Row } from '~/components/grid/row'
import { gsap } from '~/lib/gsap'

import { GeometricWireframe } from '../three/geometric-wireframe/geometric-wireframe'
import { LineExplosion } from '../three/line-explosion/line-explosion'
import s from './books-list.module.css'

gsap.registerPlugin(ScrollTrigger)

interface ListItem {
  title: string
  author?: string
  description?: string
  url?: string
  decoration?: string
}

interface BooksListProps {
  title: string
  subtitle?: string
  items: ListItem[]
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
  webglType?: 'line-explosion' | 'geometric-wireframe'
  contentPosition?: {
    start: number
    end: number
    mobileSpan?: number
    order?: number
    align?: 'start' | 'center' | 'end'
  }
  imagePosition?: {
    start: number
    end: number
    mobileSpan?: number
    order?: number
  }
}

export const BooksList = ({
  title,
  subtitle,
  items,
  image,
  webglType = 'geometric-wireframe'
}: BooksListProps) => {
  const trackedElement = useRef(null!)
  const imgRef = useRef(null!)
  const { hasSmoothScrollbar } = useScrollRig()

  const renderWebGLComponent = (props: any) => {
    switch (webglType) {
      case 'line-explosion':
        return <LineExplosion {...props} triggerRef={trackedElement} />
      case 'geometric-wireframe':
      default:
        return <GeometricWireframe {...props} triggerRef={trackedElement} />
    }
  }

  return (
    <div className={s.container}>
      <Row>
        <Cell start={1} end={24} mobileSpan={8} className={s.content}>
          <div
            className={`${s.imageContainer} ${styles.hiddenWhenSmooth}`}
            ref={trackedElement}
          >
            <AspectBox ratio={16 / 9}>
              <Image src={image.url} alt={image.alt} ref={imgRef} fill />
            </AspectBox>
          </div>

          <div className={s.overlay}>
            <h2 className={s.title}>{title}</h2>
            {subtitle && <p className={s.subtitle}>{subtitle}</p>}

            <ul className={s.list}>
              {items.map((item, index) => (
                <li key={index} className={s.listItem}>
                  {item.url ? (
                    <>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className={s.decoration}>{item.decoration}</span>
                        {item.title}
                      </a>
                      {item.author && <span> by {item.author}</span>}
                    </>
                  ) : (
                    <>
                      <h3>{item.title}</h3>
                      {item.author && <span> by {item.author}</span>}
                    </>
                  )}
                  {item.description && (
                    <p className={s.description}>{item.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {hasSmoothScrollbar && (
            <UseCanvas>
              <ScrollScene track={trackedElement}>
                {(props) => (
                  <Suspense fallback={null}>
                    {renderWebGLComponent(props)}
                  </Suspense>
                )}
              </ScrollScene>
            </UseCanvas>
          )}
        </Cell>
      </Row>
    </div>
  )
}
