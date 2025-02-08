import {
  ScrollScene,
  styles,
  UseCanvas,
  useScrollRig
} from '@14islands/r3f-scroll-rig'
import { Center, Float } from '@react-three/drei'
import Image from 'next/image'
import { Suspense, useRef } from 'react'

import { AspectBox } from '~/components/aspect-box'
import { Cell } from '~/components/grid/cell'
import { Row } from '~/components/grid/row'

import s from './side-list-with-image.module.css'

interface ListItem {
  title: string
  author?: string
  description?: string
  url?: string
}

interface SideListWithImageProps {
  title?: string
  subtitle?: string
  items: ListItem[]
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
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

const WebGLBox = (props: any) => {
  return (
    <group {...props} scale={[0.5, 0.5, 0.5]} rotation={[0.15, 0.2, 0]}>
      <mesh scale={[9, 9, 9]}>
        <boxGeometry args={[1.9, 1, 1, 2, 1, 2]} />
        <meshBasicMaterial color="#262626" wireframe />
      </mesh>
      <mesh scale={[1, 1, 1]}>
        <sphereGeometry args={[1, 2, 3]} />
        <meshBasicMaterial color="#262626" wireframe />
      </mesh>
    </group>
  )
}

export const SideListWithImage = ({
  title,
  subtitle,
  items,
  image,
  contentPosition = {
    start: 1,
    end: 12,
    mobileSpan: 8,
    order: 1,
    align: 'start'
  },
  imagePosition = {
    start: 13,
    end: 24,
    mobileSpan: 8,
    order: 2
  }
}: SideListWithImageProps) => {
  const trackedElement = useRef(null!)
  const imgRef = useRef(null!)
  const { hasSmoothScrollbar } = useScrollRig()

  return (
    <div className={s.container}>
      <Row>
        <Cell
          start={contentPosition.start}
          end={contentPosition.end}
          mobileSpan={contentPosition.mobileSpan}
          className={s.content}
        >
          <ul className={s.list}>
            {items.map((item, index) => (
              <li key={index} className={s.listItem}>
                {item.url ? (
                  <>
                    <h3>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </a>
                    </h3>
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
        </Cell>

        <Cell
          start={imagePosition.start}
          end={imagePosition.end}
          mobileSpan={imagePosition.mobileSpan}
          className={s.imageWrapper}
        >
          <div
            className={`${s.imageContainer} ${styles.hiddenWhenSmooth}`}
            ref={trackedElement}
          >
            <AspectBox ratio={9 / 16}>
              <Image src={image.url} alt={image.alt} ref={imgRef} fill />
            </AspectBox>
          </div>
          {hasSmoothScrollbar && (
            <UseCanvas>
              <ScrollScene track={trackedElement}>
                {(props) => (
                  <Suspense fallback={null}>
                    <WebGLBox {...props} />
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
